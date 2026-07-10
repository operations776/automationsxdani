import { asset } from '@/lib/asset';

interface ToolLogoProps {
  /* file name inside public/logos/, e.g. "clay.png". Omit for a monogram fallback. */
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

/* Renders a tool/company logo, falling back to a letter monogram
   when no logo file exists for it. */
const ToolLogo = ({ src, name, size = 20, className = '' }: ToolLogoProps) => {
  if (src) {
    return (
      <img
        src={asset(`logos/${src}`)}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        className={`rounded-[4px] object-contain shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[4px] bg-primary/10 text-primary font-semibold shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.5) }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
};

export default ToolLogo;
