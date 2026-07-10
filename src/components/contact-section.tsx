import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';
import { gmailCompose, EMAIL } from '@/lib/contact';
import { ClayMailbox } from './clay-objects';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-term-bg text-term-text relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center animate-clay-float">
            <ClayMailbox size={92} />
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-term-green">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight text-white">
            Want systems like these?
          </h2>
          <p className="text-term-dim text-lg leading-relaxed max-w-xl mx-auto">
            Claude agents, outbound infrastructure, or the ops layer in between. If it should
            run itself, I can probably build it. Tell me what's still manual in your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary-hover px-8">
              <a href={gmailCompose("Let's build something")} target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 w-4 h-4" />
                {EMAIL}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-term-border bg-transparent text-term-text hover:bg-term-surface hover:text-white px-8"
            >
              <a href="https://www.linkedin.com/in/daniyal-aziz-643309246/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 w-4 h-4" />
                LinkedIn
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-term-border bg-transparent text-term-text hover:bg-term-surface hover:text-white px-8"
            >
              <a href="https://github.com/Daniyal1234-alt" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>
          <p className="text-xs text-term-dim">
            Response time: same day <span className="text-term-green">✓</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
