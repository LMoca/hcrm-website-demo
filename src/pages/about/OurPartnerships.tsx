import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";
import { testimonials } from "@/data/testimonials";

const categories = [
  {
    n: "01",
    t: "Analytics partners",
    b: "Organizations that embed HRM output inside their own client reporting.",
  },
  {
    n: "02",
    t: "Care delivery partners",
    b: "Clinical groups that act on the members HRM flags.",
  },
  {
    n: "03",
    t: "Distribution partners",
    b: "Consultants and administrators who bring HRM to the plans they advise.",
  },
];

const OurPartnerships = () => {
  const named = testimonials.map((t) => t.company);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Company", to: "/about/who-we-are" },
          { label: "Our Partnerships" },
        ]}
        label="Company"
        title="Who we build alongside."
        lede="HRM sits inside other people's workflows as often as it sits on its own. These are the relationship types that extend what the platform can reach."
        seoDescription="The analytics, care delivery and distribution partners HCRM builds alongside, including a working relationship now in its seventeenth year."
        image={{
          src: "/img/img-network.jpg",
          alt: "Two organizations stitched together across a shared data set",
        }}
        specs={[{ k: "Longest partnership", v: "17 years" }]}
      >
        <PrimaryCta />
      </PageHeader>

      {/* named organisations we can evidence today */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="On record"
            title={
              <>
                Organizations who have{" "}
                <span className="text-dim2">put their name to the work.</span>
              </>
            }
            lede="Each of these has provided attributed commentary on working with HCRM. Logo usage, formal partner tiers and case studies are still to be confirmed."
          />

          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {named.map((c, i) => (
              <Reveal key={c} delay={Math.min(i, 5) * 0.05} className="bg-canvas">
                <div className="group flex h-full items-center justify-between gap-4 p-7 transition-colors duration-500 hover:bg-mist">
                  <span className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ink">
                    {c}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 border-l-2 border-navy pl-4 font-mono text-[11px] leading-relaxed text-dim2">
              [[CLIENT-SUPPLIED: written permission for logo usage, formal
              partner tiers, and a description of what each relationship
              delivers.]]
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-mist text-ink">
        <div className="edge band-tight">
          <SectionHead
            label="Relationship types"
            tone="light"
            align="stacked"
            title="Three ways a partnership works here."
          />
          <div className="mt-10">
            {categories.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.06}>
                <div className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-10">
                  <h3 className="font-display text-[21px] font-semibold tracking-[-0.03em] text-ink md:col-span-5">
                    {c.t}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink/70 md:col-span-7">
                    {c.b}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      <CTASection
        title="Considering a partnership?"
        description="Tell us where HRM would sit in your workflow and we will show you the output first."
      />
      <Footer />
    </div>
  );
};

export default OurPartnerships;
