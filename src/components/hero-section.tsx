import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import HeroVisual from './hero-visual';
import ClayScene from './clay-scene';
import ToolLogo from './tool-logo';
import { gmailCompose } from '@/lib/contact';

const stats = [
  { value: '20+', label: 'Claude agent workspaces shipped' },
  { value: '10+', label: 'ATS & CRM platforms integrated' },
  { value: '50+', label: 'Production automations in the wild' },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-clay-sky">
      <div className="container relative z-10 mx-auto px-6 pt-28 pb-16 md:pt-36">
        {/* Top: pitch over the clay landscape */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-7 animate-clay-pop">
            <a
              href="https://www.recruitergtm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card text-sm font-semibold text-foreground clay-lift clay-press"
            >
              <ToolLogo src="recruitergtm.png" name="RecruiterGTM" size={18} />
              Building at RecruiterGTM
              <span className="w-2 h-2 rounded-full bg-success animate-status-pulse" />
            </a>

            <div className="space-y-5">
              <p className="text-sm font-bold tracking-widest uppercase text-primary">
                Muhammad Daniyal Aziz
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-[1.02] tracking-tight text-foreground">
                Systems that grow your{' '}
                <span className="text-primary">revenue</span>, built to run themselves.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-semibold">
                I'm a GTM engineer and AI automation specialist. If your business runs on
                manual ops, I turn them into agent-run infrastructure: AI ops managers,
                outbound engines, onboarding automations, and the operations layer that
                keeps it all running.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="group bg-primary hover:bg-primary-hover text-primary-foreground px-7 font-bold text-base shadow-card clay-lift clay-press"
              >
                <Link to="/work">
                  See the systems
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-border bg-card hover:border-primary hover:text-primary px-7 font-bold text-base clay-lift clay-press"
              >
                <a href={gmailCompose('Work with Daniyal')} target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 w-4 h-4" />
                  Work with me
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 max-w-xl">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-card shadow-card p-4">
                  <div className="text-2xl md:text-3xl font-extrabold font-heading text-primary">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-1 leading-snug font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the clay landscape */}
          <div className="animate-clay-pop hidden lg:block" style={{ animationDelay: '140ms' }}>
            <ClayScene />
          </div>
        </div>

        {/* Below: the interactive proof */}
        <div className="max-w-3xl mx-auto mt-16 md:mt-20 animate-clay-pop" style={{ animationDelay: '220ms' }}>
          <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
            A Claude ops manager, mid-shift
          </p>
          <HeroVisual />
          <p className="text-xs text-muted-foreground mt-3 text-center font-semibold">
            This is what one client's AI ops manager does on an ordinary morning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
