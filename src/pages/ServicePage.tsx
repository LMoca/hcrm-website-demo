import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta, ArrowLink } from "@/components/kit/Actions";
import ServiceOutput, { type OutputKind } from "@/components/hrm/ServiceOutput";
import type { Service } from "@/data/services";
import { services } from "@/data/services";

const imageMap: Record<string, { src: string; alt: string }> = {
  "healthcare-predictive-analytics": {
    src: "/img/img-forecast.jpg",
    alt: "Recorded claims history resolving into a fan of projected spend paths",
  },
  "data-normalization-validation": {
    src: "/img/img-normalize.jpg",
    alt: "Irregular inbound claim records resolving into an aligned, validated grid",
  },
  "clinical-reporting-outcome-assessment": {
    src: "/img/img-outcome.jpg",
    alt: "Measured actual spend compared against a predicted baseline for each program",
  },
  "healthcare-management": {
    src: "/img/img-signal.jpg",
    alt: "A single member trajectory crossing a risk threshold ahead of the event",
  },
  "stop-loss-reporting": {
    src: "/img/img-stoploss.jpg",
    alt: "Every member measured against a specific attachment point",
  },
};

const outputMap: Record<string, OutputKind> = {
  "healthcare-predictive-analytics": "forecast",
  "data-normalization-validation": "normalization",
  "clinical-reporting-outcome-assessment": "outcomes",
  "healthcare-management": "members",
  "stop-loss-reporting": "stoploss",
};

/** 130-160 characters, written per service rather than derived from copy. */
const metaMap: Record<string, string> = {
  "healthcare-predictive-analytics":
    "Forecast member and group healthcare spend twelve months out. HCRM's Health Risk Monitor flags high-cost members before the claims arrive.",
  "data-normalization-validation":
    "Claims from any TPA or carrier, cleansed, reconciled and validated to 95%+ accuracy. Unresolvable records are surfaced, never silently passed on.",
  "clinical-reporting-outcome-assessment":
    "Measure what a wellness or care management program actually saved, in dollars, against the spend HCRM predicted it would have reached without it.",
  "healthcare-management":
    "Act on the members HRM flags: outreach scheduling, encounter logging and care plans, with every intervention measured back in dollars avoided.",
  "stop-loss-reporting":
    "Identify shock-loss members against your own attachment point months before the claim lands, with the cost drivers behind each projection.",
};

const specMap: Record<string, { k: string; v: string }[]> = {
  "healthcare-predictive-analytics": [
    { k: "Input", v: "24 mo claims" },
    { k: "Output horizon", v: "12 months" },
    { k: "Granularity", v: "Member + group" },
  ],
  "data-normalization-validation": [
    { k: "Accuracy", v: "95%+" },
    { k: "Sources", v: "Any TPA / carrier" },
    { k: "Unresolved", v: "Surfaced, not hidden" },
  ],
  "clinical-reporting-outcome-assessment": [
    { k: "Baseline", v: "Predicted spend" },
    { k: "Unit", v: "Dollars avoided" },
    { k: "Cadence", v: "Auto-generated" },
  ],
  "healthcare-management": [
    { k: "Module", v: "Optional add-on" },
    { k: "Channels", v: "Phone, text, email" },
    { k: "Feedback loop", v: "Into outcomes" },
  ],
  "stop-loss-reporting": [
    { k: "Threshold", v: "Your attachment point" },
    { k: "Ranking", v: "Projected exposure" },
    { k: "Lead time", v: "Up to 12 months" },
  ],
};

const ServicePage = ({ service }: { service: Service }) => {
  const kind = outputMap[service.slug] ?? "forecast";
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Platform", to: "/about/our-software" },
          { label: service.shortTitle },
        ]}
        label="Platform"
        title={service.title}
        lede={service.tagline}
        seoDescription={metaMap[service.slug]}
        image={imageMap[service.slug]}
        specs={specMap[service.slug]}
      >
        <PrimaryCta />
      </PageHeader>

      {/* what it does — the tagline already ran in the header, so this band
          sets the substance itself as the statement rather than repeating it */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <Reveal>
            <div className="h-px w-full bg-line" />
            <div className="pt-4">
              <span className="label text-cyan-deep">What it does</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-10 max-w-6xl display-md text-balance text-ink/90">
              {service.whatItDoes}
            </p>
          </Reveal>
        </div>
      </section>

      {/* the output */}
      <section className="relative border-b border-line bg-canvas">
        <div className="grid-field absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="edge relative band">
          <SectionHead
            label="The output"
            title={
              <>
                What lands on your desk.{" "}
                <span className="text-dim2">Not a description of it.</span>
              </>
            }
          />
          <Reveal className="mt-12">
            <ServiceOutput kind={kind} />
          </Reveal>
        </div>
      </section>

      {/* how it works */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead label="How it works" title="Under the hood." />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <p className="prose-editorial text-dim">
                <span>{service.mechanism}</span>
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="border-l-2 border-navy pl-6">
                <span className="label text-dim2">The financial effect</span>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink/85">
                  {service.dollarOutcome}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* capabilities */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="Capabilities"
            title="What you get, specifically."
          />
          <div className="mt-12">
            {service.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="grid gap-4 border-t border-line py-7 md:grid-cols-12 md:gap-10">
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.03em] text-ink md:col-span-5 md:text-[22px]">
                    {f.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-dim md:col-span-7">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      {/* proof — light rupture */}
      <section className="border-b border-line bg-mist text-ink">
        <div className="edge band-tight">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <span className="label text-dim2">Proof</span>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-9">
              <p className="display-md text-balance text-ink">{service.proof}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band-tight">
          <span className="label text-dim2">Elsewhere on the platform</span>
          <div className="mt-8">
            {others.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="row-live group flex items-baseline gap-5 border-t border-line py-5"
              >
                <span className="flex-1">
                  <span className="block font-display text-[19px] font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-navy">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-dim2">
                    {s.tagline}
                  </span>
                </span>
              </Link>
            ))}
            <div className="hairline" />
          </div>
          <div className="mt-8">
            <ArrowLink to="/clients/who-we-serve">See who uses this</ArrowLink>
          </div>
        </div>
      </section>

      <CTASection
        title={`See ${service.shortTitle.toLowerCase()} on your own claims.`}
      />
      <Footer />
    </div>
  );
};

export default ServicePage;
