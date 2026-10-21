import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, Checklist, FaqList, PageHero } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { solutionBySlug, solutions } from "@/data/solutions";
import { audienceBySlug } from "@/data/audiences";
import Photo from "@/components/Photo";
import { solutionPhoto } from "@/data/photos";

export default function SolutionPage({ slug }: { slug: string }) {
  const s = solutionBySlug(slug);
  const others = solutions.filter((o) => o.slug !== slug);
  return (
    <Layout
      cta={{
        title: s.cta,
        query: `topic=${s.slug}`,
        secondary: { label: "Explore the platform", to: "/our-software/" },
      }}
    >
      <PageHero
        crumbs={[{ name: "Platform", path: "/our-software/" }, { name: s.name, path: `/${s.slug}/` }]}
        eyebrow={`Solution · ${s.kicker}`}
        title={s.name}
        lede={s.lede}
        aside={<Photo name={solutionPhoto[s.slug]} ratio="5/4" eager sizes="(min-width: 1024px) 40vw, 100vw" className="ken" />}
      />

      <section className="wrap grid gap-16 py-24 lg:grid-cols-12">
        <div className="max-w-4xl lg:col-span-12">
          <Answer>{s.answer}</Answer>
        </div>
        <article className="prose-hcrm lg:col-span-7">
          {s.sections.map((sec) => (
            <div key={sec.heading} data-reveal>
              <h2 className="first:mt-0">{sec.heading}</h2>
              {sec.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          ))}
        </article>
        <aside className="lg:col-span-5">
          <div className="card sticky top-28 p-8" data-reveal>
            <p className="eyebrow">Most used by</p>
            <ul className="mt-5 space-y-3">
              {s.forAudiences.map((a) => {
                const aud = audienceBySlug(a);
                return (
                  <li key={a}>
                    <Link to={`/${a}/`} className="group flex items-center justify-between gap-4 text-[15.5px] font-semibold text-ink hover:text-navy">
                      {aud.name}
                      <Arrow className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </section>

      <section className="border-y border-rule bg-white">
        <div className="wrap py-24">
          <h2 className="h-section max-w-3xl" data-reveal>{s.listHeading}</h2>
          <div className="mt-12" data-reveal>
            <Checklist items={s.list} />
          </div>
        </div>
      </section>

      <FaqList faqs={s.faqs} />

      <section className="border-t border-rule bg-paper2">
        <div className="wrap py-16">
          <p className="eyebrow">Other solutions</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} to={`/${o.slug}/`} className="card group p-6 hover:border-navy">
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-cyan-deep">{o.kicker}</span>
                <span className="mt-2 block font-serif text-[1.2rem] leading-snug group-hover:text-navy">{o.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
