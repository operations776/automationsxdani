import { Play, ExternalLink } from 'lucide-react';
import { asset } from '@/lib/asset';

interface LoomVideo {
  id: string;
  thumb: string;
  title: string;
  description: string;
  duration: string;
  url: string;
}

const VIDEOS: LoomVideo[] = [
  {
    id: 'klaviyo',
    thumb: 'looms/klaviyo.jpg',
    title: 'Attendee upload to Klaviyo',
    description: 'Event attendees land in the newsletter list automatically. No CSV wrangling, no copy-paste.',
    duration: '1 min',
    url: 'https://www.loom.com/share/6604ba9400ac48d2aaec60f93e4ca8fe',
  },
  {
    id: 'weekly-call',
    thumb: 'looms/weekly-call.jpg',
    title: 'Automated weekly call outreach',
    description: 'Calendar bookings flow into the CRM and kick off their own outreach, hands-free.',
    duration: '1 min',
    url: 'https://www.loom.com/share/4abc57ffd9c84ea4b1ca7ae924e6059f',
  },
  {
    id: 'pinterest-telegram',
    thumb: 'looms/pinterest-telegram.jpg',
    title: 'Pinterest & Telegram posting',
    description: 'An AI content engine that writes, schedules, and posts across channels on autopilot.',
    duration: '2 min',
    url: 'https://www.loom.com/share/748702a04772465b9428dad1451fb5bf',
  },
];

const LoomSection = () => {
  return (
    <section id="videos" className="py-24 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Recorded walkthroughs</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">
              Watch a few builds, narrated
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Three real automations with me talking through what they do and why.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {VIDEOS.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-card border border-border shadow-card overflow-hidden hover-lift block"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={asset(video.thumb)}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
                  <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-card/95 shadow-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] font-semibold bg-foreground/80 text-background px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    {video.title}
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{video.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoomSection;
