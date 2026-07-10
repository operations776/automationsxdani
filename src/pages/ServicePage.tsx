import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, ChevronRight, AlertCircle } from 'lucide-react';
import { ServiceData, SERVICES } from '@/data/services';
import { POSTS } from '@/data/posts';
import { Seo, PERSON_SCHEMA, breadcrumbSchema, faqSchema, SITE_URL } from '@/lib/seo';
import { gmailCompose } from '@/lib/contact';

const stats = [
  { value: '20+', label: 'Claude agent workspaces shipped' },
  { value: '10+', label: 'ATS & CRM platforms integrated' },
  { value: '50+', label: 'Production automations in the wild' },
];

const ServicePage = ({ service }: { service: ServiceData }) => {
  const related = SERVICES.filter((s) => service.relatedSlugs.includes(s.slug));
  const posts = POSTS.filter((p) => service.blogSlugs.includes(p.slug));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.metaDescription,
    url: `${SITE_URL}/${service.slug}`,
    serviceType: service.navLabel,
    provider: { '@type': 'Person', name: 'Muhammad Daniyal Aziz', url: SITE_URL },
    areaServed: 'Worldwide',
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/${service.slug}`}
        jsonLd={[
          serviceSchema,
          faqSchema(service.faqs),
          breadcrumbSchema([
            ['Home', '/'],
            [service.navLabel, `/${service.slug}`],
          ]),
          PERSON_SCHEMA,
        ]}
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-dot-grid border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">{service.navLabel}</span>
              </nav>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{service.kicker}</p>
              <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight leading-[1.1] mb-5">
                {service.h1}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{service.sub}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="bg-primary hover:bg-primary-hover text-primary-foreground px-7 font-semibold">
                  <a href={gmailCompose(`${service.navLabel}: project inquiry`)} target="_blank" rel="noopener noreferrer">
                    <Mail className="mr-2 w-4 h-4" />
                    Work with me
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-border hover:border-primary hover:text-primary px-7">
                  <Link to="/work">
                    See live demos
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Signals */}
        <section className="py-14 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold font-heading tracking-tight mb-6">{service.signalsTitle}</h2>
              <ul className="space-y-3">
                {service.signals.map((signal, i) => (
                  <li key={i} className="flex gap-3 text-foreground/85 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-14 bg-muted/50 border-b border-border">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold font-heading tracking-tight mb-8">What I build for you</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.deliverables.map((d) => (
                <div key={d.title} className="rounded-xl bg-card border border-border shadow-sm p-5">
                  <h3 className="font-semibold text-foreground mb-1.5">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof + steps */}
        <section className="py-14 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold font-heading tracking-tight mb-6">Proof, not promises</h2>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl font-bold font-heading text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every demo on the{' '}
                  <Link to="/work" className="text-primary font-medium hover:text-primary-hover">
                    work page
                  </Link>{' '}
                  is a working miniature of something running in production right now.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading tracking-tight mb-6">How it works</h2>
                <ol className="space-y-4">
                  {service.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 bg-muted/50 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold font-heading tracking-tight mb-8">Questions people ask</h2>
              <div className="space-y-6">
                {service.faqs.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="font-semibold text-foreground mb-1.5">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-14">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-lg font-bold font-heading tracking-tight mb-4">Related services</h2>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/${r.slug}`} className="text-primary font-medium hover:text-primary-hover inline-flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                        {r.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading tracking-tight mb-4">From the blog</h2>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link to={`/blog/${post.slug}`} className="text-primary font-medium hover:text-primary-hover inline-flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-term-bg">
          <div className="container mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold font-heading tracking-tight text-white">
              Tell me what's still manual in your business.
            </h2>
            <Button size="lg" asChild className="bg-term-green text-term-bg hover:bg-term-green/85 font-semibold px-8">
              <a href={gmailCompose(`${service.navLabel}: project inquiry`)} target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 w-4 h-4" />
                Start the conversation
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
