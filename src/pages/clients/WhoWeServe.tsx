import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";
import { personas } from "@/data/personas";

const WhoWeServe = () => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Who it's for", to: "/clients/who-we-serve" },
        { label: "All buyers" },
      ]}
      label="Who it's for"
      title="Eleven buyers. The same blind spot."
      lede="The vocabulary changes between a self-funded employer, a captive and an ACO. The arithmetic does not: whoever carries the risk needs to see it while there is still time to act."
      seoDescription="Eleven kinds of healthcare buyer, one shared blind spot. Whoever carries the risk needs to see it while there is still time to act on it."
      image={{
        src: "/img/img-cohort.jpg",
        alt: "A covered population with a handful of high-cost members highlighted",
      }}
      specs={[
        { k: "Buyer types", v: "11" },
        { k: "Shared problem", v: "Lagging data" },
        { k: "Shared need", v: "Lead time" },
      ]}
    >
      <PrimaryCta />
    </PageHeader>

    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="The index"
          title={
            <>
              Find yourself here,{" "}
              <span className="text-dim2">then read the specific case.</span>
            </>
          }
        />

        <div className="mt-14">
          {personas.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 8) * 0.035}>
              <Link
                to={`/clients/${p.slug}`}
                className="row-live group grid items-baseline gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-10"
              >
                <span className="font-display text-[21px] font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-navy md:text-[24px]">
                  {p.shortTitle}
                </span>
                <span className="text-[14.5px] leading-relaxed text-dim">
                  {p.tagline}
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>

    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band-tight">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <Reveal>
            <div className="border-t border-line pt-7">
              <span className="label text-dim2">Primer</span>
              <h3 className="mt-4 display-md text-ink">
                Understanding healthcare analytics
              </h3>
              <p className="mt-4 max-w-measure text-[15px] leading-relaxed text-ink/70">
                Why data quality governs everything downstream, how the model
                works, and the questions worth asking any vendor in this
                category.
              </p>
              <div className="mt-6">
                <Link
                  to="/clients/understanding-healthcare-analytics"
                  className="link-rule text-sm font-medium text-cyan-deep"
                >
                  Read the primer
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-t border-line pt-7">
              <span className="label text-dim2">Evidence</span>
              <h3 className="mt-4 display-md text-ink">
                What clients say, attributed
              </h3>
              <p className="mt-4 max-w-measure text-[15px] leading-relaxed text-ink/70">
                Named leaders at named organizations, including a partnership
                now in its seventeenth year.
              </p>
              <div className="mt-6">
                <Link
                  to="/clients/testimonials"
                  className="link-rule text-sm font-medium text-cyan-deep"
                >
                  Read the evidence
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default WhoWeServe;
