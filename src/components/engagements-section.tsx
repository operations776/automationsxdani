import { Badge } from '@/components/ui/badge';
import { Globe, Linkedin, Briefcase } from 'lucide-react';
import ToolLogo from './tool-logo';

/* Companies framed as clients: what I built for each and what it
   changed, not job titles and tenure. */

interface Engagement {
  id: string;
  company: string;
  engagement: string;
  logo?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  period: string;
  ongoing?: boolean;
  outcomes: string[];
  technologies: string[];
}

const ENGAGEMENTS: Engagement[] = [
  {
    id: 'recruitergtm',
    company: 'RecruiterGTM',
    engagement: 'GTM systems, Claude automation, and the operations layer',
    logo: 'recruitergtm.png',
    websiteUrl: 'https://www.recruitergtm.com',
    linkedinUrl: 'https://www.linkedin.com/company/recruitergtm',
    period: '2026, ongoing',
    ongoing: true,
    outcomes: [
      'Shipped 20+ Claude AI ops managers for their recruitment clients: sourcing shortlists that used to eat an afternoon now take minutes, with outreach drafted and waiting for approval.',
      'Cut client onboarding from a week of email back-and-forth to a same-day automated flow: intake form to routed Slack channels, kickoff docs, and secure API key handoff.',
      'Run signal-based outbound across their client fleet: email and LinkedIn campaigns reaching 70%+ open rates and double-digit reply rates, feeding qualified sales conversations every month.',
      'Built Pulse Tracker, the client portal that killed the "any update?" email: campaign metrics, delivery roadmaps, placements, and approvals in one login, plus a booking engine that ended the Calendly bill.',
      'Turned company reporting from hours of channel-reading into automated weekly recaps of every client channel, keeping the source of truth accurate with zero chasing.',
      'Front-line technical support across a 70+ client operation: integrations and deliverability fixed before clients notice.',
    ],
    technologies: ['Claude', 'Clay', 'Instantly', 'HeyReach', '10+ ATS platforms', 'Next.js', 'Supabase', 'Slack API', 'Notion API'],
  },
  {
    id: 'eynvision',
    company: 'Eynvision',
    engagement: 'Finance automation',
    logo: 'eynvision.webp',
    websiteUrl: 'https://www.eynvision.com',
    linkedinUrl: 'https://www.linkedin.com/company/eynvision',
    period: '2025 to 2026',
    outcomes: [
      'Replaced a client\'s outsourced bookkeeping firm with an automated pipeline: roughly 20 invoices a day across four entities spanning North America, South America, Europe, and Asia.',
      'AI reads each invoice, extracts the data, assigns the right GL code, account, and tax treatment per entity, and files it into Xero. Misroutes near zero.',
    ],
    technologies: ['n8n', 'OpenAI', 'Xero API', 'PostgreSQL'],
  },
  {
    id: 'xcorre',
    company: 'Xcorre',
    engagement: 'Lead intake and outreach automation',
    logo: 'xcorre.png',
    websiteUrl: 'https://www.xcorre.com',
    linkedinUrl: 'https://www.linkedin.com/company/xcorre',
    period: '2024 to 2026',
    outcomes: [
      'Took lead response from hours to minutes for a Canadian beverage brand by unifying Facebook Lead Ads, WordPress, and cold outreach into one pipeline, with zero leads dropped in triage.',
      'Put UK property management admin on autopilot with Reapit automation, freeing the team from daily data entry.',
      'Outreach campaigns ran themselves through GoHighLevel and Instantly integrations.',
    ],
    technologies: ['n8n', 'OpenAI', 'GoHighLevel', 'Instantly', 'Reapit'],
  },
  {
    id: 'trilles',
    company: 'Trilles AI',
    engagement: 'AI delivery across legal tech and e-commerce',
    logo: 'trillesai.jpeg',
    websiteUrl: 'https://www.trillesai.com',
    linkedinUrl: 'https://www.linkedin.com/company/trilles-ai',
    period: '2024 to 2026',
    outcomes: [
      'Built legal intake that never sleeps: ManyChat capturing DMs across Instagram, TikTok, and Messenger, AI-drafted replies, follow-up sequences, and case evidence filed into Casepeer around the clock.',
      'Kept a European used-battery marketplace in sync with 10 to 20 eBay supplier stores: an agentic scraper cleared a week of manual listing work overnight, using reflection and planning patterns on Gemini.',
      'Deployed voice agents that answered and booked appointments 24/7 for a Dutch client, with no added headcount.',
      'Led the delivery team across both client portfolios.',
    ],
    technologies: ['n8n', 'Gemini', 'Retell AI', 'Casepeer', 'Agentic patterns'],
  },
  {
    id: 'ttc',
    company: 'TTC',
    engagement: 'LinkedIn growth automation',
    period: '2024',
    outcomes: [
      'Built LinkedIn lead generation that held response SLAs automatically through smart routing.',
      'Shipped a content pipeline publishing articles with AI-generated images, no writer in the loop.',
    ],
    technologies: ['n8n', 'PhantomBuster', 'OpenAI', 'Sales Navigator'],
  },
];

const EngagementsSection = () => {
  return (
    <section id="engagements" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Engagements</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">
              What I've built, company by company
            </h2>
            <p className="text-muted-foreground text-lg">
              Every business I've worked with, treated the way I treat clients: here is what
              I shipped and what it changed.
            </p>
          </div>

          <div className="relative border-l border-border pl-8 space-y-12">
            {ENGAGEMENTS.map((eng) => (
              <div key={eng.id} className="relative">
                <span
                  className={`absolute -left-[37px] top-1.5 w-[9px] h-[9px] rounded-full border-2 border-background ${
                    eng.ongoing ? 'bg-success' : 'bg-muted-foreground/40'
                  }`}
                />

                {/* Company row */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-10 h-10 rounded-lg border border-border bg-card shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                    {eng.logo ? (
                      <ToolLogo src={eng.logo} name={eng.company} size={26} />
                    ) : (
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                      <h3 className="text-lg font-semibold font-heading text-foreground leading-tight">
                        {eng.company}
                      </h3>
                      {eng.ongoing && (
                        <Badge className="bg-success/10 text-success border-0 text-[11px] font-medium">Ongoing</Badge>
                      )}
                      {eng.websiteUrl && (
                        <a
                          href={eng.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${eng.company} website`}
                          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {eng.linkedinUrl && (
                        <a
                          href={eng.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${eng.company} on LinkedIn`}
                          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {eng.engagement} · {eng.period}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {eng.outcomes.map((outcome, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {eng.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-[11px] border-border text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementsSection;
