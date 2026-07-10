import { Helmet } from 'react-helmet-async';

/* Single source of truth for site-wide SEO. Change SITE_URL here if
   the deployment name ever changes. */
export const SITE_URL = 'https://automationsxdani.vercel.app';
export const SITE_NAME = 'Daniyal Aziz';
export const DEFAULT_IMAGE = `${SITE_URL}/daniyal.jpg`;

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Daniyal Aziz',
  alternateName: 'Daniyal Aziz',
  jobTitle: 'GTM Engineer & AI Automation Specialist',
  description:
    'AI automation expert and GTM engineer. Builds Claude automation, outbound systems, and ops integrations for businesses.',
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  email: 'mailto:daniyalaziz184@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'RecruiterGTM',
    url: 'https://www.recruitergtm.com',
  },
  sameAs: [
    'https://www.linkedin.com/in/daniyal-aziz-643309246/',
    'https://github.com/Daniyal1234-alt',
  ],
  knowsAbout: [
    'AI automation',
    'GTM engineering',
    'Claude AI agents',
    'Outbound systems',
    'Revenue operations',
    'ATS and CRM integrations',
    'Clay enrichment',
    'Cold email infrastructure',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'AI automation expert and GTM engineer. Claude automation, outbound systems, ops integration.',
  publisher: { '@type': 'Person', name: 'Muhammad Daniyal Aziz' },
};

/* ProfessionalService: helps answer engines classify what Daniyal
   sells, where, and at what focus, distinct from the Person entity. */
export const SERVICE_ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Daniyal Aziz, AI Automation & GTM Engineering',
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  description:
    'Freelance AI automation expert and GTM engineer. Builds Claude AI ops managers, signal-based outbound systems, and ops integrations for businesses worldwide.',
  founder: { '@type': 'Person', name: 'Muhammad Daniyal Aziz' },
  areaServed: 'Worldwide',
  availableLanguage: ['English'],
  knowsAbout: [
    'AI automation',
    'GTM engineering',
    'Claude AI agents',
    'Cold email infrastructure',
    'Clay enrichment',
    'ATS and CRM integrations',
  ],
  sameAs: [
    'https://www.linkedin.com/in/daniyal-aziz-643309246/',
    'https://github.com/Daniyal1234-alt',
  ],
};

/* Breadcrumb JSON-LD from [name, path] pairs. */
export const breadcrumbSchema = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: object[];
}

export const Seo = ({ title, description, path, type = 'website', image = DEFAULT_IMAGE, jsonLd = [] }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};
