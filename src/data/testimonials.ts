/* Paste real client quotes here as they come in. The testimonials
   page renders the quotes section only when this array has entries,
   so nothing fake ever ships. */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [];

export interface ResultCard {
  metric: string;
  headline: string;
  detail: string;
}

export const RESULTS: ResultCard[] = [
  {
    metric: '20+',
    headline: 'AI ops managers shipped',
    detail:
      'Recruitment businesses running Claude agents that source, sell, write, and report inside their own stack, handed over with a guided tour.',
  },
  {
    metric: 'Same day',
    headline: 'Client onboarding, down from a week',
    detail:
      'Intake form to routed Slack channels, kickoff docs, and secure API key handoff with zero manual steps in between.',
  },
  {
    metric: '70%+',
    headline: 'Open rates on signal-based campaigns',
    detail:
      'Outbound triggered by funding rounds, hiring surges, and leadership changes, with double-digit reply rates feeding real conversations.',
  },
  {
    metric: 'Minutes',
    headline: 'Sourcing shortlists, down from an afternoon',
    detail:
      'ATS pool searched, candidates enriched and scored, outreach drafted and waiting for a human yes.',
  },
  {
    metric: '0',
    headline: 'Double-touched leads across channels',
    detail:
      'Cross-channel reply protection stops every sequence for a person the moment they reply anywhere.',
  },
  {
    metric: 'Hours to minutes',
    headline: 'Invoice processing across three entities',
    detail:
      'AI reads each PDF, assigns the GL code, and files it into Xero. Misroutes near zero.',
  },
];
