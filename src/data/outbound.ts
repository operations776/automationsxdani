/* Real outbound numbers, pulled from the HeyReach and Instantly APIs
   across three client accounts I run. Aggregated, never per-client, and
   no client is named. Nothing here is estimated.

   Last pulled: 2026-08-05. To refresh, re-run the aggregate against the
   same six API keys and update the figures below. */

export const OUTBOUND_UPDATED = 'August 2026';

export interface ChannelStats {
  id: 'email' | 'linkedin';
  label: string;
  logo: string;
  /* headline number for the channel */
  primary: { value: string; label: string };
  rows: { label: string; value: string; note?: string }[];
}

export const CHANNELS: ChannelStats[] = [
  {
    id: 'email',
    label: 'Cold email',
    logo: 'instantly.png',
    primary: { value: '15,703', label: 'emails sent' },
    rows: [
      { label: 'Prospects contacted', value: '15,307' },
      { label: 'Leads loaded', value: '4,811' },
      { label: 'Replies', value: '171' },
      { label: 'Bounce rate', value: '0.97%', note: 'under the 2% danger line' },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    logo: 'heyreach.png',
    primary: { value: '8,270', label: 'connection requests' },
    rows: [
      { label: 'Unique people reached', value: '8,443' },
      { label: 'Connections accepted', value: '1,837', note: '22% acceptance' },
      { label: 'Messages sent', value: '2,565' },
      { label: 'Replies', value: '788', note: '32% of conversations' },
    ],
  },
];

/* The funnel, both channels combined. */
export const FUNNEL = [
  { label: 'Touches delivered', value: 26538, display: '26,538' },
  { label: 'People reached', value: 13254, display: '13,254' },
  { label: 'Conversations opened', value: 4275, display: '4,275' },
  { label: 'Replies', value: 959, display: '959' },
  { label: 'Positive replies', value: 293, display: '293' },
];

/* Headline counters. */
export const HEADLINES = [
  { value: '26,538', label: 'Outbound touches delivered' },
  { value: '61', label: 'Campaigns built and run' },
  { value: '959', label: 'Replies generated' },
  { value: '0.97%', label: 'Email bounce rate' },
];

/* The data layer feeding all of it. Clay is where the lists get built,
   enriched, and qualified before a single message goes out. */
export const DATA_LAYER = {
  tool: 'Clay',
  logo: 'clay.png',
  headline: 'Every list starts in Clay',
  points: [
    'Enrichment waterfalls that try provider after provider until a verified email comes back, so you only pay for hits and the bounce rate stays under 1%.',
    'Claygent research columns that read a company site and write the one line of context an opener actually needs.',
    'ICP scoring and dedupe before anything reaches a sequence, so nobody gets messaged twice or messaged wrongly.',
    'Signal tables that watch for funding, hiring, and leadership changes, then push the fresh ones straight into campaigns.',
  ],
  stat: { value: '17', label: 'client stacks running Clay' },
};

/* Monthly LinkedIn activity, straight from the API day stats. Months with
   no sending are real gaps (campaigns paused), not missing data. */
export interface TrendPoint {
  month: string;
  short: string;
  touches: number;
  replies: number;
}

export const TREND: TrendPoint[] = [
  { month: '2025-04', short: 'Apr', touches: 295, replies: 21 },
  { month: '2025-05', short: 'May', touches: 734, replies: 107 },
  { month: '2025-06', short: 'Jun', touches: 0, replies: 0 },
  { month: '2025-07', short: 'Jul', touches: 357, replies: 46 },
  { month: '2025-08', short: 'Aug', touches: 574, replies: 45 },
  { month: '2025-09', short: 'Sep', touches: 1188, replies: 64 },
  { month: '2025-10', short: 'Oct', touches: 1418, replies: 30 },
  { month: '2025-11', short: 'Nov', touches: 907, replies: 27 },
  { month: '2025-12', short: 'Dec', touches: 778, replies: 46 },
  { month: '2026-01', short: 'Jan', touches: 519, replies: 21 },
  { month: '2026-06', short: 'Jun', touches: 776, replies: 83 },
  { month: '2026-07', short: 'Jul', touches: 2878, replies: 265 },
  { month: '2026-08', short: 'Aug', touches: 411, replies: 33 },
];
