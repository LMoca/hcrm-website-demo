import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, PageHero, QuoteCard, SectionHead } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import Photo, { Tag } from "@/components/Photo";
import { partners, team, testimonials } from "@/data/site";

export function About() {
  return (
    <Layout cta={{ title: "Two decades of forecasts. Yours could be next.", secondary: { label: "Meet the team", to: "/our-team/" } }}>
      <PageHero
        crumbs={[{ name: "About", path: "/who-we-are/" }]}
        labelH1
        eyebrow="Who we are"
        title={<>Precise, actionable data that <em className="text-navy">improves employee health.</em></>}
        lede="Health Cost & Risk Management (HCRM) delivers precise, actionable data that helps clients improve employee health. We know resources, budgets and time are limited, and we help clients become more effective and efficient in every area of health care management."
        aside={
          <Answer label="HCRM at a glance">
            Health Cost &amp; Risk Management, LLC is a Chicago-based healthcare analytics company founded to close a risk management gap. In 2004 it pioneered accurate predictive modeling for small and mid-size self-funded employers, a capability previously available only to large organizations. Its Health Risk Monitor platform is SOC 2 Type 2 certified.
          </Answer>
        }
      />

      <div className="wrap pt-16" data-reveal>
        <Photo name="skyline" ratio="21/8" sizes="100vw" className="min-h-[16rem]">
          <Tag label="Headquarters" value="Chicago, Illinois" className="left-5 top-5" />
          <Tag label="Predicting claims since" value="2004" tone="dark" className="bottom-5 right-5" />
        </Photo>
      </div>

      <section className="wrap grid gap-16 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="h-section mt-3">We can't change the money already spent. We can change what's spent next.</h2>
        </div>
        <div className="prose-hcrm lg:col-span-7" data-reveal>
          <p>
            HCRM began when our president saw a risk management gap in the healthcare industry and recognized the need for predictive analytics. In 2004 we pioneered accurate predictive modeling tools for the small to mid-sized self-funded market. Predictive modeling was no longer exclusive to large organizations.
          </p>
          <p>
            Today HCRM delivers tailored cost solutions, data analysis and risk management to organizations of all sizes. Our platform gives a holistic view of your population, focusing on the highest costs and identifying risks and future high-cost individuals.
          </p>
          <p>
            We can't change the past or the money already spent, but we can help you improve member health to minimize future claims and maximize savings. <strong>A claim avoided is money saved.</strong>
          </p>
        </div>
      </section>

      <section className="border-y border-rule bg-white">
        <div className="wrap grid gap-6 py-24 md:grid-cols-2">
          <div className="card bg-paper p-10" data-reveal>
            <p className="eyebrow">Mission</p>
            <p className="mt-5 font-serif text-[1.6rem] font-light leading-snug">
              Empower health plans, including self-funded groups, to manage member health costs effectively, using AI-driven predictive analytics to change how cost and risk are managed, for financial stability and better client outcomes.
            </p>
          </div>
          <div className="card bg-navy p-10 text-white" data-reveal>
            <p className="eyebrow !text-cyan">Vision</p>
            <p className="mt-5 font-serif text-[1.6rem] font-light leading-snug">
              Clinical analytics powered by predictive AI that proactively reduces medical risks and costs, while fostering a positive employee culture for organizations of every size.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { to: "/why-choose-hcrm/", t: "Why choose HCRM", d: "Accuracy, risk in dollars, and a checklist for choosing an analytics vendor." },
            { to: "/our-team/", t: "Our team", d: "Healthcare operators, analysts and engineers with decades of experience." },
            { to: "/our-partnerships/", t: "Partnerships", d: "MedWell, Pluritem, Upswing, SIIA and AARC 360." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="card group p-8 hover:border-navy" data-reveal>
              <h2 className="h-card group-hover:text-navy">{c.t}</h2>
              <p className="mt-3 text-[15px] text-ink2">{c.d}</p>
              <span className="mt-6 inline-flex text-navy"><Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

const considerations: [string, string][] = [
  ["Reporting", "What reporting do you need, and for what? Daily dashboards for high-risk patients? Cost-efficiency metrics? Both are included in HCRM. Define needs from your goals."],
  ["Maintenance and security", "Can the vendor keep up with technology and your needs, scale with you, and protect sensitive health data? HCRM is SOC 2 Type 2 certified."],
  ["Training and support", "How steep is the learning curve? Look for timely, friendly onboarding and training. HCRM's support is the most-praised part of its client testimonials."],
  ["Experience and expertise", "Look for a proven track record of timely implementations, and the ability to fix problem data such as home-grown and invalid diagnosis and treatment codes."],
  ["Integrations", "Your vendor must integrate cleanly with existing data sources and handle your volume and complexity. A key feature of HRM."],
  ["Data warehousing", "Where is data stored, how accessible is it, how well is it cleaned? HCRM stores all data in the U.S. Choose relevant, actionable information over glitzy graphics."],
];

export function WhyHcrm() {
  return (
    <Layout cta={{ title: "Put us through your vendor checklist.", body: "Bring your toughest questions about accuracy, security, integration and support. We'll answer them with your own data during a free one-month trial.", secondary: { label: "Read testimonials", to: "/testimonials-and-impact/" } }}>
      <PageHero
        crumbs={[{ name: "Why HCRM", path: "/why-choose-hcrm/" }]}
        labelH1
        eyebrow="Why choose HCRM"
        title={<>Accurate. In dollars. <em className="text-navy">Ahead of the cost.</em></>}
        lede="In 2023 the average employer-sponsored family premium reached $24,000, nearly 50% more than a decade earlier, and employers typically cover up to three-quarters of it. Chronic illness is the main driver, and new weight-loss drugs make compliance tracking more important than ever."
        aside={
          <Answer label="Why organizations choose HCRM">
            HCRM's AI-driven model is regarded as among the most accurate claims-based prospective models available. It expresses clinical and financial risk in dollars, uses 24 months of claims and over 2,800 health and cost measures, tracks compliance with 128 standards of care, and is backed by SOC 2 Type 2 security, U.S. data storage and highly rated support.
          </Answer>
        }
      />

      <section className="wrap py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Accurate predictions", "The most advanced AI-driven predictive modeling and forecasting, for companies of every size. HCRM's model is regarded as the most accurate claims-based prospective model on the market."],
            ["Risk measured in dollars", "Risk analysis only helps if you understand it. HCRM translates clinical risk into understandable, comparable dollar measures, so you can manage it directly."],
            ["Staying ahead of rising costs", "Find the members and conditions driving your costs, close gaps in care, track treatment compliance, and limit or avoid high-cost claims."],
          ].map(([t, d], i) => (
            <div key={t} className="card p-8" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="font-mono text-[12px] text-cyan-deep">0{i + 1}</p>
              <h2 className="h-card mt-3">{t}</h2>
              <p className="mt-3 text-[15.5px] text-ink2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-rule bg-white">
        <div className="wrap grid gap-14 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">How HRM helps</p>
            <h2 className="h-section mt-3">Analytics once reserved for the largest companies.</h2>
          </div>
          <div className="prose-hcrm lg:col-span-7" data-reveal>
            <p>
              HCRM reports cover your member base: disease prevalence, yearly spending, future medical and pharmacy cost, several ways of identifying risk, compliance with over 128 professional standards of care, and more. Clients use Health Risk Monitor to clinically stratify a group, identify individuals for intervention, and build custom graphs for outcome reporting.
            </p>
            <p>
              Choosing an analytics vendor often comes down to cost. Judge which vendor is worth the cost and time needed to solve your problems and prevent future operational, financial and clinical obstacles.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <SectionHead
          eyebrow="Buyer's guide"
          title="Key considerations when choosing a healthcare analytics company."
          lede="Start with your goals. Why do you need an analytics vendor, and why now? Is it cost, workforce health, productivity? Then narrow the field:"
        />
        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {considerations.map(([k, v]) => (
            <div key={k} className="bg-paper p-8" data-reveal>
              <dt className="font-serif text-[1.35rem]">{k}</dt>
              <dd className="mt-3 text-[15px] text-ink2">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Layout>
  );
}

export function Team() {
  return (
    <Layout cta={{ title: "Work with people who've run plans, TPAs and provider groups.", body: "Our team has operated on the same side of the table as you. Start a conversation, and you'll talk to someone who understands your business." }}>
      <PageHero
        crumbs={[{ name: "About", path: "/who-we-are/" }, { name: "Team", path: "/our-team/" }]}
        labelH1
        eyebrow="Our team"
        title="Operators, analysts and engineers."
        lede="Our team brings extensive backgrounds in healthcare analytics, health systems management, operations, finance, and work with providers and insurers, with more than twenty years of corporate experience at HCRM."
      />
      <section className="wrap py-24">
        <div className="space-y-6">
          {team.map((p) => (
            <article key={p.name} className="card grid gap-8 p-8 md:grid-cols-12 md:p-10" data-reveal>
              <div className="md:col-span-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy font-serif text-2xl text-white" aria-hidden="true">
                  {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <h2 className="mt-5 font-serif text-[1.7rem] leading-tight">{p.name}</h2>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-cyan-deep">{p.role}</p>
              </div>
              <div className="space-y-4 text-ink2 md:col-span-8">
                {p.bio.map((b) => (
                  <p key={b.slice(0, 24)}>{b}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-12 max-w-3xl font-serif text-[1.5rem] font-light leading-snug" data-reveal>
          With an extensive team of software engineers, security specialists, statisticians, clinical analysts, client support and claims specialists, HCRM provides complete healthcare analytics to organizations of all sizes.
        </p>
      </section>
    </Layout>
  );
}

export function Partners() {
  return (
    <Layout cta={{ title: "Interested in partnering with HCRM?", body: "If your program, platform or service complements predictive modeling, let's explore what we could build for members together.", query: "topic=partnership" }}>
      <PageHero
        crumbs={[{ name: "About", path: "/who-we-are/" }, { name: "Partnerships", path: "/our-partnerships/" }]}
        labelH1
        eyebrow="Our partnerships"
        title="Leaders in their fields, connected to the forecast."
        lede="Our partners were chosen to provide a more complete approach to healthcare services and cost management. Each leads in its field, and together we add the most value to managing member health and cost."
      />
      <section className="wrap py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {partners.map((p) => (
            <article key={p.name} className="card flex flex-col justify-between p-8" data-reveal>
              <div>
                <span className="chip">{p.kind}</span>
                <h2 className="mt-5 font-serif text-[1.7rem] leading-tight">{p.name}</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink2">{p.body}</p>
              </div>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="link-arrow mt-6">
                  Visit their site <Arrow />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  const tamela = testimonials.find((t) => t.long);
  return (
    <Layout cta={{ title: "Become the next success story.", body: "Clients stay with HCRM for years, one for more than 17. Start a conversation and see why." }}>
      <PageHero
        crumbs={[{ name: "Testimonials", path: "/testimonials-and-impact/" }]}
        labelH1
        eyebrow="Testimonials & impact"
        title={<>Better data. <em className="text-navy">Better partners.</em></>}
        lede="What clients say about HCRM's technology, data quality, and the support team that comes with it."
      />
      <section className="wrap py-24">
        <QuoteCard {...lead} large />
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t) => (
            <div key={t.name} data-reveal>
              <QuoteCard {...t} />
            </div>
          ))}
        </div>
      </section>
      {tamela?.long && (
        <section className="border-t border-rule bg-white">
          <div className="wrap grid gap-10 py-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">In full</p>
              <h2 className="h-section mt-3">{tamela.name}, {tamela.org}</h2>
            </div>
            <div className="prose-hcrm lg:col-span-8">
              <p className="font-serif text-[1.3rem] font-light leading-relaxed text-ink">{tamela.long}</p>
            </div>
          </div>
        </section>
      )}
      <section className="border-t border-rule bg-paper2">
        <div className="wrap py-20">
          <SectionHead eyebrow="Measurable impact" title="$825 → $450 per member, in two years." lede="An employer group that focused on its future catastrophic members, the top 5% by spend, nearly halved cost per member." />
          <Link to="/predictive-analytics-and-cost-containment/" className="link-arrow mt-8">
            Read the case study <Arrow />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
