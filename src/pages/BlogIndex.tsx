import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/footer';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { POSTS } from '@/data/posts';
import { Seo, PERSON_SCHEMA, breadcrumbSchema } from '@/lib/seo';

const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Blog: AI Automation, GTM Engineering & Claude Agents | Daniyal Aziz"
        description="Practical writing on AI automation, GTM engineering, Claude agents, and ops integration, from someone who ships these systems for real businesses."
        path="/blog"
        jsonLd={[
          breadcrumbSchema([
            ['Home', '/'],
            ['Blog', '/blog'],
          ]),
          PERSON_SCHEMA,
        ]}
      />
      <Navigation />

      <main className="pt-24 pb-20">
        <section className="py-16 bg-dot-grid border-b border-border mb-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">Blog</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight mb-4">
                Notes from the build queue
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Practical writing on AI automation, GTM engineering, and Claude agents, from
                someone who ships these systems for a living. No fluff, no listicles.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl bg-card shadow-card p-6 hover-lift"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime}
                </p>
                <h2 className="text-lg font-bold font-heading tracking-tight text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read the post
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
