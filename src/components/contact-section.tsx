import { Linkedin, Github } from 'lucide-react';
import ContactForm from './contact-form';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-term-bg text-term-text relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Pitch */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-xs uppercase tracking-widest font-bold text-term-green">Contact</p>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight text-white">
              Want systems like these?
            </h2>
            <p className="text-term-dim text-lg leading-relaxed">
              Claude agents, outbound infrastructure, or the ops layer in between. Tell me
              what's still manual in your business. It lands straight in my inbox and I'll
              reply within a business day.
            </p>
            <div className="flex items-center gap-4 justify-center lg:justify-start pt-2">
              <a
                href="https://www.linkedin.com/in/daniyal-aziz-643309246/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-term-dim hover:text-term-green transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Daniyal1234-alt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-term-dim hover:text-term-green transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Form */}
          <ContactForm source="contact-section" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
