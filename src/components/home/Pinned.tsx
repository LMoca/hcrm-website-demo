import { useEffect, useState, type ReactNode } from "react";
import { useScrollProgress } from "@/lib/progress";

/**
 * A home-page scroll scene: a tall section whose viewport-sized child stays pinned while the visitor
 * scrolls through it, handing the scene its progress (0 → 1). Server render gets `initial` (default 1, the
 * finished frame). With reduced motion the scene is not pinned and `still` is true.
 */
export default function Pinned({
  vh,
  id,
  labelledBy,
  chapter,
  tone,
  dark,
  className = "",
  initial = 1,
  children,
}: {
  /** Scroll length of the scene, in viewport heights. */
  vh: number;
  id?: string;
  labelledBy: string;
  chapter: string;
  tone: "risk" | "watch" | "safe";
  dark?: boolean;
  className?: string;
  initial?: number;
  children: (p: number, still: boolean) => ReactNode;
}) {
  const [ref, p] = useScrollProgress<HTMLElement>("sticky", undefined, initial);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-chapter={chapter}
      data-tone={tone}
      className={`relative scroll-mt-0 ${dark ? "bg-navy-night text-white" : ""} ${className}`}
      style={{ height: still ? undefined : `${vh}vh` }}
    >
      <div className={`flex flex-col pt-[72px] ${still ? "min-h-screen" : "sticky top-0 h-screen overflow-hidden"}`}>{children(p, still)}</div>
    </section>
  );
}

/** Crossfading lines of copy: shows the entry for the current phase; every entry stays in the DOM for crawlers. */
export function Phases({ items, active, className = "" }: { items: { title: ReactNode; body?: ReactNode }[]; active: number; className?: string }) {
  return (
    <div className={`grid ${className}`}>
      {items.map((it, i) => (
        <div
          key={i}
          className={`col-start-1 row-start-1 transition-all duration-500 ${i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0"}`}
        >
          <p className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] font-light leading-[1.1]">{it.title}</p>
          {it.body && <p className="mt-3 max-w-md text-[15.5px] leading-relaxed opacity-70">{it.body}</p>}
        </div>
      ))}
    </div>
  );
}
