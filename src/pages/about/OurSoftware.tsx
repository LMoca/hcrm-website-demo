import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import Figure from "@/components/kit/Figure";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";
import HRMConsole from "@/components/hrm/HRMConsole";
import Pipeline from "@/components/hrm/Pipeline";
import { ShieldCheck } from "lucide-react";

const outputs = [
  ["Member risk forecast", "Projected 12-month spend per member, with confidence interval and primary cost driver."],
  ["Group trend analysis", "Population spend trajectory broken down by diagnosis category, pharmacy and cost band."],
  ["Flagged member queue", "Members crossing configurable thresholds, ranked by projected dollar impact."],
  ["Outcome assessment", "Predicted baseline against measured actual for every program you run."],
  ["Stop-loss position", "Every member against your specific attachment point, with reimbursable exposure."],
  ["Exception report", "Claims the engine could not resolve, surfaced for review rather than silently dropped."],
];

const OurSoftware = () => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Company", to: "/about/who-we-are" },
        { label: "Our Software" },
      ]}
      label="Company"
      title="Health Risk Monitor"
      lede="One engine: claims in from any source, normalized to 95%+ accuracy, projected twelve months forward, and measured back against what actually happened."
      seoDescription="Health Risk Monitor: claims in from any source, normalized to 95%+ accuracy, projected twelve months forward, then measured back against actuals."
      image={{
        src: "/img/img-ledger.jpg",
        alt: "A reporting surface with the projected dollar column carrying the result",
      }}
      specs={[
        { k: "History read", v: "24 months" },
        { k: "Forecast horizon", v: "12 months" },
        { k: "Granularity", v: "Member + group" },
        { k: "Add-on", v: "Care Management" },
      ]}
    >
      <PrimaryCta />
    </PageHeader>

    {/* live console */}
    <section className="relative border-b border-line bg-canvas">
      <div className="grid-field absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="edge relative band">
        <SectionHead
          label="The interface"
          title={
            <>
              Read the product{" "}
              <span className="text-dim2">before you book the call.</span>
            </>
          }
          lede="Four views over one synthetic plan of 4,820 lives, structured exactly as a live HRM output is. Nothing here is a screenshot."
        />
        <Reveal className="mt-14">
          <HRMConsole />
        </Reveal>
      </div>
    </section>

    {/* pipeline */}
    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="The pipeline"
          title="From received claim to defensible dollar."
          lede="Stage two is where accuracy is won or lost, which is why it is the stage we publish a number against."
        />
      </div>
      <div className="edge mt-14 pb-16 md:pb-20">
        <Pipeline />
      </div>
    </section>

    {/* outputs */}
    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead label="Outputs" title="What the engine returns." />
        <div className="mt-12 grid gap-x-14 md:grid-cols-2">
          {outputs.map(([k, v], i) => (
            <Reveal key={k} delay={Math.min(i, 4) * 0.05}>
              <div className="border-t border-line py-6">
                <div className="flex items-baseline gap-4">
                  <div>
                    <h3 className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ink">
                      {k}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-dim">{v}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="hairline md:col-span-2" />
        </div>
      </div>
    </section>

    {/* care management */}
    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="label text-cyan-deep">Optional module</span>
              <h2 className="mt-5 display-md text-ink">Care Management</h2>
            </Reveal>
            <Figure
              className="mt-8"
              src="/img/img-signal.jpg"
              alt="A flagged member trajectory crossing its risk threshold early"
              cut="tl-br"
              ratio="aspect-[4/3]"
              delay={0.1}
            />
          </div>
          <Reveal delay={0.06} className="lg:col-span-8">
            <p className="text-[17px] leading-[1.7] text-ink/80">
              Prediction without action is an expensive report. The Care
              Management module adds outreach scheduling, member contact by
              phone, text and email, structured encounter logging, and care-plan
              tracking, all inside the platform that raised the flag.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink/80">
              Because encounters are logged in a structured format, they feed
              straight back into outcome assessment. The loop closes: HRM
              predicts, your team acts, and the platform measures what the
              action was worth.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* security */}
    <section className="border-b border-line bg-canvas">
      <div className="edge band-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <span className="label text-dim2">Security</span>
            <h2 className="mt-5 display-md text-ink">
              Handling your claims data
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-8">
            <div className="border border-line bg-mist p-7">
              <ShieldCheck className="h-6 w-6 text-cyan" strokeWidth={1.6} />
              <p className="mt-5 text-[15.5px] leading-relaxed text-dim">
                Claims data is handled under HIPAA-compliant controls.
              </p>
              <p className="mt-4 border-l-2 border-navy pl-4 text-[14px] leading-relaxed text-dim2">
                [[CLIENT-SUPPLIED: named certifications (SOC 2, HITRUST),
                encryption standards in transit and at rest, data residency,
                retention and deletion policy, sub-processor list, and the BAA
                process.]] This section decides security reviews and should
                carry specifics before launch.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <CTASection
      title="Run Health Risk Monitor on your own claims."
      description="The demo shows the interface on de-identified data. The trial shows it on yours."
    />
    <Footer />
  </div>
);

export default OurSoftware;
