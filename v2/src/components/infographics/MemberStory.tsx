import { Link } from "react-router-dom";
import { ease, lerp, mix, seg, useScrollProgress } from "@/lib/progress";
import { Arrow } from "../Icons";

// One illustrative population of 120 members, followed through HCRM's whole process as the visitor
// scrolls: collect → normalize → predict → act → prove. Deterministic, so server and client agree.

const N = 120;
const COLS = 15;
const W = 800;
const H = 560;

const sources = [
  { name: "Claims payers", color: "#0B4A8B" },
  { name: "Pharmacy (PBM)", color: "#00A4E4" },
  { name: "Clinical / EMR", color: "#2E8B6A" },
  { name: "Wellness programs", color: "#C98A1B" },
  { name: "Stop-loss carrier", color: "#7A5CC2" },
];
const clusterY = (s: number) => 78 + s * 104;

let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

type Member = {
  src: number;
  risk: number;
  rank: number;
  invalid: boolean;
  jx: number;
  jy: number;
  delay: number;
};

const raw = Array.from({ length: N }, (_, i) => {
  const a = rnd() * Math.PI * 2;
  const d = Math.sqrt(rnd()) * 34;
  return {
    src: i % 5,
    risk: Math.pow(rnd(), 2.4),
    invalid: rnd() < 0.1,
    jx: Math.cos(a) * d,
    jy: Math.sin(a) * d * 0.8,
    delay: rnd(),
  };
});
const order = raw.map((m, i) => i).sort((a, b) => raw[b].risk - raw[a].risk);
const members: Member[] = raw.map((m, i) => ({ ...m, rank: order.indexOf(i) }));

const CATASTROPHIC = 6; // 5% of 120
const FLAGGED = 18; // catastrophic plus rising-risk "movers"
const invalidCount = members.filter((m) => m.invalid).length;

const grid = (k: number) => ({ x: 318 + (k % COLS) * 31, y: 112 + Math.floor(k / COLS) * 38 });

// Prove: three dot stacks. Before (cost per member), after, and claims avoided by flagged members.
const STACKS = [
  { x: 330, label: "Year 0", value: "$825", sub: "cost per member", color: "#E0896B" },
  { x: 500, label: "Year 2", value: "$450", sub: "cost per member", color: "#0B4A8B" },
  { x: 670, label: "Managed early", value: "$375", sub: "saved per member", color: "#00A4E4" },
];
const stackOf = (m: Member) => (m.rank < FLAGGED ? 2 : m.rank < FLAGGED + 66 ? 0 : 1);
const stackIndex = (m: Member) => {
  const s = stackOf(m);
  return s === 2 ? m.rank : s === 0 ? m.rank - FLAGGED : m.rank - FLAGGED - 66;
};
const stackPos = (m: Member) => {
  const k = stackIndex(m);
  return { x: STACKS[stackOf(m)].x - 33 + (k % 6) * 13, y: 470 - Math.floor(k / 6) * 13 };
};

const heat = (r: number) => (r > 0.55 ? mix("#F2A65A", "#D9532F", (r - 0.55) / 0.45) : mix("#CFE3F1", "#F2A65A", r / 0.55));
const radius = (r: number) => 3.6 + r * 7;

export const storySteps = [
  {
    n: "01",
    kicker: "Collect",
    title: "Every source, one feed.",
    body: "HCRM requests 24 months of medical, pharmacy and eligibility data from claims payers, PBMs, clinical systems, wellness vendors and stop-loss carriers, in the layouts they already use.",
    stat: "250+ sources supported",
  },
  {
    n: "02",
    kicker: "Normalize & validate",
    title: "Clean data you can trust.",
    body: "Every record is checked. Invalid and home-grown codes are corrected and every source is unified into one dataset, so the forecast starts from the truth.",
    stat: "95%+ accuracy after validation",
  },
  {
    n: "03",
    kicker: "Predict",
    title: "Every member, 12 months out.",
    body: "The MITCH engine forecasts each member's medical and Rx cost, ER visits and inpatient days across 2,800+ measures. Members are ranked by projected cost, and the catastrophic 5% surface first.",
    stat: "5% of members drive most of the spend",
  },
  {
    n: "04",
    kicker: "Act",
    title: "Reach them before the claim.",
    body: "Rising-risk members go to care managers with the gaps in care to close: outreach by call, text and email, care plans, notes and scheduling.",
    stat: "128 standards of care tracked",
  },
  {
    n: "05",
    kicker: "Prove",
    title: "Show the outcome in dollars.",
    body: "Results are tracked against the predicted baseline and reported, white-labeled if you like. In one client case study, cost per member fell from $825 to $450 in two years.",
    stat: "$825 → $450 per member",
  },
];

export default function MemberStory() {
  const [ref, p] = useScrollProgress<HTMLElement>("sticky");
  const stage = Math.min(4, Math.floor(p * 5));
  const local = seg(p, stage * 0.2, stage * 0.2 + 0.15);

  const dots = members.map((m, i) => {
    const d = m.delay * 0.35;
    const t = ease(seg(local, d, d + 0.65));
    const cl = { x: 70 + m.jx, y: clusterY(m.src) + m.jy };
    const g0 = grid(i);
    const g1 = grid(m.rank);
    const st = stackPos(m);
    const flagged = m.rank < FLAGGED;
    let x: number, y: number, fill: string, r: number, op = 1;

    if (stage === 0) {
      x = lerp(-30, cl.x, t);
      y = cl.y;
      fill = sources[m.src].color;
      r = 4.5;
      op = t;
    } else if (stage === 1) {
      x = lerp(cl.x, g0.x, t);
      y = lerp(cl.y, g0.y, t);
      fill = mix(sources[m.src].color, "#9AA6B2", t);
      r = 4.5;
    } else if (stage === 2) {
      x = lerp(g0.x, g1.x, t);
      y = lerp(g0.y, g1.y, t);
      fill = mix("#9AA6B2", heat(m.risk), t);
      r = lerp(4.5, radius(m.risk), t);
    } else if (stage === 3) {
      x = g1.x;
      y = g1.y;
      const c = seg(local, 0.45 + m.rank * 0.012, 0.75 + m.rank * 0.012);
      fill = flagged ? mix(heat(m.risk), "#00A4E4", c) : heat(m.risk);
      r = radius(m.risk);
      op = flagged ? 1 : lerp(1, 0.4, seg(local, 0, 0.4));
    } else {
      x = lerp(g1.x, st.x, t);
      y = lerp(g1.y, st.y, t);
      const tone = STACKS[stackOf(m)].color;
      fill = mix(flagged ? "#00A4E4" : heat(m.risk), tone, t);
      r = lerp(radius(m.risk), 5, t);
      op = lerp(flagged ? 1 : 0.4, 1, t);
    }
    return { x, y, fill, r, op, m };
  });

  const fixedCount = stage < 1 ? 0 : stage > 1 ? invalidCount : Math.round(invalidCount * seg(local, 0.2, 0.75));
  const reached = stage < 3 ? 0 : stage > 3 ? FLAGGED : Math.round(FLAGGED * seg(local, 0.45, 0.95));

  const hud = [
    `${N} members · 5 sources · 24 months`,
    `Invalid codes corrected: ${fixedCount}/${invalidCount}`,
    "Ranked by projected 12-month cost",
    `Flagged ${FLAGGED} · Reached ${reached}`,
    "Cost per member, client case study",
  ][stage];

  return (
    <section ref={ref} className="relative bg-navy-night text-white" style={{ height: "520vh" }} aria-labelledby="story-title">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[72px]">
        <div className="grain-light absolute inset-0" aria-hidden="true" />
        <div className="wrap relative flex min-h-0 flex-1 flex-col gap-4 py-4 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-6">
          {/* Narrative */}
          <div className="order-2 lg:order-1 lg:col-span-4">
            <p className="eyebrow hidden !text-cyan lg:block">03 · How it works</p>
            <h2 id="story-title" className="mt-2 hidden font-serif text-[2.3rem] leading-tight !text-white lg:block">
              How HCRM prevents the claim, in five steps.
            </h2>
            <ol className="space-y-1 lg:mt-7">
              {storySteps.map((s, i) => {
                const on = i === stage;
                const fill = i < stage ? 1 : on ? seg(p, i * 0.2, i * 0.2 + 0.2) : 0;
                return (
                  <li key={s.n} className={`rounded-xl transition-colors duration-500 ${on ? "bg-white/[0.06]" : "hidden lg:block"}`}>
                    <div className="flex items-center gap-3 px-4 pt-3">
                      <span className={`font-mono text-[11px] ${on ? "text-cyan" : "text-white/40"}`}>{s.n}</span>
                      <span className={`text-[14.5px] font-semibold transition-colors ${on ? "text-white" : "text-white/45"}`}>{s.kicker}</span>
                      <span className="ml-auto h-0.5 w-16 overflow-hidden rounded bg-white/10" aria-hidden="true">
                        <span className="block h-full bg-cyan" style={{ width: `${fill * 100}%` }} />
                      </span>
                    </div>
                    <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden px-4">
                        <p className="pt-2 font-serif text-[1.25rem] leading-snug md:text-[1.45rem]">{s.title}</p>
                        <p className="mt-2 hidden text-[14.5px] leading-relaxed text-white/70 sm:block">{s.body}</p>
                        <p className="mb-3 mt-3 inline-block rounded-full bg-cyan/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-cyan">
                          {s.stat}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Visual */}
          <div className="order-1 min-h-0 lg:order-2 lg:col-span-8">
            <div className="relative h-[44vh] rounded-[1.25rem] border border-white/10 bg-white/[0.03] lg:h-full lg:max-h-[78vh]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] md:px-5">
                <span className="text-cyan">Health Risk Monitor · Stage {storySteps[stage].n}</span>
                <span className="text-white/55">{hud}</span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="block h-[calc(100%-38px)] w-full" role="img" aria-labelledby="story-svg-title">
                <title id="story-svg-title">
                  Illustration of 120 members' data being collected from five sources, normalized, ranked by projected cost, managed by
                  care teams, and measured as cost per member falling from $825 to $450.
                </title>

                {/* Stage 0–1: source clusters */}
                {sources.map((s, i) => (
                  <g key={s.name} opacity={stage === 0 ? seg(local, 0, 0.3) : stage === 1 ? 1 - seg(local, 0, 0.5) : 0}>
                    <circle cx={70} cy={clusterY(i)} r={44} fill="none" stroke={s.color} strokeOpacity={0.5} strokeDasharray="2 4" />
                    <text x={124} y={clusterY(i) + 4} fill="white" fillOpacity={0.75} fontSize={13} fontFamily="Instrument Sans, sans-serif">
                      {s.name}
                    </text>
                  </g>
                ))}

                {/* Stage 1: normalization scan line */}
                {stage === 1 && (
                  <g opacity={1 - seg(local, 0.85, 1)}>
                    <line x1={300} x2={770} y1={lerp(92, 400, local)} y2={lerp(92, 400, local)} stroke="#00A4E4" strokeWidth={2} />
                    <rect x={300} y={92} width={470} height={lerp(0, 308, local)} fill="#00A4E4" fillOpacity={0.05} />
                  </g>
                )}

                {/* Stage 2+: ranking axis and the catastrophic 5% */}
                <g opacity={stage === 2 ? seg(local, 0.5, 1) : stage === 3 ? 1 : stage === 4 ? 1 - seg(local, 0, 0.3) : 0}>
                  <text x={304} y={84} fill="white" fillOpacity={0.6} fontSize={12} fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                    HIGHEST PROJECTED COST →
                  </text>
                  <rect x={300} y={95} width={CATASTROPHIC * 31 + 4} height={34} rx={17} fill="none" stroke="#D9532F" strokeWidth={1.5} />
                  <text x={520} y={84} fill="#F2A65A" fontSize={12} fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                    TOP 5% · CATASTROPHIC
                  </text>
                </g>

                {/* Stage 3: care team node and outreach lines */}
                {stage === 3 && (
                  <g>
                    <g opacity={seg(local, 0, 0.25)}>
                      <circle cx={150} cy={280} r={46} fill="#00A4E4" fillOpacity={0.12} stroke="#00A4E4" />
                      <text x={150} y={276} textAnchor="middle" fill="white" fontSize={13} fontWeight={600} fontFamily="Instrument Sans, sans-serif">
                        Care team
                      </text>
                      <text x={150} y={294} textAnchor="middle" fill="#00A4E4" fontSize={10.5} fontFamily="JetBrains Mono, monospace">
                        CALL · TEXT · EMAIL
                      </text>
                    </g>
                    {dots
                      .filter((d) => d.m.rank < FLAGGED)
                      .map((d) => {
                        const k = seg(local, 0.15 + d.m.rank * 0.015, 0.45 + d.m.rank * 0.015);
                        return (
                          <line
                            key={`l${d.m.rank}`}
                            x1={196}
                            y1={280}
                            x2={lerp(196, d.x, k)}
                            y2={lerp(280, d.y, k)}
                            stroke="#00A4E4"
                            strokeOpacity={0.45}
                            strokeWidth={1}
                          />
                        );
                      })}
                  </g>
                )}

                {/* Stage 4: stacks */}
                {stage === 4 &&
                  STACKS.map((s, i) => (
                    <g key={s.label} opacity={seg(local, 0.55 + i * 0.1, 0.85 + i * 0.1)}>
                      <text x={s.x} y={505} textAnchor="middle" fill="white" fontSize={24} fontFamily="Fraunces, serif">
                        {s.value}
                      </text>
                      <text x={s.x} y={525} textAnchor="middle" fill="white" fillOpacity={0.6} fontSize={11} fontFamily="JetBrains Mono, monospace">
                        {s.sub.toUpperCase()}
                      </text>
                      <text x={s.x} y={545} textAnchor="middle" fill={s.color} fontSize={11} fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                        {s.label.toUpperCase()}
                      </text>
                    </g>
                  ))}

                {/* Members */}
                {dots.map((d, i) => (
                  <g key={i} transform={`translate(${d.x.toFixed(1)} ${d.y.toFixed(1)})`} opacity={d.op}>
                    {stage === 3 && d.m.rank < FLAGGED && (
                      <circle r={d.r + 5} fill="none" stroke="#00A4E4" strokeOpacity={seg(local, 0, 0.3) * 0.7} />
                    )}
                    <circle r={d.r} fill={d.fill} />
                    {d.m.invalid && stage <= 1 && (stage === 0 || seg(local, d.m.delay * 0.35, d.m.delay * 0.35 + 0.65) < 0.6) && (
                      <circle r={d.r + 2.5} fill="none" stroke="#D9532F" strokeWidth={1.5} />
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
        <div className="wrap relative flex items-center justify-between pb-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">
          <span>Scroll to move through the year<span className="hidden md:inline"> · Illustrative population; dollar figures from a client case study</span></span>
          <Link to="/our-software/" className="inline-flex items-center gap-1 text-cyan hover:text-white">
            Inside Health Risk Monitor <Arrow className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
