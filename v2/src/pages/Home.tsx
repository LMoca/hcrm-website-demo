import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HorizonChart from "@/components/HorizonChart";
import { Answer, FaqList, PathFinder, SectionHead } from "@/components/Blocks";
import Photo, { Tag } from "@/components/Photo";
import Clients from "@/components/Clients";
import Connectivity from "@/components/Connectivity";
import { Arrow } from "@/components/Icons";
import { CTA_LABEL, proof } from "@/data/site";
import { solutions } from "@/data/solutions";
import { allFaqs } from "@/data/faqs";

export const homeFaqs = [allFaqs[0], allFaqs[3], allFaqs[5], allFaqs[7], allFaqs[11]];

const steps = [
  { n: "01", t: "Collect", d: "HCRM requests 24 months of medical, pharmacy and eligibility data from your carrier, TPA and PBM in the layouts they already use. Over 250 sources connected." },
  { n: "02", t: "Normalize & validate", d: "Every data point is checked. Invalid and home-grown codes are fixed, sources are unified into one national dataset, and accuracy exceeds 95%." },
  { n: "03", t: "Predict", d: "The MITCH engine forecasts each member's medical and Rx cost, ER visits and inpatient days for 12 months, in dollars, across 2,800+ measures." },
  { n: "04", t: "Act & prove", d: "Care teams reach rising-risk members first. Outcomes are tracked monthly against the predicted baseline and reported, white-labeled if you like." },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-6">
            <p className="eyebrow rise">A claim avoided is money saved</p>
            <h1 className="display rise mt-5 !text-[clamp(2.7rem,5.6vw,5rem)]" style={{ animationDelay: "80ms" }}>
              Enhance your health plan with <em className="font-normal text-navy">predictive analytics.</em>
            </h1>
            <p className="lede rise mt-7 max-w-xl" style={{ animationDelay: "160ms" }}>
              HCRM connects your plan's claims, pharmacy, clinical and wellness data into one source of truth, then forecasts every member's cost and clinical risk, so your teams act before the claim, not after it.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link to="/contact/" className="btn-primary">
                {CTA_LABEL} <Arrow />
              </Link>
              <a href="#paths" className="btn-ghost">
                What it means for you
              </a>
            </div>
          </div>
          <div className="rise lg:col-span-6" style={{ animationDelay: "300ms" }}>
            <HeroCollage />
          </div>
        </div>
        <div className="wrap relative pb-16">
          <Answer label="What HCRM does">
            HCRM (Health Cost &amp; Risk Management) is a healthcare predictive analytics company. Its software, Health Risk Monitor, connects data from claims payers, pharmacy benefit managers, clinical teams, wellness programs and stop-loss carriers into one source of truth for an employer's plan, normalizes it to over 95% accuracy, and forecasts each member's medical cost, pharmacy cost, ER visits and inpatient days, flagging potential large claims 12 to 18 months in advance. Employers, brokers, health plans, stop-loss carriers, TPAs, clinics and care-management teams use it to find rising-risk members early, intervene, and prove the outcome in dollars.
          </Answer>
        </div>
      </section>

      {/* Proof strip */}
      <section aria-label="HCRM by the numbers" className="border-y border-rule bg-white">
        <dl className="wrap grid grid-cols-2 divide-rule lg:grid-cols-4 lg:divide-x">
          {proof.map((p) => (
            <div key={p.label} className="px-2 py-9 lg:px-8" data-reveal>
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="block font-serif text-[2.8rem] font-light leading-none text-navy">{p.value}</span>
                <span className="mt-3 block text-[15px] font-semibold text-ink">{p.label}</span>
                <span className="mt-1 block text-[13.5px] text-dim">{p.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Connectivity />

      {/* The horizon */}
      <section className="wrap grid items-center gap-14 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">The horizon</p>
          <h2 className="h-section mt-3">Two years behind you. One year ahead.</h2>
          <p className="lede mt-5">
            Everything left of today is claims you've already paid. Health Risk Monitor draws the line to the right of it: what each member is likely to cost next, and how much of that you can still change.
          </p>
          <ul className="mt-8 space-y-4 text-[15.5px] text-ink2">
            <li className="flex gap-3"><span className="mt-2 h-0.5 w-5 shrink-0 bg-navy" />24 months of medical, pharmacy and eligibility history</li>
            <li className="flex gap-3"><span className="mt-2 h-0.5 w-5 shrink-0 border-t-2 border-dashed border-signal" />The 12-month path if nothing changes</li>
            <li className="flex gap-3"><span className="mt-2 h-0.5 w-5 shrink-0 bg-cyan-deep" />The path when flagged members are reached early</li>
          </ul>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <div className="card p-5 shadow-[0_30px_80px_-40px_rgba(11,27,43,0.35)] md:p-7">
            <HorizonChart />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="relative overflow-hidden bg-navy-night text-white">
        <div className="grain-light absolute inset-0" aria-hidden="true" />
        <div className="wrap relative grid gap-14 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow !text-cyan">The problem</p>
            <h2 className="h-section mt-3 !text-white">This year's cost doesn't tell you who's expensive next year.</h2>
            <p className="mt-6 text-[1.1rem] leading-relaxed text-white/70">
              Most reporting looks backward at claims already paid. By the time a member shows up on a high-cost list, the money is spent. Chronic illness drives the bill, and it's often visible in gaps in care months before the claim.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:col-span-7">
            {[
              ["84%", "of claims cost is driven by the 20% of members with one or more chronic diseases."],
              ["½", "the recommended care is what those members receive, on average, so they end up sicker and costlier."],
              ["5%", "of members, the catastrophic population, drive most health plan spending."],
              ["2×", "as likely to visit the ER: an asthmatic member non-compliant with two or more standards of care."],
            ].map(([v, t], i) => (
              <div key={v} className="bg-navy-night p-8" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="font-serif text-[3.4rem] font-light leading-none text-cyan">{v}</p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-white/75">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path finder */}
      <section id="paths" className="wrap scroll-mt-24 py-24">
        <SectionHead
          eyebrow="Find your path"
          title="What does HCRM mean for you?"
          lede="The same forecast answers a different question for each organization. Tell us where you sit and we'll show you what changes in your first 18 months."
        />
        <div className="mt-12">
          <PathFinder />
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-rule bg-white">
        <div className="wrap py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="How it works" title="From raw claims to a list worth calling." />
            <Link to="/our-software/" className="link-arrow" data-reveal>
              Inside Health Risk Monitor <Arrow />
            </Link>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <Photo name="pharmacist" ratio="4/5" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full">
                <Tag label="Sources connected" value="250+ medical & Rx" className="left-5 top-5" />
                <Tag label="After validation" value="95%+ accurate" tone="dark" className="float bottom-5 right-5" />
              </Photo>
            </div>
            <ol className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {steps.map((s, i) => (
                <li key={s.n} className="relative rounded-2xl border border-rule p-7" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="flex items-end gap-1" aria-hidden="true">
                    {[0, 1, 2, 3].map((b) => (
                      <span key={b} className={`w-2 rounded-sm ${b <= i ? "bg-cyan" : "bg-rule"}`} style={{ height: 8 + b * 6 }} />
                    ))}
                  </div>
                  <p className="mt-6 font-mono text-[12px] tracking-[0.14em] text-dim">{s.n}</p>
                  <h3 className="h-card mt-1">{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink2">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="wrap py-24">
        <SectionHead
          eyebrow="Solutions"
          title="Five ways to put the forecast to work."
          lede="Use one on its own, or run them together as part of your existing stack. Larger organizations often plug HRM into the care management and reporting tools they already have."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Link
              key={s.slug}
              to={`/${s.slug}/`}
              className={`group card flex flex-col justify-between p-8 transition-all hover:-translate-y-1 hover:border-navy hover:shadow-xl ${i === 0 ? "lg:row-span-2 lg:bg-navy lg:text-white" : ""}`}
              data-reveal
            >
              <div>
                {i === 0 && <Photo name="dashboard" ratio="16/10" sizes="(min-width: 1024px) 30vw, 100vw" className="mb-7 hidden lg:block" tint={false} />}
                <p className={`font-mono text-[11.5px] uppercase tracking-eyebrow ${i === 0 ? "text-cyan" : "text-cyan-deep"}`}>{s.kicker}</p>
                <h3 className={`h-card mt-3 ${i === 0 ? "lg:!text-white lg:text-[2rem]" : ""}`}>{s.name}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${i === 0 ? "text-ink2 lg:text-white/75" : "text-ink2"}`}>{s.description}</p>
              </div>
              <span className={`mt-8 inline-flex items-center gap-1.5 font-semibold ${i === 0 ? "text-navy lg:text-cyan" : "text-navy"}`}>
                Explore <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Clients />

      {/* Case study */}
      <section className="border-y border-rule bg-paper2">
        <div className="wrap grid items-center gap-12 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Client result</p>
            <h2 className="h-section mt-3">Two years. The catastrophic 5%. Cost per member nearly halved.</h2>
            <p className="lede mt-5">
              One employer group used Health Risk Monitor to find and manage its future catastrophic members, the 5% who drive most of its spend, before their claims were incurred.
            </p>
            <Link to="/predictive-analytics-and-cost-containment/" className="link-arrow mt-7">
              Read the case study <Arrow />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <Photo name="factory" ratio="16/7" sizes="(min-width: 1024px) 55vw, 100vw" className="sm:col-span-2">
              <Tag label="Employer group" value="Catastrophic 5% managed for 2 years" tone="dark" className="bottom-5 left-5" />
            </Photo>
            {[
              { k: "Cost per member, whole group", from: "$825", to: "$450" },
              { k: "PMPM, catastrophic members", from: "$6,000", to: "<$4,000" },
            ].map((r) => (
              <div key={r.k} className="card p-8" data-reveal>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-dim">{r.k}</p>
                <p className="mt-6 font-serif text-[1.6rem] font-light text-dim line-through decoration-signal/60">{r.from}</p>
                <p className="font-serif text-[3.6rem] font-light leading-none text-navy">{r.to}</p>
                <p className="mt-4 text-[13.5px] text-dim">Over two years</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-rule bg-white">
        <FaqList faqs={homeFaqs} />
      </div>
    </Layout>
  );
}

/** Hero: a plan member as HRM sees them, with their forecast annotated. Figures are illustrative. */
function HeroCollage() {
  return (
    <figure className="relative mx-auto max-w-[34rem] pb-10 pl-6 sm:pl-10">
      <Photo name="worker" ratio="4/5" eager sizes="(min-width: 1024px) 40vw, 90vw" className="ken shadow-[0_40px_90px_-40px_rgba(11,27,43,0.55)]">
        <Tag label="12-month forecast" value="$41,800 projected" className="right-4 top-5" />
        <Tag label="Gaps in care" value="3 standards missed" tone="alert" className="float right-4 top-[6.5rem]" style={{ animationDelay: "1.2s" }} />
      </Photo>
      <div className="absolute bottom-0 left-0 w-[46%]">
        <Photo name="nurse" ratio="1/1" sizes="240px" className="border-4 border-paper shadow-xl" />
      </div>
      <Tag
        label="Rising risk · flagged"
        value={<>Care manager call <span className="text-cyan">this week</span></>}
        tone="dark"
        className="float bottom-14 left-[40%]"
        style={{ animationDelay: "0.6s" }}
      />
      <figcaption className="mt-4 text-right font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
        Illustrative member forecast
      </figcaption>
    </figure>
  );
}
