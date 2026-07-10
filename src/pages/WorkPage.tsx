import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/footer';
import CaseStudiesSection from '@/components/case-studies-section';
import LoomSection from '@/components/loom-section';
import EngagementsSection from '@/components/engagements-section';
import ArchiveSection from '@/components/archive-section';
import { Button } from '@/components/ui/button';
import { Mail, ChevronRight } from 'lucide-react';
import { Seo, PERSON_SCHEMA, breadcrumbSchema } from '@/lib/seo';
import { useContactDialog } from '@/components/contact-dialog';

const WorkPage = () => {
  const { open: openContact } = useContactDialog();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Work: Claude Automation, GTM Systems & Products | Daniyal Aziz"
        description="Interactive case studies of real systems: Claude AI ops managers, cross-channel reply protection, the Pulse Tracker client portal, and the outbound brain. Plus recorded build walkthroughs."
        path="/work"
        jsonLd={[
          breadcrumbSchema([
            ['Home', '/'],
            ['Work', '/work'],
          ]),
          PERSON_SCHEMA,
        ]}
      />
      <Navigation />

      <main className="pt-24">
        {/* Page hero */}
        <section className="py-16 bg-dot-grid border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">Work</span>
              </nav>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Case studies</p>
              <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight mb-4">
                Systems doing real work right now
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AI ops managers, outbound infrastructure, and client-facing products, all shipped
                and running, anonymised where it needs to be. Yours would look like this.
              </p>
            </div>
          </div>
        </section>

        <CaseStudiesSection showHeader={false} />
        <LoomSection />
        <EngagementsSection />
        <ArchiveSection />

        {/* CTA */}
        <section className="py-16 bg-term-bg">
          <div className="container mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold font-heading tracking-tight text-white">
              Want one of these running in your business?
            </h2>
            <Button size="lg" onClick={() => openContact('work-page')} className="bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-8">
              <Mail className="mr-2 w-4 h-4" />
              Work with me
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WorkPage;
