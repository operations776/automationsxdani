import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import ToolLogo from './tool-logo';

/* The hero: an animated map of a Claude ops manager working a
   client's stack. No code, no terminal: you watch the run happen. */

interface Satellite {
  id: string;
  logo: string;
  label: string;
  action: string;
  x: number; /* percent */
  y: number; /* percent */
}

const SATELLITES: Satellite[] = [
  { id: 'ats', logo: 'recruiterflow.png', label: 'Your ATS', action: 'Pulled 214 matching candidates from the ATS', x: 50, y: 12 },
  { id: 'clay', logo: 'clay.png', label: 'Enrichment', action: 'Verified 31 direct emails with Clay', x: 87, y: 33 },
  { id: 'email', logo: 'instantly.png', label: 'Email outreach', action: 'Drafted personalised outreach for approval', x: 87, y: 72 },
  { id: 'linkedin', logo: 'heyreach.png', label: 'LinkedIn', action: 'Queued warm LinkedIn follow-ups', x: 50, y: 90 },
  { id: 'calendar', logo: 'googlecalendar.png', label: 'Calendar', action: 'Booked the intake call, invites out', x: 13, y: 72 },
  { id: 'slack', logo: 'slack.png', label: 'Slack', action: 'Posted the pipeline report to the client channel', x: 13, y: 33 },
];

const STEP_MS = 2000;

const HeroVisual = () => {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedRef.current) {
      setVisited(SATELLITES.map((_, i) => i));
      return;
    }
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % SATELLITES.length;
        setVisited(next === 0 ? [0] : (v) => [...v, next]);
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, []);

  const current = SATELLITES[active];

  return (
    <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border">
        <ToolLogo src="recruitergtm.png" name="RecruiterGTM" size={18} />
        <p className="text-sm font-semibold text-foreground">A Claude ops manager, mid-shift</p>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-success">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-status-pulse" />
          running
        </span>
      </div>

      {/* Canvas */}
      <div className="relative h-[330px] md:h-[360px] bg-dot-grid">
        {/* Connectors */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {SATELLITES.map((sat, i) => (
            <line
              key={sat.id}
              x1={50}
              y1={50}
              x2={sat.x}
              y2={sat.y}
              vectorEffect="non-scaling-stroke"
              strokeWidth={i === active ? 2 : 1.2}
              className={
                i === active
                  ? 'stroke-primary animate-pulse'
                  : visited.includes(i)
                    ? 'stroke-primary/35'
                    : 'stroke-border'
              }
            />
          ))}
        </svg>

        {/* Center node */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-2xl bg-primary/15 animate-status-pulse" />
            <div className="relative w-16 h-16 rounded-2xl bg-card border-2 border-primary shadow-md flex items-center justify-center">
              <ToolLogo src="claude.png" name="Claude" size={34} />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-foreground bg-card/90 px-2 py-0.5 rounded-full border border-border">
            Claude Ops Manager
          </span>
        </div>

        {/* Satellites */}
        {SATELLITES.map((sat, i) => (
          <div
            key={sat.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            style={{ left: `${sat.x}%`, top: `${sat.y}%` }}
          >
            <div
              className={`relative w-11 h-11 rounded-xl bg-card border shadow-sm flex items-center justify-center transition-all duration-300 ${
                i === active ? 'border-primary scale-110 shadow-md' : 'border-border'
              }`}
            >
              <ToolLogo src={sat.logo} name={sat.label} size={22} />
              {visited.includes(i) && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-success text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-muted-foreground bg-card/90 px-1.5 py-0.5 rounded-full border border-border/70 whitespace-nowrap">
              {sat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Live action ticker */}
      <div className="px-5 py-3.5 border-t border-border bg-muted/40">
        <div key={active} className="flex items-center gap-2.5 animate-fade-up">
          <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
          <p className="text-sm text-foreground">{current.action}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
