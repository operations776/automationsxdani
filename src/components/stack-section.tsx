import { useState } from 'react';
import { Bot, Send, Plug, Boxes, Wrench, BrainCircuit } from 'lucide-react';
import ToolLogo from './tool-logo';

interface Tool {
  name: string;
  note: string;
  logo?: string;
  icon?: React.ReactNode;
}

interface Layer {
  id: string;
  label: string;
  icon: React.ReactNode;
  blurb: string;
  tools: Tool[];
}

const LAYERS: Layer[] = [
  {
    id: 'agents',
    label: 'Agent layer',
    icon: <Bot className="w-4 h-4" />,
    blurb: 'Where the work actually happens: Claude agents with skills, memory, and guardrails.',
    tools: [
      { name: 'Claude Agent SDK', note: 'Agent workspaces, skills, hooks', logo: 'claude.png' },
      { name: 'Claude Code', note: 'The daily driver for every build', logo: 'claude.png' },
      { name: 'MCP', note: 'Connecting agents to every tool', logo: 'claude.png' },
      { name: 'Context engineering', note: 'Profiles, memory, operating rules', icon: <BrainCircuit className="w-4 h-4" /> },
    ],
  },
  {
    id: 'gtm',
    label: 'GTM engine',
    icon: <Send className="w-4 h-4" />,
    blurb: 'Enrichment, outbound, and signals: the machinery that fills pipelines.',
    tools: [
      { name: 'Clay', note: 'Enrichment tables and waterfalls', logo: 'clay.png' },
      { name: 'Instantly', note: 'Cold email at scale', logo: 'instantly.png' },
      { name: 'HeyReach', note: 'LinkedIn outbound', logo: 'heyreach.png' },
      { name: 'Lemlist', note: 'Multichannel sequences', logo: 'lemlist.png' },
      { name: 'Apollo', note: 'Data and enrichment', logo: 'apollo.png' },
      { name: 'Prospeo', note: 'Contact discovery', logo: 'prospeo.png' },
      { name: 'Exa', note: 'AI-native web research', logo: 'exa.png' },
    ],
  },
  {
    id: 'ats',
    label: 'ATS bridges',
    icon: <Plug className="w-4 h-4" />,
    blurb: 'Custom integrations into whichever system a client already runs.',
    tools: [
      { name: 'Recruiterflow', note: 'The reference integration', logo: 'recruiterflow.png' },
      { name: 'Loxo', note: 'Reusable client module', logo: 'loxo.png' },
      { name: 'Bullhorn', note: 'Enterprise staffing stack', logo: 'bullhorn.ico' },
      { name: 'HubSpot', note: 'CRM-as-ATS builds', logo: 'hubspot.png' },
      { name: 'PCRecruiter', note: 'Legacy system, tamed', logo: 'pcrecruiter.png' },
      { name: 'Crelate', note: 'Staffing workflows', logo: 'crelate.png' },
      { name: 'Stardex', note: 'Agentic ATS connector', logo: 'stardex.png' },
      { name: 'Gem', note: 'Sourcing-first stack', logo: 'gem.png' },
      { name: 'Invenias', note: 'Executive search', logo: 'invenias.png' },
      { name: 'Spott', note: 'AI-native ATS bridge', logo: 'spott.png' },
      { name: 'Jarvi', note: 'ATS + CRM bridge', logo: 'jarvi.png' },
    ],
  },
  {
    id: 'product',
    label: 'Product & infra',
    icon: <Boxes className="w-4 h-4" />,
    blurb: 'When the answer is a real product, I ship the product.',
    tools: [
      { name: 'Next.js', note: 'The portal and product sites', logo: 'nextjs.png' },
      { name: 'React + TypeScript', note: 'Including this site', logo: 'react.png' },
      { name: 'Supabase', note: 'Auth, Postgres, storage', logo: 'supabase.png' },
      { name: 'Node.js', note: 'Integration modules', logo: 'nodejs.png' },
      { name: 'Python + FastAPI', note: 'APIs and pipelines', logo: 'python.png' },
      { name: 'Vercel', note: 'Deploys and previews', logo: 'vercel.png' },
    ],
  },
  {
    id: 'ops',
    label: 'Ops & automation',
    icon: <Wrench className="w-4 h-4" />,
    blurb: 'The layer that keeps a whole client fleet observable and honest.',
    tools: [
      { name: 'Slack API', note: 'Bots and weekly recaps', logo: 'slack.png' },
      { name: 'Notion API', note: 'Source-of-truth trackers', logo: 'notion.png' },
      { name: 'Google Workspace', note: 'Calendar, Gmail, Drive', logo: 'google.png' },
      { name: 'Fireflies', note: 'Meeting intelligence', logo: 'fireflies.png' },
      { name: 'n8n', note: 'The old workhorse', logo: 'n8n.png' },
      { name: 'Make', note: 'Legacy scenarios, maintained', logo: 'make.png' },
    ],
  },
];

const StackSection = () => {
  const [activeId, setActiveId] = useState(LAYERS[0].id);
  const active = LAYERS.find((layer) => layer.id === activeId) ?? LAYERS[0];

  return (
    <section id="stack" className="py-24 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">The stack</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">
              Five layers, one system
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every build pulls from the same toolbox. Pick a layer to see what's in it.
            </p>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            {/* Layer tabs */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveId(layer.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors shrink-0 md:shrink ${
                    layer.id === activeId
                      ? 'bg-card border-primary text-primary shadow-sm'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card/50'
                  }`}
                >
                  {layer.icon}
                  {layer.label}
                  <span
                    className={`ml-auto font-mono text-[11px] ${
                      layer.id === activeId ? 'text-primary' : 'text-muted-foreground/60'
                    }`}
                  >
                    {layer.tools.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Tools */}
            <div key={activeId} className="animate-fade-up">
              <p className="text-sm text-muted-foreground mb-5">{active.blurb}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {active.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 rounded-lg bg-card border border-border px-4 py-3 hover:border-primary/40 transition-colors"
                  >
                    {tool.logo ? (
                      <ToolLogo src={tool.logo} name={tool.name} size={24} />
                    ) : (
                      <span className="w-6 h-6 rounded-[4px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {tool.icon}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{tool.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{tool.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
