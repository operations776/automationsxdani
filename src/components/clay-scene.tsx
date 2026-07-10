import { ClayFunnel, ClayPencil, ClayMagnifier, ClayChart, ClaySwirl, ClayMailbox } from './clay-objects';

/* A soft clay landscape of floating molded objects, echoing Clay's
   hero. Objects idle-float on their own offsets so the scene breathes. */

const ClayScene = () => {
  return (
    <div className="relative w-full h-full min-h-[300px]" aria-hidden="true">
      {/* Rolling hill */}
      <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7bcf8f" />
            <stop offset="100%" stopColor="#4faf6e" />
          </linearGradient>
        </defs>
        <path d="M0 250 C150 210 260 300 380 258 C480 224 560 262 600 250 V360 H0 Z" fill="url(#hill)" />
        <ellipse cx="300" cy="352" rx="60" ry="10" fill="#2f8f5a" opacity="0.4" />
      </svg>

      {/* Floating objects */}
      <div className="absolute left-[4%] top-[30%] animate-clay-float" style={{ ['--tilt' as string]: '-4deg' }}>
        <ClayPencil size={104} />
      </div>
      <div className="absolute left-[36%] top-[4%] animate-clay-float" style={{ animationDelay: '0.6s' }}>
        <ClayFunnel size={128} />
      </div>
      <div className="absolute left-[28%] top-[46%] animate-clay-float" style={{ animationDelay: '1.1s' }}>
        <ClayMailbox size={96} />
      </div>
      <div className="absolute left-[50%] top-[40%] animate-clay-float" style={{ animationDelay: '0.3s', ['--tilt' as string]: '3deg' }}>
        <ClayMagnifier size={112} />
      </div>
      <div className="absolute right-[16%] top-[8%] animate-clay-float" style={{ animationDelay: '1.4s' }}>
        <ClaySwirl size={116} />
      </div>
      <div className="absolute right-[3%] top-[38%] animate-clay-float" style={{ animationDelay: '0.9s' }}>
        <ClayChart size={120} />
      </div>
    </div>
  );
};

export default ClayScene;
