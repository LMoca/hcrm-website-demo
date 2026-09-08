import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import NormalizationPanel from "@/components/hrm/NormalizationPanel";

const sections = [
  {
    n: "01",
    title: "Why data quality governs everything after it",
    body: "Predictive analytics is only as good as the data underneath it. Claims arrive in dozens of formats from different providers, TPAs and clearinghouses. Provider names are spelled differently across systems. Procedure codes get truncated or miscoded. Pharmacy claims use identifiers that do not map cleanly to clinical categories. Any one of these errors, multiplied across millions of claim lines, can distort a model enough to make its forecasts unreliable. HCRM built the normalization engine first, and reaches 95%+ accuracy before any prediction is attempted.",
  },
  {
    n: "02",
    title: "How claims-based prediction actually works",
    body: "HRM reads 24 months of claims history for every member: diagnosis trajectories, pharmacy utilization patterns, cost trends. It identifies patterns resembling those of members who previously generated high-cost events, and projects each member's future spend with a confidence interval. The output is a dollar figure attached to a time window, not a score.",
  },
  {
    n: "03",
    title: "From risk scores to dollars",
    body: "Conventional risk-scoring produces numbers clinical teams understand and finance teams cannot use. A risk score of 3.2 means nothing to a CFO. A projected claims amount of $75,000 inside six months means everything. Translating clinical risk into financial language is what lets finance, clinical and executive stakeholders look at one number and reach one decision.",
  },
  {
    n: "04",
    title: "Measuring whether a program worked",
    body: "Outcome assessment compares the predicted spend trajectory of intervened members against their actual spend afterwards. The difference, in dollars, is the measured financial impact. It works for any intervention with an identifiable participant list: wellness, care management, employer clinics, condition-specific programs. Crucially, it reports failures as readily as successes.",
  },
  {
    n: "05",
    title: "What to ask any vendor in this category",
    body: "Ask about normalization first. What accuracy do they achieve, how is it measured, and what happens to claims they cannot resolve? Then ask about outputs: are forecasts denominated in dollars or in scores? Can program ROI be measured against a predicted baseline? Can shock-loss thresholds be configured to your actual attachment point? The answers tell you whether the predictions are worth acting on.",
  },
];

const UnderstandingAnalytics = () => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Who it's for", to: "/clients/who-we-serve" },
        { label: "Understanding Analytics" },
      ]}
      label="Primer"
      title="Understanding healthcare analytics."
      lede="A plain-language explanation of how claims-based prediction works, why data quality governs the result, and the questions worth putting to any vendor, including us."
      seoDescription="A plain-language primer on claims-based prediction: why data quality governs the result, and the questions worth putting to any vendor."
      image={{
        src: "/img/img-normalize.jpg",
        alt: "Irregular inbound claim records resolving into an aligned, validated grid",
      }}
      specs={[
        { k: "Reading time", v: "6 minutes" },
        { k: "Assumes", v: "No technical background" },
      ]}
    />

    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <Reveal>
              <nav className="sticky top-28 hidden lg:block" aria-label="On this page">
                <span className="label text-dim2">Contents</span>
                <ol className="mt-5 space-y-3">
                  {sections.map((s) => (
                    <li key={s.n} className="border-l-2 border-line pl-3 transition-colors hover:border-navy">
                      <a
                        href={`#s-${s.n}`}
                        className="text-[13px] leading-snug text-ink/60 transition-colors hover:text-ink"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </div>

          <div className="lg:col-span-9 lg:max-w-[46rem]">
            {sections.map((s, i) => (
              <Reveal key={s.n} delay={Math.min(i, 4) * 0.05}>
                <article
                  id={`s-${s.n}`}
                  className={`scroll-mt-28 border-t border-line pt-8 ${
                    i > 0 ? "mt-12" : ""
                  }`}
                >
                  <h2 className="display-md text-balance text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-[17px] leading-[1.75] text-ink/80">
                    {s.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="Worked example"
          title="One provider, six records, one truth."
          lede="Normalization is abstract until you watch it happen to a single claim. This is the same operation run across millions of lines."
        />
        <Reveal className="mt-12">
          <NormalizationPanel />
        </Reveal>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default UnderstandingAnalytics;
