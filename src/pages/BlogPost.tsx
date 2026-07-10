import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Mail } from 'lucide-react';
import { Post } from '@/data/posts';
import { Seo, PERSON_SCHEMA, breadcrumbSchema, DEFAULT_IMAGE, SITE_URL } from '@/lib/seo';
import { gmailCompose } from '@/lib/contact';
import { asset } from '@/lib/asset';

const BlogPost = ({ post }: { post: Post }) => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: DEFAULT_IMAGE,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Muhammad Daniyal Aziz',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Muhammad Daniyal Aziz',
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={post.metaTitle}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[
          articleSchema,
          breadcrumbSchema([
            ['Home', '/'],
            ['Blog', '/blog'],
            [post.title, `/blog/${post.slug}`],
          ]),
          PERSON_SCHEMA,
        ]}
      />
      <Navigation />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </nav>

            <header className="mb-10">
              <p className="text-xs text-muted-foreground mb-3">
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{post.description}</p>
            </header>

            <div className="space-y-6">
              {post.sections.map((section, i) => (
                <div key={i} className="space-y-4">
                  {section.h && (
                    <h2 className="text-xl md:text-2xl font-bold font-heading tracking-tight pt-2">{section.h}</h2>
                  )}
                  {section.p?.map((para, j) => (
                    <p key={j} className="text-foreground/85 leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-2.5">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex gap-3 text-foreground/85 leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Author */}
            <div className="mt-12 rounded-xl bg-card border border-border shadow-sm p-5 flex items-center gap-4">
              <img
                src={asset('daniyal.jpg')}
                alt="Muhammad Daniyal Aziz"
                className="w-14 h-14 rounded-full object-cover border border-border"
                loading="lazy"
              />
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">Muhammad Daniyal Aziz</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  GTM Engineer and AI Automation Specialist at RecruiterGTM. 20+ Claude agent
                  workspaces and 50+ production automations shipped.
                </p>
              </div>
            </div>

            {/* Related */}
            <div className="mt-10">
              <h2 className="text-sm font-bold font-heading uppercase tracking-wide text-muted-foreground mb-3">
                Keep reading
              </h2>
              <ul className="space-y-2">
                {post.related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="text-primary font-medium hover:text-primary-hover inline-flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-term-bg p-8 text-center space-y-4">
              <p className="text-lg font-semibold text-white font-heading">
                Want systems like this in your business?
              </p>
              <Button size="lg" asChild className="bg-term-green text-term-bg hover:bg-term-green/85 font-semibold px-8">
                <a href={gmailCompose('Project inquiry')} target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 w-4 h-4" />
                  Work with me
                </a>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
