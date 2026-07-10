import Navigation from '@/components/ui/navigation';
import HeroSection from '@/components/hero-section';
import HomeTeasers from '@/components/home-teasers';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import RoamingPrompt from '@/components/roaming-prompt';
import { Seo, PERSON_SCHEMA, WEBSITE_SCHEMA } from '@/lib/seo';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Daniyal Aziz | AI Automation Expert & GTM Engineer"
        description="AI automation expert and GTM engineer at RecruiterGTM. I build Claude automation, outbound systems, and ops integrations that do real revenue work. Watch the live demos, then hire me."
        path="/"
        jsonLd={[PERSON_SCHEMA, WEBSITE_SCHEMA]}
      />
      <Navigation />
      <main>
        <HeroSection />
        <HomeTeasers />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      {/* Last-chance nudge when the visitor moves to leave */}
      <RoamingPrompt
        id="home-exit"
        text="Before you go, tell me what's still manual in your business. I'll show you what to automate first."
        trigger="exit"
      />
    </div>
  );
};

export default Index;
