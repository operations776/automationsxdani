import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Mail, ChevronRight, ArrowRight, ArrowDown } from 'lucide-react';
import { TESTIMONIALS, RESULTS } from '@/data/testimonials';
import { Seo, PERSON_SCHEMA, breadcrumbSchema } from '@/lib/seo';
import { useContactDialog } from '@/components/contact-dialog';
import RoamingPrompt from '@/components/roaming-prompt';
import VideoTestimonial from '@/components/video-testimonial';
import ToolLogo from '@/components/tool-logo';
import { asset } from '@/lib/asset';

/* Avatar mark. Deliberately abstract, not a fabricated face or a fake
   name, because these are real people whose identities are withheld. */
const TONES: Record<string, string> = {
  coral: 'bg-clay-coral/25 text-clay-coral',
  sky: 'bg-clay-sky/30 text-accent',
  mint: 'bg-clay-mint/30 text-success',
  butter: 'bg-clay-butter/40 text-clay-tangerine',
  grape: 'bg-clay-grape/25 text-clay-grape',
};

const TestimonialsPage = () => {
  const { open: openContact } = useContactDialog();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Testimonials | What People Said After Working With Daniyal Aziz"
        description="Real words from recruitment business owners who ran systems I built: a Claude build rescued from abandonment, a first-ever cold email reply after years of nothing, and booked calls that changed how they sell."
        path="/testimonials"
        jsonLd={[
          breadcrumbSchema([
            ['Home', '/'],
            ['Testimonials', '/testimonials'],
          ]),
          PERSON_SCHEMA,
        ]}
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-dot-grid border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">Testimonials</span>
              </nav>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">In their words</p>
              <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight mb-4">
                People were stuck. Then they weren't.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Real messages from business owners who ran the systems I built. Their words,
                not mine.
              </p>
            </div>
          </div>
        </section>

        {/* Featured: the video testimonial */}
        <section className="pt-16 pb-4">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <VideoTestimonial
                src="testimonials/salman-trilles.mp4"
                poster="testimonials/salman-trilles-poster.jpg"
                captions="testimonials/salman-trilles.vtt"
                name="Salman Ahmad"
                title="Co-Founder"
                company="Trilles AI"
                companyLogo="trillesai.jpeg"
                companyUrl="https://www.trillesai.com"
                pullQuote="Daniyal isn't just about building code. I see the systems thinking, the system design thinking in him. I'd highly recommend him for any AI build."
              />
            </div>
          </div>
        </section>

        {/* The LinkedIn recommendation, shown as the real thing */}
        <section className="pt-6 pb-4">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl bg-card shadow-card p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <ToolLogo src="linkedin.png" name="LinkedIn" size={18} />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    LinkedIn recommendation
                  </span>
                  <a
                    href="https://www.linkedin.com/in/daniyal-aziz-643309246/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs font-bold text-primary hover:text-primary-hover"
                  >
                    Verify on LinkedIn
                  </a>
                </div>
                <img
                  src={asset('testimonials/mubashir-linkedin.png')}
                  alt="LinkedIn recommendation from Mubashir Hamad, Co-founder at Xcorre, who managed Daniyal directly"
                  className="w-full h-auto rounded-xl border border-border"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The written quotes */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.attribution + t.quote.slice(0, 20)}
                  className="rounded-3xl bg-card shadow-card p-7 clay-lift flex flex-col"
                >
                  {/* The emotional turn, only for the stuck-then-unstuck stories */}
                  {t.before && t.after && (
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-5 text-[11px] font-bold">
                      <span className="text-muted-foreground line-through decoration-muted-foreground/40">
                        {t.before}
                      </span>
                      <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-primary">{t.after}</span>
                    </div>
                  )}

                  <blockquote className="text-lg md:text-xl font-heading font-semibold text-foreground leading-snug mb-6 flex-1">
                    "{t.quote}"
                  </blockquote>

                  <figcaption className="flex items-center gap-3">
                    {t.name ? (
                      <span className="w-11 h-11 rounded-xl border border-border bg-card shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                        <ToolLogo src={t.companyLogo} name={t.company ?? t.name} size={28} />
                      </span>
                    ) : (
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-sm shrink-0 ${
                          TONES[t.tone] ?? TONES.coral
                        }`}
                        aria-hidden="true"
                      >
                        {t.attribution.charAt(0)}
                      </span>
                    )}
                    {t.name ? (
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-foreground leading-tight">{t.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {t.title}, {t.company}
                        </span>
                        {t.source && (
                          <span className="block text-[10px] text-muted-foreground/80 mt-0.5">{t.source}</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-muted-foreground">{t.attribution}</span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Quiet proof strip, demoted below the human stuff */}
        <section className="py-16 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <ArrowDown className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-primary">
                  And what actually changed
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RESULTS.map((result) => (
                  <div key={result.headline} className="rounded-2xl bg-card shadow-sm p-5">
                    <p className="text-2xl font-extrabold font-heading text-primary mb-1.5">{result.metric}</p>
                    <h3 className="font-bold text-foreground text-sm mb-1.5">{result.headline}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{result.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-term-bg">
          <div className="container mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold font-heading tracking-tight text-white">
              Stuck on something? That is usually where I come in.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => openContact('testimonials')}
                className="bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-8"
              >
                <Mail className="mr-2 w-4 h-4" />
                Tell me what is broken
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-term-border bg-transparent text-term-text hover:bg-term-surface hover:text-white px-8"
              >
                <Link to="/work">
                  See the systems
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <RoamingPrompt
        id="testimonials-result"
        text="Want a result like these? Tell me about your business and I'll show you what's realistic."
        trigger="inview"
      />

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
