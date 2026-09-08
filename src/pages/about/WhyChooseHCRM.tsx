import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/kit/Reveal";
import Figure from "@/components/kit/Figure";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";

const pillars = [
  {
    n: "01",
    title: "Accurate predictions",
    summary: "95%+ data-normalization accuracy, measured on client data.",
    test: "Ask to see the exception report during your trial.",
    details: [
      "The normalization engine cleanses, standardizes and validates claims from any source before anything reaches the predictive model.",
      "95%+ is measured across client datasets, not asserted from a lab sample. It is the foundation every forecast inherits.",
      "When HRM says a member is trending toward a high-cost event, that projection is meant to survive a conversation with your CFO and your stop-loss carrier.",
    ],
  },
  {
    n: "02",
    title: "Risk expressed in dollars",
    summary: "Every forecast is a spend figure, never an abstract index.",
    test: "Hand one output to finance and one to clinical. Same number.",
    details: [
      "Conventional risk-scoring produces numbers clinical teams understand and finance teams cannot use. HRM closes that gap by refusing to produce them.",
      "Member risk is projected spend. Program impact is dollars avoided. Renewal exposure is a figure you can put in a budget line.",
      "Finance, clinical and executive stakeholders end up reading the same number instead of translating between three vocabularies.",
    ],
  },
  {
    n: "03",
    title: "Ahead of rising cost",
    summary: "12 months of lead time, not 12 weeks of hindsight.",
    test: "Compare a flag date against the claim date it anticipated.",
    details: [
      "HRM reads 24 months of claims history to project the next twelve, so foresight arrives while there is still something to decide.",
      "That window is where intervention, renegotiation and plan redesign actually happen. Without it you are reconciling costs already incurred.",
      "At renewal you arrive with your own data-backed projection rather than the narrative supplied by the party quoting you.",
    ],
  },
];

const also = [
  { k: "HIPAA-compliant handling", v: "Claims data handled to the standards healthcare buyers require." },
  { k: "Any-source ingestion", v: "Medical and pharmacy claims in whatever format your TPA already produces." },
  { k: "Outcome measurement", v: "Every wellness, care management and intervention program measured in dollars." },
];

const WhyChooseHCRM = () => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Company", to: "/about/who-we-are" },
        { label: "Why Choose HCRM" },
      ]}
      label="Company"
      title="Three claims, and how to test each one."
      lede="Accuracy, dollar-denominated risk, and lead time. Everything else in this category is a dashboard with a different colour scheme."
      seoDescription="Accuracy, risk denominated in dollars, and twelve months of lead time. Three claims about HCRM, each with the way to test it during a free trial."
      image={{
        src: "/img/img-signal.jpg",
        alt: "A member trajectory crossing a risk threshold well ahead of the event",
      }}
      specs={[
        { k: "Accuracy", v: "95%+" },
        { k: "Lead time", v: "12 months" },
        { k: "Output unit", v: "Dollars" },
      ]}
    >
      <PrimaryCta />
    </PageHeader>

    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="The three"
          title={
            <>
              Stated plainly,{" "}
              <span className="text-dim2">with the test attached.</span>
            </>
          }
          lede="A claim you cannot verify during a free trial is not a claim, it is a slogan. Each of these comes with the way to check it."
        />

        <div className="mt-16">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.07}>
              <div className="grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <h3 className="display-md text-balance text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-measure text-[15.5px] leading-relaxed text-ink/70">
                    {p.summary}
                  </p>
                  <div className="mt-6 border border-line bg-mist px-4 py-3">
                    <span className="label text-dim2">How to test it</span>
                    <p className="mt-2 text-[13.5px] text-navy">{p.test}</p>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {p.details.map((d, j) => (
                    <p
                      key={j}
                      className={`text-[15.5px] leading-relaxed text-dim ${
                        j > 0 ? "mt-5" : ""
                      }`}
                    >
                      {d}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>

    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHead
              label="Also true"
              align="stacked"
              title="Three more, stated without ceremony."
            />
          </div>
          <Figure
            className="lg:col-span-5"
            src="/img/img-network.jpg"
            alt="Two organizations stitched together across one shared data set"
            cut="tl-br"
            ratio="aspect-[16/10]"
            delay={0.08}
          />
        </div>
        <div className="mt-10">
          {also.map((a, i) => (
            <Reveal key={a.k} delay={i * 0.06}>
              <div className="grid gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-10">
                <h3 className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ink md:col-span-4">
                  {a.k}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink/70 md:col-span-8">
                  {a.v}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>

    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="Objections"
          title="The harder questions."
          lede="Including the ones where our answer is currently incomplete."
        />
        <div className="mt-14">
          <FaqList />
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default WhyChooseHCRM;
