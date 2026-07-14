/* Real client words only. Nothing here is invented.
   These are verbatim (lightly trimmed) from recruitment business owners
   in the RecruiterGTM community who used systems Daniyal built and
   thanked him publicly. Names are withheld because they are clients of
   RecruiterGTM, so attribution is by role and business type instead.
   Never add a quote nobody actually said. */

export interface Testimonial {
  quote: string;
  /* Anonymised attribution: who they are, not their name. */
  attribution: string;
  /* Where they said it, so the claim is traceable internally. */
  context?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I was shocked by the speed with which we received responses. This is the first time I had a positive reply using cold email. I have tried to get results with cold email for years and never saw a result. Thank you for helping us get it set up.",
    attribution: 'Founder, US recruitment firm',
    context: 'On the cold email infrastructure and campaign setup, community post',
  },
  {
    quote:
      'I got a booked call for a VP search today from my video email campaign. They said it was the most unique way to present a candidate.',
    attribution: 'Owner, executive search firm',
    context: 'On the video email campaign system, community post',
  },
];

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
    metric: 'First reply',
    headline: 'Cold email that finally landed',
    detail:
      'A firm that had tried cold email for years without a single result got a positive prospect reply within an hour of their first campaign going live on the infrastructure I set up.',
  },
  {
    metric: 'Booked',
    headline: 'A VP search call from a video email campaign',
    detail:
      'The prospect said it was the most unique way they had seen a candidate presented. The campaign system was built and handed over to the client.',
  },
  {
    metric: 'Live',
    headline: 'Business development pipelines that build themselves',
    detail:
      'Job postings scraped as a hiring signal, decision-makers found and verified, leads deduplicated against current clients, sequences written and loaded, and everything imported to the ATS. Clients had positive responses within the first week.',
  },
  {
    metric: 'Hours to minutes',
    headline: 'Invoice processing across four entities',
    detail:
      'Replaced an outsourced bookkeeping firm: AI reads each invoice, assigns GL codes and tax treatment, and files it into Xero. Misroutes near zero.',
  },
];
