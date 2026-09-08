import Reveal from "@/components/kit/Reveal";
import { InkCta } from "@/components/kit/Actions";
import { ShieldCheck } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
}

const path = [
  {
    title: "The demo",
    body: "We run 24 months of de-identified claims through the live HRM interface. You see the normalization, the forecast and the flags before anything is signed.",
    meta: "45 minutes",
  },
  {
    title: "The free trial",
    body: "One month on your own medical and pharmacy claims, with the full output set: member forecasts, group trend, flags and outcome reports.",
    meta: "1 month, no cost",
  },
  {
    title: "The decision",
    body: "No obligation. If HRM earns its place you move forward. If it doesn't, you keep a clear read on your own data quality and risk profile.",
    meta: "Yours either way",
  },
];

/**
 * The site's conversion anchor, set as the one deep band on most pages. It
 * shows the entire path before the click, so "book a demo" reads as a
 * bounded commitment rather than an open-ended sales process.
 */
const CTASection = ({
  title = "See the claim before it forms.",
  description = "Every engagement starts the same way, and you can stop at any point.",
  ctaLabel = "Book a free demo",
  ctaTo = "/contact",
}: CTASectionProps) => {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/img/band-ink.jpg')" }}
        aria-hidden="true"
      />
      <div className="grid-field-ink absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="edge relative band">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="label text-cyan">Next step</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 display-lg text-balance text-white">{title}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-measure lede text-white/70">{description}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9">
                <InkCta to={ctaTo}>{ctaLabel}</InkCta>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex items-center gap-2.5 text-[12.5px] text-white/55">
                <ShieldCheck className="h-4 w-4 text-cyan" strokeWidth={1.7} />
                HIPAA-compliant handling of every claims file you send us.
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {path.map((s, i) => (
              <Reveal key={s.title} delay={0.08 + i * 0.08}>
                <div className="border-t border-white/15 py-7 transition-colors hover:border-cyan/50">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[21px] font-semibold tracking-[-0.03em] text-white md:text-[24px]">
                      {s.title}
                    </h3>
                    <span className="text-[12px] uppercase tracking-[0.12em] text-cyan">
                      {s.meta}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-measure-wide text-[14.5px] leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="h-px bg-white/15" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
