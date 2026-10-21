import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, Checklist, FaqList, PageHero, SectionHead } from "@/components/Blocks";
import Photo, { Tag } from "@/components/Photo";
import { ConnectivityDiagram } from "@/components/Connectivity";
import { Arrow } from "@/components/Icons";
import { solutions } from "@/data/solutions";
import type { Faq } from "@/data/types";

export const platformFaqs: Faq[] = [
  {
    q: "What is the MITCH predictive modeling engine?",
    a: "MITCH is the award-winning predictive modeling engine behind Health Risk Monitor. It builds a detailed model of how healthcare works for a specific population, integrating medical and pharmacy claims and EMR data to predict clinical events and outcomes for each member and attach a dollar value to them. HCRM can build additional population-specific models with MITCH.",
  },
  {
    q: "What risk measures does Health Risk Monitor report?",
    a: "Predicted cost by clinical risk driver, pharmacy cost, ER visits and inpatient days; each member's risk relative to national norms; acute-care risk (ER or inpatient); the long-term impact of co-morbid chronic conditions and poor compliance with standards of care; and the member's motivation to maintain or improve health behaviors.",
  },
  {
    q: "Can clinicians see HRM data before a patient visit?",
    a: "Yes. HRM lets clinicians review patient information before visits, including through the EMR, so they can manage conditions proactively.",
  },
];

const measures = [
  ["Predicted cost", "Medical and pharmacy, by clinical risk driver, for the next 12 months"],
  ["Acute-care risk", "Likelihood of ER visits and inpatient days"],
  ["Chronic Impact Score", "Long-term impact of co-morbid chronic conditions and poor compliance"],
  ["Relative risk", "Each member compared with national norms"],
  ["Standards of care", "Compliance with 128 clinical standards, gap by gap"],
  ["Motivation", "The member's likelihood to maintain or improve health behaviors"],
];

export default function Platform() {
  return (
    <Layout
      cta={{
        title: "Watch Health Risk Monitor run on real claims.",
        body: "We'll walk through 24 months of real, de-identified claims and eligibility data in HRM, then you can try it free for one month on your own medical and pharmacy claims.",
        secondary: { label: "How data gets to HCRM", to: "/data-normalization-and-validation/" },
      }}
    >
      <PageHero
        crumbs={[{ name: "Platform", path: "/our-software/" }]}
        labelH1
        eyebrow="Our software · Health Risk Monitor (HRM)"
        title={<>One forecast for every member. <em className="text-navy">In dollars.</em></>}
        lede="Health Risk Monitor (HRM) is HCRM's predictive modeling software. It gives accurate clinical predictions of each member's health and cost for the next 12 months, so you can intervene early, manage utilization and disease, and coach members toward better outcomes at lower cost."
        aside={
          <Answer>
            Health Risk Monitor is predictive analytics software for health plans. It integrates medical and pharmacy claims and EMR data, normalizes them, and uses the MITCH engine and AI to predict each member's medical cost, pharmacy cost, ER visits and inpatient days over the next 12 months, plus compliance with 128 standards of care. It runs as SaaS or on-site.
          </Answer>
        }
      />

      <section className="wrap grid gap-14 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="How it works" title="A meticulous model of how care works for your population." />
          <div className="mt-10" data-reveal>
            <Photo name="careTeam" ratio="4/3" sizes="(min-width: 1024px) 38vw, 100vw">
              <Tag label="Health & cost measures" value="2,800+" tone="dark" className="float bottom-5 left-5" />
            </Photo>
          </div>
        </div>
        <div className="prose-hcrm lg:col-span-7" data-reveal>
          <p>
            HCRM harnesses the award-winning MITCH predictive modeling engine, which builds a detailed model of how health care “works” for a specific population. With medical and pharmacy claims and EMR data integrated, the model predicts clinical events and outcomes for each member and attaches a dollar value to each prediction.
          </p>
          <p>
            AI identifies high-cost members from historical data, and predicts <strong>future</strong> high-cost members from their current clinical condition, health service utilization, gaps in care, and likely outcomes. HCRM can build additional models for specific member populations with MITCH technology.
          </p>
          <p>
            HRM is available on-site or remotely, whenever you need it, with HCRM's team providing training, customized reports, and help interpreting results.
          </p>
        </div>
      </section>

      <section className="border-y border-rule bg-white">
        <div className="wrap grid items-center gap-14 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <SectionHead
              eyebrow="What HRM connects"
              title="Every piece of the plan, in one place."
              lede="HRM brings together the vast majority of an employer's plan data: claims payers, pharmacy benefit managers, clinical teams, wellness programs, stop-loss carriers, and potentially provider-network data. The employer gets a single source of truth for what is happening in the plan, and can see whether each piece is doing its part."
            />
          </div>
          <div className="lg:col-span-7" data-reveal>
            <ConnectivityDiagram />
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-white">
        <div className="wrap py-24">
          <SectionHead eyebrow="HRM risk measures" title="What the model tells you about each member." />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
            {measures.map(([k, v], i) => (
              <div key={k} className="bg-white p-8" data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                <dt className="font-serif text-[1.35rem]">{k}</dt>
                <dd className="mt-2 text-[15px] text-ink2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap grid gap-14 py-24 lg:grid-cols-2">
        <div data-reveal>
          <p className="eyebrow">Deployment</p>
          <h2 className="h-section mt-3">Standalone, or part of your stack.</h2>
          <p className="lede mt-5">Smaller organizations use HRM as their complete analytics solution. Larger ones plug it into the systems they already run.</p>
        </div>
        <div data-reveal>
          <Checklist
            cols={1}
            items={[
              "SaaS: HCRM processes your data; teams access results through a secure link",
              "On-site: installed in your data center, with IT training and ongoing support",
              "Single sign-on for care managers",
              "Integrates with existing care management software and EMRs",
              "Monthly outbound feed of forecasts and normalized claims for your own reporting",
              "Daily Dashboard alerts from daily medical and pharmacy claims feeds",
              "SOC 2 Type 2 certified; all data stored in the U.S.",
            ]}
          />
        </div>
      </section>

      <section className="border-t border-rule bg-paper2">
        <div className="wrap py-24">
          <SectionHead eyebrow="Solutions" title="Built on HRM." />
          <div className="mt-12 divide-y divide-rule border-y border-rule">
            {solutions.map((s) => (
              <Link key={s.slug} to={`/${s.slug}/`} className="group grid gap-3 py-7 md:grid-cols-12 md:items-center" data-reveal>
                <span className="font-mono text-[11.5px] uppercase tracking-eyebrow text-cyan-deep md:col-span-2">{s.kicker}</span>
                <span className="font-serif text-[1.6rem] leading-tight group-hover:text-navy md:col-span-4">{s.name}</span>
                <span className="text-[15px] text-ink2 md:col-span-5">{s.description}</span>
                <Arrow className="h-5 w-5 text-navy transition-transform group-hover:translate-x-1 md:col-span-1 md:justify-self-end" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqList faqs={platformFaqs} title="About the platform" />
    </Layout>
  );
}
