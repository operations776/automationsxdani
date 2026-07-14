import { useState } from 'react';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { asset } from '@/lib/asset';

interface LoomVideo {
  id: string;
  loomId: string;
  thumb: string;
  title: string;
  description: string;
  duration: string;
}

const VIDEOS: LoomVideo[] = [
  {
    id: 'klaviyo',
    loomId: '6604ba9400ac48d2aaec60f93e4ca8fe',
    thumb: 'looms/klaviyo.jpg',
    title: 'Attendee upload to Klaviyo',
    description: 'Event attendees land in the newsletter list automatically. No CSV wrangling, no copy-paste.',
    duration: '1 min',
  },
  {
    id: 'weekly-call',
    loomId: '4abc57ffd9c84ea4b1ca7ae924e6059f',
    thumb: 'looms/weekly-call.jpg',
    title: 'Automated weekly call outreach',
    description: 'Calendar bookings flow into the CRM and kick off their own outreach, hands-free.',
    duration: '1 min',
  },
  {
    id: 'pinterest-telegram',
    loomId: '748702a04772465b9428dad1451fb5bf',
    thumb: 'looms/pinterest-telegram.jpg',
    title: 'Pinterest & Telegram posting',
    description: 'An AI content engine that writes, schedules, and posts across channels on autopilot.',
    duration: '2 min',
  },
];

const LoomSection = () => {
  const [active, setActive] = useState<LoomVideo | null>(null);

  return (
    <section id="videos" className="py-24 bg-muted/50 border-b border-border">
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
              <button
                key={video.id}
                type="button"
                onClick={() => setActive(video)}
                className="group text-left rounded-2xl bg-card shadow-card overflow-hidden hover-lift block focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={asset(video.thumb)}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
                  <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-foreground/80 text-background px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{video.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{video.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* In-app video player */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {active && (
            <>
              <DialogHeader className="px-5 pt-5 pb-3">
                <DialogTitle className="font-heading text-lg text-left">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="relative w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  title={active.title}
                  src={`https://www.loom.com/embed/${active.loomId}?autoplay=1&hideEmbedTopBar=true`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <p className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">{active.description}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LoomSection;
