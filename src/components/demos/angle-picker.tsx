import { useState } from 'react';
import { Copy, Check, Lightbulb } from 'lucide-react';

/* Miniature of the outbound brain: pick an ICP, get the angle,
   the opener, and the follow-up the way the real system assembles them. */

interface Angle {
  icp: string;
  signal: string;
  angle: string;
  opener: string;
  followup: string;
}

const ANGLES: Angle[] = [
  {
    icp: 'Series A SaaS founders',
    signal: 'Raised in the last 30 days, 3+ open GTM roles',
    angle: 'The hiring math behind the raise',
    opener:
      'Congrats on the round. Most Series A teams burn the first 90 days learning what their first 10 GTM hires should have been. That window is exactly where the right recruiter pays for itself.',
    followup: 'Bump with one number: time-to-first-hire for the last founder who ran this play.',
  },
  {
    icp: 'PE-backed field services',
    signal: 'Acquisition announced, integration hiring starts in 60 to 90 days',
    angle: 'The post-acquisition talent crunch',
    opener:
      'Saw the acquisition news. The next two quarters usually decide whether the platform thesis works, and it almost always comes down to ops leadership hires nobody has started sourcing yet.',
    followup: 'Case-study bump: how a portfolio company filled 3 ops manager seats in 6 weeks.',
  },
  {
    icp: 'Finance & accounting leaders',
    signal: 'Controller or FP&A role posted 45+ days and still open',
    angle: 'The 45-day-old job post',
    opener:
      'Your controller search has been live for six weeks, which usually means the applicant pool is the problem, not your process. We source the passives your ads never reach.',
    followup: 'Bump with the passive-vs-applicant fill-rate stat.',
  },
];

const AnglePicker = () => {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = ANGLES[active];

  const copy = async () => {
    const text = `Signal: ${current.signal}\nAngle: ${current.angle}\n\nOpener:\n${current.opener}\n\nFollow-up:\n${current.followup}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked, no-op */
    }
  };

  return (
    <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">Outbound brain</p>
          <p className="text-xs text-muted-foreground">Pick an ICP, get the angle</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* ICP chips */}
        <div className="flex flex-wrap gap-2">
          {ANGLES.map((angle, i) => (
            <button
              key={angle.icp}
              type="button"
              onClick={() => {
                setActive(i);
                setCopied(false);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                i === active
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {angle.icp}
            </button>
          ))}
        </div>

        {/* Assembled angle */}
        <div key={active} className="rounded-lg border border-border divide-y divide-border animate-fade-up">
          <div className="px-4 py-3 grid grid-cols-[84px_1fr] gap-3 text-sm">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground pt-0.5">Signal</span>
            <span className="text-foreground">{current.signal}</span>
          </div>
          <div className="px-4 py-3 grid grid-cols-[84px_1fr] gap-3 text-sm">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground pt-0.5">Angle</span>
            <span className="text-foreground font-medium">{current.angle}</span>
          </div>
          <div className="px-4 py-3 grid grid-cols-[84px_1fr] gap-3 text-sm">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground pt-0.5">Opener</span>
            <span className="text-muted-foreground leading-relaxed">{current.opener}</span>
          </div>
          <div className="px-4 py-3 grid grid-cols-[84px_1fr] gap-3 text-sm">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground pt-0.5">Follow-up</span>
            <span className="text-muted-foreground">{current.followup}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            Drawn from a curated swipe file + angle bank the agents reference on every campaign.
          </p>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-md text-xs font-medium border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnglePicker;
