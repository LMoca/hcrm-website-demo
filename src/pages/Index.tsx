import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import Counter from "@/components/kit/Counter";
import Figure from "@/components/kit/Figure";
import HorizonRule from "@/components/kit/HorizonRule";
import { PrimaryCta, OutlineCta, ArrowLink } from "@/components/kit/Actions";
import HRMConsole from "@/components/hrm/HRMConsole";
import Pipeline from "@/components/hrm/Pipeline";
import LagDiagram from "@/components/hrm/LagDiagram";
import { useSeo } from "@/hooks/useSeo";
import { personas } from "@/data/personas";
import { testimonials } from "@/data/testimonials";

const proofRail = [
  { v: "95%+", k: "Data-normalization accuracy", s: "measured across client datasets" },
  { v: "12 mo", k: "Forecast lead time", s: "before the claim arrives" },
  { v: "24 mo", k: "Claims history per member", s: "medical and pharmacy" },
  { v: "17 yrs", k: "Longest client partnership", s: "Applied Health Analytics" },
];

const differentiators = [
  {
    title: "The forecast is defensible",
    claim:
      "A prediction is only worth the dataset under it. HCRM built the normalization engine before the model, and 95%+ accuracy is measured on client data rather than asserted from a sample.",
    art: (
      <div className="space-y-3">
        {[
          ["Claims ingested", "1,284,006", "text-ink"],
          ["Auto-resolved", "1,221,932", "text-cyan-deep"],
          ["Exceptions surfaced", "62,074", "text-danger"],
        ].map(([k, v, c]) => (
          <div
            key={k}
            className="flex items-baseline justify-between border-b border-line pb-2 last:border-b-0"
          >
            <span className="text-[12.5px] text-dim">{k}</span>
            <span className={`font-mono text-[13.5px] font-medium tabular-nums ${c}`}>
              {v}
            </span>
          </div>
        ))}
        <p className="pt-1 text-[12.5px] leading-relaxed text-dim2">
          Unresolvable claims are reported, never quietly passed into the model.
        </p>
      </div>
    ),
  },
  {
    title: "Risk arrives denominated in dollars",
    claim:
      "Abstract risk scores stall in the gap between clinical and finance. HRM states exposure as projected spend, so one number travels from the care team to the CFO to the stop-loss carrier without translation.",
    art: (
      <div className="space-y-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.12em] text-dim2">
            Conventional output
          </div>
          <div className="mt-1.5 font-display text-[21px] font-semibold tabular-nums text-dim2 line-through decoration-danger/70 decoration-2">
            Risk score 4.7
          </div>
        </div>
        <div className="h-px bg-line" />
        <div>
          <div className="text-[11px] uppercase tracking-[0.12em] text-dim2">
            HRM output
          </div>
          <div className="mt-1.5 font-display text-[30px] font-semibold tabular-nums text-navy">
            $486,000
          </div>
          <div className="mt-1 text-[12.5px] text-dim2">
            projected, Q1 2027, 94% confidence
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Twelve months you can still spend",
    claim:
      "Lead time is the entire product. A flag raised a year out is a decision; the same flag raised at reporting is a reconciliation. HRM is built to move the moment you learn something forward.",
    art: (
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.12em] text-dim2">Today</span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-cyan-deep">
            +12 mo
          </span>
        </div>
        <div className="relative h-2 rounded-full bg-mist2">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-cyan/30" />
          <div className="absolute inset-y-0 right-0 w-1.5 rounded-full bg-danger" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
          {[
            ["Reach the member", "Q4"],
            ["Redirect care setting", "Q4"],
            ["Renegotiate stop-loss", "Q1"],
            ["Budget honestly", "Q1"],
          ].map(([a, b]) => (
            <div key={a} className="border-t border-line pt-2">
              <div className="text-[13px] text-ink/80">{a}</div>
              <div className="font-mono text-[10.5px] text-dim2">{b}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const outputs = [
  {
    src: "/img/img-forecast.jpg",
    alt: "Recorded claims history resolving into a fan of projected spend paths",
    cut: "tr-bl" as const,
    t: "The forecast",
    b: "What the plan spends over the next twelve months, at member and group level, with a confidence interval around it.",
    to: "/services/healthcare-predictive-analytics",
  },
  {
    src: "/img/img-cohort.jpg",
    alt: "A covered population with a handful of high-cost members highlighted",
    cut: "tl-br" as const,
    t: "The exposure",
    b: "Which members drive that number, why, and the window you have left before the claim actually lands.",
    to: "/services/stop-loss-reporting",
  },
  {
    src: "/img/img-outcome.jpg",
    alt: "Measured actual spend compared against a predicted baseline for each program",
    cut: "tr-bl" as const,
    t: "The evidence",
    b: "Whether the programs you already fund moved the number, measured against the spend HRM predicted without them.",
    to: "/services/clinical-reporting-outcome-assessment",
  },
];

const Index = () => {
  const reduced = useReducedMotion();
  useSeo(
    undefined,
    "Health Risk Monitor reads 24 months of medical and pharmacy claims and forecasts the next twelve in dollars, on a dataset normalized to 95%+ accuracy."
  );
  const featured = testimonials.find((t) => t.featured)!;
  const secondary = testimonials.filter((t) => t !== featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-line pt-[4.25rem] md:pt-[4.75rem]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-right-top"
          style={{ backgroundImage: "url(/img/hero-field.jpg)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent"
          aria-hidden="true"
        />

        <div className="edge relative grid items-center gap-12 pb-14 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-20">
          {/* statement */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
              <span className="label text-cyan-deep">
                Health Risk Monitor
                <span className="hidden sm:inline"> &middot; Claims intelligence</span>
              </span>
            </motion.div>

            <motion.h1
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 display-xl text-ink"
            >
              See the claim
            </motion.h1>

            <HorizonRule delay={0.4} className="my-4 max-w-xl md:my-5" />

            <motion.h2
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-ink/40"
            >
              before it forms.
            </motion.h2>

            <motion.p
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 max-w-measure lede text-pretty text-dim"
            >
              Health Risk Monitor reads 24 months of medical and pharmacy claims
              and returns the next twelve: what your plan will spend, which
              members will drive it, and how much of that you still have time to
              change.
            </motion.p>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <PrimaryCta />
              <OutlineCta to="/about/our-software">See the platform</OutlineCta>
            </motion.div>

            <motion.p
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-5 text-[13px] text-dim2"
            >
              A 45-minute demo on de-identified claims, then a month free on your
              own data.
            </motion.p>
          </div>

          {/* the product, sized to support the statement rather than compete */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 lg:col-span-5 lg:col-start-8"
          >
            <HRMConsole compact />
          </motion.div>
        </div>

        {/* proof rail: centred, no dividing rules */}
        <div className="edge relative pb-14 pt-2 md:pb-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {proofRail.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06}>
                <div className="text-center">
                  <div className="font-display text-[34px] font-semibold tracking-[-0.04em] text-navy lg:text-[42px]">
                    {p.v}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-ink">{p.k}</div>
                  <div className="mt-1 text-[12.5px] text-dim2">{p.s}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE GAP ============ */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="The gap"
            title={
              <>
                Every claim on your report{" "}
                <span className="text-ink/40">has already been paid.</span>
              </>
            }
            lede="Claims reporting is a record of decisions that are finished. It arrives complete, accurate, and roughly seventy-five days too late to change anything it describes."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="min-w-0 lg:col-span-7">
              <LagDiagram />
            </Reveal>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[15.5px] leading-relaxed text-dim">
                  Self-funded plans carry the risk directly, which means the gap
                  between when cost is created and when cost is visible is a
                  financial exposure, not an administrative annoyance. A member
                  entering a high-cost trajectory generates signals in their
                  claims long before the expensive event lands: a diagnosis
                  progression, a specialty pharmacy start, a rising utilization
                  pattern.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-[15.5px] leading-relaxed text-dim">
                  Those signals are already in the data you own. What has been
                  missing is a model accurate enough that acting on them is
                  defensible to the people who sign the budget.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-10 border-l-[3px] border-cyan pl-6">
                  <div className="font-display text-[42px] font-semibold leading-none tracking-[-0.04em] text-ink">
                    <Counter to={75} suffix=" days" />
                  </div>
                  <p className="mt-3 max-w-[24rem] text-[13.5px] leading-relaxed text-dim2">
                    Typical lag between the date of service and the date the
                    claim reaches your reporting. Every day of it is spent.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE PRODUCT ============ */}
      <section className="border-b border-line bg-mist">
        <div className="edge band">
          <SectionHead
            label="The product"
            title={
              <>
                Four views.{" "}
                <span className="text-ink/40">One normalized dataset.</span>
              </>
            }
            lede="This is Health Risk Monitor running on a synthetic plan of 4,820 lives. Move between the views the way your team would: group forecast, member exposure, program outcomes, stop-loss position."
          />

          <Reveal className="mt-14">
            <HRMConsole />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-measure-wide text-[13px] leading-relaxed text-dim2">
                Figures above are synthetic and de-identified, shaped to match
                the structure of a live HRM output. In a demo you see this
                interface run against 24 months of real de-identified claims.
              </p>
              <ArrowLink to="/about/our-software">How the engine works</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ THE METHOD ============ */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band-tight">
          <SectionHead
            label="The method"
            title={
              <>
                Messy claim in.{" "}
                <span className="text-ink/40">Defensible dollar out.</span>
              </>
            }
            lede="Four stages, each producing something you can inspect. The second one is where most platforms quietly lose their accuracy, so it is the one we publish a number against."
          />
          <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <Figure
              className="min-w-0 lg:col-span-4"
              src="/img/img-normalize.jpg"
              alt="Irregular inbound claim records resolving into an aligned, validated grid"
              cut="tl-br"
              ratio="aspect-[4/3]"
              caption="Inbound records, aligned against the reference set."
            />
            <Reveal delay={0.08} className="min-w-0 lg:col-span-8 lg:pt-4">
              <p className="text-[15.5px] leading-relaxed text-dim">
                Every claim arrives in somebody else&rsquo;s format. Before a
                model sees it, HCRM resolves the member, reconciles the provider,
                maps the codes to a single reference set, and flags what it
                cannot resolve rather than averaging it away.
              </p>
              <div className="mt-6">
                <ArrowLink to="/services/data-normalization-validation">
                  Inside the normalization engine
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="edge pb-16 md:pb-20">
          <Pipeline />
        </div>
      </section>

      {/* ============ WHY HCRM ============ */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="Why HCRM"
            title={
              <>
                Three claims{" "}
                <span className="text-ink/40">we will hold to evidence.</span>
              </>
            }
            lede="Healthcare analytics is a category crowded with dashboards. These are the three things a buyer should test us on, and how each one is demonstrable during a trial."
          />

          <div className="mt-14 space-y-6">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="grid items-center gap-8 rounded-lg border border-line bg-canvas p-7 shadow-[0_1px_2px_rgba(10,31,51,0.04),0_18px_44px_-30px_rgba(10,31,51,0.28)] lg:grid-cols-12 lg:gap-12 lg:p-10">
                  <div className="lg:col-span-6">
                    <h3 className="display-md text-balance text-ink">{d.title}</h3>
                    <p className="mt-5 max-w-measure text-[15.5px] leading-relaxed text-dim">
                      {d.claim}
                    </p>
                  </div>
                  <div className="lg:col-span-6">
                    <div className="rounded-md bg-mist p-6">{d.art}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="border-b border-line bg-mist">
        <div className="edge band">
          <SectionHead
            label="What you get"
            align="center"
            title="Three outputs, three decisions."
            lede="Every engagement returns the same three artefacts, and each one answers a question somebody in your organization is already being asked."
          />

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {outputs.map((c, i) => (
              <div key={c.t} className="min-w-0">
                <Figure
                  src={c.src}
                  alt={c.alt}
                  cut={c.cut}
                  ratio="aspect-[4/3]"
                  delay={i * 0.08}
                />
                <Reveal delay={0.06 + i * 0.08}>
                  <h3 className="mt-6 font-display text-[22px] font-semibold tracking-[-0.03em] text-ink">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-dim">{c.b}</p>
                  <div className="mt-4">
                    <ArrowLink to={c.to}>Read more</ArrowLink>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO IT IS FOR ============ */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="Who it's for"
            title={
              <>
                Eleven buyers.{" "}
                <span className="text-ink/40">The same blind spot.</span>
              </>
            }
            lede="Whoever carries the risk needs to see it early. The vocabulary changes between an employer, a captive and an ACO; the arithmetic does not."
          />

          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {personas.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 6) * 0.04}>
                <Link
                  to={`/clients/${p.slug}`}
                  className="row-live group block border-t border-line py-5"
                >
                  <span className="block font-display text-[19px] font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-navy md:text-[21px]">
                    {p.shortTitle}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-dim2">
                    {p.tagline}
                  </span>
                </Link>
              </Reveal>
            ))}
            <div className="hairline md:col-span-2" />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <ArrowLink to="/clients/who-we-serve">
                Compare all eleven side by side
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EVIDENCE ============ */}
      <section className="border-b border-line bg-mist">
        <div className="edge band">
          <SectionHead
            label="Evidence"
            title={
              <>
                Seventeen years{" "}
                <span className="text-ink/40">is the reference we lead with.</span>
              </>
            }
            lede="Partnerships in this category do not survive a decade on marketing. They survive on outputs that hold up in front of a CFO, year after year."
          />

          <Reveal className="mt-14">
            <figure className="max-w-5xl">
              <blockquote className="display-md text-balance text-ink">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-5">
                <span className="text-[14.5px] font-semibold text-ink">
                  {featured.author}
                </span>
                <span className="text-[14px] text-dim">{featured.role}</span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-navy">
                  {featured.company}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {secondary.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.06}>
                <figure className="border-t border-line py-8">
                  <blockquote className="text-[15.5px] leading-relaxed text-ink/80">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[13.5px] font-semibold text-ink">
                      {t.author}
                    </span>
                    <span className="text-[13px] text-dim2">{t.role},</span>
                    <span className="text-[13px] text-dim2">{t.company}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
            <div className="hairline md:col-span-2" />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <ArrowLink to="/clients/testimonials">All client evidence</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUESTIONS ============ */}
      <section className="border-b border-line bg-canvas">
        <div className="edge band">
          <SectionHead
            label="Before you book"
            title="The questions we get asked first."
            lede="Most of these come up in the first ten minutes of a demo. Here they are in advance, so the call can start further along."
          />
          <div className="mt-14">
            <FaqList />
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
