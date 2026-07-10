import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';
import { gmailCompose } from '@/lib/contact';
import { SERVICES } from '@/data/services';

const EXPLORE_LINKS = [
  { to: '/work', label: 'Work & case studies' },
  { to: '/testimonials', label: 'Testimonials & results' },
  { to: '/blog', label: 'Blog' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-14 bg-term-bg border-t border-term-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="inline-block">
                <p className="font-mono text-sm font-semibold text-term-text">daniyal.aziz</p>
              </Link>
              <p className="text-sm text-term-dim leading-relaxed max-w-sm">
                AI automation expert and GTM engineer at{' '}
                <a
                  href="https://www.recruitergtm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-term-text hover:text-term-green transition-colors"
                >
                  RecruiterGTM
                </a>
                . Claude agents, outbound systems, and ops integrations that do real revenue work.
              </p>
              <div className="flex items-center gap-4">
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
                <a
                  href={gmailCompose()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  className="text-term-dim hover:text-term-green transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-term-dim mb-4">Services</p>
              <ul className="space-y-2.5">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/${service.slug}`}
                      className="text-sm text-term-text hover:text-term-green transition-colors"
                    >
                      {service.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-term-dim mb-4">Explore</p>
              <ul className="space-y-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-term-text hover:text-term-green transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-term-border flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-term-dim">© {currentYear} Muhammad Daniyal Aziz</p>
            <p className="text-xs text-term-dim">
              Islamabad, Pakistan · working worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
