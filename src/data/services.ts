export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  sub: string;
  signalsTitle: string;
  signals: string[];
  deliverables: { title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  blogSlugs: string[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'ai-automation-expert',
    navLabel: 'AI Automation Expert',
    metaTitle: 'Hire an AI Automation Expert | Daniyal Aziz',
    metaDescription:
      'AI automation expert with 50+ production automations across recruitment, legal, property, e-commerce, and finance. Lead intake, enrichment, outreach, invoicing, and reporting that run themselves.',
    kicker: 'Services · AI automation',
    h1: 'AI automation expert for businesses that are done doing it by hand',
    sub: 'I design and ship AI automation that does real work: lead intake, enrichment, outreach, invoicing, reporting. 50+ production automations running across recruitment, legal, property, e-commerce, and finance.',
    signalsTitle: 'Signs you need this',
    signals: [
      'Your team re-types the same data between tools every single day.',
      'Leads wait hours for a reply because a human is the router.',
      'Reporting eats a day a week and is stale the moment it lands.',
    ],
    deliverables: [
      { title: 'Automation audit', desc: 'We map the manual work, score it by hours saved, and pick the highest-ROI builds first.' },
      { title: 'AI-powered workflows', desc: 'LLMs in the loop where judgment is needed: classification, drafting, routing, extraction.' },
      { title: 'System integrations', desc: 'Your ATS, CRM, finance, and comms tools finally talking to each other, no swivel-chairing.' },
      { title: 'Human approval gates', desc: 'Nothing outbound or destructive happens without a human yes. Automation with brakes.' },
      { title: 'Monitoring and recovery', desc: 'Automations that tell you when something breaks instead of failing silently for a month.' },
      { title: 'Handover and docs', desc: 'Your team runs it without me in the room. Guided tour included with every build.' },
    ],
    steps: [
      { title: 'Map', desc: 'A short audit of where hours actually go. We pick targets by ROI, not by what looks cool.' },
      { title: 'Build', desc: 'First automation live in days, wired into the tools you already pay for.' },
      { title: 'Hand over', desc: 'Docs, a guided tour, and support. You own the system.' },
    ],
    faqs: [
      {
        q: 'What can you actually automate with AI?',
        a: 'Anything with clear inputs and a repeatable decision: lead intake and routing, data enrichment, outreach drafting, invoice processing, meeting follow-ups, weekly reporting. Judgment calls stay with humans through approval gates.',
      },
      {
        q: 'How is this different from hiring a generic automation freelancer?',
        a: 'Everything on this site is a working system in production, not a portfolio mockup. I ship with monitoring, approval gates, and documentation, so the automation survives contact with real operations.',
      },
      {
        q: 'Which tools do you work with?',
        a: 'Claude and the Claude Agent SDK, Clay, Instantly, HeyReach, Lemlist, Apollo, 10+ ATS and CRM platforms including Recruiterflow, Bullhorn, Loxo and HubSpot, plus Xero, Slack, Notion, Google Workspace, n8n, and Make.',
      },
      {
        q: 'How fast do I see value?',
        a: 'The first automation is usually live within days. Recent example: client onboarding went from a week of email back-and-forth to a same-day automated flow.',
      },
    ],
    relatedSlugs: ['claude-automation', 'ops-integrator'],
    blogSlugs: ['ai-automation-vs-hiring-ops', 'claude-ai-ops-manager-for-recruitment'],
  },
  {
    slug: 'gtm-engineer',
    navLabel: 'GTM Engineer',
    metaTitle: 'Hire a GTM Engineer | Freelance GTM Engineering | Daniyal Aziz',
    metaDescription:
      'GTM engineer building signal-based outbound, Clay enrichment, and reply handling that books meetings. Campaigns reaching 70%+ open rates and double-digit replies. Hire GTM engineering that ships.',
    kicker: 'Services · GTM engineering',
    h1: 'GTM engineer for pipelines that fill themselves',
    sub: 'Signal-based outbound, enrichment waterfalls, and reply handling that books meetings while your team sells. This is GTM engineering as infrastructure, not another SDR tool subscription.',
    signalsTitle: 'Signs you need this',
    signals: [
      'You own six sales tools and zero systems. Pipeline still depends on someone remembering.',
      'Lists go stale before the campaign even launches.',
      'Replies rot in inboxes because nobody owns the handoff from campaign to conversation.',
    ],
    deliverables: [
      { title: 'TAM and list building', desc: 'Your total addressable market, segmented and scored, so every send has a reason.' },
      { title: 'Enrichment waterfalls', desc: 'Clay-powered enrichment that finds verified emails and context your ads never could.' },
      { title: 'Signal detection', desc: 'Funding rounds, hiring surges, leadership changes: outreach triggered when there is a real reason to talk.' },
      { title: 'Multichannel sequences', desc: 'Email and LinkedIn working the same list without stepping on each other.' },
      { title: 'Reply protection and routing', desc: 'A reply on one channel stops the other within seconds and lands in Slack for a human to close.' },
      { title: 'Campaign analytics', desc: 'Opens, replies, and meetings in one view, synced daily. No more exporting CSVs to know what happened.' },
    ],
    steps: [
      { title: 'Map', desc: 'ICP, signals, and channels. We define who, why now, and where.' },
      { title: 'Build', desc: 'Infrastructure first: deliverability, enrichment, sequences, suppression. Then campaigns go live.' },
      { title: 'Run', desc: 'Signal-triggered campaigns with humans approving every send batch.' },
    ],
    faqs: [
      {
        q: 'What is a GTM engineer?',
        a: 'Someone who builds the machinery a revenue team runs on: data pipelines, enrichment, signal detection, sequencing, and handoffs. An SDR works the pipeline; a GTM engineer builds the thing that fills it.',
      },
      {
        q: 'What results should I expect?',
        a: 'Well-built recruitment campaigns I run reach 70%+ open rates and double-digit reply rates, feeding qualified conversations every month. Your numbers depend on offer and market, which we pressure-test first.',
      },
      {
        q: 'Do you replace my SDR or sales team?',
        a: 'No. The system does the finding, enriching, sequencing, and follow-up bookkeeping. Humans do the selling. Every send still gets a human yes.',
      },
      {
        q: 'What stack do you build on?',
        a: 'Clay, Instantly, HeyReach, Lemlist, Apollo, Prospeo, and Exa for signals, wired into your CRM or ATS. Claude agents handle drafting and reporting.',
      },
    ],
    relatedSlugs: ['ai-automation-expert', 'claude-automation'],
    blogSlugs: ['what-does-a-gtm-engineer-do', 'stop-double-touching-leads'],
  },
  {
    slug: 'ops-integrator',
    navLabel: 'Ops Integrator',
    metaTitle: 'Ops Integrator & Operations Automation | Daniyal Aziz',
    metaDescription:
      'Ops integrator connecting the tools you already pay for: onboarding automation, automated reporting, client portals, and source-of-truth trackers. Operations that run without chasing.',
    kicker: 'Services · Ops integration',
    h1: 'Ops integrator: your systems finally talking to each other',
    sub: 'I connect the tools your business already pays for and automate the busywork between them: onboarding, reporting, invoicing, client comms. Humans stop being the glue.',
    signalsTitle: 'Signs you need this',
    signals: [
      'Five tools, zero integration, and people copy-pasting between them all day.',
      'Client onboarding takes a week of back-and-forth emails.',
      'Nobody trusts the tracker because nobody has time to update it.',
    ],
    deliverables: [
      { title: 'Systems audit', desc: 'Where data lives, where it stalls, and which handoffs quietly burn hours.' },
      { title: 'API integrations', desc: 'Custom bridges between your platforms. 10+ ATS and CRM systems integrated to date.' },
      { title: 'Onboarding automation', desc: 'Intake form to provisioned accounts, routed channels, and kickoff docs with zero manual steps.' },
      { title: 'Automated reporting', desc: 'Weekly recaps that write themselves and land in Slack, so the whole team knows what moved.' },
      { title: 'Source-of-truth trackers', desc: 'One tracker that stays accurate because machines update it, not memory.' },
      { title: 'Client portals', desc: 'When clients need visibility, I ship an actual product: dashboards, roadmaps, approvals, bookings.' },
    ],
    steps: [
      { title: 'Map', desc: 'Follow the data through your business and find every human-glue step.' },
      { title: 'Build', desc: 'Integrations and automations shipped incrementally, highest-pain first.' },
      { title: 'Hand over', desc: 'Documentation and a guided tour. Your ops keep running when I log off.' },
    ],
    faqs: [
      {
        q: 'What does an ops integrator actually do?',
        a: 'Connects your existing tools through their APIs and automates the work between them, so onboarding, reporting, and data hygiene happen without a human in the middle.',
      },
      {
        q: 'Is this just Zapier setups?',
        a: 'No. Where a no-code tool fits, I use one. Where it does not, I write custom integrations with monitoring and error recovery. The measure is whether it survives a year of real use.',
      },
      {
        q: 'Should I do this instead of hiring an ops manager?',
        a: 'Automate the repetitive layer first, then hire humans for judgment. A recent build turned company reporting from hours of channel-reading into automated weekly recaps across every client channel.',
      },
      {
        q: 'What happens when something breaks?',
        a: 'Automations ship with alerting, so you hear it from the system, not from an angry client. Handover includes runbooks for the common failures.',
      },
    ],
    relatedSlugs: ['ai-automation-expert', 'gtm-engineer'],
    blogSlugs: ['ai-automation-vs-hiring-ops', 'stop-double-touching-leads'],
  },
  {
    slug: 'claude-automation',
    navLabel: 'Claude Automation',
    metaTitle: 'Claude Automation Expert | Claude AI Agents for Business | Daniyal Aziz',
    metaDescription:
      'Claude automation expert with 20+ production agent workspaces shipped. Claude AI ops managers with skills, memory, and guardrails that source, sell, write, and report inside your own stack.',
    kicker: 'Services · Claude automation',
    h1: 'Claude automation: AI agents that run inside your business',
    sub: 'I build Claude-powered ops managers: agents with skills, memory, and guardrails that source, sell, write, and report inside your own stack. 20+ shipped and running for recruitment businesses.',
    signalsTitle: 'Signs you need this',
    signals: [
      'ChatGPT tabs everywhere, nothing actually shipped into operations.',
      'You know agents matter, but nobody in the company owns making them real.',
      'You tried a no-code AI bot and it fell over the first week it met real data.',
    ],
    deliverables: [
      { title: 'Claude agent workspaces', desc: 'A dedicated AI ops manager configured for your niche, your voice, and your tools.' },
      { title: 'Custom skills', desc: 'Sourcing, outbound, content, and reporting playbooks the agent executes on command.' },
      { title: 'Tool integrations via MCP', desc: 'Your ATS, CRM, email, calendar, and Slack, all reachable by the agent safely.' },
      { title: 'Memory and ground truth', desc: 'A profile and persistent memory, so the agent knows your business on day 30 better than day 1.' },
      { title: 'Guardrails and approval gates', desc: 'Draft-only outbound, source-of-truth rules, and human sign-off where it matters.' },
      { title: 'Guided-tour handover', desc: 'Every workspace ends with a tour skill, so your team drives it without me.' },
    ],
    steps: [
      { title: 'Discovery', desc: 'One call to capture the skills you need and the stack you run.' },
      { title: 'Build', desc: 'Workspace, integrations, skills, and guardrails, wired and tested against your real accounts.' },
      { title: 'Hand over', desc: 'A guided tour, documentation, and support while your team takes the wheel.' },
    ],
    faqs: [
      {
        q: 'Why Claude instead of ChatGPT?',
        a: 'Claude agents run end-to-end pipelines with skills and MCP tool connections, hold long context, and stay in your voice. Portable Markdown skills mean you own the playbooks instead of renting a custom GPT.',
      },
      {
        q: 'What is a Claude AI ops manager?',
        a: 'A configured Claude agent workspace that behaves like an operations hire: it sources candidates or leads, drafts outbound, writes content, and reports pipeline, using your tools under your rules.',
      },
      {
        q: 'Do I need developers on my team to run it?',
        a: 'No. You type plain English. The engineering is my job: integrations, skills, memory, and guardrails come pre-built, with a guided tour at handover.',
      },
      {
        q: 'Is my data safe?',
        a: 'Keys stay in your workspace, client data never leaves it, and every build ships with rules about what the agent may and may not touch. Outbound is draft-only until a human approves.',
      },
    ],
    relatedSlugs: ['ai-automation-expert', 'gtm-engineer'],
    blogSlugs: ['claude-ai-ops-manager-for-recruitment', 'ai-automation-vs-hiring-ops'],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
