import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, Checklist, FaqList, PageHero, SectionHead, Timeline } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { audienceBySlug, audienceGroups, audiencesInGroup } from "@/data/audiences";
import { solutionBySlug } from "@/data/solutions";
import Photo, { Tag } from "@/components/Photo";
import { audiencePhoto } from "@/data/photos";
import { InfographicSection, ServiceInfographic } from "@/components/infographics/Panels";

export default function AudiencePage({ slug }: { slug: string }) {
  const a = audienceBySlug(slug);
  const group = audienceGroups.find((g) => g.id === a.group)!;
  const siblings = audiencesInGroup(a.group).filter((s) => s.slug !== slug);

  return (
    <Layout
      cta={{
        title: `Let's map your first 18 months.`,
        body: `Tell us about your organization and we'll show you what Health Risk Monitor would surface in your own data: the forecast, the members driving it, and what ${a.name.toLowerCase()} typically do next.`,
        query: `type=${a.slug}`,
        secondary: { label: "See all audiences", to: "/who-we-serve/" },
      }}
    >
      <PageHero
        crumbs={[{ name: "Who we serve", path: "/who-we-serve/" }, { name: a.name, path: `/${a.slug}/` }]}
        eyebrow={`For ${group.label.toLowerCase()}`}
        title={a.name}
        lede={a.lede}
        aside={
          <Photo name={audiencePhoto[a.slug]} ratio="5/4" eager sizes="(min-width: 1024px) 40vw, 100vw" className="ken">
            <Tag label="By month 18" value={a.horizon[a.horizon.length - 1].title} tone="dark" className="float bottom-5 left-5" />
          </Photo>
        }
      />

      {/* What it means */}
      <section className="wrap py-24">
        <div className="mb-20 max-w-4xl">
          <Answer label={`What HCRM does for ${a.name.toLowerCase()}`}>{a.answer}</Answer>
        </div>
        <SectionHead eyebrow="What this means for you" title={`Why ${a.name.toLowerCase()} use HCRM`} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {a.means.map((m, i) => (
            <div key={m.h} className="card p-8" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="font-mono text-[12px] text-cyan-deep">0{i + 1}</p>
              <h3 className="h-card mt-3">{m.h}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink2">{m.p}</p>
            </div>
          ))}
        </div>
        <div className="prose-hcrm mt-16 max-w-prose" data-reveal>
          {a.context.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </section>

      {/* 18 months */}
      <section className="border-y border-rule bg-white">
        <div className="wrap py-24">
          <SectionHead
            eyebrow="Your next 18 months"
            title="Where you'll be a year from now."
            lede="Here is the typical path from the first data request to results you can show."
          />
          <div className="mt-14">
            <Timeline items={a.horizon} claim={a.claim} note />
          </div>
        </div>
      </section>

      <InfographicSection
        eyebrow="What you'll see"
        title={`${solutionBySlug(a.solutions[0]).name}, in Health Risk Monitor.`}
        body={solutionBySlug(a.solutions[0]).description}
        link={{ to: `/${a.solutions[0]}/`, label: `More on ${solutionBySlug(a.solutions[0]).name.toLowerCase()}` }}
      >
        <ServiceInfographic slug={a.solutions[0]} />
      </InfographicSection>

      {/* Capabilities */}
      <section className="wrap grid gap-14 py-24 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">Reporting capabilities</p>
          <h2 className="h-section mt-3">What's in the box.</h2>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <Checklist items={a.capabilities} cols={1} />
        </div>
      </section>

      {/* Solutions used */}
      <section className="border-t border-rule bg-paper2">
        <div className="wrap py-20">
          <p className="eyebrow">Recommended for you</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {a.solutions.map((sl) => {
              const s = solutionBySlug(sl);
              return (
                <Link key={sl} to={`/${sl}/`} className="card group flex flex-col justify-between p-7 hover:border-navy" data-reveal>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow text-cyan-deep">{s.kicker}</span>
                    <h3 className="h-card mt-2 group-hover:text-navy">{s.name}</h3>
                    <p className="mt-3 text-[15px] text-ink2">{s.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy">
                    Learn more <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FaqList faqs={a.faqs} />

      {siblings.length > 0 && (
        <section className="border-t border-rule">
          <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-10">
            <span className="eyebrow">Also in {group.label}</span>
            {siblings.map((s) => (
              <Link key={s.slug} to={`/${s.slug}/`} className="link-arrow">
                {s.name} <Arrow />
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
