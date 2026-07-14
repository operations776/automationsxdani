import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, ChevronDown, ArrowRight } from 'lucide-react';
import { asset } from '@/lib/asset';

interface ArchiveProject {
  id: string;
  title: string;
  description: string;
  detail: string[];
  technologies: string[];
  image: string;
  liveUrl?: string;
}

const PROJECTS: ArchiveProject[] = [
  {
    id: 'lead-unification',
    title: 'Leads to Odoo CRM pipeline',
    description: 'WordPress forms, ManyChat conversations, and Meta lead ads, all landing in one Odoo queue.',
    detail: [
      'Leads used to die in five separate inboxes. Anyone who filled a WordPress form, messaged through ManyChat, or came in from a Meta lead ad was captured the moment they arrived.',
      'Each lead was normalised, deduplicated, and pushed straight into the Odoo CRM with its source attached, so the sales team picked up every conversation from one queue with full context.',
    ],
    technologies: ['n8n', 'WordPress', 'Meta Lead Ads', 'ManyChat', 'Odoo CRM'],
    image: 'projects/leads-to-odoo.jpg',
  },
  {
    id: 'rag-agent',
    title: 'RAG agent with Pinecone',
    description: 'Documents in, grounded answers out: a retrieval-augmented chatbot with conversation memory.',
    detail: [
      'Documents get embedded into a Pinecone vector store. The chatbot answers questions with retrieval-augmented responses, so every answer is grounded in the actual source material instead of model guesswork.',
      'Window buffer memory keeps the conversation coherent across turns. A simple, reliable pattern that turns a pile of documents into something a team can actually ask questions to.',
    ],
    technologies: ['n8n', 'OpenAI', 'Pinecone', 'Embeddings'],
    image: 'projects/rag-agent.jpg',
  },
  {
    id: 'ebay-scraping',
    title: 'Agentic eBay listing sync',
    description: 'A European used-battery marketplace, kept in sync with 10 to 20 eBay supplier stores automatically.',
    detail: [
      'The client runs a European marketplace for used batteries, reselling stock listed by 10 to 20 eBay businesses. Their team opened each store manually, checked what was listed, and re-listed items on their own site. Every day.',
      'The agentic scraper took that over completely: it walks each store, extracts messy, inconsistent product specifications using Gemini with reflection and planning patterns, and keeps the marketplace catalogue in sync.',
      'A week of manual listing work per cycle became an overnight job with no human in the loop.',
    ],
    technologies: ['n8n', 'Gemini', 'Agentic patterns', 'Web scraping'],
    image: 'projects/ebay-scraping.svg',
  },
  {
    id: 'voice-ai',
    title: 'Voice AI appointment agent',
    description: 'A voice agent that answers, qualifies, and books appointments around the clock.',
    detail: [
      'A Dutch client needed calls answered and appointments booked without hiring for it. Calls came in at all hours; the humans did not.',
      'The Retell-based voice agent picks up, holds a natural conversation, qualifies the caller, and books straight into the calendar, day or night. Missed calls stopped being a revenue leak, with zero added headcount.',
    ],
    technologies: ['Retell AI', 'n8n', 'Calendar APIs'],
    image: 'projects/voice-ai.svg',
  },
  {
    id: 'custom-crm',
    title: 'Custom CRM & lead engine',
    description: 'Multi-source lead aggregation from Google Maps, web search, and Instagram, with its own CRM interface.',
    detail: [
      'Leads scattered across Google Maps scrapes, web search, and Instagram meant nobody worked a single list. The lead engine pulls from all three sources, normalises and deduplicates, and lands everything in a custom-built CRM UI.',
      'A small team got one working queue instead of three spreadsheets.',
    ],
    technologies: ['React', 'Supabase', 'n8n', 'Google Maps API'],
    image: 'projects/custom-crm.svg',
    liveUrl: 'https://aldar-akzrkkyqd-danis-projects-9a3cfe24.vercel.app/',
  },
  {
    id: 'survey-automation',
    title: 'Survey automation pipeline',
    description: 'Survey distribution, tracking, and response collection wired end to end.',
    detail: [
      'Survey assets come in from Google Drive, personalised email sends go out with tracking, and Typeform responses flow back into the dataset automatically.',
      'What used to be a manual mail-merge-and-chase cycle became a pipeline the team just watches.',
    ],
    technologies: ['n8n', 'Gmail', 'Typeform', 'Google Drive'],
    image: 'projects/survey-automation.jpg',
  },
  {
    id: 'battery-research',
    title: 'Battery research agent',
    description: 'Multi-step research automation compiling structured battery product data from the open web.',
    detail: [
      'Built for the same used-battery marketplace operation as the eBay sync: a multi-step research agent that gathers battery product data from the web, extracts structured specifications, and compiles research-ready datasets.',
      'Product research that used to be an intern-week became a scheduled run.',
    ],
    technologies: ['n8n', 'OpenAI', 'Web scraping', 'Data extraction'],
    image: 'projects/battery-research.jpg',
  },
  {
    id: 'content-generation',
    title: 'Content generation pipeline',
    description: 'SEO articles with AI-generated images, published to WordPress on schedule.',
    detail: [
      'Keyword brief in, structured SEO article out, with AI-generated images attached and the whole thing published to WordPress on schedule.',
      'A publishing calendar that runs without a writer in the loop for the volume layer, leaving humans for the pieces that need a human.',
    ],
    technologies: ['n8n', 'OpenAI', 'DALL-E', 'WordPress API'],
    image: 'projects/content-generation.svg',
  },
];

const VISIBLE_COUNT = 6;

const ArchiveSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<ArchiveProject | null>(null);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, VISIBLE_COUNT);

  return (
    <section id="archive" className="py-24 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">The archive</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">
              Earlier systems, 2024 to early 2026
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The agency years: lead intake, invoice processing, voice AI, and scraping agents
              built across legal, property, e-commerce, and finance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActive(project)}
                className="text-left rounded-xl bg-card border border-border shadow-sm overflow-hidden hover-lift flex flex-col focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="h-36 overflow-hidden border-b border-border bg-muted">
                  <img
                    src={asset(project.image)}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm text-foreground">{project.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="font-mono text-[10px] border-border text-muted-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary pt-1">
                    Read the breakdown
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {PROJECTS.length > VISIBLE_COUNT && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="border-border hover:border-primary hover:text-primary"
              >
                <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                {showAll ? 'Show fewer' : `Show all ${PROJECTS.length}`}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Breakdown dialog */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {active && (
            <>
              <div className="rounded-lg overflow-hidden border border-border -mt-1 mb-1">
                <img src={asset(active.image)} alt={active.title} className="w-full h-auto object-cover" />
              </div>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-left">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {active.detail.map((para, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {active.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="font-mono text-[10px] border-border text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open the live build
                </a>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ArchiveSection;
