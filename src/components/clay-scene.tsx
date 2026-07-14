import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';

/* The hero visual: three live workflows, and Daniyal (the Lego figure)
   hopping between them, fixing whatever is broken. Each stop repairs a
   failing node, the connections light up, and the flow starts running.
   This says what the job actually is, which the old floating-objects
   scene did not. */

interface Node {
  x: number;
  y: number;
  label: string;
}

interface Workflow {
  id: string;
  title: string;
  /* Where the Lego figure stands to work on this one. */
  standX: number;
  standY: number;
  nodes: Node[];
}

const WORKFLOWS: Workflow[] = [
  {
    id: 'intake',
    title: 'Lead intake',
    standX: 15,
    standY: 62,
    nodes: [
      { x: 6, y: 26, label: 'Form' },
      { x: 20, y: 26, label: 'Enrich' },
      { x: 13, y: 44, label: 'CRM' },
    ],
  },
  {
    id: 'finance',
    title: 'Invoice routing',
    standX: 48,
    standY: 62,
    nodes: [
      { x: 38, y: 22, label: 'Invoice' },
      { x: 52, y: 22, label: 'Read' },
      { x: 45, y: 40, label: 'GL code' },
      { x: 59, y: 40, label: 'Xero' },
    ],
  },
  {
    id: 'outbound',
    title: 'Outbound',
    standX: 82,
    standY: 62,
    nodes: [
      { x: 74, y: 26, label: 'Signal' },
      { x: 88, y: 26, label: 'Sequence' },
      { x: 81, y: 44, label: 'Reply' },
    ],
  },
];

/* Which workflow the figure is at, and which are already fixed. */
const STEP_MS = 2600;

const ClayScene = () => {
  const [active, setActive] = useState(0);
  const [fixed, setFixed] = useState<number[]>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) {
      setFixed([0, 1, 2]);
      return;
    }
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % WORKFLOWS.length;
        // Mark the one we are leaving as fixed. Reset once we loop.
        setFixed((f) => (next === 0 ? [] : [...new Set([...f, prev])]));
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, []);

  const wf = WORKFLOWS[active];

  return (
    <div className="relative w-full aspect-[4/3] max-h-[420px]" aria-hidden="true">
      <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="nodeOk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7fd6a0" />
            <stop offset="100%" stopColor="#4faf6e" />
          </linearGradient>
          <linearGradient id="nodeBroken" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9e3d6" />
            <stop offset="100%" stopColor="#d8d0be" />
          </linearGradient>
          <linearGradient id="nodeActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9a08d" />
            <stop offset="100%" stopColor="#e0553d" />
          </linearGradient>
        </defs>

        {WORKFLOWS.map((flow, wi) => {
          const isFixed = fixed.includes(wi);
          const isActive = wi === active;
          const stroke = isFixed ? '#4faf6e' : isActive ? '#e0553d' : '#cfc7b6';

          return (
            <g key={flow.id}>
              {/* connections between this workflow's nodes */}
              {flow.nodes.slice(0, -1).map((n, i) => {
                const next = flow.nodes[i + 1];
                return (
                  <line
                    key={i}
                    x1={n.x}
                    y1={n.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={stroke}
                    strokeWidth={0.5}
                    strokeLinecap="round"
                    className={isFixed ? 'animate-edge-flow' : ''}
                    opacity={isFixed || isActive ? 1 : 0.5}
                  />
                );
              })}
              {/* also close the loop to the last node for a fuller graph */}
              {flow.nodes.length > 2 && (
                <line
                  x1={flow.nodes[0].x}
                  y1={flow.nodes[0].y}
                  x2={flow.nodes[flow.nodes.length - 1].x}
                  y2={flow.nodes[flow.nodes.length - 1].y}
                  stroke={stroke}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  opacity={isFixed || isActive ? 0.8 : 0.35}
                />
              )}

              {/* nodes */}
              {flow.nodes.map((n, i) => (
                <g key={i}>
                  <rect
                    x={n.x - 4.6}
                    y={n.y - 2.6}
                    width={9.2}
                    height={5.2}
                    rx={1.8}
                    fill={isFixed ? 'url(#nodeOk)' : isActive ? 'url(#nodeActive)' : 'url(#nodeBroken)'}
                    stroke={isFixed ? '#3f9a5f' : isActive ? '#c9452e' : '#c4bbaa'}
                    strokeWidth={0.25}
                    className="transition-all duration-500"
                  />
                  <text
                    x={n.x}
                    y={n.y + 0.7}
                    textAnchor="middle"
                    fill={isFixed || isActive ? '#ffffff' : '#8d8474'}
                    style={{ font: 'bold 2px Nunito, sans-serif' }}
                    className="transition-all duration-500"
                  >
                    {n.label}
                  </text>
                  {/* broken marker */}
                  {!isFixed && !isActive && (
                    <circle cx={n.x + 4.2} cy={n.y - 2.2} r={0.9} fill="#e0553d" opacity={0.85} />
                  )}
                  {/* fixed tick */}
                  {isFixed && (
                    <circle cx={n.x + 4.2} cy={n.y - 2.2} r={0.9} fill="#2f8f5a" />
                  )}
                </g>
              ))}

              {/* workflow label */}
              <text
                x={flow.standX}
                y={flow.nodes[flow.nodes.length - 1].y + 7}
                textAnchor="middle"
                fill={isFixed ? '#3f9a5f' : isActive ? '#c9452e' : '#a79e8d'}
                style={{ font: 'bold 2.4px Nunito, sans-serif' }}
                className="transition-all duration-500"
              >
                {flow.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Daniyal, hopping between the workflows */}
      <div
        className="absolute transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          left: `${wf.standX}%`,
          top: `${wf.standY}%`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="relative animate-clay-float">
          <img
            src={asset('daniyal-lego.png')}
            alt=""
            className="w-[68px] md:w-[84px] h-auto drop-shadow-xl"
            loading="eager"
          />
          {/* working spark */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background animate-status-pulse" />
        </div>
        {/* shadow on the ground */}
        <span className="block mx-auto mt-1 w-10 h-1.5 rounded-full bg-foreground/15 blur-[2px]" />
      </div>
    </div>
  );
};

export default ClayScene;
