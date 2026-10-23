import { Link } from "react-router-dom";
import { clamp, ease, lerp, seg } from "@/lib/progress";
import { CTA_LABEL } from "@/data/site";
import { Arrow } from "../Icons";
import Pinned from "./Pinned";

// Hero: Health Risk Monitor is the picture. The dashboard rises out of its tilt as the visitor scrolls,
// then its rising-risk members move from "Flagged" to "Claim avoided" and the results land.
// Figures are illustrative, except cost per member ($825 → $450), which is from a client case study.

const stages = [
  { label: "Flagged", cls: "bg-[#E8B54A]/20 text-[#8A6414]" },
  { label: "Outreach", cls: "bg-cyan-soft text-cyan-deep" },
  { label: "Gaps closed", cls: "bg-sage-soft text-sage" },
  { label: "Claim avoided", cls: "bg-navy text-white" },
];

const rows = [
  { id: "0417", condition: "Diabetes", risk: "ER + inpatient", forecast: 41800, managed: 5310, max: 3 },
  { id: "1182", condition: "Heart failure", risk: "Readmission", forecast: 28900, managed: 7400, max: 3 },
  { id: "0093", condition: "Asthma", risk: "ER visits", forecast: 12400, managed: 0, max: 2 },
  { id: "2290", condition: "Specialty Rx", risk: "Shock loss", forecast: 186000, managed: 0, max: 1 },
  { id: "0655", condition: "COPD", risk: "Inpatient", forecast: 9700, managed: 0, max: 1 },
];

const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
const short = (v: number) => (v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : `$${Math.round(v / 1e3)}K`);

export default function Hero() {
  return (
    <Pinned vh={260} labelledBy="hero-title" chapter="The product" tone="safe" initial={0}>
      {(p, still) => <HeroFrame p={p} still={still} />}
    </Pinned>
  );
}

function HeroFrame({ p, still }: { p: number; still: boolean }) {
  const rise = still ? 1 : ease(seg(p, 0, 0.32)); // dashboard straightens and rises
  const t = still ? 1 : seg(p, 0.32, 0.86); // members move through the workflow
  const copyOut = still ? 0 : seg(p, 0.06, 0.3);

  return (
    <div className="relative flex-1">
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-cyan/25 blur-[120px]"
        style={{ opacity: 0.4 + rise * 0.5 }}
        aria-hidden="true"
      />

      {/* Headline */}
      <div
        className="wrap relative z-10 pt-6 text-center md:pt-10"
        style={{ opacity: 1 - copyOut, transform: `translateY(${-copyOut * 60}px)`, pointerEvents: copyOut > 0.5 ? "none" : undefined }}
      >
        <p className="eyebrow rise">Health Risk Monitor · by HCRM</p>
        <h1 id="hero-title" className="display mx-auto mt-4 max-w-4xl !text-[clamp(2.3rem,5.4vw,4.6rem)]">
          Enhance your health plan with <em className="font-normal text-navy">predictive analytics.</em>
        </h1>
        <p className="lede rise mx-auto mt-4 max-w-2xl" style={{ animationDelay: "160ms" }}>
          See every member's cost and risk 12 to 18 months ahead. Act before the claim.
        </p>
        <div className="rise mt-6 flex flex-wrap justify-center gap-3" style={{ animationDelay: "240ms" }}>
          <Link to="/contact/" className="btn-primary">
            {CTA_LABEL} <Arrow />
          </Link>
          <a href="#problem" className="btn-ghost">
            Watch it work
          </a>
        </div>
      </div>

      {/* The product */}
      <div
        className={`z-20 flex justify-center px-3 md:px-6 ${still ? "relative py-12" : "absolute inset-x-0"}`}
        style={{ top: still ? undefined : `${lerp(58, 9, rise)}%`, perspective: "1800px" }}
      >
        <div
          className="relative w-full max-w-[1120px]"
          style={{ transform: `rotateX(${(1 - rise) * 24}deg) scale(${lerp(0.9, 1.06, rise)})`, transformOrigin: "50% 0%" }}
        >
          <Dashboard t={t} />
          <Callouts t={t} />
        </div>
      </div>
    </div>
  );
}

function Dashboard({ t }: { t: number }) {
  const stageOf = (i: number) => Math.min(rows[i].max, Math.floor(clamp(t * 1.25 - i * 0.12) * 5) - 1);
  const flagged = Math.round(lerp(8, 62, seg(t, 0, 0.35)));
  const closed = Math.round(lerp(0, 41, seg(t, 0.2, 0.9)));
  const projected = lerp(6.2e6, 5.1e6, seg(t, 0.3, 1));
  const cpm = Math.round(lerp(825, 450, seg(t, 0.4, 1)));
  const draw = seg(t, 0.25, 0.95);

  return (
    <figure className="overflow-hidden rounded-[1.1rem] border border-rule bg-white text-ink shadow-[0_60px_120px_-50px_rgba(11,27,43,0.55)]">
      {/* Window bar */}
      <div className="flex items-center gap-3 border-b border-rule bg-paper/60 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em]">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-signal/70" />
          <span className="h-2 w-2 rounded-full bg-[#E8B54A]" />
          <span className="h-2 w-2 rounded-full bg-sage/80" />
        </span>
        <span className="text-cyan-deep">Health Risk Monitor</span>
        <span className="hidden text-dim sm:inline">· Employer plan · 1,240 members</span>
        <span className="ml-auto flex items-center gap-1.5 text-sage">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" /> Forecast updated today
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="hidden w-44 shrink-0 border-r border-rule bg-paper/40 p-3 text-[13px] lg:block" aria-hidden="true">
          {["Overview", "Members", "Gaps in care", "Care management", "Stop-loss", "Reports"].map((n, i) => (
            <p key={n} className={`rounded-lg px-3 py-2 ${i === 0 ? "bg-navy font-semibold text-white" : "text-ink2"}`}>
              {n}
            </p>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          {/* KPIs */}
          <dl className="grid grid-cols-2 border-b border-rule md:grid-cols-4">
            {[
              { k: "Projected claims · 12 mo", v: short(projected), s: t > 0.3 ? `−${short(6.2e6 - projected)} with outreach` : "if nothing changes", tone: t > 0.3 ? "text-sage" : "text-dim" },
              { k: "Rising-risk members", v: `${flagged} flagged`, s: "12–18 months ahead", tone: "text-dim" },
              { k: "Gaps in care closed", v: `${closed}`, s: "of 96 found", tone: "text-dim" },
              { k: "Cost per member", v: money(cpm), s: "was $825 · client result", tone: "text-dim", em: true },
            ].map((x, i) => (
              <div key={x.k} className={`px-4 py-3.5 ${i % 2 ? "border-l border-rule" : "md:border-l md:first:border-l-0"} ${i > 1 ? "border-t border-rule md:border-t-0" : ""}`}>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">{x.k}</dt>
                <dd className={`mt-1 font-serif text-[1.5rem] font-light leading-none md:text-[1.75rem] ${x.em ? "text-navy" : ""}`}>{x.v}</dd>
                <dd className={`mt-1 text-[11.5px] ${x.tone}`}>{x.s}</dd>
              </div>
            ))}
          </dl>

          <div className="grid md:grid-cols-12">
            {/* Ranked members */}
            <div className="px-4 pb-3 pt-3 md:col-span-7">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">Rising-risk members · ranked by forecast</p>
              <table className="mt-1.5 w-full text-left text-[13px]">
                <thead className="sr-only">
                  <tr>
                    <th>Member</th>
                    <th>Condition</th>
                    <th>12-month forecast</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const s = stageOf(i);
                    const done = s >= 3;
                    const val = done ? r.managed : r.forecast;
                    return (
                      <tr key={r.id} className={`border-t border-rule/70 transition-colors duration-500 ${done ? "bg-cyan-soft/50" : ""}`}>
                        <td className="py-2 pl-1 pr-2 font-mono text-[12px]">#{r.id}</td>
                        <td className="hidden py-2 pr-2 sm:table-cell">
                          <span className="font-medium">{r.condition}</span>
                          <span className="ml-1.5 text-[11.5px] text-dim">{r.risk}</span>
                        </td>
                        <td className="w-[30%] py-2 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="relative hidden h-1.5 flex-1 overflow-hidden rounded-full bg-paper2 sm:block">
                              <span
                                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${done ? "bg-cyan" : "bg-signal"}`}
                                style={{ width: `${Math.min(100, (val / 50000) * 100)}%` }}
                              />
                            </span>
                            <span className="w-[4.6rem] text-right font-mono text-[11.5px]">{money(val)}</span>
                          </div>
                        </td>
                        <td className="py-2 pr-1 text-right">
                          {s >= 0 ? (
                            <span key={s} className={`menu-in inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${stages[s].cls}`}>
                              {r.risk === "Shock loss" && s >= 1 ? "Carrier alerted" : stages[s].label}
                            </span>
                          ) : (
                            <span className="text-[11px] text-dim">Scoring…</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Plan trend */}
            <div className="hidden border-l border-rule px-4 pb-3 pt-3 md:col-span-5 md:block">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">Plan claims cost · 24 mo paid + 12 mo forecast</p>
              <svg viewBox="0 0 400 190" className="mt-2 block w-full" aria-hidden="true">
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#EEF2F6" />
                ))}
                <line x1="250" x2="250" y1="10" y2="180" stroke="#DAD5C8" strokeDasharray="2 3" />
                <text x="256" y="20" fontSize="10" fill="#6A7787" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  TODAY
                </text>
                <path d="M0 150 L25 146 L50 150 L75 140 L100 144 L125 134 L150 138 L175 126 L200 130 L225 120 L250 118" fill="none" stroke="#0B1B2B" strokeWidth="2" />
                <path d="M250 118 C290 100 340 70 400 34" fill="none" stroke="#D9532F" strokeWidth="2" strokeDasharray="5 5" />
                <text x="396" y="28" textAnchor="end" fontSize="10" fill="#D9532F" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
                  If nothing changes
                </text>
                <path d="M250 118 C290 122 340 132 400 138" fill="none" stroke="#00A4E4" strokeWidth="3" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
                <path d="M250 118 C290 100 340 70 400 34 L400 138 C340 132 290 122 250 118Z" fill="#00A4E4" fillOpacity={0.1 * draw} />
                <text x="396" y="156" textAnchor="end" fontSize="10.5" fontWeight={600} fill="#0079AE" opacity={draw} style={{ fontFamily: "Instrument Sans, sans-serif" }}>
                  With HCRM: flagged members reached
                </text>
              </svg>
              <div className="mt-2 flex items-center justify-between rounded-lg bg-paper px-3 py-2 text-[12px]">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">Stop-loss watch</span>
                <span className="font-semibold">{t > 0.55 ? "1 shock-loss alert sent" : "3 members near specific"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-rule px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">
        <span className="sr-only">
          Health Risk Monitor ranks a plan's rising-risk members by 12-month forecast cost, routes them to care teams, and tracks claims avoided. Member
          0417's $41,800 forecast falls to $5,310 after outreach.{" "}
        </span>
        Illustrative plan · cost per member from a client case study
      </figcaption>
    </figure>
  );
}

/** Results that pop off the dashboard as members reach "Claim avoided". */
function Callouts({ t }: { t: number }) {
  const items = [
    { at: 0.3, cls: "-left-4 top-[30%] lg:-left-16", k: "Member 0417", v: "Flagged 8 months early" },
    { at: 0.62, cls: "-right-3 top-[52%] lg:-right-14", k: "Claim avoided", v: "$35,730 ER visit + stay", dark: true },
    { at: 0.85, cls: "left-[8%] -bottom-6 lg:left-[22%]", k: "Stop-loss", v: "Carrier alerted to a $186K shock loss" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {items.map((c) => {
        const on = seg(t, c.at, c.at + 0.08);
        return (
          <div
            key={c.k}
            className={`absolute rounded-xl px-4 py-3 shadow-[0_24px_50px_-20px_rgba(11,27,43,0.6)] ${c.dark ? "bg-navy-night text-white" : "bg-white text-ink"} ${c.cls}`}
            style={{ opacity: on, transform: `translateY(${(1 - on) * 16}px) scale(${lerp(0.92, 1, on)})` }}
          >
            <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${c.dark ? "text-cyan" : "text-cyan-deep"}`}>{c.k}</p>
            <p className="mt-0.5 text-[14.5px] font-semibold">{c.v}</p>
          </div>
        );
      })}
    </div>
  );
}
