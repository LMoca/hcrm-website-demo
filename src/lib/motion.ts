// Scroll and pointer motion for the whole site, driven by data attributes so pages stay declarative
// and the prerendered HTML is unchanged. Everything here is skipped when the visitor prefers reduced motion.
//
//   data-reveal[="left"|"right"|"zoom"|"clip"]  fade/slide in once, the first time it enters the viewport
//   data-stagger                                  gives each data-reveal child an increasing delay
//   data-scroll                                   sets --p (0 → 1) as the element travels through the viewport
//   data-count                                    counts its number up from zero when revealed
//   data-tilt                                     sets --mx / --my (-1 → 1) from the pointer position
//   data-exit                                     sets --x (0 → 1) as the element scrolls up and out of view
//   :root --scroll                                page scroll progress, 0 → 1

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el: HTMLElement) {
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  const final = node.nodeValue ?? "";
  const m = final.match(/[\d,]+(\.\d+)?/);
  if (!m) return;
  const target = Number(m[0].replace(/,/g, ""));
  const from = Number(el.dataset.count) || 0;
  const pre = final.slice(0, m.index);
  const post = final.slice(m.index! + m[0].length);
  const comma = m[0].includes(",");
  const dur = 1400;
  const t0 = performance.now();
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / dur);
    const v = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
    node.nodeValue = k < 1 ? pre + (comma ? v.toLocaleString("en-US") : String(v)) + post : final;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function startMotion(): () => void {
  if (reduced()) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
    return () => {};
  }

  // Stagger: children revealed in sequence.
  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
    const step = Number(parent.dataset.stagger) || 90;
    parent.querySelectorAll<HTMLElement>(":scope > [data-reveal], :scope > * > [data-reveal]").forEach((el, i) => {
      if (!el.style.transitionDelay) el.style.transitionDelay = `${i * step}ms`;
    });
  });

  // Reveal + count-up.
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("in");
        if (el.hasAttribute("data-count")) countUp(el);
        el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        io.unobserve(el);
      }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));

  // Scroll-linked progress, batched into one frame.
  const scrollEls = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
  const exitEls = Array.from(document.querySelectorAll<HTMLElement>("[data-exit]"));
  const root = document.documentElement;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const max = root.scrollHeight - vh;
    root.style.setProperty("--scroll", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
    for (const el of scrollEls) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    }
    for (const el of exitEls) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", Math.min(1, Math.max(0, -r.top / r.height)).toFixed(4));
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Pointer parallax, only for precise pointers (not touch).
  const fine = window.matchMedia("(pointer: fine)").matches;
  const tilts = fine ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")) : [];
  const onMove = (ev: PointerEvent) => {
    for (const el of tilts) {
      const r = el.getBoundingClientRect();
      const mx = ((ev.clientX - r.left) / r.width) * 2 - 1;
      const my = ((ev.clientY - r.top) / r.height) * 2 - 1;
      el.style.setProperty("--mx", Math.max(-1.5, Math.min(1.5, mx)).toFixed(3));
      el.style.setProperty("--my", Math.max(-1.5, Math.min(1.5, my)).toFixed(3));
    }
  };
  if (tilts.length) window.addEventListener("pointermove", onMove, { passive: true });

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("pointermove", onMove);
  };
}
