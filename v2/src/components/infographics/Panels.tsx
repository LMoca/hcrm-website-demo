import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { clamp, ease, lerp, seg, useScrollProgress } from "@/lib/progress";
import { Arrow } from "../Icons";

// Scroll-scrubbed infographics, one per HCRM service, all drawn as Health Risk Monitor "screens".
// Figures marked illustrative are examples; every other number is published on hcrm.net.

/** The HRM-window frame every infographic sits in. */
export function Panel({
  label,
  status,
  note = "Illustrative",
  dark,
  children,
}: {
  label: string;
  status?: ReactNode;
  note?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.25rem] border shadow-[0_40px_90px_-50px_rgba(11,27,43,0.45)] ${
        dark ? "border-white/10 bg-navy-night text-white" : "border-rule bg-white text-ink"
      }`}
    >
      <div className={`flex items-center gap-3 border-b px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] md:px-5 ${dark ? "border-white/10" : "border-rule"}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-signal/70" />
          <span className="h-2 w-2 rounded-full bg-[#E8B54A]" />
          <span className="h-2 w-2 rounded-full bg-sage/80" />
        </span>
        <span className={dark ? "text-cyan" : "text-cyan-deep"}>{label}</span>
        <span className={`ml-auto truncate ${dark ? "text-white/55" : "text-dim"}`}>{status}</span>
      </div>
      <div className="relative">{children}</div>
      {note && (
        <figcaption className={`border-t px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] md:px-5 ${dark ? "border-white/10 text-white/35" : "border-rule text-dim"}`}>
          {note}
        </figcaption>
      )}
    </figure>
  );
}

const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
const sans = { fontFamily: "Instrument Sans, sans-serif" } as const;
const serif = { fontFamily: "Fraunces, serif" } as const;

/* ------------------------------------------------------------------------------------------------ */
/** Predictive analytics: who the members are vs. where the money goes (figures from hcrm.net). */
export function RiskShare() {
  const [ref, p] = useScrollProgress();
  const fill = ease(seg(p, 0, 0.45));
  const link = ease(seg(p, 0.4, 0.7));
  const cat = ease(seg(p, 0.7, 1));
  const cols = 20;
  return (
    <div ref={ref}>
      <Panel label="HRM · Risk stratification" status={`Members vs. claims cost`} note="Figures published by HCRM">
        <svg viewBox="0 0 720 360" className="block w-full" role="img" aria-label="20% of members, those with chronic disease, drive 84% of claims cost; 5% of members drive most spending.">
          <text x={30} y={40} fontSize={12} letterSpacing="1.5" fill="#6A7787" style={mono}>MEMBERS</text>
          {Array.from({ length: 100 }, (_, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const chronic = i >= 80;
            const catastrophic = i >= 95;
            const show = clamp(fill * 100 - i) > 0;
            const color = catastrophic && cat > 0 ? "#D9532F" : chronic && link > 0 ? `rgba(242,166,90,${0.35 + link * 0.65})` : "#CFE3F1";
            return <rect key={i} x={30 + c * 16} y={56 + r * 16} width={12} height={12} rx={3} fill={color} opacity={show ? 1 : 0.08} />;
          })}
          <text x={360} y={130} fontSize={13} fill="#0B1B2B" style={sans} opacity={link}>
            <tspan fontWeight={700}>20%</tspan> of members have one or more chronic diseases
          </text>

          <text x={30} y={222} fontSize={12} letterSpacing="1.5" fill="#6A7787" style={mono}>CLAIMS COST</text>
          <rect x={30} y={236} width={660} height={40} rx={8} fill="#EEF2F6" />
          <rect x={30} y={236} width={660 * 0.84 * link} height={40} rx={8} fill="#F2A65A" />
          <rect x={30 + 660 * 0.84 * link} y={236} width={660 * 0.16 * link} height={40} fill="#CFE3F1" />
          <text x={42} y={262} fontSize={15} fontWeight={700} fill="#fff" style={sans} opacity={link}>
            84% of claims cost
          </text>

          {/* connector from the chronic 20% to the 84% share */}
          <path
            d={`M30,132 L${30 + 19 * 16 + 12},132 L${30 + 660 * 0.84},236 L30,236 Z`}
            fill="#F2A65A"
            opacity={link * 0.14}
          />

          <g opacity={cat}>
            <rect x={30 + 15 * 16 - 4} y={116} width={5 * 16 + 4} height={20} rx={6} fill="none" stroke="#D9532F" strokeWidth={1.5} />
            <text x={30} y={316} fontSize={22} fill="#D9532F" style={serif}>5%</text>
            <text x={72} y={316} fontSize={14} fill="#0B1B2B" style={sans}>
              of members, the catastrophic population, drive most health plan spending.
            </text>
            <text x={30} y={340} fontSize={12.5} fill="#6A7787" style={sans}>
              HRM identifies them, and the members about to join them, before the claims arrive.
            </text>
          </g>
        </svg>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
const rows = [
  { src: "Carrier A", raw: "DX 25000", clean: "E11.9 · Type 2 diabetes" },
  { src: "TPA B", raw: "e11.9 ", clean: "E11.9 · Type 2 diabetes" },
  { src: "PBM", raw: "NDC 2-7510-1", clean: "00002-7510-01 · Metformin" },
  { src: "Lab feed", raw: "A1C=9.1%", clean: "LOINC 4548-4 · HbA1c 9.1%" },
  { src: "EMR", raw: "BP 150/95", clean: "Hypertension · uncontrolled" },
  { src: "Clinic", raw: "LOCAL-CODE-77", clean: "Mapped · 99213 office visit" },
];

/** Data normalization: raw, inconsistent records become one validated dataset. */
export function NormalizeScan() {
  const [ref, p] = useScrollProgress();
  const scan = ease(seg(p, 0.05, 0.85));
  const acc = Math.round(lerp(0, 95, ease(seg(p, 0.2, 1))));
  return (
    <div ref={ref}>
      <Panel label="HRM · Data validation" status={`${rows.filter((_, i) => scan * rows.length > i + 0.5).length}/${rows.length} records normalized`}>
        <div className="grid gap-0 md:grid-cols-[1fr_11rem]">
          <div className="relative p-4 md:p-6">
            <div className="grid grid-cols-[6.5rem_1fr_1.5rem] gap-x-3 border-b border-rule pb-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-dim">
              <span>Source</span>
              <span>Record</span>
              <span />
            </div>
            <ul>
              {rows.map((r, i) => {
                const done = scan * rows.length > i + 0.5;
                return (
                  <li key={r.src} className="grid grid-cols-[6.5rem_1fr_1.5rem] items-center gap-x-3 border-b border-rule/70 py-2.5 text-[13.5px]">
                    <span className="font-mono text-[11.5px] text-dim">{r.src}</span>
                    <span className="relative h-5 overflow-hidden">
                      <span className={`absolute inset-0 font-mono text-signal transition-all duration-500 ${done ? "-translate-y-5 opacity-0" : ""}`}>{r.raw}</span>
                      <span className={`absolute inset-0 font-medium text-ink transition-all duration-500 ${done ? "" : "translate-y-5 opacity-0"}`}>{r.clean}</span>
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-500 ${
                        done ? "bg-sage text-white" : "bg-signal-soft text-signal"
                      }`}
                    >
                      {done ? "✓" : "!"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div
              className="pointer-events-none absolute inset-x-4 h-0.5 bg-cyan shadow-[0_0_14px_2px_rgba(0,164,228,0.55)] md:inset-x-6"
              style={{ top: `calc(2.6rem + ${scan} * (100% - 3.6rem))`, opacity: p > 0.02 && p < 0.9 ? 1 : 0 }}
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col items-center justify-center border-t border-rule bg-paper p-6 md:border-l md:border-t-0">
            <svg viewBox="0 0 120 120" className="w-32" aria-hidden="true">
              <circle cx={60} cy={60} r={50} fill="none" stroke="#DAD5C8" strokeWidth={10} />
              <circle
                cx={60}
                cy={60}
                r={50}
                fill="none"
                stroke="#2E8B6A"
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={`${(acc / 100) * 314} 314`}
                transform="rotate(-90 60 60)"
              />
              <text x={60} y={66} textAnchor="middle" fontSize={24} fill="#0B1B2B" style={serif}>
                {acc}%{acc >= 95 ? "+" : ""}
              </text>
            </svg>
            <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">Data accuracy</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
const months = 12;
const base = Array.from({ length: months + 1 }, (_, i) => 100 + i * 3.4 + Math.sin(i / 1.6) * 2);
const actual = base.map((v, i) => v - Math.pow(i / months, 1.4) * 32 + Math.sin(i * 1.3) * 1.5);

/** Outcome reporting: program participants against their predicted baseline. */
export function OutcomeTrend({ title = "Program outcomes vs. predicted baseline" }: { title?: string }) {
  const [ref, p] = useScrollProgress();
  const k = ease(seg(p, 0.05, 0.9));
  const X = (i: number) => 60 + (i / months) * 600;
  const Y = (v: number) => 260 - ((v - 60) / 100) * 220;
  const upto = k * months;
  const pts = (arr: number[]) =>
    arr
      .slice(0, Math.floor(upto) + 1)
      .map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`)
      .concat(
        upto < months
          ? [`${X(upto).toFixed(1)},${Y(lerp(arr[Math.floor(upto)], arr[Math.min(months, Math.floor(upto) + 1)], upto % 1)).toFixed(1)}`]
          : [],
      )
      .join(" ");
  const i = Math.min(months, Math.round(upto));
  const gap = Math.round(((base[i] - actual[i]) / base[i]) * 100);
  const area = `${pts(base)} ${pts(actual).split(" ").reverse().join(" ")}`;
  return (
    <div ref={ref}>
      <Panel label="HRM · Outcomes" status={title}>
        <svg viewBox="0 0 720 300" className="block w-full" role="img" aria-label="Illustrative chart: program participants' cost falls below their predicted baseline over 12 months.">
          {[0, 1, 2, 3].map((g) => (
            <line key={g} x1={60} x2={660} y1={40 + g * 73} y2={40 + g * 73} stroke="#EEF2F6" />
          ))}
          <polygon points={area} fill="#00A4E4" opacity={0.12} />
          <polyline points={pts(base)} fill="none" stroke="#D9532F" strokeWidth={2.4} strokeDasharray="6 6" />
          <polyline points={pts(actual)} fill="none" stroke="#0079AE" strokeWidth={3} strokeLinejoin="round" />
          <circle cx={X(upto)} cy={Y(lerp(actual[Math.floor(upto)], actual[Math.min(months, Math.floor(upto) + 1)], upto % 1))} r={6} fill="#0079AE" />
          {Array.from({ length: 5 }, (_, m) => (
            <text key={m} x={X(m * 3)} y={290} textAnchor="middle" fontSize={11} fill="#6A7787" style={mono}>
              {m === 0 ? "START" : `MO ${m * 3}`}
            </text>
          ))}
          <g transform="translate(470 40)">
            <rect width={190} height={70} rx={12} fill="#0B1B2B" />
            <text x={16} y={26} fontSize={10.5} fill="#00A4E4" letterSpacing="1.2" style={mono}>BELOW BASELINE</text>
            <text x={16} y={58} fontSize={30} fill="#fff" style={serif}>{Math.max(0, gap)}%</text>
          </g>
          <g fontSize={12} style={sans}>
            <line x1={70} x2={92} y1={30} y2={30} stroke="#D9532F" strokeWidth={2.4} strokeDasharray="5 4" />
            <text x={98} y={34} fill="#3A4A5C">Predicted baseline</text>
            <line x1={232} x2={254} y1={30} y2={30} stroke="#0079AE" strokeWidth={3} />
            <text x={260} y={34} fill="#3A4A5C">Participants, actual</text>
          </g>
        </svg>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
export type PipeStep = { label: string; note: string; to?: string };

/** A process as a pipeline: members (or data) travel through each step as the visitor scrolls. */
export function Pipeline({ steps, label, status, dark }: { steps: PipeStep[]; label: string; status?: string; dark?: boolean }) {
  const [ref, p] = useScrollProgress(undefined, 0.8);
  const n = steps.length;
  const head = seg(p, 0.05, 0.95) * (n - 1);
  const tokens = 9;
  return (
    <div ref={ref}>
      <Panel label={label} status={status} dark={dark} note="">
        <div className="relative px-4 py-8 md:px-8 md:py-10">
          <div className="relative">
            <div className={`absolute left-[8%] right-[8%] top-[22px] h-1 rounded ${dark ? "bg-white/10" : "bg-rule"}`} aria-hidden="true">
              <div className="h-full rounded bg-gradient-to-r from-navy to-cyan" style={{ width: `${(head / (n - 1)) * 100}%` }} />
              {Array.from({ length: tokens }, (_, t) => {
                const pos = clamp(head / (n - 1) - t * 0.05);
                return (
                  <span
                    key={t}
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,164,228,0.8)]"
                    style={{ left: `${pos * 100}%`, opacity: pos > 0 && pos < 1 ? 1 - t * 0.09 : 0 }}
                  />
                );
              })}
            </div>
            <ol className="relative grid gap-6" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {steps.map((s, i) => {
                const on = head >= i - 0.05;
                const Inner = (
                  <>
                    <span
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-[12px] transition-all duration-500 ${
                        on ? "scale-100 border-cyan bg-navy text-white shadow-[0_0_0_6px_rgba(0,164,228,0.15)]" : `scale-90 ${dark ? "border-white/20 bg-navy-night text-white/50" : "border-rule bg-white text-dim"}`
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className={`mt-3 block text-center text-[13px] font-semibold leading-tight transition-colors md:text-[14.5px] ${on ? (dark ? "text-white" : "text-ink") : dark ? "text-white/45" : "text-dim"}`}>
                      {s.label}
                    </span>
                    <span className={`mt-1 hidden text-center text-[12.5px] leading-snug transition-opacity duration-500 md:block ${dark ? "text-white/60" : "text-dim"} ${on ? "opacity-100" : "opacity-0"}`}>
                      {s.note}
                    </span>
                  </>
                );
                return (
                  <li key={s.label}>
                    {s.to ? (
                      <Link to={s.to} className="group block">
                        {Inner}
                      </Link>
                    ) : (
                      Inner
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
const groupsLoss = [38, 52, 61, 146, 44, 72, 183, 58, 49, 95, 128, 41, 66, 54];
const SPEC = 110; // illustrative specific deductible, $K

/** Stop-loss: projected claims per member against the specific deductible; shock losses light up. */
export function ShockLoss() {
  const [ref, p] = useScrollProgress();
  const g = ease(seg(p, 0.05, 0.8));
  const alert = seg(p, 0.8, 1);
  const over = groupsLoss.filter((v) => v * g > SPEC).length;
  const Y = (v: number) => 250 - (v / 200) * 210;
  return (
    <div ref={ref}>
      <Panel label="HRM · Stop-loss report" status={`${over} probable shock losses`}>
        <svg viewBox="0 0 720 300" className="block w-full" role="img" aria-label="Illustrative chart: projected annual claims per member against a specific deductible; members above it are flagged as probable shock losses.">
          <line x1={40} x2={690} y1={250} y2={250} stroke="#DAD5C8" />
          {groupsLoss.map((v, i) => {
            const h = v * g;
            const hot = h > SPEC;
            return (
              <g key={i}>
                <rect x={50 + i * 46} y={Y(h)} width={30} height={250 - Y(h)} rx={5} fill={hot ? "#D9532F" : "#7FB8DB"} />
                {hot && (
                  <text x={65 + i * 46} y={Y(h) - 8} textAnchor="middle" fontSize={12} fontWeight={700} fill="#D9532F" style={sans}>
                    !
                  </text>
                )}
              </g>
            );
          })}
          <line x1={40} x2={690} y1={Y(SPEC)} y2={Y(SPEC)} stroke="#0B1B2B" strokeWidth={1.5} strokeDasharray="6 5" />
          <text x={44} y={Y(SPEC) - 8} fontSize={11} letterSpacing="1" fill="#0B1B2B" style={mono}>
            SPECIFIC DEDUCTIBLE
          </text>
          <text x={40} y={278} fontSize={11} fill="#6A7787" style={mono}>
            PROJECTED 12-MONTH CLAIMS, PER MEMBER
          </text>
          <g opacity={alert} transform={`translate(${lerp(560, 470, alert)} 24)`}>
            <rect width={210} height={58} rx={12} fill="#0B1B2B" />
            <circle cx={20} cy={29} r={6} fill="#D9532F" />
            <text x={36} y={25} fontSize={10.5} fill="#00A4E4" letterSpacing="1" style={mono}>DAILY ALERT</text>
            <text x={36} y={44} fontSize={13} fill="#fff" style={sans}>
              {over} members above spec
            </text>
          </g>
        </svg>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
export type Milestone = { year: string; title: string; body: string };

/** Company timeline that fills as the visitor scrolls. */
export function YearLine({ items }: { items: Milestone[] }) {
  const [ref, p] = useScrollProgress(undefined, 1.1);
  const head = seg(p, 0.05, 0.95) * (items.length - 1);
  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-rule md:left-1/2" aria-hidden="true">
        <div className="w-full bg-gradient-to-b from-navy to-cyan" style={{ height: `${(head / (items.length - 1)) * 100}%` }} />
      </div>
      <ol className="space-y-10">
        {items.map((m, i) => {
          const on = head >= i - 0.1;
          const left = i % 2 === 0;
          return (
            <li key={m.year + m.title} className="relative grid md:grid-cols-2 md:gap-16">
              <span
                className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 transition-all duration-500 md:left-1/2 md:-translate-x-1/2 ${
                  on ? "border-cyan bg-navy" : "border-rule bg-paper"
                }`}
                aria-hidden="true"
              />
              <div className={`pl-10 transition-all duration-700 md:pl-0 ${left ? "md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"} ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-30"}`}>
                <p className="font-serif text-[2.4rem] font-light leading-none text-navy">{m.year}</p>
                <h3 className="mt-2 text-[1.05rem] font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink2">{m.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
export const careSteps: PipeStep[] = [
  { label: "Flagged by HRM", note: "Rising-risk and catastrophic members, ranked" },
  { label: "Assigned", note: "Risk-based caseloads for nurses and coaches" },
  { label: "Outreach", note: "Call, text and email, scheduled" },
  { label: "Care plan", note: "Gaps in care, notes and encounters" },
  { label: "Outcome", note: "Cost and compliance vs. baseline" },
];

export const serviceSteps: PipeStep[] = [
  { label: "Normalize & validate", note: "250+ sources, 95%+ accurate", to: "/data-normalization-and-validation/" },
  { label: "Predict", note: "12-month cost and risk per member", to: "/healthcare-predictive-analytics/" },
  { label: "Manage care", note: "Outreach, care plans, notes", to: "/healthcare-management/" },
  { label: "Report outcomes", note: "Prove what programs saved", to: "/clinical-reporting-and-outcome-assessment/" },
  { label: "Protect", note: "Stop-loss and shock-loss alerts", to: "/stop-loss-reporting/" },
];

/** The right infographic for each service page (and for audiences, via their primary service). */
export function ServiceInfographic({ slug }: { slug: string }) {
  switch (slug) {
    case "healthcare-predictive-analytics":
      return <RiskShare />;
    case "data-normalization-and-validation":
      return <NormalizeScan />;
    case "clinical-reporting-and-outcome-assessment":
      return <OutcomeTrend />;
    case "healthcare-management":
      return <Pipeline steps={careSteps} label="HRM · Care management" status="Flag → outcome" />;
    case "stop-loss-reporting":
      return <ShockLoss />;
    default:
      return null;
  }
}

/** Section wrapper: heading on the left, infographic on the right. */
export function InfographicSection({
  eyebrow,
  title,
  body,
  link,
  children,
  tone = "paper",
}: {
  eyebrow: string;
  title: string;
  body: string;
  link?: { to: string; label: string };
  children: ReactNode;
  tone?: "paper" | "white";
}) {
  return (
    <section className={`border-b border-rule ${tone === "white" ? "bg-white" : ""}`}>
      <div className="wrap grid items-center gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal="left">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-3">{title}</h2>
          <p className="lede mt-5">{body}</p>
          {link && (
            <Link to={link.to} className="link-arrow mt-7">
              {link.label} <Arrow />
            </Link>
          )}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
