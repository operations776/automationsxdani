/* Handcrafted claymation objects in SVG. Each is modeled in the soft
   plasticine style: rounded forms, radial-gradient shading for the
   "molded" look, and a soft contact shadow. Swap for photoreal renders
   later by dropping PNGs in public/ and pointing <img> at them. */

interface ClayProps {
  className?: string;
  size?: number;
}

const shade = (id: string, light: string, mid: string, dark: string) => (
  <radialGradient id={id} cx="35%" cy="28%" r="80%">
    <stop offset="0%" stopColor={light} />
    <stop offset="55%" stopColor={mid} />
    <stop offset="100%" stopColor={dark} />
  </radialGradient>
);

const Contact = () => (
  <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000" opacity="0.10" />
);

/* Funnel full of colorful blocks: the "collect data" object */
export const ClayFunnel = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      {shade('fn', '#8fd4ef', '#5cb7e0', '#2f8fc0')}
      {shade('bk1', '#ff8a7a', '#f4674f', '#d8442c')}
      {shade('bk2', '#ffd36b', '#f6b73f', '#e0961a')}
      {shade('bk3', '#8fe0b0', '#5cc98a', '#33a566')}
      {shade('bk4', '#b7a0f0', '#9578e0', '#6f52c0')}
    </defs>
    <Contact />
    <rect x="40" y="14" width="15" height="15" rx="4" fill="url(#bk1)" transform="rotate(-12 47 21)" />
    <rect x="58" y="10" width="14" height="14" rx="4" fill="url(#bk2)" transform="rotate(10 65 17)" />
    <rect x="70" y="18" width="12" height="12" rx="4" fill="url(#bk4)" transform="rotate(-6 76 24)" />
    <circle cx="55" cy="24" r="6" fill="url(#bk3)" />
    <path d="M28 34 H92 L68 66 V92 A8 8 0 0 1 52 92 V66 Z" fill="url(#fn)" stroke="#2f8fc0" strokeWidth="1.5" />
    <ellipse cx="60" cy="34" rx="32" ry="8" fill="#a5ddf2" />
  </svg>
);

/* Pencil on a stand: the "content / write" object */
export const ClayPencil = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      {shade('pc', '#8fd4ef', '#5cb7e0', '#2f8fc0')}
      {shade('pcw', '#ffe6a3', '#f6cd6b', '#e0a83a')}
      {shade('stand', '#8fe0b0', '#5cc98a', '#33a566')}
    </defs>
    <Contact />
    <rect x="30" y="80" width="60" height="10" rx="5" fill="url(#stand)" />
    <rect x="38" y="60" width="8" height="26" rx="4" fill="url(#stand)" />
    <rect x="74" y="60" width="8" height="26" rx="4" fill="url(#stand)" />
    <g transform="rotate(-14 60 50)">
      <rect x="52" y="12" width="16" height="60" rx="8" fill="url(#pc)" />
      <path d="M52 66 H68 L60 84 Z" fill="url(#pcw)" />
      <path d="M56 78 L60 84 L64 78 Z" fill="#3a2a1a" />
      <rect x="52" y="20" width="16" height="6" fill="#ff8a7a" opacity="0.85" />
    </g>
  </svg>
);

/* Mailbox: the "outbound / email" object */
export const ClayMailbox = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      {shade('mb', '#8fd4ef', '#5cb7e0', '#2f8fc0')}
      {shade('flag', '#ff8a7a', '#f4674f', '#d8442c')}
    </defs>
    <Contact />
    <rect x="54" y="66" width="8" height="40" rx="4" fill="#8a6d52" />
    <path d="M34 60 A26 22 0 0 1 86 60 V96 H34 Z" fill="url(#mb)" />
    <rect x="34" y="72" width="52" height="24" fill="#3f9dcb" opacity="0.5" />
    <rect x="40" y="60" width="30" height="20" rx="6" fill="#bfe8f7" />
    <rect x="84" y="46" width="6" height="22" rx="3" fill="url(#flag)" />
    <rect x="86" y="46" width="12" height="10" rx="3" fill="url(#flag)" />
  </svg>
);

/* Magnifying glass on a seesaw: the "find / research" object */
export const ClayMagnifier = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      {shade('mag', '#8fe0b0', '#5cc98a', '#33a566')}
      {shade('glass', '#d5f0fb', '#a5ddf2', '#6cbfe4')}
    </defs>
    <Contact />
    <circle cx="54" cy="48" r="26" fill="url(#mag)" />
    <circle cx="54" cy="48" r="17" fill="url(#glass)" stroke="#fff" strokeWidth="3" opacity="0.95" />
    <ellipse cx="48" cy="42" rx="6" ry="4" fill="#fff" opacity="0.7" />
    <rect x="70" y="64" width="30" height="12" rx="6" fill="url(#mag)" transform="rotate(38 85 70)" />
  </svg>
);

/* Bar chart with a ball: the "grow revenue" object */
export const ClayChart = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      {shade('c1', '#ffd36b', '#f6b73f', '#e0961a')}
      {shade('c2', '#ffb36b', '#f6923f', '#e06a1a')}
      {shade('c3', '#ff8a7a', '#f4674f', '#d8442c')}
      {shade('ball', '#ff8a7a', '#f4674f', '#d8442c')}
    </defs>
    <Contact />
    <rect x="30" y="70" width="18" height="34" rx="7" fill="url(#c1)" />
    <rect x="52" y="52" width="18" height="52" rx="7" fill="url(#c2)" />
    <rect x="74" y="34" width="18" height="70" rx="7" fill="url(#c3)" />
    <circle cx="83" cy="24" r="9" fill="url(#ball)" />
  </svg>
);

/* Curly horn / swirl: the "launch GTM plays" object (Clay's motif) */
export const ClaySwirl = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      <linearGradient id="sw" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8fd4ef" />
        <stop offset="100%" stopColor="#2f8fc0" />
      </linearGradient>
    </defs>
    <Contact />
    <path
      d="M22 92 C22 60 46 40 66 44 C84 48 84 72 68 74 C56 75 56 60 66 60"
      fill="none"
      stroke="url(#sw)"
      strokeWidth="15"
      strokeLinecap="round"
    />
    <path d="M18 86 L34 78 L30 96 Z" fill="#2f8fc0" />
  </svg>
);

/* Pinwheel: a soft "automation spins" accent */
export const ClayPinwheel = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>
      {shade('pw1', '#8fe0b0', '#5cc98a', '#33a566')}
      {shade('pw2', '#8fd4ef', '#5cb7e0', '#2f8fc0')}
    </defs>
    <Contact />
    <rect x="57" y="52" width="6" height="52" rx="3" fill="#8a6d52" />
    <g transform="translate(60 46)">
      <path d="M0 0 L0 -30 A30 30 0 0 1 26 -15 Z" fill="url(#pw1)" />
      <path d="M0 0 L26 15 A30 30 0 0 1 -4 30 Z" fill="url(#pw2)" />
      <path d="M0 0 L-26 15 A30 30 0 0 1 -26 -15 Z" fill="url(#pw1)" />
      <circle cx="0" cy="0" r="6" fill="#ffd36b" />
    </g>
  </svg>
);

/* Small round bot blob: friendly agent avatar */
export const ClayBot = ({ className = '', size = 120 }: ClayProps) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
    <defs>{shade('bot', '#b7a0f0', '#9578e0', '#6f52c0')}</defs>
    <Contact />
    <rect x="34" y="30" width="52" height="46" rx="20" fill="url(#bot)" />
    <circle cx="50" cy="52" r="6" fill="#fff" />
    <circle cx="70" cy="52" r="6" fill="#fff" />
    <circle cx="50" cy="53" r="3" fill="#2a2140" />
    <circle cx="70" cy="53" r="3" fill="#2a2140" />
    <rect x="57" y="18" width="6" height="12" rx="3" fill="#9578e0" />
    <circle cx="60" cy="16" r="5" fill="#ffd36b" />
    <rect x="52" y="64" width="16" height="5" rx="2.5" fill="#fff" opacity="0.7" />
  </svg>
);
