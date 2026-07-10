import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Mail } from 'lucide-react';
import { gmailCompose } from '@/lib/contact';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-sm' : 'bg-background/60 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-3.5 h-3.5 rounded-full bg-primary shadow-sm group-hover:scale-110 transition-transform" />
              <span className="font-heading text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                Daniyal
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.to}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-muted-foreground hover:text-foreground hover:bg-muted px-3"
                >
                  <Link to={item.to}>{item.label}</Link>
                </Button>
              ))}
              <Button size="sm" asChild className="ml-3 bg-primary hover:bg-primary-hover text-primary-foreground">
                <a href={gmailCompose('Work with Daniyal')} target="_blank" rel="noopener noreferrer">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Work with me
                </a>
              </Button>
            </div>

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 right-0 w-64 bg-card border-l border-border shadow-lg transition-transform duration-300 h-[calc(100vh-4rem)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                variant="ghost"
                asChild
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Link to={item.to} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              </Button>
            ))}
            <hr className="border-border" />
            <Button asChild className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
              <a href={gmailCompose('Work with Daniyal')} target="_blank" rel="noopener noreferrer">
                <Mail className="w-4 h-4 mr-2" />
                Work with me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
