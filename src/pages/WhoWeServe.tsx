import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Answer, PageHero, PathFinder } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { audienceGroups, audiencesInGroup } from "@/data/audiences";
import Photo from "@/components/Photo";
import { audiencePhoto } from "@/data/photos";
import { ConnectivityDiagram } from "@/components/Connectivity";

export default function WhoWeServe() {
  return (
    <Layout cta={{ title: "Don't see yourself here? Let's talk anyway.", body: "If your organization carries, advises on, or manages healthcare risk, there's a good chance a 12-month forecast changes how you work. Tell us what you do." }}>
      <PageHero
        crumbs={[{ name: "Who we serve", path: "/who-we-serve/" }]}
        labelH1
        eyebrow="Who we serve"
        title={<>Eleven kinds of organizations. <em className="text-navy">One forecast.</em></>}
        lede="Anyone who pays for, advises on, or delivers healthcare benefits from knowing next year's claims this year. Here's what that looks like for each."
        aside={
          <Answer label="Who uses HCRM">
            HCRM serves self-funded employers, health insurance brokers and consultants, fully insured carriers, health plans, stop-loss carriers and captives, third-party administrators, clinics and providers, employer on-site clinics, accountable care organizations, population health management teams, and health management and wellness vendors.
          </Answer>
        }
      />

      <section className="border-b border-rule bg-white">
        <div className="wrap grid items-center gap-14 py-20 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal="left">
            <p className="eyebrow">One forecast, many uses</p>
            <h2 className="h-section mt-3">The same source of truth, answering each client's question.</h2>
            <p className="lede mt-5">Advisors use it to win renewals, risk-bearers to budget, clinicians to reach patients first, and program teams to prove they worked.</p>
          </div>
          <div className="lg:col-span-7">
            <ConnectivityDiagram
              items={audienceGroups.map((g) => ({ name: g.label, note: g.question }))}
              kicker="Health Risk Monitor"
              center="12-month forecast"
              caption="Health Risk Monitor's forecast serves brokers and TPAs; employers, carriers and health plans; clinics, providers and ACOs; and population health and wellness programs."
              outward
            />
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <PathFinder />
      </section>

      <section className="border-t border-rule bg-white">
        <div className="wrap space-y-20 py-24">
          {audienceGroups.map((g) => (
            <div key={g.id} className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4" data-reveal>
                <h2 className="font-serif text-[2rem] leading-tight">{g.label}</h2>
                <p className="mt-3 text-ink2">{g.summary}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {audiencesInGroup(g.id).map((a) => (
                  <Link key={a.slug} to={`/${a.slug}/`} className="card group flex flex-col overflow-hidden hover:-translate-y-0.5 hover:border-navy hover:shadow-lg" data-reveal>
                    <Photo name={audiencePhoto[a.slug]} ratio="16/8" sizes="(min-width: 1024px) 30vw, 100vw" className="!rounded-none" tint={false} />
                    <div className="flex-1 px-7 pt-6">
                      <h3 className="h-card group-hover:text-navy">{a.name}</h3>
                      <p className="mt-3 text-[15px] text-ink2">{a.short}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 px-7 pb-7 text-[15px] font-semibold text-navy">
                      What it means for you <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
