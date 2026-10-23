import type { CSSProperties } from "react";
import { photos, photoSrc, type PhotoKey } from "@/data/photos";

// Section backdrop: a full-bleed photo that melts into the section's own background, with a story
// animation drawn over it. Sits behind the section's content (the section must be `relative`).
//
//   side   "right": photo fills the side opposite the copy (below it on mobile), fading in toward the text
//          "top":   photo across the top of the section, fading down into the content
//          "full":  photo behind everything, held back by the section color
//   tone   "light" for paper/white sections, "dark" for navy ones (the photo is duotoned into the navy)
//   anim   the part of the business story the background tells, driven by scroll (--p from data-scroll)
//
// The photo is decorative here (alt=""): the section's copy carries the meaning.

type Anim = "scan" | "claim" | "connect" | "bend" | "bars" | "none";

export default function Scene({
  photo,
  side = "right",
  tone = "light",
  anim = "none",
  strength,
  eager,
  pos,
  boxClass,
}: {
  photo: PhotoKey;
  side?: "right" | "top" | "full";
  tone?: "light" | "dark";
  anim?: Anim;
  /** Photo opacity, 0–1. */
  strength?: number;
  eager?: boolean;
  /** Override the photo's focal point (object-position). */
  pos?: string;
  /** Override where the photo sits in the section. */
  boxClass?: string;
}) {
  const ph = photos[photo];
  const box = {
    right: "inset-x-0 bottom-0 top-[30%] lg:inset-y-0 lg:left-[36%] lg:right-0",
    top: "inset-x-0 top-0 h-[75%] lg:h-[85%]",
    full: "inset-0",
  }[side];
  const placed = boxClass ?? box;
  const opacity = strength ?? (tone === "dark" ? (side === "full" ? 0.22 : 0.5) : side === "full" ? 0.18 : 1);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" data-scroll>
      <div className={`scene-img scene-${side} absolute ${placed}`} style={{ opacity }}>
        <div className="par-img">
          <img
            src={photoSrc(ph, 1600, 1100)}
            srcSet={[800, 1200, 1600, 2200].map((w) => `${photoSrc(ph, w, Math.round(w * 0.69))} ${w}w`).join(", ")}
            sizes="100vw"
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${tone === "dark" ? "grayscale contrast-125" : "saturate-[0.85]"}`}
            style={{ objectPosition: pos ?? ph.pos ?? "50% 50%" }}
          />
        </div>
        {tone === "dark" ? (
          <div className="absolute inset-0 bg-gradient-to-t from-navy-night via-navy-night/30 to-navy/40 mix-blend-multiply" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
        )}
      </div>
      {anim !== "none" && <SceneAnim kind={anim} dark={tone === "dark"} />}
    </div>
  );
}

const draw = (speed = 1.4, delay = 0) =>
  ({ strokeDasharray: 1, strokeDashoffset: `max(0, calc(1 - (var(--p, 1) - ${delay}) * ${speed}))` }) as CSSProperties;

function SceneAnim({ kind, dark }: { kind: Anim; dark: boolean }) {
  switch (kind) {
    // Hero: HRM scanning the member population, risk points lighting up as it passes.
    case "scan":
      return (
        <div className="absolute inset-x-0 bottom-0 top-[45%] lg:inset-y-0 lg:left-[46%]">
          <div className="scene-scan absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan/25 to-transparent" />
          <div className="absolute inset-0 grain opacity-60" />
          {[
            ["18%", "22%", "#D9532F", "0s"],
            ["70%", "16%", "#E8B54A", "1.1s"],
            ["30%", "68%", "#D9532F", "2.2s"],
            ["82%", "58%", "#00A4E4", "0.6s"],
            ["55%", "84%", "#E8B54A", "1.7s"],
          ].map(([x, y, c, d]) => (
            <span key={x + y} className="absolute h-3 w-3" style={{ left: x, top: y }}>
              <span className="scene-ping absolute inset-0 rounded-full" style={{ background: c, animationDelay: d }} />
              <span className="absolute inset-[3px] rounded-full ring-2 ring-white/80" style={{ background: c }} />
            </span>
          ))}
        </div>
      );

    // The problem: a member's claims flatline, then spike, drawn as you scroll down.
    case "claim":
      return (
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="absolute inset-x-0 bottom-2 h-32 w-full">
          <path
            d="M0 220 L260 214 L300 222 L340 206 L380 218 L640 210 L680 222 L720 200 L760 216 L980 208 L1010 214 L1040 30 L1070 236 L1100 196 L1440 204"
            fill="none"
            stroke="#D9532F"
            strokeWidth="2.5"
            strokeLinejoin="round"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            style={{ ...draw(1.6, 0.1), opacity: 0.85 }}
          />
          <circle cx="1040" cy="30" r="40" fill="#D9532F" className="scene-glow" style={{ opacity: "max(0, calc((var(--p, 1) - 0.62) * 3))" }} />
        </svg>
      );

    // Connect: every party's data streaming into one place.
    case "connect":
      return (
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          {[80, 230, 400, 570, 720].map((y, i) => (
            <path
              key={y}
              d={`M-20 ${y} C 500 ${y}, 760 400, 1080 400`}
              fill="none"
              stroke={dark ? "#00A4E4" : "#0B4A8B"}
              strokeOpacity={0.18}
              strokeWidth="2"
              pathLength={60}
              className="flow"
              style={{ animationDelay: `${i * -0.3}s` }}
            />
          ))}
        </svg>
      );

    // The result: the "if nothing changes" path fades as the managed path bends down.
    case "bend":
      return (
        <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 620 C 400 600, 640 540, 820 470 S 1200 220, 1440 120" fill="none" stroke="#D9532F" strokeWidth="2" strokeDasharray="8 10" vectorEffect="non-scaling-stroke" style={{ opacity: "calc(0.45 - var(--p, 1) * 0.3)" }} />
          <path
            d="M0 620 C 400 600, 640 540, 820 470 S 1200 560, 1440 600"
            fill="none"
            stroke="#00A4E4"
            strokeWidth="3"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            style={{ ...draw(1.5, 0.15), opacity: dark ? 0.6 : 0.35 }}
          />
        </svg>
      );

    // Services / proof: cost per member stepping down, bar by bar.
    case "bars":
      return (
        <div className="absolute inset-x-0 bottom-0 flex h-[45%] items-end justify-end gap-[1.2vw] px-[4vw] opacity-60">
          {[100, 94, 90, 83, 78, 70, 66, 61, 58, 55].map((h, i) => (
            <span
              key={i}
              className="w-[2.2vw] max-w-[28px] origin-bottom rounded-t-md"
              style={{
                height: `${h}%`,
                background: i < 5 ? (dark ? "rgba(255,255,255,0.10)" : "rgba(11,74,139,0.10)") : dark ? "rgba(0,164,228,0.35)" : "rgba(0,164,228,0.28)",
                transform: `scaleY(max(0.05, min(1, calc((var(--p, 1) - ${0.1 + i * 0.03}) * 3))))`,
              }}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
