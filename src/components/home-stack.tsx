import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ToolLogo from './tool-logo';

/* The tech stack, on the home page. Grouped the way the work actually
   splits, with Clay called out because the data layer is what decides
   whether outbound lands. */

interface Tool {
  name: string;
  logo?: string;
}

interface Group {
  label: string;
  tools: Tool[];
}

const GROUPS: Group[] = [
  {
    label: 'Data & enrichment',
    tools: [
      { name: 'Clay', logo: 'clay.png' },
      { name: 'Apollo', logo: 'apollo.png' },
      { name: 'Prospeo', logo: 'prospeo.png' },
      { name: 'Exa', logo: 'exa.png' },
    ],
  },
  {
    label: 'Outbound',
    tools: [
      { name: 'Instantly', logo: 'instantly.png' },
      { name: 'HeyReach', logo: 'heyreach.png' },
      { name: 'Lemlist', logo: 'lemlist.png' },
    ],
  },
  {
    label: 'AI & agents',
    tools: [
      { name: 'Claude', logo: 'claude.png' },
      { name: 'OpenAI', logo: 'openai.png' },
      { name: 'Gemini', logo: 'gemini.png' },
    ],
  },
  {
    label: 'ATS & CRM',
    tools: [
      { name: 'Recruiterflow', logo: 'recruiterflow.png' },
      { name: 'Bullhorn', logo: 'bullhorn.ico' },
      { name: 'Loxo', logo: 'loxo.png' },
      { name: 'HubSpot', logo: 'hubspot.png' },
      { name: 'Crelate', logo: 'crelate.png' },
      { name: 'Invenias', logo: 'invenias.png' },
    ],
  },
  {
    label: 'Build & ship',
    tools: [
      { name: 'Next.js', logo: 'nextjs.png' },
      { name: 'React', logo: 'react.png' },
      { name: 'TypeScript', logo: 'typescript.png' },
      { name: 'Supabase', logo: 'supabase.png' },
      { name: 'Vercel', logo: 'vercel.png' },
    ],
  },
  {
    label: 'Automation & ops',
    tools: [
      { name: 'n8n', logo: 'n8n.png' },
      { name: 'Make', logo: 'make.png' },
      { name: 'Slack', logo: 'slack.png' },
      { name: 'Notion', logo: 'notion.png' },
      { name: 'Xero', logo: 'xero.png' },
    ],
  },
];

const HomeStack = () => {
  return (
    <section id="stack" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">
                The stack
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                What I build with
              </h2>
            </div>
            <Link
              to="/gtm-engineer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              How I use it
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Clay gets its own row, it decides whether the rest works */}
          <div className="rounded-2xl bg-card shadow-card p-6 md:p-7 mb-5 flex flex-col sm:flex-row sm:items-center gap-5">
            <span className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center shrink-0">
              <ToolLogo src="clay.png" name="Clay" size={34} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                <h3 className="text-lg font-bold font-heading text-foreground">Clay, the data layer</h3>
                <span className="text-[11px] font-bold text-primary">17 client stacks</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enrichment waterfalls, Claygent research columns, ICP scoring, and signal tables.
                Every list gets built and cleaned here before a single message goes out, which is
                why the email bounce rate across my campaigns sits under 1%.
              </p>
            </div>
          </div>

          {/* Everything else, grouped */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GROUPS.map((group) => (
              <div key={group.label} className="rounded-2xl bg-card shadow-card p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3.5">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 pl-1.5 pr-3 py-1"
                    >
                      <ToolLogo src={tool.logo} name={tool.name} size={16} />
                      <span className="text-[11.5px] font-semibold text-foreground">{tool.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Plus 10+ ATS and CRM platforms integrated end to end, and whatever else the job needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeStack;
