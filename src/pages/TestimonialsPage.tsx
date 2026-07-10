import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Mail, ChevronRight, Quote, ArrowRight, Users } from 'lucide-react';
import { TESTIMONIALS, RESULTS } from '@/data/testimonials';
import { Seo, PERSON_SCHEMA, breadcrumbSchema } from '@/lib/seo';
import { useContactDialog } from '@/components/contact-dialog';

const TestimonialsPage = () => {
  const { open: openContact } = useContactDialog();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Results & Testimonials | Daniyal Aziz, AI Automation & GTM"
        description="What businesses actually got: 20+ Claude AI ops managers shipped, onboarding cut from a week to same-day, 70%+ open rates on signal-based outbound, and zero double-touched leads."
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

      <main className="pt-24 pb-0">
        {/* Hero */}
        <section className="py-16 bg-dot-grid border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">Testimonials</span>
              </nav>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Proof</p>
              <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight mb-4">
                Results businesses actually got
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Numbers first, adjectives never. Everything below comes from systems that are
                running in production right now.
              </p>
            </div>
          </div>
        </section>

        {/* Results grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {RESULTS.map((result) => (
                <div key={result.headline} className="rounded-xl bg-card border border-border shadow-card p-6">
                  <p className="text-3xl font-bold font-heading text-primary mb-2">{result.metric}</p>
                  <h2 className="font-semibold text-foreground text-sm mb-2">{result.headline}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">{result.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quotes, rendered only when real ones exist */}
        {TESTIMONIALS.length > 0 && (
          <section className="py-16 bg-muted/50 border-y border-border">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold font-heading tracking-tight">In their words</h2>
                {TESTIMONIALS.map((t) => (
                  <figure key={t.name} className="rounded-xl bg-card border border-border shadow-sm p-6">
                    <Quote className="w-5 h-5 text-primary mb-3" />
                    <blockquote className="text-foreground/90 leading-relaxed mb-4">{t.quote}</blockquote>
                    <figcaption className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{t.name}</span> · {t.role}, {t.company}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Community proof */}
        <section className="py-16 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="mx-auto w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-bold font-heading tracking-tight">
                Delivering inside a community of 60+ agency owners
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                I build the done-for-you Claude and GTM systems inside RecruiterGTM, a private
                community of recruitment agency owners. The demos on the{' '}
                <Link to="/work" className="text-primary font-medium hover:text-primary-hover">work page</Link>{' '}
                are miniatures of what those businesses run every day.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-term-bg">
          <div className="container mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold font-heading tracking-tight text-white">
              Want a result like these on this page?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => openContact('testimonials')} className="bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-8">
                <Mail className="mr-2 w-4 h-4" />
                Work with me
              </Button>
              <Button size="lg" variant="outline" asChild className="border-term-border bg-transparent text-term-text hover:bg-term-surface hover:text-white px-8">
                <Link to="/work">
                  See the systems
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
