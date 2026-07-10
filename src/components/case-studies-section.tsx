import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import DfyFlow from './demos/dfy-flow';
import ReplySyncDiagram from './demos/reply-sync-diagram';
import PulseTrackerDemo from './demos/pulse-tracker-demo';
import AnglePicker from './demos/angle-picker';

interface CaseStudy {
  id: string;
  kicker: string;
  title: string;
  problem: string;
  points: string[];
  stack: string[];
  demo: ReactNode;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'dfy',
    kicker: 'Flagship · Claude done-for-you',
    title: 'An AI ops manager inside your business',
    problem:
      'Founders drown in ops: sourcing, outbound, content, reporting. Hiring a human for it is slow and expensive. So I build you an AI one that works inside your own stack.',
    points: [
      'You get a dedicated Claude ops manager that knows your niche, your voice, and your tools, with skills for sourcing, winning clients, content, and reporting.',
      'It plugs into whatever you already run: 10+ ATS and CRM platforms integrated so far, from Recruiterflow and Bullhorn to Loxo and Invenias.',
      '20+ live workspaces shipped for recruitment businesses. Each ends with a guided tour so your team drives it without me in the room.',
    ],
    stack: ['Claude', 'Clay', 'Instantly', 'HeyReach', '10+ ATS platforms'],
    demo: <DfyFlow />,
  },
  {
    id: 'reply-sync',
    kicker: 'GTM infrastructure',
    title: 'Reply protection across email and LinkedIn',
    problem:
      'The same leads run in cold email and LinkedIn campaigns at once. When someone replies on one channel and the other keeps messaging them, deals die.',
    points: [
      'Matches on the person, not the campaign: leads split across many LinkedIn campaigns and pooled email sends still get caught.',
      'A reply anywhere halts the other channel within seconds and routes positive replies straight to Slack.',
      'Runs continuously across client accounts as part of the managed GTM layer.',
    ],
    stack: ['Instantly', 'HeyReach', 'Slack'],
    demo: <ReplySyncDiagram />,
  },
  {
    id: 'pulse-tracker',
    kicker: 'Product build · runs client delivery today',
    title: 'Pulse Tracker: the client portal for GTM service businesses',
    problem:
      'Agencies run delivery across an ATS, spreadsheets, content docs, and a booking tool, and clients see none of it, so they chase updates in email. Pulse Tracker puts the whole engagement in one login.',
    points: [
      'Campaign tracking clients can open any time: TAM penetration, sends, connects, and replies, synced daily. The "any update?" email dies here.',
      'A 90-day delivery roadmap auto-created for every client: tasks, owners, and blockers visible to both sides from day zero.',
      'A placements board that works like a lightweight ATS: candidates move through stages, public application links feed it, shortlists export as client-ready PDFs.',
      'One-click content approvals, a team content calendar, community tracking, and an in-house booking engine that replaced Calendly.',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Resend', 'Vercel'],
    demo: <PulseTrackerDemo />,
  },
  {
    id: 'outbound-brain',
    kicker: 'GTM system',
    title: 'An outbound brain the agents actually use',
    problem:
      'Outbound copy quality collapses when every campaign starts from a blank page. So no campaign starts from one.',
    points: [
      'A curated library: swipe file, angle bank, and a distilled copywriting playbook harvested from the best outbound operators.',
      'Agents pull angles by ICP and signal, then assemble sequences with proof attached.',
      'Feeds every client campaign, plus a funding-signal pipeline that spots freshly-funded companies right before they hire.',
    ],
    stack: ['Claude', 'Clay', 'Exa', 'Signal pipelines'],
    demo: <AnglePicker />,
  },
];

const CaseStudiesSection = ({ showHeader = true }: { showHeader?: boolean }) => {
  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          {showHeader && (
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">Case studies</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">
                Systems doing real work right now
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I build these at RecruiterGTM for businesses that want their revenue ops to run
                themselves: AI ops managers, outbound infrastructure, and client-facing products.
                Everything is shipped and running, anonymised where it needs to be. Yours would
                look like this.
              </p>
            </div>
          )}

          {/* Case studies */}
          <div className="space-y-20 md:space-y-28">
            {CASE_STUDIES.map((study, index) => (
              <div
                key={study.id}
                id={study.id}
                className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center scroll-mt-28"
              >
                {/* Copy */}
                <div className={`space-y-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-primary">{study.kicker}</p>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">{study.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{study.problem}</p>
                  <ul className="space-y-3">
                    {study.points.map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {study.stack.map((tech) => (
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

                {/* Demo */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>{study.demo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
