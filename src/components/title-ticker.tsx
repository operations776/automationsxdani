import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* Cycles the tab title as a little marquee for humans, while never
   letting a crawler see anything but the real SEO title.

   Why this care is needed: Googlebot renders JavaScript. An earlier
   version overwrote document.title on a timer unconditionally, so Google
   snapshotted a rotating fragment ("GTM systems...") and used that as the
   search result headline. Rules now:
     1. Never animate for a bot user agent.
     2. Only start after a genuine human interaction (mouse, scroll, key,
        touch). Crawlers do not do these.
     3. Always restore the page's real title when the tab is hidden or on
        unmount, so a background tab and any late crawl read correctly. */

const PHRASES = [
  'Build automations...',
  'GTM systems...',
  'Claude agents...',
];

const STEP_MS = 2400;

const isBot = () =>
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|lighthouse|headless|preview/i.test(
    navigator.userAgent,
  );

const TitleTicker = () => {
  const { pathname } = useLocation();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const realTitle = useRef<string>('');

  useEffect(() => {
    if (isBot()) return;

    let started = false;

    const stop = () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      if (realTitle.current) document.title = realTitle.current;
    };

    const start = () => {
      if (started || document.hidden) return;
      started = true;
      // Capture whatever Helmet set for this page, so we can restore it.
      realTitle.current = document.title;

      let i = 0;
      timer.current = setInterval(() => {
        // Alternate: real title, then a phrase, so the tab always
        // returns to the actual page name.
        document.title = i % 2 === 0 ? PHRASES[Math.floor(i / 2) % PHRASES.length] : realTitle.current;
        i += 1;
      }, STEP_MS);
    };

    // Only a real human triggers these.
    const events: (keyof DocumentEventMap)[] = ['mousemove', 'scroll', 'keydown', 'touchstart'];
    const onInteract = () => {
      events.forEach((e) => document.removeEventListener(e, onInteract));
      start();
    };
    events.forEach((e) => document.addEventListener(e, onInteract, { once: true, passive: true }));

    // Restore the real title while the tab is in the background.
    const onVisibility = () => {
      if (document.hidden && realTitle.current) document.title = realTitle.current;
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      events.forEach((e) => document.removeEventListener(e, onInteract));
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [pathname]);

  return null;
};

export default TitleTicker;
