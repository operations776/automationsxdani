import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/data/services';
import { RESULTS } from '@/data/testimonials';

/* Home page teasers: enough to hook, with the depth living on
   dedicated pages. */

const CASES = [
  {
    id: 'dfy',
    title: 'An AI ops manager inside your business',
    line: 'A Claude agent that sources, sells, writes, and reports in your own stack. 20+ shipped.',
  },
  {
    id: 'reply-sync',
    title: 'Reply protection across email and LinkedIn',
    line: 'Someone replies on one channel, every other sequence stops in seconds.',
  },
  {
    id: 'pulse-tracker',
    title: 'Pulse Tracker: the client portal',
    line: 'Campaigns, delivery roadmaps, placements, approvals, and bookings in one login.',
  },
  {
    id: 'outbound-brain',
    title: 'An outbound brain agents actually use',
    line: 'Swipe file, angle bank, and playbook, so no campaign starts from a blank page.',
  },
];

const SERVICE_LINES: Record<string, string> = {
  'ai-automation-expert': 'Automate the busywork with AI that actually ships.',
  'gtm-engineer': 'Signal-based outbound and pipelines that fill themselves.',
  'ops-integrator': 'The tools you already pay for, finally talking to each other.',
  'claude-automation': 'Claude agents with skills, memory, and guardrails.',
};

const HomeTeasers = () => {
  return (
    <>
      {/* Case study teasers */}
      <section id="highlights" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">The work</p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                  Four systems doing real work
                </h2>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Explore the work page
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {CASES.map((c) => (
                <Link
                  key={c.id}
                  to={`/work#${c.id}`}
                  className="group rounded-2xl bg-card shadow-card p-6 hover-lift block"
                >
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.line}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    See it in action
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results teaser */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Results</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                What businesses actually got
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {RESULTS.slice(0, 3).map((result) => (
                <div key={result.headline} className="rounded-2xl bg-card shadow-card p-6 clay-lift">
                  <p className="text-4xl font-extrabold font-heading text-primary mb-2">{result.metric}</p>
                  <h3 className="font-bold text-foreground text-sm mb-2">{result.headline}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{result.detail}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild className="border-border hover:border-primary hover:text-primary">
              <Link to="/testimonials">
                See all results and testimonials
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Services</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                How I can help
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to={`/${service.slug}`}
                  className="group rounded-2xl bg-card shadow-card p-6 hover-lift block"
                >
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {service.navLabel}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{SERVICE_LINES[service.slug]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    Learn more
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeTeasers;
