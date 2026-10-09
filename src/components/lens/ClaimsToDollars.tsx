import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLens } from "@/context/lens-context";
import {
  TIER_NAMES,
  clamp,
  createPopulation,
  hexToRgb,
  mixRgb,
  type Member,
} from "@/components/lens/population";

/** Risk ramp tuned for the navy band. */
const RAMP = ["#35506F", "#3E7FB0", "#00A4E4", "#9ADCF6", "#F26D6D"].map(hexToRgb);
const SRC = ["#7FA6CF", "#6CC3C7", "#C8D4E2", "#A7B7F0"].map(hexToRgb);
const NEUTRAL = hexToRgb("#D6E1EE");
const SOURCES = ["Medical claims", "Pharmacy claims", "Eligibility", "EMR records"];
const CLUSTERS: [number, number][] = [
  [0.26, 0.32],
  [0.74, 0.3],
  [0.28, 0.72],
  [0.74, 0.7],
];

const ss = (t: number) => t * t * (3 - 2 * t);

const beats = [
  {
    n: "01 · Raw claims",
    t: "Your data arrives as it is",
    b: "Medical claims, pharmacy claims, eligibility and EMR records, each in somebody else's format and with its own gaps.",
  },
  {
    n: "02 · Normalization",
    t: "Resolved into one reference set",
    b: "Members resolved, providers reconciled, codes mapped. What cannot be resolved is reported, never averaged away.",
  },
  {
    n: "03 · Prediction",
    t: "Every member, forecast twelve months out",
    b: "The model reads each member's trajectory: diagnosis progression, specialty pharmacy starts, rising utilization.",
  },
  {
    n: "04 · Dollars",
    t: "Risk, stated as projected spend",
    b: "Each prediction carries a dollar value, so the same number travels from the care team to the CFO to the carrier.",
  },
  {
    n: "05 · Action",
    t: "Reach the members you can still help",
    b: "Care teams start with members whose risk can still change. A claim avoided is money saved.",
  },
];

/**
 * A pinned, scroll-driven explainer on a navy band. The same kind of synthetic
 * population used in the hero moves from raw sources to dollars, and the last
 * scene changes with the visitor's role.
 */
const ClaimsToDollars = () => {
  const reduced = useReducedMotion();
  const { lens } = useLens();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef(lens.scene);
  const [beat, setBeat] = useState(0);
  const [small] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches
  );
  const pop = useMemo(() => createPopulation(small ? 420 : 1000, 17), [small]);

  useEffect(() => {
    sceneRef.current = lens.scene;
  }, [lens]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { members, byCost, total } = pop;
    const N = members.length;

    const tierCount = [0, 0, 0, 0, 0];
    const tierSpend = [0, 0, 0, 0, 0];
    members.forEach((m) => {
      tierCount[m.tier]++;
      tierSpend[m.tier] += m.cost;
    });

    let W = 0;
    let H = 0;
    let dpr = 1;
    let R = 2;
    let pad = 20;
    let colW = 10;
    let sp = 5;
    let base = 0;
    const pos = new Map<Member, Record<string, number>>();
    const colX = (t: number) => pad + ((W - pad * 2) * (t + 0.5)) / 5;

    const layout = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      pad = Math.max(20, W * 0.06);
      R = clamp(Math.sqrt((W * H) / N) / 5.4, 1.8, 4);
      const cols = Math.round(Math.sqrt((N * W) / H));
      const rows = Math.ceil(N / cols);
      const gx = (W - pad * 2) / cols;
      const gy = (H - pad * 2 - 30) / rows;
      colW = Math.max(6, Math.min(18, Math.floor((W - pad * 2) / 5 / (R * 2.4))));
      sp = R * 2.4;
      base = H - pad - 48;
      const cnt = [0, 0, 0, 0, 0];
      byCost.forEach((m) => {
        const k = cnt[m.tier]++;
        pos.set(m, {
          ...(pos.get(m) ?? {}),
          dx: colX(m.tier) - ((colW - 1) * sp) / 2 + (k % colW) * sp,
          dy: base - Math.floor(k / colW) * sp,
        });
      });
      members.forEach((m, gi) => {
        const c = CLUSTERS[m.src];
        const p = pos.get(m)!;
        p.ax = W * (c[0] + m.j1 * 0.065);
        p.ay = H * (c[1] + m.j2 * 0.065);
        p.bx = pad + gx * ((gi % cols) + 0.5);
        p.by = pad + gy * (Math.floor(gi / cols) + 0.5);
        p.fx = pad + (W - pad * 2) * m.pct;
        p.fy = H * 0.5 + m.j2 * H * 0.12 * (1 - m.pct * 0.45);
      });
    };

    let prog = 0;
    let target = 0;
    let visible = false;
    let raf = 0;
    let lastBeat = -1;

    const read = () => {
      const r = section.getBoundingClientRect();
      const d = section.offsetHeight - window.innerHeight;
      target = d > 0 ? clamp(-r.top / d, 0, 1) : 0;
      visible = r.bottom > 0 && r.top < window.innerHeight;
    };

    const draw = (time: number) => {
      const t = time / 1000;
      const sc = sceneRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // six equal scroll segments; each spends its first 45% morphing from the
      // previous stage and the rest holding, so every scene can be read
      const seg = Math.min(prog * 6, 5.9999);
      const si = Math.floor(seg);
      const f = si === 0 ? 0 : si - 1 + ss(clamp((seg - si) / 0.45, 0, 1));
      const st = Math.min(5, Math.floor(f));
      const lt = ss(clamp((f - st) * 1.15, 0, 1));
      const xy = (m: Member, s: number): [number, number] => {
        const p = pos.get(m)!;
        if (s === 0)
          return [p.ax + (reduced ? 0 : Math.sin(t * 0.8 + m.phase) * 3), p.ay + (reduced ? 0 : Math.cos(t * 0.7 + m.phase) * 3)];
        if (s === 1) return [p.bx, p.by];
        if (s === 2) return [p.bx, p.by - (m.tier === 4 ? 6 : m.tier === 3 ? 3 : 0)];
        if (s <= 4) return [p.dx, p.dy];
        return [p.fx, p.fy];
      };
      const col = (m: Member, s: number) =>
        s === 0 ? SRC[m.src] : s === 1 ? NEUTRAL : s === 4 && m.reached ? RAMP[Math.max(1, m.tier - 2)] : RAMP[m.tier];
      const rad = (m: Member, s: number) =>
        R * (s === 2 && m.tier >= 3 ? 1.55 : s === 5 && m.pct >= sc.pct ? 1.5 : 1);
      const a = st;
      const b = Math.min(st + 1, 5);
      for (const m of members) {
        const p0 = xy(m, a);
        const p1 = xy(m, b);
        const c = mixRgb(col(m, a), col(m, b), lt);
        let al = 1;
        if (f > 4.5 && m.pct < sc.pct) al = 1 - 0.6 * ss(clamp((f - 4.5) * 2, 0, 1));
        ctx.globalAlpha = al;
        ctx.fillStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
        ctx.beginPath();
        ctx.arc(p0[0] + (p1[0] - p0[0]) * lt, p0[1] + (p1[1] - p0[1]) * lt, rad(m, a) + (rad(m, b) - rad(m, a)) * lt, 0, Math.PI * 2);
        ctx.fill();
        if (m.reached) {
          const ring = clamp(1 - Math.abs(f - 4) * 1.6, 0, 1);
          if (ring > 0) {
            ctx.globalAlpha = ring * (reduced ? 1 : 0.6 + 0.4 * Math.sin(t * 4 + m.phase));
            ctx.strokeStyle = "#9ADCF6";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(p0[0] + (p1[0] - p0[0]) * lt, p0[1] + (p1[1] - p0[1]) * lt, R + 3.4, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      const near = (s: number) => clamp(1 - Math.abs(f - s) * 2.2, 0, 1);
      const tight = W < 560;
      const font = (w: number, s: number, mono = false) =>
        `${w} ${s}px ${mono ? '"IBM Plex Mono", ui-monospace, monospace' : '"IBM Plex Sans", system-ui, sans-serif'}`;
      ctx.textBaseline = "middle";
      let la = near(0);
      if (la > 0) {
        ctx.globalAlpha = la;
        ctx.fillStyle = "#E6EFF7";
        ctx.font = font(500, 12);
        ctx.textAlign = "center";
        SOURCES.forEach((s, i) => ctx.fillText(s, W * CLUSTERS[i][0], H * CLUSTERS[i][1] - H * 0.19));
      }
      la = near(1);
      if (la > 0) {
        ctx.globalAlpha = la;
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(255,255,255,.6)";
        ctx.font = font(400, 12);
        ctx.fillText(`${Math.round(clamp(f - 0.5, 0, 1) * N * 1284).toLocaleString("en-US")} claim lines resolved`, pad, H - pad + 6);
      }
      la = near(2);
      if (la > 0) {
        ctx.globalAlpha = la;
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(255,255,255,.6)";
        ctx.font = font(400, 12);
        ctx.fillText(tight ? "Larger dots: projected high cost" : "Larger dots: members projected to be high cost in the next 12 months", pad, H - pad + 6);
      }
      la = Math.max(near(3), near(4));
      if (la > 0) {
        ctx.globalAlpha = la;
        if (tight) {
          ctx.textAlign = "left";
          ctx.fillStyle = "rgba(255,255,255,.6)";
          ctx.font = font(400, 11);
          ctx.fillText("Share of projected spend by risk tier", pad, pad);
        }
        ctx.textAlign = "center";
        for (let k = 0; k < 5; k++) {
          const x = colX(k);
          const c = RAMP[k];
          ctx.fillStyle = k === 0 ? "rgba(255,255,255,.6)" : `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.font = font(600, tight ? 10 : 12);
          ctx.fillText(tight ? TIER_NAMES[k].replace("Very high", "V. high") : TIER_NAMES[k], x, base + 22);
          if (!tight) {
            ctx.fillStyle = "rgba(255,255,255,.55)";
            ctx.font = font(400, 11);
            ctx.fillText(`${Math.round((tierCount[k] / N) * 100)}% of members`, x, base + 38);
          }
          ctx.fillStyle = "#FFFFFF";
          ctx.font = font(500, tight ? 11 : 13, true);
          const share = `${Math.round((tierSpend[k] / total) * 100)}%`;
          ctx.fillText(tight ? share : `${share} of spend`, x, base - Math.ceil(tierCount[k] / colW) * sp - 14);
        }
      }
      la = near(4);
      if (la > 0) {
        ctx.globalAlpha = la;
        ctx.textAlign = "left";
        ctx.fillStyle = "#9ADCF6";
        ctx.font = font(500, 12);
        ctx.fillText(tight ? "Ringed: reached early" : "Ringed: members reached early by care management", pad, pad + (tight ? 18 : 4));
      }
      la = f > 4.5 ? ss(clamp((f - 4.5) * 2, 0, 1)) : 0;
      if (la > 0) {
        ctx.globalAlpha = la;
        const x = pad + (W - pad * 2) * sc.pct;
        ctx.strokeStyle = "#00A4E4";
        ctx.setLineDash([4, 5]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, pad + 22);
        ctx.lineTo(x, H - pad - 22);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#9ADCF6";
        ctx.font = font(500, 12);
        ctx.textAlign = x > W * 0.6 ? "right" : "left";
        ctx.fillText(sc.label, x + (x > W * 0.6 ? -8 : 8), pad + 18);
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.textAlign = "left";
        ctx.fillText("Lower projected cost", pad, H - pad);
        ctx.textAlign = "right";
        ctx.fillText("Higher projected cost", W - pad, H - pad);
      }
      ctx.globalAlpha = 1;

      const bi = Math.min(5, Math.round(f));
      if (bi !== lastBeat) {
        lastBeat = bi;
        setBeat(bi);
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      prog += (target - prog) * (reduced ? 1 : 0.12);
      if (Math.abs(target - prog) < 0.0005) prog = target;
      draw(time);
    };

    const onScroll = () => read();
    const ro = new ResizeObserver(() => {
      layout();
      read();
    });
    ro.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    layout();
    read();
    prog = target;
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pop, reduced]);

  const all = [
    ...beats,
    { n: `06 · ${lens.scene.tag}`, t: lens.scene.title, b: lens.scene.body },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-[520vh] bg-ink"
      aria-label="How Health Risk Monitor turns claims into dollars"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/img/band-ink.jpg')" }}
          aria-hidden="true"
        />
        <div className="grid-field-ink absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="edge relative grid h-full content-start gap-4 pb-6 pt-[5.5rem] lg:grid-cols-12 lg:content-center lg:gap-12 lg:pt-[4.75rem]">
          <div className="lg:col-span-4">
            <span className="label hidden text-cyan lg:inline">How it works</span>
            <h2 className="mt-0 font-display text-[26px] font-semibold tracking-[-0.035em] text-white lg:mt-5 lg:display-lg">
              Claims in. <span className="text-white/45">Dollars out.</span>
            </h2>

            <div className="relative mt-3 min-h-[8.5rem] lg:mt-10 lg:min-h-[13rem]">
              {all.map((s, i) => (
                <div
                  key={i}
                  aria-hidden={i !== beat}
                  className={`absolute inset-x-0 top-0 max-w-[27rem] transition-all ${
                    i === beat ? "translate-y-0 opacity-100 duration-500" : "translate-y-2 opacity-0 duration-150"
                  }`}
                >
                  <span className="font-mono text-[11.5px] text-cyan">{s.n}</span>
                  <h3 className="mt-1.5 font-display text-[20px] font-semibold tracking-[-0.03em] text-white lg:mt-2.5 lg:text-[27px]">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65 lg:mt-3 lg:text-[15.5px]">{s.b}</p>
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-1.5" aria-hidden="true">
              {all.map((_, i) => (
                <span key={i} className={`h-[2px] w-9 transition-colors ${i <= beat ? "bg-cyan" : "bg-white/15"}`} />
              ))}
            </div>
            <p className="mt-5 hidden max-w-[24rem] text-[12.5px] text-white/45 lg:block">
              Synthetic population for illustration. Not client data or a savings estimate.
            </p>
          </div>

          <div className="relative min-h-0 lg:col-span-8">
            <div className="relative h-[52vh] overflow-hidden rounded-lg border border-lineInk bg-ink/60 lg:h-[72vh] lg:max-h-[640px]">
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimsToDollars;
