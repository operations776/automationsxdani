import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { asset } from '@/lib/asset';
import ToolLogo from './tool-logo';

/* A featured video testimonial. Plays inline with sound on click, and
   captions are on by default so a muted viewer can still read it. */

interface VideoTestimonialProps {
  src: string;
  poster: string;
  captions?: string;
  name: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  pullQuote: string;
}

const VideoTestimonial = ({
  src,
  poster,
  captions,
  name,
  title,
  company,
  companyLogo,
  companyUrl,
  pullQuote,
}: VideoTestimonialProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  return (
    <div className="rounded-3xl bg-card shadow-card overflow-hidden grid lg:grid-cols-[1.4fr_1fr]">
      {/* Video */}
      <div className="relative bg-term-bg aspect-video lg:aspect-auto">
        <video
          ref={videoRef}
          src={asset(src)}
          poster={asset(poster)}
          controls={playing}
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        >
          {captions && (
            <track kind="captions" srcLang="en" label="English" src={asset(captions)} default />
          )}
        </video>

        {!playing && (
          <button
            type="button"
            onClick={play}
            aria-label={`Play ${name}'s testimonial`}
            className="absolute inset-0 flex items-center justify-center bg-foreground/10 hover:bg-foreground/5 transition-colors group"
          >
            <span className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      {/* Attribution + pull quote */}
      <div className="p-7 md:p-9 flex flex-col justify-center">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-primary mb-4">
          Video testimonial
        </p>
        <blockquote className="text-xl md:text-2xl font-heading font-semibold text-foreground leading-snug mb-6">
          "{pullQuote}"
        </blockquote>
        <figcaption className="flex items-center gap-3">
          {companyLogo && (
            <span className="w-11 h-11 rounded-xl border border-border bg-card shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              <ToolLogo src={companyLogo} name={company} size={28} />
            </span>
          )}
          <span className="min-w-0">
            <span className="block font-bold text-foreground leading-tight">{name}</span>
            <span className="block text-sm text-muted-foreground">
              {title},{' '}
              {companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover font-semibold"
                >
                  {company}
                </a>
              ) : (
                company
              )}
            </span>
          </span>
        </figcaption>
      </div>
    </div>
  );
};

export default VideoTestimonial;
