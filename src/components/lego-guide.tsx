import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Minus, MessageCircle } from 'lucide-react';
import { asset } from '@/lib/asset';
import { useContactDialog } from './contact-dialog';
import { nudgeBus } from '@/lib/nudge-bus';

/* Daniyal's Lego avatar as an always-present chat companion in the
   bottom-right. It cannot be closed, only minimized to the avatar
   (still tappable, like a chat widget). Every tip pushes toward the
   contact form. Coordinates via nudgeBus so it never overlaps a
   roaming prompt. */

interface Tip {
  text: string;
  cta: { label: string; action: 'contact' | 'scroll' | 'link'; target?: string };
}

const BUILD_CTA = { label: "Let's build something", action: 'contact' as const };

const TIP_SETS: Record<string, Tip[]> = {
  '/': [
    { text: "Hey, I'm Daniyal. That scene up top? Every object is a system I build. Want one in your business?", cta: BUILD_CTA },
    { text: 'Fun fact: I once replaced a whole bookkeeping firm with one automation. Four countries, 20 invoices a day. Curious what I could automate for you?', cta: BUILD_CTA },
    { text: 'The demos on the work page are real and clickable. Take a look, then tell me what you want built.', cta: { label: 'See the work', action: 'link', target: '/work' } },
  ],
  '/work': [
    { text: 'Everything here is running in production right now. Want one of these in your business?', cta: BUILD_CTA },
    { text: 'Try the Pulse Tracker demo, then let me build you something like it.', cta: BUILD_CTA },
  ],
  '/testimonials': [
    { text: 'These numbers are from live systems, not marketing math. Want a result like this?', cta: BUILD_CTA },
  ],
  '/blog': [
    { text: 'If a post sparks an idea for your business, my inbox is open. What would you automate?', cta: BUILD_CTA },
  ],
  service: [
    { text: 'This is one of the things I do most. Want it wired into your stack?', cta: BUILD_CTA },
  ],
};

const BUS_ID = 'lego';
const FIRST_DELAY = 4500;
const NEXT_DELAY = 22000;

const LegoGuide = () => {
  const { pathname } = useLocation();
  const { open: openContact } = useContactDialog();
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const tips = useMemo(() => {
    if (TIP_SETS[pathname]) return TIP_SETS[pathname];
    if (pathname.startsWith('/blog/')) return TIP_SETS['/blog'];
    if (pathname === '/') return TIP_SETS['/'];
    return TIP_SETS.service;
  }, [pathname]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const showBubble = (index: number) => {
    if (!nudgeBus.claim(BUS_ID)) {
      // stage busy, retry shortly
      timers.current.push(setTimeout(() => showBubble(index), 4000));
      return;
    }
    setTipIndex(index);
    setBubbleOpen(true);
  };

  // Cycle a tip on load and after each route change
  useEffect(() => {
    clearTimers();
    setBubbleOpen(false);
    nudgeBus.release(BUS_ID);
    setTipIndex(0);

    const cycle = (index: number) => {
      showBubble(index);
      timers.current.push(setTimeout(() => cycle((index + 1) % tips.length), NEXT_DELAY));
    };
    timers.current.push(setTimeout(() => cycle(0), FIRST_DELAY));

    return () => {
      clearTimers();
      nudgeBus.release(BUS_ID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const minimize = () => {
    setBubbleOpen(false);
    nudgeBus.release(BUS_ID);
  };

  const toggleFromAvatar = () => {
    if (bubbleOpen) {
      minimize();
    } else if (nudgeBus.claim(BUS_ID)) {
      setBubbleOpen(true);
    }
  };

  /* Escape always minimizes, so there is never a state you cannot get
     out of, even mid-animation or after a resize. */
  useEffect(() => {
    if (!bubbleOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') minimize();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubbleOpen]);

  const handleCta = (tip: Tip) => {
    const { action, target } = tip.cta;
    if (action === 'contact') openContact('lego-guide');
    else if (action === 'scroll' && target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    else if (action === 'link' && target) window.location.assign(target);
  };

  const tip = tips[tipIndex];

  return (
    <div className="fixed bottom-0 right-3 sm:right-5 z-50 flex flex-col items-end select-none">
      {/* Speech bubble: fully unmounted when closed so it can never
          swallow a click or hover behind the page. */}
      {bubbleOpen && (
        <div className="mb-2 mr-2 w-[min(260px,calc(100vw-2.5rem))] animate-clay-pop">
          <div className="relative rounded-2xl bg-card shadow-island p-4 pr-10">
            <button
              type="button"
              onClick={minimize}
              aria-label="Minimize"
              title="Minimize"
              className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <p className="text-sm text-foreground leading-snug font-semibold">{tip.text}</p>
            <button
              type="button"
              onClick={() => handleCta(tip)}
              className="mt-3 inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-3.5 py-1.5 hover:bg-primary-hover transition-colors"
            >
              {tip.cta.label}
            </button>
            <span className="absolute -bottom-1.5 right-9 w-3 h-3 bg-card rotate-45" />
          </div>
        </div>
      )}

      {/* Avatar: always present, tap to open/close */}
      <button
        type="button"
        onClick={toggleFromAvatar}
        aria-label={bubbleOpen ? "Minimize Daniyal's chat" : 'Chat with Daniyal'}
        className="relative transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-95"
      >
        <img
          src={asset('daniyal-lego.png')}
          alt="Daniyal, your guide"
          width={104}
          className="w-[84px] sm:w-[100px] h-auto drop-shadow-xl origin-bottom"
          loading="lazy"
        />
        {!bubbleOpen && (
          <span className="absolute top-1 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-md border-2 border-background animate-status-pulse">
            <MessageCircle className="w-3 h-3" />
          </span>
        )}
      </button>
    </div>
  );
};

export default LegoGuide;
