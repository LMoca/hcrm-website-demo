import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import NotFound from "@/pages/NotFound";
import Reveal from "@/components/kit/Reveal";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";

const BlogPostPage = ({ slug }: { slug: string }) => {
  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const minutes = Math.max(
    2,
    Math.round(post.content.join(" ").split(/\s+/).length / 220)
  );
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Insights", to: "/resources" },
          { label: post.category },
        ]}
        label={post.category}
        title={post.title}
        lede={post.excerpt}
        seoDescription={post.metaDescription}
        specs={[
          { k: "Published", v: post.date },
          { k: "Reading time", v: `${minutes} min` },
        ]}
      />

      {/* body on paper */}
      <article className="border-b border-line bg-mist text-ink">
        <div className="edge band">
          <div className="mx-auto max-w-[44rem]">
            {post.content.map((para, i) => (
              <Reveal key={i} delay={Math.min(i, 5) * 0.04}>
                <p
                  className={`text-[17.5px] leading-[1.78] text-ink/85 md:text-[18px] ${
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.6rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-ink"
                      : "mt-7"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-14 border-t border-line pt-7">
                <span className="label text-dim2">Written by</span>
                <p className="mt-3 text-[15px] text-ink/70">
                  The HCRM team. Questions about anything here belong in a demo
                  rather than an inbox, and we would rather show you the output.
                </p>
                <Link
                  to="/contact"
                  className="link-rule mt-5 inline-flex text-sm font-medium text-cyan-deep"
                >
                  Book a free demo
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* keep reading */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band-tight">
          <span className="label text-dim2">Keep reading</span>
          <div className="mt-8">
            {others.map((p, i) => (
              <Link
                key={p.slug}
                to={`/resources/${p.slug}`}
                className="row-live group grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-[11px] tabular-nums text-dim2 transition-colors group-hover:text-navy">
                    {p.category}
                  </span>
                </div>
                <h3 className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-navy md:col-span-9 md:text-[21px]">
                  {p.title}
                </h3>
              </Link>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default BlogPostPage;
