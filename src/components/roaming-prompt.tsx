import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { useContactDialog } from './contact-dialog';
import { nudgeBus } from '@/lib/nudge-bus';

/* A contextual pop-up that nudges the visitor to the contact form.
   Rules that keep it from ever fighting the Lego chat guide:
   - Desktop only. On narrow screens the guide is the only nudge, so
     nothing can collide or trap the user.
   - Bottom-left, while the guide owns bottom-right.
   - Coordinated through nudgeBus, so only one speaks at a time.
   - When hidden it is fully unmounted, so it can never swallow clicks. */

type Trigger = 'inview' | 'exit';

interface RoamingPromptProps {
  id: string;
  text: string;
  trigger?: Trigger;
  delay?: number;
}

/* Below this width there is not enough room for two floating things. */
const MIN_WIDTH = 1024;

const seenKey = (id: string) => `roam-${id}`;

const RoamingPrompt = ({ id, text, trigger = 'inview', delay = 800 }: RoamingPromptProps) => {
  const { open: openContact } = useContactDialog();
  const [show, setShow] = useState(false);
  const [wideEnough, setWideEnough] = useState(false);
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

  const hide = () => {
    setShow(false);
    nudgeBus.release(busId);
  };

  /* Track viewport width. If the window shrinks below the threshold
     while a prompt is open, retract it immediately so it can never end
     up stuck on top of the guide. */
  useEffect(() => {
    const check = () => {
      const wide = window.innerWidth >= MIN_WIDTH;
      setWideEnough(wide);
      if (!wide) hide();
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryShow = () => {
    if (alreadySeen()) return;
    if (window.innerWidth < MIN_WIDTH) return;
    if (!nudgeBus.claim(busId)) {
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

  // Exit-intent trigger (desktop only by nature)
  useEffect(() => {
    if (trigger !== 'exit' || alreadySeen()) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // Escape closes it, so there is always a way out
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // Release the stage on unmount
  useEffect(() => () => nudgeBus.release(busId), [busId]);

  const dismiss = () => {
    markSeen();
    hide();
  };

  const act = () => {
    openContact(`roam-${id}`);
    dismiss();
  };

  return (
    <>
      {trigger === 'inview' && <div ref={anchorRef} aria-hidden="true" className="h-0 w-0" />}

      {/* Fully unmounted when hidden or on narrow screens, so it can
          never intercept a click or trap the user. */}
      {show && wideEnough && (
        <div
          className="fixed z-40 left-4 bottom-6 w-[290px] animate-clay-pop"
          role="dialog"
          aria-label="Message from Daniyal"
        >
          <div className="relative rounded-2xl bg-card shadow-island p-5 pr-10 border-2 border-primary/10">
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
      )}
    </>
  );
};

export default RoamingPrompt;
