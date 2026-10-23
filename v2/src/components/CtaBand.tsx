import Scene from "@/components/Scene";
import { Link } from "react-router-dom";
import { CTA_LABEL } from "@/data/site";
import { Arrow } from "./Icons";
import HorizonMini from "./HorizonMini";

export type Cta = {
  title: string;
  body?: string;
  query?: string; // prefill for the contact form, e.g. "type=health-plans-2"
  secondary?: { label: string; to: string };
  eyebrow?: string;
  /** Marks the band as the last chapter of a page's scroll story (see StoryRail). */
  chapter?: { label: string; status: string; tone: "risk" | "watch" | "safe" };
};

export const defaultCta: Cta = {
  title: "See your next 12 months before they happen.",
  body: "Tell us who you serve and what's keeping you up at night. We'll walk through 24 months of real, de-identified claims in Health Risk Monitor, then you can try it free for a month on your own data.",
  secondary: { label: "Read the FAQ", to: "/faq/" },
};

/** Closing call to action rendered on every page, directly above the footer. */
export default function CtaBand({ cta = defaultCta }: { cta?: Cta }) {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-navy-deep text-white"
      data-chapter={cta.chapter?.label}
      data-status={cta.chapter?.status}
      data-tone={cta.chapter?.tone}
    >
      <Scene photo="couple" tone="dark" />
      <div className="grain-light absolute inset-0" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-10 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="eyebrow !text-cyan">{cta.eyebrow ?? "Next step"}</p>
          <h2 id="cta-title" className="h-section mt-4 !text-white">{cta.title}</h2>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-white/75">{cta.body ?? defaultCta.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={`/contact/${cta.query ? `?${cta.query}` : ""}`} className="btn-cyan">
              {CTA_LABEL} <Arrow />
            </Link>
            {(cta.secondary ?? defaultCta.secondary) && (
              <Link to={(cta.secondary ?? defaultCta.secondary)!.to} className="btn-ghost-light">
                {(cta.secondary ?? defaultCta.secondary)!.label}
              </Link>
            )}
          </div>
        </div>
        <div className="md:col-span-5">
          <HorizonMini />
        </div>
      </div>
    </section>
  );
}
