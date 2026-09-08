import type { ReactNode } from "react";
import Reveal from "@/components/kit/Reveal";

interface SectionHeadProps {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /** light = on canvas/mist, ink = on a navy band */
  tone?: "light" | "ink";
  align?: "split" | "stacked" | "center";
  className?: string;
}

/**
 * Editorial section opener: a small brand-coloured label, then one oversized
 * display line with the lede set opposite it.
 */
const SectionHead = ({
  label,
  title,
  lede,
  tone = "light",
  align = "split",
  className = "",
}: SectionHeadProps) => {
  const onInk = tone === "ink";
  const labelClass = onInk ? "text-cyan" : "text-cyan-deep";
  const titleClass = onInk ? "text-white" : "text-ink";
  const ledeClass = onInk ? "text-white/70" : "text-dim";

  if (align === "center") {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`}>
        <Reveal>
          <span className={`label ${labelClass}`}>{label}</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={`mt-5 display-lg text-balance ${titleClass}`}>{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.12}>
            <p className={`mx-auto mt-6 max-w-measure lede text-pretty ${ledeClass}`}>
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Reveal>
        <span className={`label ${labelClass}`}>{label}</span>
      </Reveal>

      <div
        className={
          align === "split"
            ? "mt-5 grid gap-8 lg:grid-cols-12 lg:gap-12"
            : "mt-5 max-w-measure-wide"
        }
      >
        <Reveal delay={0.06} className={align === "split" ? "lg:col-span-7" : ""}>
          <h2 className={`display-lg text-balance ${titleClass}`}>{title}</h2>
        </Reveal>

        {lede && (
          <Reveal
            delay={0.12}
            className={align === "split" ? "lg:col-span-5 lg:pt-2" : "mt-6"}
          >
            <p className={`lede max-w-measure text-pretty ${ledeClass}`}>{lede}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default SectionHead;
