import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { asset } from '@/lib/asset';
import { useContactDialog } from './contact-dialog';

/* Daniyal's Lego avatar as a friendly corner guide. It peeks up now
   and then with a short, page-aware tip: what to try, a fun fact, or a
   soft pitch. Dismissible, paced so it never nags, and it hides once
   you close it for the session. */

interface Tip {
  text: string;
  cta?: { label: string; action: 'contact' | 'scroll' | 'link'; target?: string };
}

const TIP_SETS: Record<string, Tip[]> = {
  '/': [
    { text: "Hey, I'm Daniyal. That little scene up top? Every object is a system I build.", cta: { label: 'See the work', action: 'scroll', target: 'highlights' } },
    { text: 'Fun fact: I once replaced a whole bookkeeping firm with one automation. Four countries, 20 invoices a day.' },
    { text: 'The demos on the work page are real and clickable. Go poke at them.', cta: { label: 'Open the work', action: 'link', target: '/work' } },
    { text: 'Got something manual eating your week? Let me take a look, no pitch, just a chat.', cta: { label: "Let's chat", action: 'contact' } },
  ],
  '/work': [
    { text: 'Try the Pulse Tracker demo, it is a real product miniature. Drag things around.' },
    { text: 'Every one of these is running in production right now, anonymised where it needs to be.' },
    { text: 'Want one of these in your business? I build them start to finish.', cta: { label: "Let's talk", action: 'contact' } },
  ],
  '/testimonials': [
    { text: 'These numbers are from live systems, not marketing math.' },
    { text: 'Curious what a result like this looks like for you? Ask me.', cta: { label: 'Ask me', action: 'contact' } },
  ],
  '/blog': [
    { text: 'These posts are the stuff I actually think about while building. No fluff listicles.' },
    { text: 'If a post sparks an idea for your business, my inbox is open.', cta: { label: 'Get in touch', action: 'contact' } },
  ],
  service: [
    { text: 'This is one of the things I do most. Want it wired into your stack?', cta: { label: "Let's chat", action: 'contact' } },
    { text: 'Not sure if this is the right fit? Tell me your situation and I will be straight with you.', cta: { label: 'Ask me', action: 'contact' } },
  ],
};

const FIRST_DELAY = 6000;
const REPEAT_DELAY = 26000;
const VISIBLE_MS = 13000;

const LegoGuide = () => {
  const { pathname } = useLocation();
  const { open: openContact } = useContactDialog();
  const [visible, setVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const tips = useMemo(() => {
    if (TIP_SETS[pathname]) return TIP_SETS[pathname];
    if (pathname.startsWith('/blog/')) return TIP_SETS['/blog'];
    if (pathname === '/') return TIP_SETS['/'];
    return TIP_SETS.service; // service landing pages and everything else
  }, [pathname]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('lego-dismissed') === '1') {
      setDismissed(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // still show, just without the bob; handled by CSS
    }
  }, []);

  // Reset the cycle whenever the route changes
  useEffect(() => {
    if (dismissed) return;
    clearTimers();
    setVisible(false);
    setTipIndex(0);

    const showTip = (index: number) => {
      setTipIndex(index);
      setVisible(true);
      timers.current.push(setTimeout(() => setVisible(false), VISIBLE_MS));
      timers.current.push(
        setTimeout(() => showTip((index + 1) % tips.length), VISIBLE_MS + REPEAT_DELAY),
      );
    };

    timers.current.push(setTimeout(() => showTip(0), FIRST_DELAY));
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, dismissed]);

  const dismiss = () => {
    clearTimers();
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem('lego-dismissed', '1');
    } catch {
      /* private mode, ignore */
    }
  };

  const handleCta = (tip: Tip) => {
    if (!tip.cta) return;
    if (tip.cta.action === 'contact') openContact('lego-guide');
    else if (tip.cta.action === 'scroll' && tip.cta.target) {
      document.getElementById(tip.cta.target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (tip.cta.action === 'link' && tip.cta.target) {
      window.location.assign(tip.cta.target);
    }
    setVisible(false);
  };

  if (dismissed) return null;

  const tip = tips[tipIndex];

  return (
    <div className="fixed bottom-0 right-3 sm:right-5 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech bubble */}
      <div
        className={`pointer-events-auto mb-2 mr-2 max-w-[248px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative rounded-2xl bg-card shadow-island p-4 pr-8">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm text-foreground leading-snug font-semibold">{tip.text}</p>
          {tip.cta && (
            <button
              type="button"
              onClick={() => handleCta(tip)}
              className="mt-2.5 inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 hover:bg-primary-hover transition-colors"
            >
              {tip.cta.label}
            </button>
          )}
          {/* little tail */}
          <span className="absolute -bottom-1.5 right-8 w-3 h-3 bg-card rotate-45" />
        </div>
      </div>

      {/* Avatar: taps to toggle a tip */}
      <button
        type="button"
        onClick={() => {
          if (visible) setVisible(false);
          else {
            clearTimers();
            setVisible(true);
            timers.current.push(setTimeout(() => setVisible(false), VISIBLE_MS));
          }
        }}
        aria-label="Chat with Daniyal's guide"
        className={`pointer-events-auto relative transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 ${
          visible ? 'translate-y-0' : 'translate-y-2'
        }`}
      >
        <img
          src={asset('daniyal-lego.png')}
          alt="Daniyal, your guide"
          width={104}
          className="w-[88px] sm:w-[104px] h-auto drop-shadow-xl origin-bottom"
          loading="lazy"
        />
        {/* status dot to invite a click */}
        {!visible && (
          <span className="absolute top-3 right-2 w-3 h-3 rounded-full bg-primary border-2 border-background animate-status-pulse" />
        )}
      </button>
    </div>
  );
};

export default LegoGuide;
