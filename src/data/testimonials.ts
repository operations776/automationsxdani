/* Real client words only. Nothing here is invented.
   These are verbatim (lightly trimmed) from recruitment business owners
   in the RecruiterGTM community who used systems Daniyal built and
   thanked him publicly. Names are withheld because they are clients of
   RecruiterGTM, so attribution is by role and business type instead.
   Never add a quote nobody actually said. */

export interface Testimonial {
  /* Their actual words. Verbatim, lightly trimmed. Never invented. */
  quote: string;
  /* Anonymised attribution: who they are, not their name. */
  attribution: string;
  /* The honest emotional state they described before the work landed.
     Drawn from what they said, not imagined for them. */
  before: string;
  /* The turn: what shifted for them. */
  after: string;
  /* Where they said it, so every claim stays traceable internally. */
  context?: string;
  /* Colour for the avatar mark, so each person reads as an individual. */
  tone: 'coral' | 'sky' | 'mint' | 'butter' | 'grape';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Daniyal just massively helped me out on Claude Code. I was pretty close to packing it in and going for a non AI native solution and he smashed it. Good job dude, thanks.',
    attribution: 'Recruitment business owner',
    before: 'Ready to give up on AI entirely',
    after: 'Stayed, and shipped it',
    context: 'After a rescue session on a Claude build he was about to abandon',
    tone: 'coral',
  },
  {
    quote:
      'I was shocked by the speed with which we received responses. This is the first time I had a positive reply using cold email. I have tried to get results with cold email for years and never saw a result. Thank you for helping us get it set up.',
    attribution: 'Founder, US recruitment firm',
    before: 'Years of cold email, never a single result',
    after: 'A real reply within the hour',
    context: 'On the cold email infrastructure and campaign setup',
    tone: 'sky',
  },
  {
    quote:
      'A call with Daniyal pieced everything together. I really needed that.',
    attribution: 'Founder, recruitment firm',
    before: 'Pieces everywhere, nothing clicking',
    after: 'It finally made sense',
    context: 'On a walkthrough of his Claude setup',
    tone: 'mint',
  },
  {
    quote:
      'I got a booked call for a VP search today from my video email campaign. They said it was the most unique way to present a candidate.',
    attribution: 'Owner, executive search firm',
    before: 'Another campaign that would probably go nowhere',
    after: 'A booked call, and a prospect who noticed',
    context: 'On the video email campaign system',
    tone: 'butter',
  },
  {
    quote:
      'Everyone else quoted us two weeks for this. Daniyal turned it around in three days.',
    attribution: 'Delivery lead, AI consultancy',
    before: 'Bracing for a two week wait',
    after: 'Shipped in three days',
    context: 'Trilles AI, on a client project delivery',
    tone: 'grape',
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
    metric: 'Rescued',
    headline: 'A Claude build that was about to be abandoned',
    detail:
      'An owner was ready to give up on the AI-native approach entirely and fall back to a manual solution. One session on the hard parts and the system shipped. He stayed on Claude.',
  },
  {
    metric: 'First reply',
    headline: 'Cold email that finally landed',
    detail:
      'A firm that had tried cold email for years without a single result got a positive prospect reply within an hour of their first campaign going live on the infrastructure I set up.',
  },
  {
    metric: 'Connected',
    headline: 'Claude wired directly into the ATS',
    detail:
      'I built and documented the bridge that lets Claude search, tag, enrich, and update candidates inside Recruiterflow without anyone clicking through the interface. Handed over so other recruiters could run it themselves.',
  },
  {
    metric: 'Scheduled',
    headline: 'Agents that run without anyone opening the app',
    detail:
      'Claude jobs that fire on their own schedule, every morning or every Monday, and drop the output into Gmail, Slack, or Notion. The work happens whether you are at your desk or not.',
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
