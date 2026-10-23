import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { PageHero } from "@/components/Blocks";
import { Arrow, Check } from "@/components/Icons";
import { SITE } from "@/data/site";
import { audienceGroups, audiencesInGroup } from "@/data/audiences";
import { leadsConfigured, submitLead } from "@/lib/leads";

const topics = [
  { v: "conversation", l: "Start a conversation about HRM" },
  { v: "walkthrough", l: "See a walkthrough on de-identified data" },
  { v: "trial", l: "Free one-month trial on our own claims" },
  { v: "partnership", l: "Partnership" },
  { v: "general", l: "General question" },
];

export default function Contact() {
  const [params] = useSearchParams();
  const [orgType, setOrgType] = useState("");
  const [topic, setTopic] = useState("conversation");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Prefill from CTA links (?type=health-plans-2, ?topic=partnership). Runs after hydration.
  useEffect(() => {
    const t = params.get("type");
    if (t) setOrgType(t);
    const tp = params.get("topic");
    if (tp && topics.some((x) => x.v === tp)) setTopic(tp);
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    setState("sending");
    try {
      await submitLead({
        firstname: get("firstname"),
        lastname: get("lastname"),
        email: get("email"),
        phone: get("phone"),
        company: get("company"),
        org_type: orgType,
        topic,
        message: get("message"),
      });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <Layout
      cta={{
        title: "Prefer to talk now?",
        body: `Call ${SITE.phoneDisplay} or email ${SITE.email}. We'll connect you with someone who knows your corner of the market.`,
        secondary: { label: "Read the FAQ", to: "/faq/" },
      }}
    >
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        labelH1
        eyebrow="Contact"
        title={<>Tell us where you sit. <em className="text-navy">We'll show you what's ahead.</em></>}
        lede="We'll show you Health Risk Monitor running on 24 months of real, de-identified claims and eligibility data. After that you can try it free for one month: HCRM collects your medical and pharmacy claims and shows you your own forecast."
      />

      <section className="wrap grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {state === "sent" ? (
            <div className="card p-10" role="status">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-soft text-sage">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-serif text-[2rem]">Thank you. We'll be in touch shortly.</h2>
              <p className="mt-3 text-ink2">
                Someone from HCRM will reach out within one business day. In the meantime, you can email{" "}
                <a className="text-navy underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card space-y-6 p-7 md:p-10" aria-describedby="form-note">
              <fieldset>
                <legend className="label">What would you like to do?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <label key={t.v} className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors ${topic === t.v ? "border-navy bg-navy text-white" : "border-rule bg-white text-ink2 hover:border-ink/40"}`}>
                      <input type="radio" name="topic" value={t.v} checked={topic === t.v} onChange={() => setTopic(t.v)} className="sr-only" />
                      {t.l}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstname" className="label">First name</label>
                  <input id="firstname" name="firstname" required autoComplete="given-name" className="field" />
                </div>
                <div>
                  <label htmlFor="lastname" className="label">Last name</label>
                  <input id="lastname" name="lastname" required autoComplete="family-name" className="field" />
                </div>
                <div>
                  <label htmlFor="email" className="label">Work email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="field" />
                </div>
                <div>
                  <label htmlFor="phone" className="label">Phone <span className="font-normal text-dim">(optional)</span></label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
                </div>
                <div>
                  <label htmlFor="company" className="label">Organization</label>
                  <input id="company" name="company" required autoComplete="organization" className="field" placeholder="Company or plan name" />
                </div>
                <div>
                  <label htmlFor="org_type" className="label">Organization type</label>
                  <select id="org_type" name="org_type" required value={orgType} onChange={(e) => setOrgType(e.target.value)} className="field">
                    <option value="" disabled>Choose one</option>
                    {audienceGroups.map((g) => (
                      <optgroup key={g.id} label={g.label}>
                        {audiencesInGroup(g.id).map((a) => (
                          <option key={a.slug} value={a.slug}>{a.name}</option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="label">What's on your mind? <span className="font-normal text-dim">(optional)</span></label>
                <textarea id="message" name="message" rows={4} className="field" placeholder="Population size, current vendors, renewal date, the problem you're trying to solve…" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p id="form-note" className="text-[13px] text-dim">
                  We'll only use this to respond to you. {leadsConfigured ? "" : "(Demo mode: no data is sent.)"}
                </p>
                <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Start the conversation"} <Arrow />
                </button>
              </div>
              {state === "error" && (
                <p role="alert" className="rounded-xl bg-signal-soft px-4 py-3 text-[14px] text-signal">
                  Something went wrong. Please email {SITE.email} or call {SITE.phoneDisplay}.
                </p>
              )}
            </form>
          )}
        </div>

        <aside className="space-y-5 lg:col-span-5">
          <div className="card p-8">
            <p className="eyebrow">What happens next</p>
            <ol className="mt-5 space-y-5">
              {[
                ["A short call", "We learn your organization, population and goals."],
                ["A walkthrough", "Health Risk Monitor running on 24 months of real, de-identified claims."],
                ["A free month", "HCRM collects your claims and shows your own 12-month forecast."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[13px] text-white">{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="text-[15px] text-ink2">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="card p-8">
            <p className="eyebrow">General questions</p>
            <ul className="mt-4 space-y-2 text-[15.5px]">
              <li><a href={`mailto:${SITE.email}`} className="font-semibold text-navy hover:underline">{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone}`} className="font-semibold text-navy hover:underline">{SITE.phoneDisplay}</a></li>
              <li className="text-ink2">{SITE.city}, Illinois</li>
              <li><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink2 hover:text-navy">Follow HCRM on LinkedIn</a></li>
            </ul>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
