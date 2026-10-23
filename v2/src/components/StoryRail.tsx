import { useEffect, useState } from "react";

// Fixed chapter rail for the home page's scroll story. Sections opt in with
//   data-chapter="Chapter name"  data-tone="risk|watch|safe"
// Renders nothing on the server (and until it has measured the page), so hydration is unaffected.

type Chapter = { el: HTMLElement; label: string; tone: string };

const toneColor: Record<string, string> = { risk: "#D9532F", watch: "#E8B54A", safe: "#00A4E4" };

export default function StoryRail() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    setChapters(
      els.map((el) => ({ el, label: el.dataset.chapter!, tone: el.dataset.tone ?? "watch" })),
    );
    let raf = 0;
    const calc = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let a = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= mid) a = i;
      });
      const first = els[0].getBoundingClientRect().top;
      const last = els[els.length - 1].getBoundingClientRect();
      setActive(a);
      setFill(Math.min(1, Math.max(0, (mid - first) / Math.max(1, last.top - first))));
      setVisible(last.bottom > window.innerHeight - 40); // hide once the footer scrolls in
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  if (!chapters.length) return null;

  return (
    <div className={`transition-opacity duration-500 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden="true">
      {/* Chapter rail */}
      <nav className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:left-8">
        <div className="relative flex flex-col gap-5 py-1">
          <span className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded bg-ink/10" />
          <span
            className="absolute left-[7px] top-2 w-0.5 rounded bg-gradient-to-b from-signal via-[#E8B54A] to-cyan"
            style={{ height: `calc(${fill} * (100% - 1rem))` }}
          />
          {chapters.map((c, i) => (
            <button
              key={c.label}
              type="button"
              tabIndex={-1}
              onClick={() => c.el.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="group relative flex items-center gap-3"
            >
              <span
                className={`relative z-10 h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                  i === active ? "scale-125 border-white" : i < active ? "border-transparent" : "border-ink/20 bg-paper"
                }`}
                style={i <= active ? { background: toneColor[c.tone] } : undefined}
              />
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] shadow-sm transition-all duration-300 ${
                  i === active
                    ? "translate-x-0 bg-ink text-white opacity-0 group-hover:opacity-100 2xl:opacity-100"
                    : "-translate-x-1 bg-white text-ink opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {String(i).padStart(2, "0")} · {c.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
