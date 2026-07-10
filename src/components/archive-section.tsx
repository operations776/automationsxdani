import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import { asset } from '@/lib/asset';

interface ArchiveProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: ArchiveProject[] = [
  {
    id: 'zimedar',
    title: 'ZimedarDrive: Edge AI driver assistant',
    description: 'Final year project: real-time traffic sign recognition and lane detection running on-device on mobile GPUs.',
    technologies: ['Kotlin', 'TensorFlow Lite', 'YOLOv11', 'OpenCV'],
    githubUrl: 'https://github.com/Daniyal1234-alt',
  },
  {
    id: 'legal-intake',
    title: 'Legal tech intake automation',
    description: 'Instagram and TikTok lead automation for law firms with evidence collection and Casepeer CRM sync.',
    technologies: ['n8n', 'OpenAI', 'Instagram API', 'Casepeer'],
    image: 'projects/lead-intake-law.jpg',
  },
  {
    id: 'invoice-processing',
    title: 'Multi-entity invoice processing',
    description: 'Intelligent invoice routing across three company entities with PDF parsing, AI GL coding, and Xero submission.',
    technologies: ['n8n', 'OpenAI', 'Xero API', 'PostgreSQL'],
    image: 'projects/xero-invoices.jpg',
  },
  {
    id: 'lead-unification',
    title: 'Leads to Odoo CRM pipeline',
    description: 'Multi-source lead intake from Facebook Ads, WordPress, and webhooks with dedup and Odoo CRM integration.',
    technologies: ['n8n', 'Facebook API', 'Odoo CRM'],
    image: 'projects/leads-to-odoo.jpg',
  },
  {
    id: 'rag-agent',
    title: 'RAG agent with Pinecone',
    description: 'Retrieval-augmented chatbot with Pinecone vector store, OpenAI embeddings, and window buffer memory.',
    technologies: ['n8n', 'OpenAI', 'Pinecone'],
    image: 'projects/rag-agent.jpg',
  },
  {
    id: 'ebay-scraping',
    title: 'Agentic eBay scraping system',
    description: 'Gemini-driven scraper using reflection and planning patterns to extract messy product specifications.',
    technologies: ['n8n', 'Gemini', 'Agentic patterns'],
  },
  {
    id: 'voice-ai',
    title: 'Voice AI appointment agents',
    description: 'Retell AI conversational agents handling appointment booking for a Dutch client, end to end.',
    technologies: ['Retell AI', 'n8n', 'Calendar APIs'],
  },
  {
    id: 'custom-crm',
    title: 'Custom CRM & lead engine',
    description: 'Multi-source lead aggregation from Google Maps, web search, and Instagram with a custom-built CRM UI.',
    technologies: ['React', 'Supabase', 'n8n'],
    liveUrl: 'https://aldar-akzrkkyqd-danis-projects-9a3cfe24.vercel.app/',
  },
  {
    id: 'survey-automation',
    title: 'Survey automation pipeline',
    description: 'Automated survey distribution with Google Drive integration, email tracking, and Typeform response handling.',
    technologies: ['n8n', 'Gmail', 'Typeform'],
    image: 'projects/survey-automation.jpg',
  },
  {
    id: 'battery-research',
    title: 'Battery research agent',
    description: 'Multi-step research automation with AI-powered analysis and structured data extraction.',
    technologies: ['n8n', 'OpenAI', 'Web scraping'],
    image: 'projects/battery-research.jpg',
  },
  {
    id: 'content-generation',
    title: 'Content generation pipeline',
    description: 'SEO article generation with AI text and images publishing straight to WordPress.',
    technologies: ['n8n', 'OpenAI', 'WordPress API'],
  },
];

const VISIBLE_COUNT = 6;

const ArchiveSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, VISIBLE_COUNT);

  return (
    <section id="archive" className="py-24 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">The archive</p>
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
              <div
                key={project.id}
                className="rounded-xl bg-card border border-border shadow-sm overflow-hidden hover-lift flex flex-col"
              >
                {project.image && (
                  <div className="h-32 overflow-hidden border-b border-border bg-muted">
                    <img
                      src={asset(project.image)}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm text-foreground">{project.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="font-mono text-[10px] border-border text-muted-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex gap-3 pt-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          <Github className="w-3 h-3" /> Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
    </section>
  );
};

export default ArchiveSection;
