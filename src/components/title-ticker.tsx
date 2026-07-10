import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* Cycles the browser tab title through a few phrases so the tab reads
   as a little marquee. Pauses on the real per-page title whenever the
   route changes (react-helmet sets it), then resumes cycling. */

const PHRASES = [
  'Build automations...',
  'GTM systems...',
  'Claude agents...',
  'Daniyal Aziz',
];

const STEP_MS = 2200;

const TitleTicker = () => {
  const { pathname } = useLocation();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Let the page's own <title> (from Helmet) show first, then cycle.
    const start = setTimeout(() => {
      let i = 0;
      const tick = () => {
        document.title = PHRASES[i % PHRASES.length];
        i += 1;
      };
      tick();
      timer.current = setInterval(tick, STEP_MS);
    }, STEP_MS);

    return () => {
      clearTimeout(start);
      if (timer.current) clearInterval(timer.current);
    };
  }, [pathname]);

  return null;
};

export default TitleTicker;
