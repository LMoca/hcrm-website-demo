import { Link } from "react-router-dom";
import { clamp, ease, lerp, mix, seg } from "@/lib/progress";
import { clients, testimonials } from "@/data/site";
import { Arrow } from "../Icons";
import Pinned, { Phases } from "./Pinned";

// The home page's scroll scenes, in story order. Each is pinned while its visual plays out; copy is
// one headline and at most one sentence per phase. Figures are illustrative unless marked otherwise.

const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
const sans = { fontFamily: "Instrument Sans, sans-serif" } as const;
const phaseOf = (p: number, n: number) => Math.min(n - 1, Math.floor(p * n * 1.02));

function Kicker({ n, children, dark }: { n: string; children: string; dark?: boolean }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-eyebrow ${dark ? "text-cyan" : "text-cyan-deep"}`}>
      {n} · {children}
    </p>
  );
}

/* ─────────────────────────── 01 · The risk ─────────────────────────── */

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const dots = Array.from({ length: 100 }, (_, i) => ({ i, r: rnd() }));
const byRisk = [...dots].sort((a, b) => b.r - a.r).map((d) => d.i);
const chronic = new Set(byRisk.slice(0, 20));
const catastrophic = new Set(byRisk.slice(0, 5));

export function RiskScene() {
  return (
    <Pinned vh={300} id="problem" labelledBy="risk-title" chapter="The risk" tone="risk" dark>
      {(p) => {
        const ph = phaseOf(p, 3);
        const a = seg(p, 0.2, 0.45);
        const b = seg(p, 0.6, 0.8);
        return (
          <div className="wrap relative grid flex-1 content-center gap-8 py-6 lg:grid-cols-12 lg:items-center">
            <div className="grain-light pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative lg:col-span-5">
              <Kicker n="01" dark>
                The risk
              </Kicker>
              <h2 id="risk-title" className="sr-only">
                Where a health plan's claims cost really comes from
              </h2>
              <Phases
                className="mt-4"
                active={ph}
                items={[
                  { title: "Every plan has members whose costs are about to rise.", body: "Most reporting only shows claims you've already paid." },
                  { title: <>20% of members drive <span className="text-signal">84%</span> of claims cost.</>, body: "They have one or more chronic diseases and get about half the recommended care." },
                  { title: <>5% become catastrophic. <span className="text-cyan">Find them first.</span></>, body: "HCRM flags potential large claims 12 to 18 months ahead." },
                ]}
              />
            </div>

            <div className="relative lg:col-span-7">
              <svg viewBox="0 0 640 420" className="mx-auto block w-full max-w-[640px]" role="img" aria-label="100 plan members: 20 with chronic disease drive 84% of claims cost; 5 become catastrophic.">
                {/* Member grid */}
                {dots.map((d) => {
                  const x = 30 + (d.i % 10) * 34;
                  const y = 30 + Math.floor(d.i / 10) * 34;
                  const isC = chronic.has(d.i);
                  const isX = catastrophic.has(d.i);
                  const wave = clamp(p * 4 - (d.i % 10) * 0.08 - Math.floor(d.i / 10) * 0.04);
                  const color = isX && b > 0 ? mix("#E8B54A", "#D9532F", b) : isC ? mix("#3A5A7C", "#E8B54A", a) : "#3A5A7C";
                  return (
                    <g key={d.i} opacity={0.35 + wave * 0.65}>
                      {isX && b > 0 && <circle cx={x} cy={y} r={8 + b * 10} fill="#D9532F" opacity={0.18 * b} />}
                      <circle cx={x} cy={y} r={isX ? lerp(8, 11, b) : 8} fill={color} />
                    </g>
                  );
                })}
                <text x={30} y={385} fill="white" fillOpacity={0.55} fontSize={12} letterSpacing="1" style={mono}>
                  100 PLAN MEMBERS
                </text>

                {/* Share bars */}
                <g transform="translate(400 40)" opacity={seg(p, 0.25, 0.4)}>
                  {[
                    { k: "MEMBERS", v: 20 * a, label: "20%" },
                    { k: "CLAIMS COST", v: 84 * a, label: "84%" },
                  ].map((bar, i) => (
                    <g key={bar.k} transform={`translate(${i * 110} 0)`}>
                      <rect width={60} height={300} rx={8} fill="white" fillOpacity={0.06} />
                      <rect y={300 - bar.v * 3} width={60} height={bar.v * 3} rx={8} fill={i ? "#D9532F" : "#E8B54A"} />
                      <text x={30} y={300 - bar.v * 3 - 12} textAnchor="middle" fill="white" fontSize={22} style={{ fontFamily: "Fraunces, serif" }}>
                        {Math.round(bar.v)}%
                      </text>
                      <text x={30} y={326} textAnchor="middle" fill="white" fillOpacity={0.55} fontSize={11} letterSpacing="1" style={mono}>
                        {bar.k}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </div>
        );
      }}
    </Pinned>
  );
}

/* ─────────────────────────── 02 · The connection ─────────────────────────── */

const sources = [
  { name: "Claims payers", sub: "Medical claims", from: [-40, -30] },
  { name: "Pharmacy (PBM)", sub: "Rx claims", from: [140, -40] },
  { name: "Stop-loss carriers", sub: "Large-claim exposure", from: [150, 120] },
  { name: "Clinical teams", sub: "EMR, labs, biometrics", from: [60, 150] },
  { name: "Wellness programs", sub: "Engagement", from: [-50, 130] },
  { name: "Provider networks", sub: "Network data", from: [-60, 40] },
];

export function ConnectScene() {
  return (
    <Pinned vh={240} labelledBy="connect-title" chapter="The connection" tone="watch">
      {(p) => {
        const fly = ease(seg(p, 0.05, 0.4));
        const wire = seg(p, 0.3, 0.6);
        const out = ease(seg(p, 0.62, 0.85));
        return (
          <div className="wrap relative grid flex-1 content-center gap-8 py-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <Kicker n="02">What HCRM does</Kicker>
              <h2 id="connect-title" className="mt-4 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08]">
                One source of truth for your whole plan.
              </h2>
              <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-ink2">Every party's data, connected and cleaned in Health Risk Monitor.</p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                250+ sources · <span className="text-navy">95%+ accurate</span>
              </p>
            </div>

            {/* Contained stage */}
            <div className="lg:col-span-8">
              <div className="relative mx-auto aspect-[4/5] max-h-[58vh] w-full overflow-hidden rounded-[1.4rem] border border-rule bg-white shadow-[0_40px_90px_-50px_rgba(11,27,43,0.45)] sm:aspect-[16/10] sm:max-h-[66vh]">
                <div className="grain absolute inset-0" aria-hidden="true" />
                <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {sources.map((s, i) => {
                    const a = ((-90 + (i * 360) / sources.length) * Math.PI) / 180;
                    const x = 50 + 34 * Math.cos(a);
                    const y = 31 + 22 * Math.sin(a);
                    return (
                      <g key={s.name}>
                        <line x1={x} y1={y} x2={50} y2={31} stroke="#0B4A8B" strokeOpacity={0.25} strokeWidth={0.3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - wire} />
                        {wire > 0.95 && (
                          <circle r={0.7} fill="#00A4E4">
                            <animateMotion dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" path={`M${x},${y} L50,31`} />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                  <circle cx={50} cy={31} r={9 + out * 2} fill="#00A4E4" opacity={0.12 * wire} />
                </svg>

                {/* Source chips fly in from scattered positions to their places on the ring */}
                {sources.map((s, i) => {
                  const a = ((-90 + (i * 360) / sources.length) * Math.PI) / 180;
                  const x = lerp(50 + s.from[0] * 0.4, 50 + 34 * Math.cos(a), fly);
                  const y = lerp(50 + s.from[1] * 0.3, 50 + 35 * Math.sin(a), fly);
                  return (
                    <div
                      key={s.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-rule bg-white px-3 py-2 text-center shadow-sm"
                      style={{ left: `${x}%`, top: `${y}%`, opacity: lerp(0.15, 1, fly) }}
                    >
                      <p className="whitespace-nowrap text-[11.5px] font-semibold leading-tight sm:text-[13px]">{s.name}</p>
                      <p className="hidden whitespace-nowrap text-[11px] text-dim sm:block">{s.sub}</p>
                    </div>
                  );
                })}

                {/* Hub */}
                <div
                  className="absolute left-1/2 top-1/2 flex aspect-square w-[26%] max-w-[170px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy text-center text-white shadow-[0_20px_50px_-20px_rgba(11,74,139,0.8)]"
                  style={{ transform: `translate(-50%,-50%) scale(${lerp(0.6, 1, wire)})`, opacity: lerp(0.3, 1, wire) }}
                >
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-cyan sm:text-[9.5px]">Health Risk Monitor</p>
                  <p className="mt-1 font-serif text-[13px] leading-tight sm:text-[17px]">One source of truth</p>
                </div>

                {/* Output: one member, one record */}
                <div
                  className="absolute bottom-3 right-3 rounded-xl bg-navy-night px-3.5 py-2.5 text-white shadow-xl sm:bottom-5 sm:right-5"
                  style={{ opacity: out, transform: `translateY(${(1 - out) * 14}px)` }}
                >
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-cyan">Member 0417 · one record</p>
                  <p className="mt-0.5 text-[12.5px] font-medium sm:text-[13.5px]">Medical + Rx + clinical + wellness</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Pinned>
  );
}

/* ─────────────────────────── 04 · The loss, avoided ─────────────────────────── */

const unmanaged = [420, 380, 450, 400, 520, 480, 560, 610, 700, 35730, 900, 650];
const managed = [420, 520, 610, 480, 450, 430, 420, 400, 410, 390, 400, 380];
const LX = (i: number) => 60 + i * (620 / 11);
const LY = (v: number) => 300 - Math.sqrt(v / 36000) * 250;

function line(data: number[], head: number) {
  const pts: string[] = [];
  for (let i = 0; i <= Math.floor(head); i++) pts.push(`${LX(i)},${LY(data[i])}`);
  if (head < 11) {
    const i = Math.floor(head);
    const v = lerp(data[i], data[i + 1], head - i);
    pts.push(`${LX(head)},${LY(v)}`);
  }
  return pts.join(" ");
}

export function LossScene() {
  return (
    <Pinned vh={300} labelledBy="loss-title" chapter="The loss, avoided" tone="safe" dark>
      {(p) => {
        const h1 = ease(seg(p, 0.04, 0.42)) * 11;
        const h2 = ease(seg(p, 0.52, 0.88)) * 11;
        const ph = p < 0.48 ? 0 : 1;
        const spent1 = unmanaged.reduce((s, v, i) => s + (i <= h1 ? v * Math.min(1, h1 - i + 1) : 0), 0);
        const spent2 = managed.reduce((s, v, i) => s + (i <= h2 ? v * Math.min(1, h2 - i + 1) : 0), 0);
        const ghost = seg(p, 0.48, 0.7);
        return (
          <div className="wrap relative grid flex-1 content-center gap-6 py-6 lg:grid-cols-12 lg:items-center">
            <div className="grain-light pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative lg:col-span-4">
              <Kicker n="04" dark>
                Loss mitigation
              </Kicker>
              <h2 id="loss-title" className="sr-only">
                How HCRM turns a $41,800 member into a $5,310 member
              </h2>
              <Phases
                className="mt-4"
                active={ph}
                items={[
                  { title: <>Without a forecast: a <span className="text-signal">$35,730</span> surprise.</>, body: "Three missed standards of care, then an ER visit and a hospital stay." },
                  { title: <>With HCRM: flagged early. <span className="text-cyan">Claim avoided.</span></>, body: "A care manager called. The gaps closed. The claim never came." },
                ]}
              />
              <div className="mt-8 flex items-end gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-signal">Without</p>
                  <p className={`font-serif text-[2.4rem] font-light leading-none ${ph ? "text-white/40 line-through decoration-signal/70" : ""}`}>${Math.round(spent1).toLocaleString("en-US")}</p>
                </div>
                <div style={{ opacity: seg(p, 0.5, 0.56) }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cyan">With HCRM</p>
                  <p className="font-serif text-[2.4rem] font-light leading-none text-cyan">${Math.round(spent2).toLocaleString("en-US")}</p>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-8">
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04]">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em]">
                  <span className="text-cyan">Member 0417 · 12-month claims</span>
                  <span className="ml-auto text-white/50">Illustrative member</span>
                </div>
                <svg viewBox="0 0 720 340" className="block max-h-[52vh] w-full" role="img" aria-label="Without HCRM the member's claims spike to $35,730 in October, $41,800 for the year. With HCRM the member is flagged in February and the year totals $5,310.">
                  {[0, 1, 2, 3].map((g) => (
                    <line key={g} x1={60} x2={680} y1={50 + g * 83} y2={50 + g * 83} stroke="rgba(255,255,255,0.07)" />
                  ))}
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                    <text key={i} x={LX(i)} y={326} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.5)" style={mono}>
                      {m}
                    </text>
                  ))}
                  <polyline points={line(unmanaged, h1)} fill="none" stroke="#D9532F" strokeWidth={3} strokeLinejoin="round" opacity={1 - ghost * 0.7} strokeDasharray={ghost > 0 ? "6 6" : undefined} />
                  <g opacity={seg(h1, 8.7, 9.2) * (1 - ghost * 0.4)}>
                    <circle cx={LX(9)} cy={LY(35730)} r={10 + 30 * (1 - ghost)} fill="#D9532F" opacity={0.15} />
                    <text x={LX(9) - 16} y={LY(35730) + 5} textAnchor="end" fontSize={14} fontWeight={700} fill="#D9532F" style={sans}>
                      {ghost > 0.5 ? "ER visit + inpatient stay: avoided" : "ER visit + inpatient stay: $35,730"}
                    </text>
                  </g>
                  {[2, 4, 6].map((m, i) => (
                    <g key={m} opacity={seg(h1, m - 0.2, m + 0.3) * (1 - ghost)}>
                      <circle cx={LX(m)} cy={LY(unmanaged[m])} r={6} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
                      <text x={LX(m)} y={LY(unmanaged[m]) - 16} textAnchor="middle" fontSize={11.5} fill="rgba(255,255,255,0.6)" style={sans}>
                        {["Missed A1C", "Refill gap", "No PCP visit"][i]}
                      </text>
                    </g>
                  ))}
                  {h2 > 0 && <polyline points={line(managed, h2)} fill="none" stroke="#00A4E4" strokeWidth={3.5} strokeLinejoin="round" />}
                  {[1, 2, 4].map((m, i) => (
                    <g key={m} opacity={seg(h2, m - 0.2, m + 0.3)}>
                      <circle cx={LX(m)} cy={LY(managed[m])} r={7} fill={i ? "#2E8B6A" : "#00A4E4"} />
                      <text x={LX(m) + 4} y={LY(managed[m]) - 40 - i * 22} fontSize={12} fontWeight={600} fill="white" style={sans}>
                        {["HRM flags rising risk", "Care manager call", "A1C tested · refill restored"][i]}
                      </text>
                      <line x1={LX(m)} x2={LX(m)} y1={LY(managed[m]) - 9} y2={LY(managed[m]) - 36 - i * 22} stroke="white" strokeOpacity={0.3} strokeDasharray="2 3" />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        );
      }}
    </Pinned>
  );
}

/* ─────────────────────────── 05 · Who it protects ─────────────────────────── */

const icp = [
  { name: "Brokers & consultants", job: "Win renewals with forecasts, not hindsight.", metric: "Renewal forecast", to: "/health-insurance-consultants-2/", viz: "line" },
  { name: "Third party administrators", job: "See large claims before they hit the plan.", metric: "Large-claim alerts", to: "/third-party-administrators-2/", viz: "alerts" },
  { name: "Self-funded employers", job: "Budget next year's claims with confidence.", metric: "Budget vs. forecast", to: "/self-funded-employers-2/", viz: "bars" },
  { name: "Stop-loss carriers & captives", job: "Price and reserve with shock-loss alerts.", metric: "Shock-loss watch", to: "/stop-loss-carriers-and-captives-2/", viz: "alerts" },
  { name: "Health plans & insurers", job: "Manage the 5% before they're catastrophic.", metric: "Catastrophic 5%", to: "/health-plans-2/", viz: "dots" },
  { name: "Clinics & ACOs", job: "Know which patients to see first.", metric: "Outreach list", to: "/clinics-and-healthcare-providers-2/", viz: "list" },
  { name: "Wellness & population health", job: "Prove your program saved money.", metric: "Program ROI", to: "/health-management-mendors/", viz: "bars" },
  { name: "Government & public plans", job: "Bring the same foresight to public budgets.", metric: "Population risk", to: "/who-we-serve/", viz: "dots" },
];

function MiniViz({ kind, on }: { kind: string; on: number }) {
  const c = "#00A4E4";
  switch (kind) {
    case "line":
      return (
        <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="xMinYMid meet">
          <path d="M0 60 L40 55 L80 58 L120 44" fill="none" stroke="#0B1B2B" strokeWidth={2.5} />
          <path d="M120 44 C150 36 175 30 200 22" fill="none" stroke="#D9532F" strokeWidth={2} strokeDasharray="4 4" />
          <path d="M120 44 C150 46 175 48 200 50" fill="none" stroke={c} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - on} />
        </svg>
      );
    case "bars":
      return (
        <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="xMinYMid meet">
          {[64, 58, 60, 52, 46, 40].map((h, i) => (
            <rect key={i} x={i * 34} y={80 - h * on} width={24} height={h * on} rx={4} fill={i < 3 ? "#DAD5C8" : c} />
          ))}
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="xMinYMid meet">
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={10 + (i % 10) * 20} cy={12 + Math.floor(i / 10) * 18} r={5} fill={i % 17 === 3 && on > 0.5 ? "#D9532F" : i % 7 === 2 && on > 0.3 ? "#E8B54A" : "#DAD5C8"} />
          ))}
        </svg>
      );
    case "alerts":
      return (
        <div className="space-y-1.5">
          {["Member #2290 · $186K Rx", "Member #0417 · ER risk"].map((a, i) => (
            <div key={a} className="flex items-center gap-2 rounded-lg bg-paper px-2.5 py-1.5 text-[12px]" style={{ opacity: seg(on, i * 0.3, i * 0.3 + 0.3) }}>
              <span className={`h-2 w-2 rounded-full ${i ? "bg-[#E8B54A]" : "bg-signal"}`} />
              {a}
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="space-y-1.5">
          {["#0417 · call today", "#1182 · care plan", "#0093 · A1C due"].map((a, i) => (
            <div key={a} className="flex items-center justify-between rounded-lg bg-paper px-2.5 py-1.5 text-[12px]" style={{ opacity: seg(on, i * 0.25, i * 0.25 + 0.3) }}>
              {a}
              <span className="text-cyan-deep">→</span>
            </div>
          ))}
        </div>
      );
  }
}

export function AudienceScene() {
  return (
    <Pinned vh={340} labelledBy="icp-title" chapter="Who it protects" tone="safe" className="bg-paper2">
      {(p) => {
        const t = seg(p, 0.08, 0.95);
        return (
          <div className="relative flex flex-1 flex-col justify-center gap-8 py-6">
            <div className="wrap">
              <Kicker n="05">Who it protects</Kicker>
              <h2 id="icp-title" className="mt-4 max-w-3xl font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08]">
                Built for everyone who carries health-cost risk.
              </h2>
            </div>
            <div className="overflow-hidden">
              <ul
                className="flex w-max gap-5 pl-[max(1rem,calc((100vw-78rem)/2+1.5rem))] pr-[10vw]"
                style={{ transform: `translateX(calc(${t} * (100vw - 100%)))` }}
              >
                {icp.map((c, i) => {
                  const center = (i + 0.5) / icp.length;
                  const on = clamp(1 - Math.abs(t - center + 0.08) * 4);
                  return (
                    <li key={c.name} className="w-[78vw] max-w-[340px] shrink-0">
                      <Link
                        to={c.to}
                        className="group flex h-full flex-col rounded-[1.25rem] border border-rule bg-white p-6 transition-shadow hover:shadow-xl"
                        style={{ transform: `translateY(${(1 - on) * 14}px)` }}
                      >
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
                          {String(i + 1).padStart(2, "0")} · {c.metric}
                        </p>
                        <div className="mt-4 h-[84px]">
                          <MiniViz kind={c.viz} on={Math.max(on, t >= 0.999 ? 1 : 0)} />
                        </div>
                        <h3 className="mt-5 font-serif text-[1.45rem] leading-tight">{c.name}</h3>
                        <p className="mt-2 text-[15px] leading-snug text-ink2">{c.job}</p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-navy">
                          See how <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="wrap">
              <div className="h-0.5 w-full max-w-xs overflow-hidden rounded bg-ink/10" aria-hidden="true">
                <div className="h-full bg-navy" style={{ width: `${t * 100}%` }} />
              </div>
            </div>
          </div>
        );
      }}
    </Pinned>
  );
}

/* ─────────────────────────── 06 · Proof ─────────────────────────── */

export function ProofScene() {
  const quote = testimonials[0];
  return (
    <Pinned vh={240} labelledBy="proof-title" chapter="Proof" tone="safe" dark>
      {(p) => {
        const a = ease(seg(p, 0.08, 0.5));
        const b = ease(seg(p, 0.3, 0.7));
        const q = seg(p, 0.65, 0.8);
        return (
          <div className="wrap relative flex flex-1 flex-col justify-center gap-10 py-6">
            <div className="grain-light pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker n="06" dark>
                  Proof
                </Kicker>
                <h2 id="proof-title" className="mt-4 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.08] text-white">
                  One employer group. Two years. Cost per member nearly halved.
                </h2>
              </div>
              <Link to="/predictive-analytics-and-cost-containment/" className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:text-white">
                Read the case study <Arrow />
              </Link>
            </div>

            <div className="relative grid gap-5 md:grid-cols-2">
              {[
                { k: "Cost per member, whole group", from: 825, to: 450, v: a, fmt: (n: number) => `$${Math.round(n)}` },
                { k: "PMPM, catastrophic members", from: 6000, to: 3900, v: b, fmt: (n: number) => (n <= 3950 ? "<$4,000" : `$${Math.round(n).toLocaleString("en-US")}`) },
              ].map((r) => (
                <div key={r.k} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/55">{r.k}</p>
                  <p className="mt-4 font-serif text-[clamp(3rem,7vw,5.5rem)] font-light leading-none text-cyan">{r.fmt(lerp(r.from, r.to, r.v))}</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan to-cyan-deep" style={{ width: `${(lerp(r.from, r.to, r.v) / r.from) * 100}%` }} />
                  </div>
                  <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/45">
                    From ${r.from.toLocaleString("en-US")} · client case study
                  </p>
                </div>
              ))}
            </div>

            <figure className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{ opacity: q, transform: `translateY(${(1 - q) * 16}px)` }}>
              <blockquote className="max-w-2xl font-serif text-[1.3rem] font-light leading-snug text-white/90 md:text-[1.5rem]">
                &ldquo;There is no stronger technology platform out there in the medical AI, predictive modeling space.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
                {quote.name} · {quote.org}
              </figcaption>
            </figure>

            <ul className="relative flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6" aria-label="HCRM clients">
              {clients.map((c, i) => (
                <li key={c.org} className="font-serif text-[1.15rem] text-white/70" style={{ opacity: seg(p, 0.7 + i * 0.03, 0.78 + i * 0.03) }}>
                  {c.org}
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Pinned>
  );
}

/* ─────────────────────────── 07 · Mission ─────────────────────────── */

const missionText =
  "We help health plans of every size see cost and risk coming, act before the claim, and stay financially stable. A claim avoided is money saved.";

export function MissionScene() {
  const words = missionText.split(" ");
  return (
    <Pinned vh={220} labelledBy="mission-title" chapter="Our mission" tone="safe">
      {(p) => {
        const t = seg(p, 0.05, 0.75);
        return (
          <div className="wrap relative flex flex-1 flex-col justify-center gap-10 py-6">
            <div>
              <Kicker n="07">Our mission</Kicker>
              <h2 id="mission-title" className="mt-6 max-w-5xl font-serif text-[clamp(1.9rem,4.4vw,3.8rem)] font-light leading-[1.12]">
                {words.map((w, i) => {
                  const on = clamp((t * words.length - i) * 0.9);
                  const last = i >= words.length - 6;
                  return (
                    <span key={i} style={{ color: mix("#C9C3B4", last ? "#0B4A8B" : "#0B1B2B", on) }}>
                      {w}{" "}
                    </span>
                  );
                })}
              </h2>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-rule pt-6 md:grid-cols-4" style={{ opacity: seg(p, 0.7, 0.85) }}>
              {[
                ["2004", "Predictive modeling for self-funded plans since"],
                ["12–18 mo", "Early warning on large claims"],
                ["95%+", "Data accuracy after normalization"],
                ["128", "Standards of care tracked per member"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="sr-only">{k}</dt>
                  <dd className="font-serif text-[2.2rem] font-light leading-none text-navy">{v}</dd>
                  <dd className="mt-2 text-[13.5px] text-dim">{k}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      }}
    </Pinned>
  );
}
