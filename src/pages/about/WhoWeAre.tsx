import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import Figure from "@/components/kit/Figure";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";

const story = [
  "Healthcare in the United States generates an enormous volume of claims data every day. Every visit, prescription, lab test and hospital stay produces a record. For most organizations that data sits in silos, arrives weeks late, and arrives in formats that are inconsistent, incomplete and impossible to compare across sources.",
  "HCRM's president saw this gap firsthand. Organizations were making multi-million-dollar decisions about healthcare cost, risk and program investment on the basis of lagging indicators and instinct. They had the data. What they lacked was foresight.",
  "So we built Health Risk Monitor. HRM ingests medical and pharmacy claims from any source, normalizes them to 95%+ accuracy, and runs them through a predictive model that forecasts future healthcare spending at member and group level. It identifies high-risk members before claims land, translates clinical and financial risk into dollars, and measures whether health programs actually worked.",
  "We serve organizations of every size, from self-funded employers managing their own plans to insurance companies, stop-loss carriers, TPAs, ACOs, population health teams, health plans, clinics and health management vendors. What our clients share is a disposition: data-literate, risk-averse, and allergic to hype. They do not want another dashboard. They want foresight they can act on, expressed in dollars they can defend.",
];

const principles = [
  {
    n: "01",
    t: "Data quality is not a feature",
    b: "We built the normalization engine before the model, because a prediction inherits every error underneath it.",
  },
  {
    n: "02",
    t: "Dollars, not scores",
    b: "An abstract risk index stalls between the clinical team and the CFO. A projected spend figure does not.",
  },
  {
    n: "03",
    t: "Report the result, not the hope",
    b: "Outcome assessment surfaces programs that failed as readily as programs that worked. Anything else is marketing.",
  },
];

const WhoWeAre = () => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Company", to: "/about/who-we-are" },
        { label: "Who We Are" },
      ]}
      label="Company"
      title="We turn claims data into dollars at risk."
      lede="HCRM was founded on a gap that had gone unclosed for years: organizations were drowning in claims data and had nothing that turned it into financial foresight."
      seoDescription="HCRM was built to close one gap: organizations drowning in claims data with nothing that turned it into defensible financial foresight."
      image={{
        src: "/img/img-strata.jpg",
        alt: "Independent data layers resolving into one measured surface",
      }}
      specs={[
        { k: "Founded on", v: "A data-quality problem" },
        { k: "Flagship", v: "Health Risk Monitor" },
        { k: "Longest partnership", v: "17 years" },
      ]}
    >
      <PrimaryCta />
    </PageHeader>

    {/* narrative, set on paper for reading */}
    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="label text-cyan-deep">The origin</span>
            </Reveal>
            <Figure
              className="mt-8 hidden lg:block"
              src="/img/img-people.jpg"
              alt="An organization drawn as a lattice of roles, a few carrying the load"
              cut="small"
              ratio="aspect-[4/5]"
              delay={0.1}
            />
          </div>
          <div className="lg:col-span-9 lg:max-w-[46rem]">
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p
                  className={`text-[17px] leading-[1.75] text-ink/80 md:text-[18px] ${
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-ink"
                      : "mt-7"
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* principles */}
    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="How we work"
          title={
            <>
              Three positions{" "}
              <span className="text-dim2">we have not traded away.</span>
            </>
          }
        />
        <div className="mt-14">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.07}>
              <div className="grid gap-4 border-t border-line py-9 md:grid-cols-12 md:gap-10">
                <h3 className="display-md text-ink md:col-span-6">{p.t}</h3>
                <p className="text-[15.5px] leading-relaxed text-dim md:col-span-6 md:pt-2">
                  {p.b}
                </p>
              </div>
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

export default WhoWeAre;
