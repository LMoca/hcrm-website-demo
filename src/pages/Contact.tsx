import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Mail, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import FaqList from "@/components/FaqList";

/**
 * Trim and cap only. Escaping belongs on the server and in the storage layer;
 * mangling a visitor's name here would break legitimate input (O'Brien) while
 * providing no real protection.
 */
const clean = (v: string, max: number) => v.trim().slice(0, max);

const path = [
  {
    step: "01",
    title: "Demo",
    meta: "45 minutes",
    body: "We run 24 months of de-identified claims through the live HRM interface. Normalization, forecast, flags and outcome reports, in that order.",
  },
  {
    step: "02",
    title: "Free trial",
    meta: "1 month, no cost",
    body: "Your own medical and pharmacy claims, with the complete output set returned inside the trial month.",
  },
  {
    step: "03",
    title: "Decision",
    meta: "No obligation",
    body: "If HRM earns its place, we go forward. If not, you keep a clear read on your own data quality and risk profile.",
  },
];

const bring = [
  ["Claims format", "Whatever your TPA or carrier already produces"],
  ["History needed", "Trailing 24 months, medical and pharmacy"],
  ["Work on your side", "None. No schema mapping, no data engineering"],
  ["Handling", "HIPAA-compliant throughout"],
];

const fieldClass =
  "w-full border border-line2 bg-mist px-4 py-3.5 text-[15px] text-ink placeholder:text-dim2 transition-colors focus:border-navy focus:outline-none focus:ring-0";

const Contact = () => {
  const reduced = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    lives: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: clean(form.name, 200),
      email: clean(form.email, 200),
      org: clean(form.org, 200),
      lives: clean(form.lives, 40),
      message: clean(form.message, 2000),
    };

    if (!payload.name || !payload.email || !payload.org) {
      setError("Name, work email and organization are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
      setError("That email address doesn't look right.");
      return;
    }

    setError(null);
    // TODO: POST to the HCRM intake endpoint. Validate and escape server-side.
    console.log("Demo request:", payload);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <PageHeader
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Book a demo" }]}
        label="Contact"
        title="Book a free demo."
        lede="Forty-five minutes on de-identified claims, then a month free on your own. You can stop after either one."
        seoDescription="Book a free HCRM demo. Forty-five minutes on de-identified claims, then a month free on your own medical and pharmacy data. No obligation."
        image={{
          src: "/img/img-forecast.jpg",
          alt: "Recorded claims history resolving into a fan of projected spend paths",
        }}
        specs={[
          { k: "Demo", v: "45 minutes" },
          { k: "Trial", v: "1 month free" },
          { k: "Obligation", v: "None" },
        ]}
      />

      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* the form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, y: 12 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-cyan/50 bg-cyan/5 p-10"
                >
                  <span className="flex h-9 w-9 items-center justify-center border border-navy">
                    <Check className="h-4 w-4 text-navy" strokeWidth={2.4} />
                  </span>
                  <h2 className="mt-7 display-md text-ink">Request received.</h2>
                  <p className="mt-5 max-w-measure text-[15.5px] leading-relaxed text-dim">
                    We will confirm a demo slot by email. If it helps to send
                    your claims format ahead of the call, reply to that
                    confirmation and we will tell you what we can read.
                  </p>
                  <dl className="mt-9 border-t border-line pt-6">
                    {[
                      ["Typical response", "1 business day"],
                      ["First call", "45 minutes, screen share"],
                      ["Data required for the demo", "None"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                      >
                        <dt className="label text-dim2">{k}</dt>
                        <dd className="font-mono text-[13px] text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <span className="label text-navy">Demo request</span>
                  <h2 className="mt-5 display-md text-ink">
                    Five fields. That's the whole gate.
                  </h2>

                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label htmlFor="name" className="label block text-dim2">
                        Name <span className="text-navy">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={200}
                        value={form.name}
                        onChange={set("name")}
                        className={`mt-3 ${fieldClass}`}
                        placeholder="Jordan Ellis"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="email" className="label block text-dim2">
                        Work email <span className="text-navy">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={200}
                        value={form.email}
                        onChange={set("email")}
                        className={`mt-3 ${fieldClass}`}
                        placeholder="you@organization.com"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="org" className="label block text-dim2">
                        Organization <span className="text-navy">*</span>
                      </label>
                      <input
                        id="org"
                        name="org"
                        type="text"
                        autoComplete="organization"
                        required
                        maxLength={200}
                        value={form.org}
                        onChange={set("org")}
                        className={`mt-3 ${fieldClass}`}
                        placeholder="Organization name"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="lives" className="label block text-dim2">
                        Covered lives
                      </label>
                      <select
                        id="lives"
                        name="lives"
                        value={form.lives}
                        onChange={set("lives")}
                        className={`mt-3 ${fieldClass} appearance-none`}
                      >
                        <option value="">Select a range</option>
                        <option value="<500">Under 500</option>
                        <option value="500-2500">500 to 2,500</option>
                        <option value="2500-10000">2,500 to 10,000</option>
                        <option value="10000+">Over 10,000</option>
                        <option value="na">Not applicable</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="label block text-dim2">
                        What are you trying to get ahead of?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={2000}
                        value={form.message}
                        onChange={set("message")}
                        className={`mt-3 resize-none ${fieldClass}`}
                        placeholder="Renewal in Q1, a stop-loss conversation, a program we can't prove out, or something else entirely."
                      />
                    </div>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="mt-6 border-l-2 border-danger pl-4 text-[13.5px] text-danger"
                    >
                      {error}
                    </p>
                  )}

                  <div className="mt-9 flex flex-wrap items-center gap-6">
                    <button type="submit" className="btn-primary">
                      Request a demo
                    </button>
                    <span className="flex items-center gap-2 text-[12.5px] text-dim2">
                      <ShieldCheck className="h-4 w-4 text-cyan" strokeWidth={1.7} />
                      No claims data required to book.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* the rail */}
            <div className="lg:col-span-5">
              <div className="border-t border-line">
                {path.map((s) => (
                  <Reveal key={s.step}>
                    <div className="border-b border-line py-6">
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                          <h3 className="font-display text-[18px] font-semibold tracking-[-0.03em] text-ink">
                            {s.title}
                          </h3>
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim2">
                            {s.meta}
                          </span>
                        </div>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-dim">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <dl className="mt-10 border border-line bg-mist p-6">
                  <span className="label text-dim2">What we need from you</span>
                  <div className="mt-5 space-y-3">
                    {bring.map(([k, v]) => (
                      <div
                        key={k}
                        className="flex flex-col gap-1 border-b border-line pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim2">
                          {k}
                        </dt>
                        <dd className="text-[13.5px] text-ink/85">{v}</dd>
                      </div>
                    ))}
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 flex items-start gap-3 border-l-2 border-navy pl-4">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-dim2" strokeWidth={1.7} />
                  <p className="font-mono text-[11.5px] leading-relaxed text-dim2">
                    [[CLIENT-SUPPLIED: direct email address and phone number for
                    buyers who prefer not to use a form.]]
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="Before the call"
            title="Answers to the questions that usually open it."
          />
          <div className="mt-14">
            <FaqList />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
