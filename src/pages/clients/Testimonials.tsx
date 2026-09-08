import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";
import { testimonials } from "@/data/testimonials";

const TestimonialsPage = () => {
  const [lead, ...rest] = testimonials;

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Who it's for", to: "/clients/who-we-serve" },
          { label: "Client evidence" },
        ]}
        label="Evidence"
        title="Named people, named organizations."
        lede="Anonymous praise proves nothing in a category this sceptical. Everything below is attributed, and the longest of these relationships is now in its seventeenth year."
        seoDescription="Attributed commentary from named leaders at Applied Health Analytics, In-House Physicians, Health 180 and others on working with HCRM."
        image={{
          src: "/img/img-network.jpg",
          alt: "Two organizations stitched together across a shared data set",
        }}
        specs={[
          { k: "Attributed quotes", v: String(testimonials.length) },
          { k: "Longest partnership", v: "17 years" },
        ]}
      >
        <PrimaryCta />
      </PageHeader>

      {/* lead quote — light band */}
      <section className="border-b border-line bg-mist text-ink">
        <div className="edge band">
          <Reveal>
            <figure>
              <span className="label text-dim2">Seventeen years</span>
              <blockquote className="mt-8 display-lg max-w-6xl text-balance text-ink">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-line pt-6">
                <span className="text-[16px] font-semibold text-ink">
                  {lead.author}
                </span>
                <span className="text-[15px] text-ink/60">{lead.role}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-deep">
                  {lead.company}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* the rest */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead label="Also on record" title="Five more, in full." />

          <div className="mt-14">
            {rest.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.06}>
                <figure className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-14">
                  <figcaption className="lg:col-span-4">
                    <div className="mt-4 font-display text-[19px] font-semibold tracking-[-0.03em] text-ink">
                      {t.author}
                    </div>
                    <div className="mt-1.5 text-[13.5px] text-dim">{t.role}</div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-dim2">
                      {t.company}
                    </div>
                  </figcaption>
                  <blockquote className="text-[17px] leading-[1.7] text-ink/80 lg:col-span-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </figure>
              </Reveal>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      {/* quantified impact — honest placeholder */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band-tight">
          <SectionHead
            label="Quantified impact"
            title="The numbers that belong here."
            lede="Attributed commentary earns attention. Audited figures close deals. These are the metrics HCRM should publish once clients have approved them."
          />
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-3">
            {[
              ["Covered lives under management", "[[CLIENT-SUPPLIED]]"],
              ["Cost avoided, aggregate", "[[CLIENT-SUPPLIED]]"],
              ["Average client tenure", "[[CLIENT-SUPPLIED]]"],
            ].map(([k, v]) => (
              <div key={k} className="bg-canvas px-6 py-8">
                <div className="label text-dim2">{k}</div>
                <div className="mt-4 font-mono text-[13px] text-navy">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Join the organizations that see claims before they land."
      />
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
