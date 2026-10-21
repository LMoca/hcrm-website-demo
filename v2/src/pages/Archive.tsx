import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, PageHero } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import Photo from "@/components/Photo";
import { articles, formatDate } from "@/data/resources";
import { solutions } from "@/data/solutions";
import { solutionPhoto } from "@/data/photos";

/** WordPress archive URLs (/category/uncategorized/, /author/teagen/) kept so the indexed structure is unchanged. */
export function Archive({ title, path, crumb }: { title: string; path: string; crumb: string }) {
  return (
    <Layout cta={{ title: "Want the numbers for your own population?", secondary: { label: "All resources", to: "/resources/" } }}>
      <PageHero crumbs={[{ name: "Resources", path: "/resources/" }, { name: crumb, path }]} eyebrow="Archive" title={title} />
      <section className="wrap py-16">
        <ul className="divide-y divide-rule border-y border-rule">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link to={`/${a.slug}/`} className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline">
                <time dateTime={a.date} className="font-mono text-[12px] uppercase tracking-[0.12em] text-dim md:col-span-3">
                  {formatDate(a.date)}
                </time>
                <span className="md:col-span-8">
                  <span className="block font-serif text-[1.4rem] leading-snug group-hover:text-navy">{a.title}</span>
                  <span className="mt-1 block text-[15px] text-ink2">{a.summary}</span>
                </span>
                <Arrow className="h-5 w-5 text-navy md:col-span-1 md:justify-self-end" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// "What We Offer" from the hcrm.net home page. The live /services/ URL currently holds unrelated template content.
export function Services() {
  return (
    <Layout cta={{ title: "Not sure which service fits? Start with the forecast.", secondary: { label: "Our software", to: "/our-software/" } }}>
      <PageHero
        crumbs={[{ name: "Services", path: "/services/" }]}
        labelH1
        eyebrow="Services"
        title={<>What we offer, <em className="text-navy">connected.</em></>}
        lede="Five services built on one predictive engine, Health Risk Monitor. Use one on its own or run them together, alongside the tools your team already uses."
        aside={
          <Answer label="HCRM services">
            HCRM offers healthcare predictive analytics, data normalization and validation, clinical reporting and outcome assessment, healthcare management (care management) software, and stop-loss reporting. All five run on Health Risk Monitor and share one normalized dataset of medical, pharmacy, eligibility and clinical data.
          </Answer>
        }
      />
      <section className="wrap grid gap-6 py-20 md:grid-cols-2">
        {solutions.map((s, i) => (
          <Link key={s.slug} to={`/${s.slug}/`} className="card group overflow-hidden hover:border-navy hover:shadow-lg" data-reveal>
            <Photo name={solutionPhoto[s.slug]} ratio="16/7" sizes="(min-width: 768px) 50vw, 100vw" className="!rounded-none" tint={false} />
            <div className="p-8">
              <p className="font-mono text-[11.5px] uppercase tracking-eyebrow text-cyan-deep">
                0{i + 1} · {s.kicker}
              </p>
              <h2 className="h-card mt-2 group-hover:text-navy">{s.name}</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink2">{s.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy">
                Explore <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
