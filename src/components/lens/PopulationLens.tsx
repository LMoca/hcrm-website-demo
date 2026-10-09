import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lensByKey, lenses, type LensKey } from "@/data/lenses";
import {
  clamp,
  createPopulation,
  hexToRgb,
  mixRgb,
  money,
  pctText,
  sumCost,
  type Member,
} from "@/components/lens/population";

/** Brand ramp for projected risk, low to very high. Data only, never UI chrome. */
const RAMP = ["#C9D6E6", "#8CCBEA", "#00A4E4", "#004B87", "#DC2626"].map(hexToRgb);
const RED = hexToRgb("#DC2626");
const CYAN = hexToRgb("#00A4E4");
const MIST = hexToRgb("#E6ECF4");
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const ATTACH = 100_000;
const SHOCK = 250_000;

type RGB = [number, number, number];
interface Target {
  x: number;
  y: number;
  c: RGB;
  a: number;
  r: number;
}
interface Labels {
  key: LensKey;
  groups?: { cx: number; cy: number; R: number; flag: boolean; name: string; chg: string }[];
  attachX?: number;
  dayX?: number[];
  top?: number;
  pad: number;
}

const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface PopulationLensProps {
  lensKey: LensKey;
  className?: string;
}

/**
 * The hero's signature visual: one synthetic population of members, drawn as
 * dots, that rearranges into the working view of whichever role the visitor
 * chooses. Same data, different lens.
 */
const PopulationLens = ({ lensKey, className = "" }: PopulationLensProps) => {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const applyRef = useRef<(k: LensKey) => void>(() => {});

  const pop = useMemo(() => {
    const small = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    return createPopulation(small ? 500 : 1000, 23);
  }, []);
  const N = pop.members.length;
  const scale = 1000 / N;

  const stats = useMemo(() => {
    const { members, desc, byPriority, total } = pop;
    const top5 = desc.slice(0, Math.round(N * 0.05));
    const top8 = byPriority.slice(0, Math.round(N * 0.08));
    const high = members.filter((m) => m.tier >= 3);
    const over = members.filter((m) => m.cost >= ATTACH);
    const shock = members.filter((m) => m.cost >= SHOCK);
    const dayHigh = [0, 0, 0, 0, 0];
    high.forEach((m) => dayHigh[m.day]++);
    const n = (v: number) => Math.round(v * scale).toLocaleString("en-US");
    const s: Record<LensKey, [string, string][]> = {
      general: [
        ["Members in sample", "1,000"],
        ["High or very high risk", pctText(high.length / N)],
        ["Top 5% share of spend", pctText(sumCost(top5) / total)],
      ],
      employers: [
        ["Projected 12-mo spend", money(total * scale)],
        ["Top 5% share of it", pctText(sumCost(top5) / total)],
        ["Members to act on first", n(top5.length)],
      ],
      brokers: [
        ["Client groups in view", "6"],
        ["Flagged before renewal", "2"],
        ["Largest projected increase", "+14%"],
      ],
      carriers: [
        ["Projected above $100K", n(over.length)],
        ["Probable shock-loss, $250K+", n(shock.length)],
        ["Projected above attachment", money(over.reduce((x, m) => x + m.cost - ATTACH, 0) * scale)],
      ],
      providers: [
        ["Pre-visit reviews this week", n(high.length)],
        ["High-risk share of visits", pctText(high.length / N)],
        ["Busiest review day", DAY_NAMES[dayHigh.indexOf(Math.max(...dayHigh))]],
      ],
      care: [
        ["Prioritized this month", n(top8.length)],
        ["Avg projected cost, prioritized", money(sumCost(top8) / top8.length)],
        ["Very high risk among them", n(top8.filter((m) => m.tier === 4).length)],
      ],
    };
    return s;
  }, [pop, N, scale]);

  /* ------------------------------------------------------------ engine */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { members, desc, byPriority } = pop;
    const top5n = Math.round(N * 0.05);
    const top8n = Math.round(N * 0.08);

    let W = 0;
    let H = 0;
    let dpr = 1;
    let R = 2;
    let current = lensKey;
    let t0 = -1e9;
    let labels: Labels = { key: lensKey, pad: 16 };
    let raf = 0;
    let visible = true;
    let dirty = true;

    const from: Target[] = members.map(() => ({ x: 0, y: 0, c: [0, 0, 0], a: 0, r: 1 }));
    const to: Target[] = members.map(() => ({ x: 0, y: 0, c: [0, 0, 0], a: 0, r: 1 }));
    const now: Target[] = members.map(() => ({ x: 0, y: 0, c: [0, 0, 0], a: 0, r: 1 }));
    const idx = new Map<Member, number>(members.map((m, i) => [m, i]));

    const set = (m: Member, x: number, y: number, c: RGB, a: number, r: number) => {
      const t = to[idx.get(m)!];
      t.x = x;
      t.y = y;
      t.c = c;
      t.a = a;
      t.r = r;
    };
    const dim = (m: Member) => mixRgb(RAMP[m.tier], MIST, 0.55);

    const targets = (k: LensKey) => {
      const pad = Math.max(14, W * 0.035);
      const top = pad + (k === "general" || k === "carriers" ? 0 : 18);
      labels = { key: k, pad };

      const waffle = (order: Member[], on: (i: number) => boolean, hi: RGB) => {
        const aw = W - 2 * pad;
        const ah = H - top - pad;
        const cols = Math.ceil(Math.sqrt((N * aw) / ah));
        const rows = Math.ceil(N / cols);
        const sp = Math.min(aw / cols, ah / rows);
        const ox = (W - cols * sp) / 2 + sp / 2;
        const oy = top + (ah - rows * sp) / 2 + sp / 2;
        order.forEach((m, i) => {
          const lit = on(i);
          set(m, ox + (i % cols) * sp, oy + Math.floor(i / cols) * sp, lit ? hi : dim(m), lit ? 1 : 0.9, lit ? 1.3 : 1);
        });
      };

      if (k === "general") {
        const cx = W / 2;
        const cy = H / 2;
        const rad = Math.min(W, H) / 2 - pad;
        desc.forEach((m, i) => {
          const a = i * 2.39996;
          const rr = rad * Math.sqrt((i + 0.5) / N);
          set(m, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, RAMP[m.tier], 1, m.tier === 4 ? 1.5 : 1);
        });
      }
      if (k === "employers") waffle(desc, (i) => i < top5n, RED);
      if (k === "care") waffle(byPriority, (i) => i < top8n, CYAN);
      if (k === "brokers") {
        const cw = (W - 2 * pad) / 3;
        const ch = (H - top - pad) / 2;
        const rg = Math.max(18, Math.min(cw, ch) / 2 - 16);
        const groups: Member[][] = [[], [], [], [], [], []];
        desc.forEach((m) => groups[m.group].push(m));
        const chg = ["+3%", "+5%", "+14%", "+2%", "+11%", "+4%"];
        labels.groups = groups.map((arr, g) => {
          const cx = pad + cw * ((g % 3) + 0.5);
          const cy = top + ch * (Math.floor(g / 3) + 0.5) - 6;
          const flag = g === 2 || g === 4;
          arr.forEach((m, i) => {
            const a = i * 2.39996;
            const rr = rg * Math.sqrt((i + 0.5) / arr.length);
            set(m, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, flag ? RAMP[m.tier] : dim(m), flag ? 1 : 0.8, 1);
          });
          return { cx, cy, R: rg, flag, name: `Group ${"ABCDEF"[g]}`, chg: chg[g] };
        });
      }
      if (k === "carriers") {
        const lo = Math.log(desc[desc.length - 1].cost * 0.85);
        const hi = Math.log(desc[0].cost * 1.35);
        const X = (v: number) => pad + (W - 2 * pad) * clamp((Math.log(v) - lo) / (hi - lo), 0, 1);
        desc.forEach((m) => {
          const over = m.cost >= ATTACH;
          set(
            m,
            X(m.cost),
            H * 0.48 + m.j2 * (H - 2 * pad - 50) * 0.16,
            over ? RED : m.cost >= ATTACH / 3 ? RAMP[3] : dim(m),
            over ? 1 : 0.9,
            over ? 1.7 : 1
          );
        });
        labels.attachX = X(ATTACH);
      }
      if (k === "providers") {
        const cw = (W - 2 * pad) / 5;
        const ah = H - top - 14 - pad;
        const days: Member[][] = [[], [], [], [], []];
        desc.forEach((m) => days[m.day].push(m));
        // pick the column count that lets the busiest day fill its lane
        const most = Math.max(...days.map((d) => d.length));
        let cc = 3;
        let sp = 4;
        for (let c = 3; c <= 24; c++) {
          const s2 = Math.min((cw - 12) / c, ah / Math.ceil(most / c));
          if (s2 > sp) {
            sp = s2;
            cc = c;
          }
        }
        sp = Math.min(sp, R * 3.6);
        labels.dayX = [];
        labels.top = top;
        days.forEach((arr, d) => {
          const x0 = pad + cw * d + (cw - cc * sp) / 2 + sp / 2;
          labels.dayX!.push(pad + cw * (d + 0.5));
          arr.forEach((m, i) => {
            const hiRisk = m.tier >= 3;
            set(m, x0 + (i % cc) * sp, top + 14 + Math.floor(i / cc) * sp, hiRisk ? RAMP[m.tier] : dim(m), hiRisk ? 1 : 0.85, hiRisk ? 1.35 : 1);
          });
        });
      }
    };

    const snap = () => {
      to.forEach((t, i) => {
        from[i] = { ...t };
        now[i] = { ...t };
      });
      t0 = -1e9;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      R = clamp(Math.sqrt((W * H) / N) / 5.2, 1.4, 3.4);
      targets(current);
      snap();
      dirty = true;
    };

    applyRef.current = (k: LensKey) => {
      if (k === current && t0 > 0) return;
      now.forEach((t, i) => (from[i] = { ...t, c: [...t.c] as RGB }));
      current = k;
      targets(k);
      t0 = performance.now();
      dirty = true;
    };

    const draw = (time: number) => {
      const T = reduced ? 1 : clamp((time - t0) / 1300, 0, 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      members.forEach((m, i) => {
        const e = eio(clamp(T * 1.3 - m.delay * 0.3, 0, 1));
        const f = from[i];
        const t = to[i];
        const n = now[i];
        n.x = f.x + (t.x - f.x) * e;
        n.y = f.y + (t.y - f.y) * e;
        n.c = mixRgb(f.c, t.c, e);
        n.a = f.a + (t.a - f.a) * e;
        n.r = f.r + (t.r - f.r) * e;
        ctx.globalAlpha = n.a;
        ctx.fillStyle = `rgb(${n.c[0] | 0},${n.c[1] | 0},${n.c[2] | 0})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, R * n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const la = clamp((T - 0.55) / 0.45, 0, 1);
      if (la > 0) drawLabels(la);
      ctx.globalAlpha = 1;
    };

    const drawLabels = (alpha: number) => {
      const L = labels;
      ctx.globalAlpha = alpha;
      ctx.textBaseline = "middle";
      const font = (w: number) => `${w} 11px "IBM Plex Sans", system-ui, sans-serif`;
      ctx.font = font(500);
      if (L.key === "employers" || L.key === "care") {
        ctx.fillStyle = "#8496AC";
        ctx.textAlign = "left";
        ctx.fillText(L.key === "care" ? "Highest priority first →" : "Highest projected spend first →", L.pad, 14);
        ctx.textAlign = "right";
        ctx.fillStyle = L.key === "care" ? "#0076A8" : "#DC2626";
        ctx.fillText(L.key === "care" ? "● This month's outreach" : "● Top 5%", W - L.pad, 14);
      }
      if (L.key === "brokers" && L.groups) {
        L.groups.forEach((g) => {
          ctx.textAlign = "center";
          ctx.font = font(g.flag ? 600 : 500);
          ctx.fillStyle = g.flag ? "#0A1F33" : "#8496AC";
          ctx.fillText(`${g.name} · ${g.chg}`, g.cx, g.cy + g.R + 12);
          if (g.flag) {
            ctx.strokeStyle = "rgba(220,38,38,.7)";
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.arc(g.cx, g.cy, g.R + 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }
      if (L.key === "carriers" && L.attachX) {
        const x = L.attachX;
        ctx.strokeStyle = "rgba(220,38,38,.75)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 24);
        ctx.lineTo(x, H - 30);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#DC2626";
        ctx.textAlign = "right";
        ctx.fillText("$100K specific attachment", x - 8, 22);
        ctx.fillStyle = "#8496AC";
        ctx.textAlign = "left";
        ctx.fillText("Lower projected cost", L.pad, H - 14);
        ctx.textAlign = "right";
        ctx.fillText("Higher projected cost", W - L.pad, H - 14);
      }
      if (L.key === "providers" && L.dayX) {
        ctx.fillStyle = "#566B85";
        ctx.textAlign = "center";
        L.dayX.forEach((x, i) => ctx.fillText(DAYS[i], x, (L.top ?? 30) - 2));
      }
      if (L.key === "general") {
        ctx.textAlign = "left";
        ["Low", "Moderate", "Rising", "High", "Very high"].forEach((t, i) => {
          const y = H - 14 - (4 - i) * 15;
          const c = RAMP[i];
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.beginPath();
          ctx.arc(L.pad + 4, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#8496AC";
          ctx.fillText(t, L.pad + 13, y);
        });
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (dirty || time - t0 < 1500) {
        draw(time);
        dirty = false;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) dirty = true;
    });
    io.observe(canvas);
    resize();
    raf = requestAnimationFrame(loop);
    document.fonts?.ready.then(() => (dirty = true));

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
    // The engine is built once per population; lens changes go through applyRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pop, N, reduced]);

  useEffect(() => {
    applyRef.current(lensKey);
  }, [lensKey]);

  const lens = lensByKey(lensKey) ?? lenses[0];

  return (
    <figure className={`plate-raised relative m-0 overflow-hidden ${className}`} aria-labelledby="lens-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
          <span className="label text-ink">Population lens</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex gap-1" aria-hidden="true">
            {lenses.map((l) => (
              <span
                key={l.key}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${l.key === lensKey ? "bg-navy" : "bg-line2"}`}
              />
            ))}
          </span>
          <span className="rounded-sm bg-mist px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim2">
            Illustrative data
          </span>
        </span>
      </div>

      <div className="px-4 pt-4 md:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h3
            key={lens.key}
            id="lens-title"
            initial={reduced ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ink md:text-[21px]"
          >
            {lens.view.title}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="relative h-[290px] md:h-[340px] xl:h-[360px]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      </div>

      <figcaption className="min-h-[3.6rem] px-4 pb-4 text-[13px] leading-relaxed text-dim md:px-6">
        {lens.view.caption}
      </figcaption>

      <div className="grid grid-cols-3 border-t border-line bg-mist" aria-live="polite">
        {stats[lensKey].map(([k, v]) => (
          <div key={k} className="px-4 py-4 md:px-6">
            <div className="label min-h-[2.4em] text-[9.5px] leading-snug text-dim2">{k}</div>
            <div className="mt-1.5 font-display text-[18px] font-semibold tabular-nums tracking-[-0.03em] text-ink md:text-[22px]">
              {v}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
};

export default PopulationLens;
