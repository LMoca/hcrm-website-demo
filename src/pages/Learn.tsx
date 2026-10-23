import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, Checklist, FaqItems, PageHero } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { articleBySlug, articles, formatDate } from "@/data/resources";
import { faqGroups } from "@/data/faqs";
import { OutcomeTrend, Pipeline } from "@/components/infographics/Panels";

export function Resources() {
  const [feature, ...rest] = articles;
  return (
    <Layout cta={{ title: "Want the numbers for your own population?", body: "Every article here started with a client's data. Start a conversation and we'll show you what HRM finds in yours." }}>
      <PageHero
        crumbs={[{ name: "Resources", path: "/resources/" }]}
        labelH1
        eyebrow="Resources"
        title="Research, results and announcements."
        lede="Case studies, white papers and product news from HCRM, plus a plain-English guide to healthcare analytics."
      />
      <section className="wrap py-20">
        <Link to={`/${feature.slug}/`} className="card group grid gap-8 p-8 hover:border-navy md:grid-cols-12 md:p-12" data-reveal>
          <div className="md:col-span-8">
            <span className="chip">{feature.topic}</span>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-tight group-hover:text-navy">{feature.title}</h2>
            <p className="lede mt-4">{feature.summary}</p>
          </div>
          <div className="flex flex-col justify-between md:col-span-4 md:items-end">
            <time dateTime={feature.date} className="font-mono text-[12px] uppercase tracking-[0.12em] text-dim">{formatDate(feature.date)}</time>
            <span className="mt-6 font-serif text-[3.2rem] font-light leading-none text-navy">$825 → $450</span>
          </div>
        </Link>

        <Link to="/understanding-healthcare-analytics/" className="group mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy p-8 text-white" data-reveal>
          <div>
            <p className="eyebrow !text-cyan">Guide</p>
            <h2 className="mt-2 font-serif text-[1.7rem] !text-white">Understanding healthcare analytics</h2>
            <p className="mt-1 text-white/70">Descriptive, diagnostic, predictive and prescriptive analytics, explained.</p>
          </div>
          <Arrow className="h-6 w-6 text-cyan transition-transform group-hover:translate-x-1" />
        </Link>

        <ul className="mt-12 divide-y divide-rule border-y border-rule">
          {rest.map((a) => (
            <li key={a.slug} data-reveal>
              <Link to={`/${a.slug}/`} className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline">
                <time dateTime={a.date} className="font-mono text-[12px] uppercase tracking-[0.12em] text-dim md:col-span-2">{formatDate(a.date)}</time>
                <span className="md:col-span-2"><span className="chip">{a.topic}</span></span>
                <span className="md:col-span-7">
                  <span className="block font-serif text-[1.5rem] leading-snug group-hover:text-navy">{a.title}</span>
                  <span className="mt-1 block text-[15px] text-ink2">{a.summary}</span>
                </span>
                <Arrow className="h-5 w-5 text-navy transition-transform group-hover:translate-x-1 md:col-span-1 md:justify-self-end" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export function ArticlePage({ slug }: { slug: string }) {
  const a = articleBySlug(slug);
  const more = articles.filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <Layout cta={{ title: "See what HRM would find in your data.", query: `topic=${a.slug}`, secondary: { label: "More resources", to: "/resources/" } }}>
      <PageHero
        crumbs={[{ name: "Resources", path: "/resources/" }, { name: a.title, path: `/${a.slug}/` }]}
        eyebrow={a.topic}
        title={a.title}
        lede={a.summary}
      >
        <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-dim">
          <time dateTime={a.date}>{formatDate(a.date)}</time> · Health Cost &amp; Risk Management
        </p>
      </PageHero>
      <article className="wrap py-20">
        <div className="prose-hcrm mx-auto max-w-prose">
          {a.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2>{b.heading}</h2>}
              {b.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          ))}
          {a.pdf && (
            <a href={a.pdf} target="_blank" rel="noopener" className="btn-ghost mt-6">
              Download the full PDF <Arrow />
            </a>
          )}
          <div className="mt-14 rounded-2xl border border-rule bg-white p-7 text-[15px] text-ink2">
            <strong className="text-ink">About Health Cost &amp; Risk Management, LLC.</strong> HCRM performs predictive modeling and specializes in collecting and processing claims and related health plan data for TPAs, brokers, provider networks, physician groups and other clients. Each month it predicts every member's medical cost, pharmacy cost, ER visits and inpatient days for the next 12 months, and assesses compliance with national standards of care for 19 chronic diseases and four preventive categories.
          </div>
        </div>
      </article>
      {a.slug === "predictive-analytics-and-cost-containment" && (
        <section className="border-t border-rule">
          <div className="wrap max-w-5xl py-16">
            <OutcomeTrend title="Managed catastrophic members vs. predicted cost" />
          </div>
        </section>
      )}

      <section className="border-t border-rule bg-paper2">
        <div className="wrap py-16">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} to={`/${m.slug}/`} className="card group p-7 hover:border-navy">
                <time dateTime={m.date} className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">{formatDate(m.date)}</time>
                <span className="mt-3 block font-serif text-[1.25rem] leading-snug group-hover:text-navy">{m.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const guideTypes = [
  {
    name: "Descriptive analytics",
    q: "What happened?",
    def: "The most basic form of analytics: an overview of past events that summarizes historical data and identifies trends, patterns and correlations.",
    ex: "Counting how many members have been diagnosed with a particular disease.",
  },
  {
    name: "Diagnostic analytics",
    q: "Why did it happen?",
    def: "Identifies the cause of a particular event or outcome in the past.",
    ex: "Analyzing employee turnover to determine why employees are leaving.",
  },
  {
    name: "Predictive analytics",
    q: "What will happen?",
    def: "Uses statistical models and machine learning to forecast future events from past data.",
    ex: "Using member data to predict the likelihood that a member develops a particular disease, or their cost next year.",
  },
  {
    name: "Prescriptive analytics",
    q: "What should we do?",
    def: "The most advanced type: recommends a course of action based on the outcomes predictive analytics anticipates.",
    ex: "Recommending a treatment plan for a member with hypertension based on gaps in care, medication compliance, lifestyle, future risk and willingness to change.",
  },
];

export function Guide() {
  return (
    <Layout cta={{ title: "Ready to move from descriptive to predictive?", body: "Most plans already know what happened. HCRM shows you what's coming next, and who to call about it." }}>
      <PageHero
        crumbs={[{ name: "Resources", path: "/resources/" }, { name: "Understanding healthcare analytics", path: "/understanding-healthcare-analytics/" }]}
        eyebrow="Guide"
        title="Understanding healthcare analytics."
        lede="Healthcare analytics gives benefits professionals insight into hidden patterns and population health trends, and a data-driven view of how benefit programs affect employee productivity, satisfaction and costs."
        aside={
          <Answer label="What are healthcare analytics?">
            Healthcare analytics is the analysis of claims, clinical and eligibility data to understand and improve population health and cost. It comes in four types: descriptive (what happened), diagnostic (why), predictive (what will happen) and prescriptive (what to do). The results are only as good as the data's quality and accuracy, which varies widely between vendors.
          </Answer>
        }
      />

      <section className="border-b border-rule bg-white py-16">
        <div className="wrap">
          <Pipeline
            steps={guideTypes.map((t) => ({ label: t.name.replace(" analytics", ""), note: t.q }))}
            label="Healthcare analytics"
            status="Hindsight → foresight → action"
          />
        </div>
      </section>
      <section className="wrap grid gap-14 py-24 lg:grid-cols-12">
        <div className="prose-hcrm lg:col-span-7">
          <h2 className="!mt-0">Why data quality comes first</h2>
          <p>
            Sophisticated analytics shows employers what's behind high utilization, engagement and cost trends at the individual and group level. But when decisions directly affect employee health, data that's just “good enough” isn't. Data quality standards and accuracy vary significantly between analytics vendors.
          </p>
          <h2>What is data analytics?</h2>
          <p>
            Data analytics is the process of analyzing, interpreting and transforming raw data into insight for better decisions. It uses algorithms, statistical methods and artificial intelligence to find patterns and trends in large datasets, in industries from finance and insurance to retail and healthcare.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="card p-8">
            <p className="eyebrow">Benefits of predictive analytics</p>
            <div className="mt-6">
              <Checklist
                cols={1}
                items={[
                  "Overall improvement in member health",
                  "Generally lower annual cost of operations",
                  "Easy access to electronic health records",
                  "Better outcomes through early intervention",
                  "Identification of high-risk members",
                  "Cost reduction through prevention",
                  "Treatment and medication compliance tracking",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-rule bg-white">
        <div className="wrap py-24">
          <h2 className="h-section max-w-3xl">The four types of healthcare analytics</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {guideTypes.map((t, i) => (
              <article key={t.name} className={`flex flex-col rounded-2xl border p-7 ${i === 2 ? "border-navy bg-navy text-white" : "border-rule bg-paper"}`} data-reveal>
                <p className={`font-mono text-[12px] ${i === 2 ? "text-cyan" : "text-cyan-deep"}`}>0{i + 1} · {t.q}</p>
                <h3 className={`h-card mt-3 ${i === 2 ? "!text-white" : ""}`}>{t.name}</h3>
                <p className={`mt-3 text-[15px] ${i === 2 ? "text-white/80" : "text-ink2"}`}>{t.def}</p>
                <p className={`mt-auto pt-6 text-[14px] ${i === 2 ? "text-white/70" : "text-dim"}`}>
                  <strong>Example:</strong> {t.ex}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-ink2">
            Health Risk Monitor is predictive and prescriptive: it forecasts each member's next 12 months, then points care teams to the gaps in care, compliance issues and motivation that make intervention worthwhile.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export function FaqPage() {
  return (
    <Layout cta={{ title: "Have a question we didn't answer?", body: "Ask us directly. A real person on the HCRM team will get back to you, usually the same business day." }}>
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq/" }]}
        eyebrow="Frequently asked questions"
        title="Everything people ask about HCRM."
        lede="Plain answers about Health Risk Monitor, predictive analytics, data, security, pricing and getting started."
      />
      <section className="wrap py-20">
        <nav aria-label="FAQ sections" className="flex flex-wrap gap-2">
          {faqGroups.map((g) => (
            <a key={g.title} href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="chip hover:border-navy">
              {g.title}
            </a>
          ))}
        </nav>
        <div className="mt-14 space-y-20">
          {faqGroups.map((g) => (
            <section key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} className="grid scroll-mt-28 gap-8 lg:grid-cols-12">
              <h2 className="font-serif text-[2rem] leading-tight lg:col-span-4">{g.title}</h2>
              <div className="lg:col-span-8">
                <FaqItems faqs={g.items} />
              </div>
            </section>
          ))}
        </div>
      </section>
    </Layout>
  );
}
