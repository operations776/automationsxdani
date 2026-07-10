import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, ShieldCheck } from 'lucide-react';

/* Animated flow: a reply lands on email, the person is matched,
   and their LinkedIn sequences stop. Steps advance on a timer. */

interface LogLine {
  text: string;
  tone: 'dim' | 'text' | 'ok' | 'warn';
}

const STEP_LOGS: LogLine[] = [
  { text: 'A lead replies to the email campaign', tone: 'text' },
  { text: 'The system matches the person, not the campaign', tone: 'dim' },
  { text: 'Same person found in 2 running LinkedIn campaigns', tone: 'warn' },
  { text: 'Both LinkedIn sequences stopped instantly', tone: 'ok' },
  { text: 'The win lands in Slack for the team to pick up', tone: 'ok' },
  { text: 'One person, two channels, zero double-touches', tone: 'text' },
];

const TOTAL_STEPS = STEP_LOGS.length;
const STEP_MS = 850;

const toneClass: Record<LogLine['tone'], string> = {
  dim: 'text-term-dim',
  text: 'text-term-text',
  ok: 'text-term-green',
  warn: 'text-term-amber',
};

/* step thresholds: which step activates each node / edge */
const NODES = [
  { id: 'reply', x: 8, y: 92, w: 148, h: 64, title: 'Reply lands', sub: 'email campaign', activeAt: 0 },
  { id: 'match', x: 240, y: 92, w: 160, h: 64, title: 'Person match', sub: 'same human, all channels', activeAt: 2 },
  { id: 'stop', x: 478, y: 12, w: 156, h: 64, title: 'LinkedIn', sub: 'sequences stopped', activeAt: 3 },
  { id: 'slack', x: 478, y: 172, w: 156, h: 64, title: 'Slack', sub: 'win posted to the team', activeAt: 4 },
];

const EDGES = [
  { id: 'e1', d: 'M 156 124 L 240 124', activeAt: 1 },
  { id: 'e2', d: 'M 400 112 C 440 96, 450 60, 478 48', activeAt: 3 },
  { id: 'e3', d: 'M 400 136 C 440 152, 450 188, 478 200', activeAt: 4 },
];

const ReplySyncDiagram = () => {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const run = () => {
    stop();
    setStep(0);
    setPlaying(true);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStep(TOTAL_STEPS - 1);
      setPlaying(false);
      return;
    }
    timerRef.current = setInterval(() => {
      setStep((prev) => {
        if (prev >= TOTAL_STEPS - 1) {
          stop();
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_MS);
  };

  useEffect(() => stop, []);

  const done = step >= TOTAL_STEPS - 1;

  return (
    <div className="rounded-xl bg-term-bg border border-term-border shadow-island overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 bg-term-surface border-b border-term-border">
        <ShieldCheck className="w-4 h-4 text-term-green" />
        <p className="text-sm font-semibold text-term-text">Watch the system react to a reply</p>
        <button
          type="button"
          onClick={run}
          disabled={playing}
          className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-term-green text-term-bg hover:bg-term-green/85 transition-colors disabled:opacity-50"
        >
          {step === -1 ? <Play className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
          {step === -1 ? 'Run the flow' : playing ? 'Running...' : 'Replay'}
        </button>
      </div>

      {/* Diagram */}
      <div className="px-2 pt-2">
        <svg viewBox="0 0 648 248" className="w-full h-auto" role="img" aria-label="Reply protection flow diagram">
          {EDGES.map((edge) => {
            const active = step >= edge.activeAt;
            return (
              <path
                key={edge.id}
                d={edge.d}
                fill="none"
                strokeWidth={1.5}
                className={
                  active
                    ? 'stroke-term-green animate-edge-flow'
                    : 'stroke-term-border'
                }
              />
            );
          })}
          {NODES.map((node) => {
            const active = step >= node.activeAt;
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={10}
                  className={`transition-all duration-300 ${
                    active ? 'fill-term-surface stroke-term-green' : 'fill-term-surface/40 stroke-term-border'
                  }`}
                  strokeWidth={1.2}
                />
                <text
                  x={node.x + 14}
                  y={node.y + 28}
                  className={`text-[14px] font-semibold ${active ? 'fill-term-text' : 'fill-term-dim'}`}
                >
                  {node.title}
                </text>
                <text
                  x={node.x + 14}
                  y={node.y + 47}
                  className={`text-[11px] ${active ? 'fill-term-green' : 'fill-term-dim'}`}
                >
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Narration */}
      <div className="px-5 pb-4 pt-1 space-y-1.5 min-h-[136px] text-sm">
        {step === -1 ? (
          <p className="text-term-dim leading-relaxed">
            The problem: the same lead runs in email and LinkedIn campaigns at once. When they
            reply on one channel, the other keeps messaging them. Hit run and watch what
            happens instead.
          </p>
        ) : (
          STEP_LOGS.slice(0, step + 1).map((line, i) => (
            <div key={i} className={`flex items-center gap-2.5 ${toneClass[line.tone]}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === step ? 'bg-term-green' : 'bg-term-border'}`} />
              {line.text}
            </div>
          ))
        )}
        {done && (
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-term-bg bg-term-green px-2.5 py-1 rounded-full font-semibold">
              <ShieldCheck className="w-3 h-3" />
              lead protected
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplySyncDiagram;
