import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import { blogPosts } from "@/data/blogPosts";

const Resources = () => {
  const [lead, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
        label="Insights"
        title="Writing on claims, cost and risk."
        lede="Practical pieces on data quality, shock-loss prediction, program measurement and what actually happens at renewal. No thought leadership, no predictions about the future of healthcare."
        seoDescription="Practical writing on claims data quality, shock-loss prediction, measuring program ROI in dollars, and what actually happens at renewal."
        image={{
          src: "/img/img-ledger.jpg",
          alt: "A reporting surface with the projected dollar column carrying the result",
        }}
        specs={[{ k: "Articles", v: String(blogPosts.length) }]}
      />

      {/* lead article */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band-tight">
          <Reveal>
            <Link
              to={`/resources/${lead.slug}`}
              className="group grid gap-8 lg:grid-cols-12 lg:gap-14"
            >
              <div className="lg:col-span-3">
                <span className="label text-navy">Latest</span>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-dim2">
                  {lead.category}
                </div>
                <time className="mt-1 block font-mono text-[11px] tabular-nums text-dim2">
                  {lead.date}
                </time>
              </div>
              <div className="lg:col-span-9">
                <h2 className="display-lg text-balance text-ink transition-colors group-hover:text-navy">
                  {lead.title}
                </h2>
                <p className="mt-6 max-w-measure-wide text-[16px] leading-relaxed text-dim">
                  {lead.excerpt}
                </p>
                <span className="link-rule mt-7 inline-flex text-sm font-medium text-navy">
                  Read the article
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* index */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <span className="label text-dim2">Archive</span>
          <div className="mt-8">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  to={`/resources/${post.slug}`}
                  className="row-live group grid grid-cols-1 gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-10"
                >
                  <div className="md:col-span-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim2">
                      {post.category}
                    </div>
                    <time className="mt-1 block font-mono text-[11px] tabular-nums text-dim2">
                      {post.date}
                    </time>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-[22px] font-semibold tracking-[-0.035em] text-ink transition-colors group-hover:text-navy md:text-[26px]">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-measure-wide text-[14.5px] leading-relaxed text-dim">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
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

export default Resources;
