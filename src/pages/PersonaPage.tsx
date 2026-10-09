import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import Figure from "@/components/kit/Figure";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta, ArrowLink } from "@/components/kit/Actions";
import ServiceOutput, { type OutputKind } from "@/components/hrm/ServiceOutput";
import type { Persona } from "@/data/personas";
import { personas } from "@/data/personas";
import { lensForPersona } from "@/data/lenses";
import { useLens } from "@/context/lens-context";

const outputMap: Record<string, OutputKind> = {
  "self-funded-employers": "forecast",
  "health-insurance-consultants": "forecast",
  "insurance-companies": "members",
  "stop-loss-carriers-captives": "stoploss",
  "population-health-management-teams": "members",
  "clinics-healthcare-providers": "members",
  "employer-clinics": "outcomes",
  "health-plans": "forecast",
  "third-party-administrators": "normalization",
  "accountable-care-organizations": "outcomes",
  "health-management-vendors": "outcomes",
};

const PersonaPage = ({ persona }: { persona: Persona }) => {
  const kind = outputMap[persona.slug] ?? "forecast";
  const { chosen, setLens } = useLens();

  // A visitor who reads a client page has told us who they are. Adopt that
  // role for the home page, but never override a choice they made themselves.
  useEffect(() => {
    const match = lensForPersona(persona.slug);
    if (!chosen && match) setLens(match.key);
  }, [persona.slug, chosen, setLens]);
  const index = personas.findIndex((p) => p.slug === persona.slug) + 1;
  const others = personas.filter((p) => p.slug !== persona.slug);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Who it's for", to: "/clients/who-we-serve" },
          { label: persona.shortTitle },
        ]}
        label="Buyer"
        title={persona.title}
        lede={persona.tagline}
        seoDescription={`HCRM gives ${persona.title} twelve months of dollar-denominated foresight on their claims, built on a dataset normalized to 95%+ accuracy.`}
        image={{
          src: "/img/img-cohort.jpg",
          alt: "A covered population with a handful of high-cost members highlighted",
        }}
        specs={[
          { k: "Carries the risk", v: "Directly" },
          { k: "Lead time gained", v: "12 months" },
          { k: "Output unit", v: "Dollars" },
        ]}
      >
        <PrimaryCta />
      </PageHeader>

      {/* the challenge — set as the buyer's own words */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead label="The challenge" title="Where it currently breaks." />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <p className="display-md text-balance text-ink/85">
                {persona.challenge}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:pt-2">
              <div className="border-t border-line pt-6">
                <span className="label text-dim2">What HCRM changes</span>
                <p className="mt-4 text-[15.5px] leading-relaxed text-dim">
                  {persona.howHcrmHelps}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the output for this buyer */}
      <section className="relative border-b border-line bg-canvas">
        <div className="grid-field absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="edge relative band">
          <SectionHead
            label="What you'd be reading"
            title={
              <>
                The view built for you.{" "}
                <span className="text-dim2">Running on a synthetic plan.</span>
              </>
            }
          />
          <Reveal className="mt-12">
            <ServiceOutput kind={kind} />
          </Reveal>
        </div>
      </section>

      {/* dollar outcome */}
      <section className="border-b border-line bg-mist text-ink">
        <div className="edge band">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <span className="label text-cyan-deep">The financial effect</span>
            </Reveal>
            <div className="lg:col-span-9">
              <Reveal delay={0.06}>
                <p className="display-md text-balance text-ink">
                  {persona.dollarOutcome}
                </p>
              </Reveal>
              <Figure
                className="mt-10"
                src="/img/img-signal.jpg"
                alt="A member trajectory crossing a risk threshold ahead of the event"
                cut="tr-bl"
                ratio="aspect-[21/9]"
                delay={0.12}
              />
            </div>
          </div>
        </div>
      </section>

      {/* key points */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead label="What this looks like" title="Four concrete changes." />
          <div className="mt-12">
            {persona.keyPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="grid gap-4 border-t border-line py-7 md:grid-cols-12 md:gap-10">
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.03em] text-ink md:col-span-5 md:text-[22px]">
                    {p.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-dim md:col-span-7">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      {/* other buyers */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band-tight">
          <span className="label text-dim2">Other buyers we serve</span>
          <div className="mt-8 grid gap-x-14 md:grid-cols-2">
            {others.map((p, i) => (
              <Link
                key={p.slug}
                to={`/clients/${p.slug}`}
                className="row-live group flex items-baseline gap-5 border-t border-line py-4"
              >
                <span className="text-[15px] text-ink transition-colors group-hover:text-navy">
                  {p.shortTitle}
                </span>
              </Link>
            ))}
            <div className="hairline md:col-span-2" />
          </div>
          <div className="mt-8">
            <ArrowLink to="/clients/who-we-serve">Compare all eleven</ArrowLink>
          </div>
        </div>
      </section>

      <CTASection title={`Run HRM on a ${persona.shortTitle.toLowerCase()} dataset.`} />
      <Footer />
    </div>
  );
};

export default PersonaPage;
