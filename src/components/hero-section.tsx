import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import HeroVisual from './hero-visual';
import ToolLogo from './tool-logo';
import { gmailCompose } from '@/lib/contact';

const stats = [
  { value: '20+', label: 'Claude agent workspaces shipped' },
  { value: '10+', label: 'ATS & CRM platforms integrated' },
  { value: '50+', label: 'Production automations in the wild' },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-dot-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: the pitch */}
          <div className="space-y-8 animate-fade-up">
            <a
              href="https://www.recruitergtm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <ToolLogo src="recruitergtm.png" name="RecruiterGTM" size={16} />
              Building at RecruiterGTM
              <span className="w-2 h-2 rounded-full bg-success animate-status-pulse" />
            </a>

            <div className="space-y-5">
              <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Muhammad Daniyal Aziz
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.05] tracking-tight text-foreground">
                I build Claude-powered GTM systems that do real revenue work.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                GTM Engineer and AI Automation Specialist at RecruiterGTM. If your business
                runs on manual ops, I turn them into agent-run infrastructure: AI ops
                managers, outbound engines, onboarding automations, and the operations layer
                that keeps it all running.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="group bg-primary hover:bg-primary-hover text-primary-foreground px-7 font-semibold"
              >
                <Link to="/work">
                  See the systems
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-border hover:border-primary hover:text-primary px-7">
                <a href={gmailCompose('Work with Daniyal')} target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 w-4 h-4" />
                  Work with me
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border max-w-xl">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold font-heading text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the system at work */}
          <div className="animate-fade-up lg:pl-4" style={{ animationDelay: '120ms' }}>
            <HeroVisual />
            <p className="text-xs text-muted-foreground mt-3 text-center">
              This is what one client's Claude ops manager does on an ordinary morning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
