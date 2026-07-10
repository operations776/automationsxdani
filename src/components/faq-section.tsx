/* Home FAQ. Doubles as AEO fuel: the same Q&A is emitted as FAQPage
   JSON-LD (see Index.tsx), so answer engines can lift direct answers.
   Answers are written to stand alone in a snippet, first sentence
   carries the point. */

export const HOME_FAQS = [
  {
    q: 'What does an AI automation expert do?',
    a: 'An AI automation expert builds systems that do repetitive business work automatically, using AI where judgment is needed. That covers lead intake, data enrichment, outreach, invoicing, and reporting, wired into the tools a business already uses, with human approval on anything that goes out.',
  },
  {
    q: 'What is a GTM engineer?',
    a: 'A GTM engineer builds the infrastructure a revenue team runs on: data and enrichment pipelines, signal detection, multichannel sequences, and reply handling. An SDR works the pipeline; a GTM engineer builds the machine that fills it.',
  },
  {
    q: 'How much does it cost to hire Daniyal?',
    a: 'Pricing depends on scope. Most engagements are a one-time build plus light ongoing support, scoped on a short call. The fastest way to a number is to describe what you want to automate through the contact form.',
  },
  {
    q: 'Which tools and platforms do you work with?',
    a: 'Claude and the Claude Agent SDK for agents; Clay, Instantly, HeyReach, Lemlist, Apollo, and Exa for GTM; 10+ ATS and CRM platforms including Recruiterflow, Bullhorn, Loxo, and HubSpot; plus Next.js, Supabase, Slack, Notion, n8n, and Make.',
  },
  {
    q: 'Do you work with businesses outside your timezone?',
    a: 'Yes. Daniyal works with businesses worldwide, remotely, and has delivered systems for clients across North America, Europe, Australia, and Asia.',
  },
  {
    q: 'How quickly can you deliver?',
    a: 'The first automation is usually live within days. A recent onboarding build cut a client\'s setup from a week of manual back-and-forth to a same-day automated flow.',
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
              Questions people ask
            </h2>
          </div>
          <div className="space-y-6">
            {HOME_FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl bg-card shadow-card p-6">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
