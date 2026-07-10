import { useEffect, useRef, useState } from 'react';
import { X, CalendarClock, Send } from 'lucide-react';
import { useContactDialog } from './contact-dialog';
import { nudgeBus } from '@/lib/nudge-bus';

/* A contextual pop-up that nudges the visitor to the contact form.
   Placed at specific spots and triggered by scrolling into view or by
   exit intent. Lives at the bottom-LEFT so it never overlaps the Lego
   guide (bottom-right), and coordinates via nudgeBus so the two never
   speak at once. Dismissible per session. */

type Trigger = 'inview' | 'exit';

interface RoamingPromptProps {
  id: string;
  text: string;
  trigger?: Trigger;
  delay?: number;
}

const seenKey = (id: string) => `roam-${id}`;

const RoamingPrompt = ({ id, text, trigger = 'inview', delay = 800 }: RoamingPromptProps) => {
  const { open: openContact } = useContactDialog();
  const [show, setShow] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const busId = `roam-${id}`;

  const alreadySeen = () => {
    try {
      return sessionStorage.getItem(seenKey(id)) === '1';
    } catch {
      return false;
    }
  };

  const markSeen = () => {
    try {
      sessionStorage.setItem(seenKey(id), '1');
    } catch {
      /* private mode */
    }
  };

  const tryShow = () => {
    if (alreadySeen()) return;
    if (!nudgeBus.claim(busId)) {
      // guide or another prompt is talking; wait for the stage to free
      const unsub = nudgeBus.subscribe(() => {
        unsub();
        tryShow();
      });
      return;
    }
    setShow(true);
  };

  const fire = () => {
    if (firedRef.current || alreadySeen()) return;
    firedRef.current = true;
    setTimeout(tryShow, delay);
  };

  // In-view trigger
  useEffect(() => {
    if (trigger !== 'inview') return;
    const el = anchorRef.current;
    if (!el || alreadySeen()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fire();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // Exit-intent trigger (desktop)
  useEffect(() => {
    if (trigger !== 'exit' || alreadySeen()) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // Release the stage on unmount
  useEffect(() => () => nudgeBus.release(busId), [busId]);

  const dismiss = () => {
    setShow(false);
    markSeen();
    nudgeBus.release(busId);
  };

  const act = () => {
    openContact(`roam-${id}`);
    dismiss();
  };

  return (
    <>
      {trigger === 'inview' && <div ref={anchorRef} aria-hidden="true" className="h-0 w-0" />}

      <div
        className={`fixed z-40 left-4 bottom-6 max-w-[300px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        role="dialog"
        aria-hidden={!show}
      >
        <div className="relative rounded-2xl bg-card shadow-island p-5 pr-9 border-2 border-primary/10">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm font-semibold text-foreground leading-snug mb-3">{text}</p>
          <button
            type="button"
            onClick={act}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold px-3.5 py-2 hover:bg-primary-hover transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Let's build something
          </button>
        </div>
      </div>
    </>
  );
};

export default RoamingPrompt;
