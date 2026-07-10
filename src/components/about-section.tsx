import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { asset } from '@/lib/asset';
import { gmailCompose, EMAIL } from '@/lib/contact';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">The human</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">About me</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden border border-border shadow-card">
                <img
                  src={asset('daniyal.jpg')}
                  alt="Muhammad Daniyal Aziz, AI automation expert and GTM engineer"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                I'm Daniyal: a GTM engineer who thinks in systems. My job at RecruiterGTM is
                turning what a recruitment business does by hand into agent-run infrastructure:
                sourcing, outbound, content, reporting, and the ops in between.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I got here through the automation trenches: two years building lead intake,
                invoice processing, voice AI, and scraping systems for agencies across legal,
                property, e-commerce, and finance. Then agents changed what one operator could
                ship, and I went all in on Claude.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The rule I build by: a system is not done when the demo works. It's done when
                the client runs it without me in the room. That's why every workspace ships
                with guardrails, a guided tour, and a human approval gate on anything outbound.
              </p>

              {/* Facts */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Islamabad, Pakistan
                </span>
                <a
                  href={gmailCompose()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" /> {EMAIL}
                </a>
                <a href="tel:+923328675520" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary" /> +92 332 8675520
                </a>
                <a
                  href="https://www.linkedin.com/in/daniyal-aziz-643309246/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
                </a>
                <a
                  href="https://github.com/Daniyal1234-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4 text-primary" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
