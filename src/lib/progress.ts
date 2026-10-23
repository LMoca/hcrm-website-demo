import { useEffect, useRef, useState } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Progress of `p` through the window [a, b], clamped to 0–1. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
/** Blend two #rrggbb colors; returns #rrggbb so results can be blended again. */
export const mix = (a: string, b: string, t: number) => {
  const [x, y] = [hex(a), hex(b)];
  return "#" + x.map((v, i) => Math.round(lerp(v, y[i], clamp(t))).toString(16).padStart(2, "0")).join("");
};

/**
 * Scroll-scrubbed progress (0–1) for an infographic.
 *  - "view":   0 when the element's top enters the bottom of the viewport, 1 once it has risen `span` viewports.
 *  - "sticky": progress through a tall section whose child is position: sticky.
 * Server render and first client render use 1 (the finished state), so the prerendered HTML shows
 * the complete infographic (pass `initial` to start elsewhere, e.g. 0 for a hero that plays as you scroll).
 * Visitors who prefer reduced motion always get the finished state.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(mode: "view" | "sticky" = "view", span = 0.65, initial = 1) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setP(1);
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = mode === "sticky" ? -r.top / Math.max(1, r.height - vh) : (vh * 0.9 - r.top) / (vh * span);
      const next = clamp(v);
      setP((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, span]);

  return [ref, p] as const;
}
