import { ClayFunnel, ClayPencil, ClayMagnifier, ClayChart, ClaySwirl, ClayMailbox } from './clay-objects';

/* A soft clay landscape of floating molded objects, echoing Clay's
   hero. The hill blends into the page (no hard rectangle edge) and
   objects idle-float on their own offsets so the scene breathes. */

const ClayScene = () => {
  return (
    <div className="relative w-full h-full min-h-[340px]" aria-hidden="true">
      {/* Rolling hill, fading out at the sides and bottom so it melts
          into the page rather than ending in a box */}
      <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMax meet" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7bcf8f" />
            <stop offset="100%" stopColor="#57ba76" />
          </linearGradient>
          {/* soft edge mask: transparent at the sides and bottom */}
          <radialGradient id="hillFade" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="72%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hillMask">
            <rect width="600" height="380" fill="url(#hillFade)" />
          </mask>
        </defs>
        <g mask="url(#hillMask)">
          <path d="M0 250 C150 210 260 300 380 258 C480 224 560 262 600 250 V380 H0 Z" fill="url(#hill)" />
          <ellipse cx="300" cy="366" rx="70" ry="12" fill="#2f8f5a" opacity="0.28" />
        </g>
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
