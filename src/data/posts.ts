export interface PostSection {
  h?: string;
  p?: string[];
  list?: string[];
}

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  readTime: string;
  sections: PostSection[];
  related: { label: string; to: string }[];
}

export const POSTS: Post[] = [
  {
    slug: 'what-does-a-gtm-engineer-do',
    title: 'What Does a GTM Engineer Actually Do? (And When to Hire One)',
    metaTitle: 'What Does a GTM Engineer Do? When to Hire One | Daniyal Aziz',
    description:
      'GTM engineering explained in plain terms: what a GTM engineer builds, how the role differs from an SDR or RevOps, and the signals that you need one.',
    date: '2026-06-18',
    readTime: '5 min read',
    sections: [
      {
        p: [
          'Ask five founders what a GTM engineer is and you will get five different answers, most of them involving the word "tools". Here is the version that survives contact with a real pipeline: a GTM engineer builds the machinery a revenue team runs on. Not the deck, not the calls. The machinery.',
        ],
      },
      {
        h: 'The job in one sentence',
        p: [
          'A GTM engineer turns your go-to-market motion into systems: who to target (data), why now (signals), what to say (sequences with real angles), and what happens when someone answers (handoffs). When those four exist as infrastructure instead of heroics, pipeline stops depending on whether someone remembered to follow up.',
        ],
      },
      {
        h: 'What a working week actually looks like',
        list: [
          'Building a total addressable market list and an enrichment waterfall in Clay, so every contact has a verified email and context.',
          'Wiring signal detection: funding rounds, hiring surges, leadership changes. Outreach fires when there is a reason to talk.',
          'Shipping email and LinkedIn sequences that share suppression state, so nobody gets double-touched.',
          'Building the reply handoff: positive replies routed to Slack with context, sequences halted everywhere else.',
          'Dashboards that answer "what happened this week" without anyone exporting a CSV.',
        ],
      },
      {
        h: 'GTM engineer vs SDR vs RevOps',
        p: [
          'An SDR works inside the pipeline: calls, follow-ups, meetings booked. RevOps governs the process and the CRM. A GTM engineer builds the layer underneath both: the data, automations, and integrations that make the other two roles faster. If the SDR is the driver, the GTM engineer builds the car.',
        ],
      },
      {
        h: 'When to hire one',
        list: [
          'You own six sales tools and none of them talk to each other.',
          'Outbound works when the founder does it, and stops when the founder stops.',
          'Your list building, enrichment, and follow-up are all manual, and it shows in the pipeline.',
        ],
      },
      {
        h: 'When not to',
        p: [
          'If your offer has not closed organically yet, systems will only help you get ignored at scale. Fix the offer first, then build the machine. Any honest GTM engineer will tell you this in the first call.',
        ],
      },
    ],
    related: [
      { label: 'Hire a GTM engineer', to: '/gtm-engineer' },
      { label: 'Stop double-touching your leads', to: '/blog/stop-double-touching-leads' },
    ],
  },
  {
    slug: 'claude-ai-ops-manager-for-recruitment',
    title: 'What a Claude AI Ops Manager Does for a Recruitment Business',
    metaTitle: 'Claude AI Ops Manager for Recruitment Businesses | Daniyal Aziz',
    description:
      'Inside a Claude automation build for recruitment: the four skills every AI ops manager ships with, how it plugs into your ATS, and what changes in week one.',
    date: '2026-07-02',
    readTime: '6 min read',
    sections: [
      {
        p: [
          'I have shipped 20+ Claude agent workspaces for recruitment businesses. The most common misconception walking in: people expect a chatbot. What they get is closer to an operations hire that types fast, never forgets, and works inside their actual stack.',
        ],
      },
      {
        h: 'Not a chatbot',
        p: [
          'A chatbot answers questions. A Claude AI ops manager executes workflows: it reads your ATS, enriches candidates, drafts outreach in your voice, assembles business development campaigns, and writes your Friday pipeline report. The difference is tools and rules: the agent is wired into your systems and operates under an explicit contract about what it may and may not do.',
        ],
      },
      {
        h: 'The four skills every build ships with',
        list: [
          'Sourcing: parse a role intake, search the ATS pool first, enrich the shortlist with verified emails, score against the spec, draft outreach for approval.',
          'Business development: catch signals like funding rounds, build the decision-maker list, pull an angle from the playbook, stage email and LinkedIn sequences.',
          'Content: LinkedIn posts in the founder\'s actual voice, drafted from real placements and real opinions, never auto-published.',
          'Reporting: interviews, offers, placements, and pipeline story, posted to Slack every week without anyone compiling it.',
        ],
      },
      {
        h: 'Plugged into whatever ATS you already run',
        p: [
          'The agent is only useful if it can touch your real data. I have integrated 10+ ATS and CRM platforms, from Recruiterflow, Bullhorn, and Loxo to HubSpot, Crelate, and Invenias. The ATS stays the source of truth; the agent reads and writes through a bridge built for your exact system.',
        ],
      },
      {
        h: 'Guardrails are the product',
        p: [
          'Every workspace ships with rules: outbound is draft-only until a human approves, every candidate added carries a source tag, client data never leaves the workspace. The reason clients trust these systems after week one is not the intelligence. It is the brakes.',
        ],
      },
      {
        h: 'What changes in week one',
        list: [
          'Sourcing shortlists that used to eat an afternoon take minutes, with outreach already drafted.',
          'The Friday report writes itself and lands in Slack before the Friday call.',
          'Business development runs on signals instead of guilt.',
        ],
      },
    ],
    related: [
      { label: 'Claude automation services', to: '/claude-automation' },
      { label: 'AI automation vs another ops hire', to: '/blog/ai-automation-vs-hiring-ops' },
    ],
  },
  {
    slug: 'ai-automation-vs-hiring-ops',
    title: 'AI Automation vs Another Ops Hire: The Real Math',
    metaTitle: 'AI Automation vs Hiring an Ops Person: The Real Math | Daniyal Aziz',
    description:
      'When to automate and when to hire: the honest math on repetitive hours, what AI automation actually costs, and the hybrid setup that outperforms both.',
    date: '2026-06-25',
    readTime: '5 min read',
    sections: [
      {
        p: [
          'The default reflex when ops gets painful is to hire. Sometimes that is right. But if the pain is repetitive work, hiring rents a solution by the month while the problem quietly compounds. The alternative is to build the work away once.',
        ],
      },
      {
        h: 'The math on repetitive hours',
        p: [
          'Take a real example: onboarding a new client used to mean a week of back-and-forth emails, account setup, channel creation, and document sending. Multiply that by every new client, forever. The automated version runs the same day, every time, with zero manual steps. That build took days, not months, and it never asks for a raise.',
          'Do the same audit across your business: lead intake and routing, data entry between tools, weekly reporting, invoice processing. Anything a person does the same way twice a week is a candidate.',
        ],
      },
      {
        h: 'What automation actually costs',
        p: [
          'A production automation is a one-time build plus light maintenance. The catch most people miss: the build quality decides everything. A brittle no-code chain that fails silently costs more than the hours it saved. Real automations ship with monitoring, error recovery, and human approval gates on anything that leaves the building.',
        ],
      },
      {
        h: 'What you should still hire humans for',
        list: [
          'Judgment: pricing calls, exceptions, anything with a genuinely new situation every time.',
          'Relationships: clients buy from people. Automation should hand humans the context, not replace the conversation.',
          'Strategy: deciding what the machine should do next is a human job.',
        ],
      },
      {
        h: 'The hybrid that actually works',
        p: [
          'The setups that outperform are not "AI replaces the team". They are AI ops managers doing the repetitive 80 percent with humans approving the moments that matter: an agent drafts the outreach, a human sends it; an agent compiles the report, a human reads it in one minute instead of building it in three hours.',
          'Automate the repetitive layer first. Then, when you do hire, the human starts with leverage instead of a backlog.',
        ],
      },
    ],
    related: [
      { label: 'Hire an AI automation expert', to: '/ai-automation-expert' },
      { label: 'Ops integration services', to: '/ops-integrator' },
    ],
  },
  {
    slug: 'stop-double-touching-leads',
    title: 'Running Email and LinkedIn Outbound Together? Stop Double-Touching Your Leads',
    metaTitle: 'Stop Double-Touching Leads Across Email and LinkedIn | Daniyal Aziz',
    description:
      'When the same lead runs in cold email and LinkedIn campaigns, a reply on one channel should stop the other. How cross-channel reply protection works.',
    date: '2026-07-09',
    readTime: '4 min read',
    sections: [
      {
        p: [
          'A lead replies to your cold email on Tuesday. Positive, interested, asks for a call. On Wednesday your LinkedIn sequence, which has never heard of your email tool, sends them the day-3 bump. The lead now knows two things: you are running automation, and you are not paying attention.',
        ],
      },
      {
        h: 'Why it happens',
        p: [
          'Email tools and LinkedIn tools do not share state. Each one is confident it is doing its job. And the same person is rarely in just one campaign: they are split across LinkedIn audiences and pooled into email sends, so pausing "the campaign" fixes nothing. The lead is the unit that matters, not the campaign.',
        ],
      },
      {
        h: 'Match the person, not the campaign',
        p: [
          'The fix is a suppression layer that treats every lead as one human across every channel. When a reply lands anywhere, the system finds that person in every other running campaign and stops them there, within seconds, not at the next daily sync.',
        ],
      },
      {
        h: 'What the flow looks like',
        list: [
          'A reply lands on the email campaign.',
          'The system matches the person across all active LinkedIn campaigns.',
          'Every sequence for that person halts immediately.',
          'The reply is tagged and routed to Slack, so a human picks up the conversation while it is warm.',
        ],
      },
      {
        h: 'The payoff',
        p: [
          'Zero awkward double-touches, faster follow-up on warm replies, and channels that stack instead of colliding. I run this as always-on infrastructure across client accounts; there is a working miniature of the exact flow on my home page if you want to watch it react.',
        ],
      },
    ],
    related: [
      { label: 'GTM engineering services', to: '/gtm-engineer' },
      { label: 'See the systems I build', to: '/work' },
    ],
  },
  {
    slug: 'clay-for-outbound-explained',
    title: 'What Clay Actually Does for Outbound (Without the Hype)',
    metaTitle: 'What Clay Does for Outbound, Explained Simply | Daniyal Aziz',
    description:
      'Clay in plain terms: what enrichment waterfalls are, why they beat buying a list, and how I use Clay to make outbound land instead of bounce.',
    date: '2026-07-14',
    readTime: '6 min read',
    sections: [
      {
        p: [
          'Clay gets described as a hundred things because it can do a hundred things. Strip that away and it is one idea done extremely well: take a thin list of companies or people and turn it into a rich, verified, ready-to-message list, automatically. If your outbound bounces or lands on the wrong person, this is usually the missing piece.',
        ],
      },
      {
        h: 'The problem it solves',
        p: [
          'Bought lists are stale the day you buy them. Titles change, people leave, emails die. Send to that and you burn your domain reputation and your credibility at the same time. Clay fixes the data before a single message goes out.',
        ],
      },
      {
        h: 'Enrichment waterfalls, in plain English',
        p: [
          'A waterfall is just "try the best source first, fall back to the next if it fails." To find someone\'s verified work email, Clay asks provider A. No result? It asks provider B, then C, then a pattern-guess-and-verify step. You pay only when one succeeds, and you get a much higher hit rate than any single tool alone.',
          'The same trick works for company data: headcount, tech stack, funding, hiring signals, all stacked from multiple sources into one clean row.',
        ],
      },
      {
        h: 'Where the AI part comes in',
        list: [
          'Reading a company website and summarising what they actually do, in a line you can use in an opener.',
          'Classifying whether a lead fits your ICP so you never message the wrong segment.',
          'Drafting a personalised first line from real, current context instead of a mail-merge token.',
        ],
      },
      {
        h: 'How I use it for clients',
        p: [
          'I build the table once: your ICP flows in, the waterfalls enrich it, the AI columns qualify and personalise, and verified rows flow out to the email and LinkedIn tools. Then it runs on new leads without me touching it. That is the difference between a Clay demo and a Clay system.',
        ],
      },
    ],
    related: [
      { label: 'GTM engineering services', to: '/gtm-engineer' },
      { label: 'The outbound brain demo', to: '/work#outbound-brain' },
    ],
  },
  {
    slug: 'cold-email-deliverability-basics',
    title: 'Why Your Cold Email Lands in Spam (and How to Fix It)',
    metaTitle: 'Cold Email Deliverability: Why You Land in Spam | Daniyal Aziz',
    description:
      'The unglamorous mechanics that decide whether cold email reaches the inbox: domains, warm-up, SPF/DKIM/DMARC, volume, and content. A practical checklist.',
    date: '2026-07-16',
    readTime: '7 min read',
    sections: [
      {
        p: [
          'You can have the best offer and the sharpest copy and still get zero replies, because nobody read it. Deliverability is the boring layer underneath outbound that decides whether your email reaches the inbox or dies in spam. Most "our campaign failed" stories are really deliverability stories.',
        ],
      },
      {
        h: 'Never send from your main domain',
        p: [
          'If cold email hurts a domain\'s reputation, you do not want that to be the domain your invoices and client emails come from. The standard move is to buy separate lookalike sending domains, warm them up, and keep your primary domain clean.',
        ],
      },
      {
        h: 'Warm-up is not optional',
        p: [
          'A brand-new domain that suddenly sends 500 emails looks exactly like a spammer. Warm-up ramps sending slowly and simulates real conversations so mailbox providers learn to trust the domain first. Skipping it is the single most common mistake.',
        ],
      },
      {
        h: 'The three records that authenticate you',
        list: [
          'SPF: says which servers are allowed to send for your domain.',
          'DKIM: cryptographically signs your mail so it cannot be forged in transit.',
          'DMARC: tells providers what to do if SPF or DKIM fails, and gives you reporting.',
          'Miss these and a growing share of your mail never even gets considered for the inbox.',
        ],
      },
      {
        h: 'Volume and content still matter',
        p: [
          'Even with perfect setup, blasting too many emails per inbox per day, using spammy words, stuffing links, or writing one-size-fits-all copy will sink you. Keep per-inbox volume sane, spread across multiple inboxes, and write like a human who researched them.',
        ],
      },
      {
        h: 'The checklist',
        list: [
          'Separate sending domains, not your primary.',
          'Warm up every inbox before real sends.',
          'SPF, DKIM, and DMARC set correctly.',
          'Sane per-inbox daily volume, spread across inboxes.',
          'Personalised, link-light, human copy.',
          'Monitor placement and reply rates, not just opens.',
        ],
      },
    ],
    related: [
      { label: 'GTM engineering services', to: '/gtm-engineer' },
      { label: 'AI automation services', to: '/ai-automation-expert' },
    ],
  },
  {
    slug: 'how-to-choose-an-ats',
    title: 'How to Choose an ATS You Won\'t Regret in a Year',
    metaTitle: 'How to Choose an ATS for Your Recruitment Agency | Daniyal Aziz',
    description:
      'A practical framework for picking an applicant tracking system: the questions that actually matter, the API trap, and why integrations beat feature lists.',
    date: '2026-07-19',
    readTime: '6 min read',
    sections: [
      {
        p: [
          'I have integrated with more than ten ATS and CRM platforms, from Recruiterflow and Bullhorn to Loxo, HubSpot, Crelate, and Invenias. That vantage point teaches you something the sales demos will not: the flashiest ATS is rarely the one that serves you best in a year. Here is how to choose.',
        ],
      },
      {
        h: 'Start with your workflow, not the feature list',
        p: [
          'Every ATS demos beautifully. The question is not "what can it do" but "does it match how my team actually works." Map your real pipeline first, then judge each tool against it. A shorter feature list that fits your workflow beats a longer one that fights it.',
        ],
      },
      {
        h: 'The API is the part nobody checks',
        p: [
          'If you ever want to automate sourcing, outreach, or reporting, and you will, your ATS needs a real, documented API. Some popular systems have weak, rate-limited, or half-documented APIs that make automation painful. Ask to see the API docs before you sign, not after.',
        ],
      },
      {
        h: 'Questions that actually matter',
        list: [
          'Does it have a documented API, and can I get a key without a sales call?',
          'How does data get in and out? CSV export is not an integration.',
          'Does it fit my niche, exec search, staffing, and contract each have different needs?',
          'What does it cost as the team grows, per-seat pricing bites later.',
          'How painful is migrating my existing data in?',
        ],
      },
      {
        h: 'Integrations beat features',
        p: [
          'The ATS is the source of truth, but it should not be an island. The value shows up when it talks to your enrichment, outreach, and reporting tools. That is exactly the layer I build: a clean bridge between your ATS and everything else, so your data flows instead of getting re-typed.',
        ],
      },
    ],
    related: [
      { label: 'Ops integration services', to: '/ops-integrator' },
      { label: 'Claude automation for recruitment', to: '/blog/claude-ai-ops-manager-for-recruitment' },
    ],
  },
  {
    slug: 'n8n-vs-make-vs-zapier',
    title: 'n8n vs Make vs Zapier: Which One, and When',
    metaTitle: 'n8n vs Make vs Zapier: Which Automation Tool | Daniyal Aziz',
    description:
      'A builder\'s honest comparison of n8n, Make, and Zapier: where each wins, where each hurts, and how to pick without boxing yourself in later.',
    date: '2026-07-22',
    readTime: '6 min read',
    sections: [
      {
        p: [
          'I have shipped production automations on all three. None is best at everything, and the "which tool" question usually hides a better one: how complex is this going to get, and who has to maintain it? Here is the honest breakdown.',
        ],
      },
      {
        h: 'Zapier: fastest to start, first to hit a wall',
        p: [
          'Zapier is the easiest on-ramp. If you need "when this, do that" across common apps and you want it live in ten minutes, it is hard to beat. The wall arrives with complex logic, branching, and volume: it gets expensive fast and awkward once a workflow has real conditions.',
        ],
      },
      {
        h: 'Make: the visual middle ground',
        p: [
          'Make gives you a visual canvas with far more control than Zapier: branching, iterators, error handling, and better pricing at volume. It is my pick for moderately complex workflows where a team wants to see the logic laid out. The trade is a steeper learning curve.',
        ],
      },
      {
        h: 'n8n: the most power, self-hostable',
        p: [
          'n8n is where I build the heavy stuff. It is open, self-hostable (so data can stay in your infrastructure), handles genuinely complex logic, and lets you drop into code when a node does not exist. The cost is that it expects a more technical hand. For custom, high-volume, or privacy-sensitive systems, it wins.',
        ],
      },
      {
        h: 'How to actually choose',
        list: [
          'Simple, common apps, need it now: Zapier.',
          'Real branching and volume, want a visual build: Make.',
          'Complex logic, self-hosting, or code when needed: n8n.',
          'Unsure how big it will get: start on Make, it scales further than Zapier without the full n8n learning curve.',
        ],
      },
      {
        h: 'The real answer',
        p: [
          'The tool matters less than the build. A well-architected Zapier flow beats a sloppy n8n one. What decides success is monitoring, error recovery, and someone who has hit these walls before. That is the part I bring, whichever tool the job calls for.',
        ],
      },
    ],
    related: [
      { label: 'AI automation services', to: '/ai-automation-expert' },
      { label: 'AI automation vs another ops hire', to: '/blog/ai-automation-vs-hiring-ops' },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
