import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { PageHero } from "@/components/Blocks";
import { audiences } from "@/data/audiences";
import { SITE } from "@/data/site";
import { terms } from "@/data/terms";

export function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const isTerms = kind === "terms";
  const path = isTerms ? "/terms-of-use/" : "/privacy/";
  const label = isTerms ? "Terms of use" : "Privacy policy";
  return (
    <Layout cta={{ title: "Questions about how we handle data?", body: `HCRM is SOC 2 Type 2 certified and stores all data in the U.S. Email ${SITE.email} and we'll walk you through our security practices.` }}>
      <PageHero crumbs={[{ name: label, path }]} eyebrow="Legal" title={isTerms ? "HCRM Website Terms of Use (Agreement)" : label} />
      <section className="wrap py-16">
        <div className="prose-hcrm max-w-prose">
          {isTerms ? (
            terms.map((t, i) => (i === 0 ? <p key={i}><strong>{t}</strong></p> : <p key={i}>{t}</p>))
          ) : (
            <>
              {/* TODO [client]: hcrm.net has no privacy policy page; the terms reference one. Supply counsel-approved text. */}
              <p>This page will contain {SITE.legalName}'s privacy policy.</p>
              <p>For questions, contact {SITE.email}.</p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export function NotFound() {
  return (
    <Layout>
      <PageHero
        crumbs={[{ name: "Not found", path: "/404" }]}
        eyebrow="404"
        title="This page wasn't in the forecast."
        lede="The page you're looking for has moved or doesn't exist. These are a good place to start:"
      >
        <ul className="mt-8 flex flex-wrap gap-3">
          <li><Link to="/" className="btn-primary">Home</Link></li>
          <li><Link to="/who-we-serve/" className="btn-ghost">Who we serve</Link></li>
          <li><Link to="/our-software/" className="btn-ghost">Platform</Link></li>
          <li><Link to="/faq/" className="btn-ghost">FAQ</Link></li>
        </ul>
        <p className="mt-10 text-[15px] text-ink2">
          Or jump to: {audiences.slice(0, 4).map((a, i) => (
            <span key={a.slug}>
              {i > 0 && " · "}
              <Link to={`/${a.slug}/`} className="text-navy underline">{a.name}</Link>
            </span>
          ))}
        </p>
      </PageHero>
    </Layout>
  );
}
