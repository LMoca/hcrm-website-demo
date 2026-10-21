import { Link } from "react-router-dom";
import { Arrow } from "./Icons";

// The plan data sources HCRM connects (from the client meeting: claims payers, PBMs, clinical
// teams, wellness programs, stop-loss carriers and, potentially, provider networks).
export const sources = [
  { name: "Claims payers", note: "Carriers & TPAs" },
  { name: "Pharmacy benefit managers", note: "Rx claims" },
  { name: "Stop-loss carriers", note: "Large-claim exposure" },
  { name: "Clinical teams", note: "EMR, labs & biometrics" },
  { name: "Wellness programs", note: "Engagement & compliance" },
  { name: "Provider networks", note: "Network data" },
];

const R = 39; // node ring radius, % of the square
const nodes = sources.map((s, i) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  return { ...s, x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
});

/** Hub diagram: every source feeding Health Risk Monitor, which hands the employer one view. */
export function ConnectivityDiagram() {
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r={R} className="fill-none stroke-rule" strokeWidth="0.25" />
        <circle cx="50" cy="50" r="24" className="fill-cyan/[0.06] stroke-cyan/30" strokeWidth="0.25" />
        {nodes.map((n, i) => (
          <line
            key={n.name}
            x1={n.x}
            y1={n.y}
            x2={50}
            y2={50}
            className="flow stroke-cyan-deep"
            strokeWidth="0.45"
            strokeLinecap="round"
            style={{ animationDelay: `${i * -0.27}s` }}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy p-3 text-center text-white shadow-[0_24px_60px_-20px_rgba(11,74,139,0.6)]">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan sm:text-[10px]">Health Risk Monitor</span>
        <span className="mt-1 font-serif text-[0.95rem] leading-tight sm:text-[1.2rem]">One source of truth</span>
      </div>

      {nodes.map((n) => (
        <div
          key={n.name}
          className="absolute w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-rule bg-white px-2.5 py-2 text-center shadow-[0_12px_30px_-18px_rgba(11,27,43,0.45)] sm:px-3"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <p className="text-[11.5px] font-semibold leading-tight text-ink sm:text-[13.5px]">{n.name}</p>
          <p className="mt-0.5 hidden text-[11.5px] leading-tight text-dim sm:block">{n.note}</p>
        </div>
      ))}
      <figcaption className="sr-only">
        Claims payers, pharmacy benefit managers, stop-loss carriers, clinical teams, wellness programs and provider networks all
        feed Health Risk Monitor, which gives the employer one view of the plan.
      </figcaption>
    </figure>
  );
}

/** Home-page section: HCRM's differentiator, connectivity across the plan. */
export default function Connectivity() {
  return (
    <section className="relative overflow-hidden border-b border-rule" aria-labelledby="connect-title">
      <div className="wrap grid items-center gap-14 py-24 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">Connectivity</p>
          <h2 id="connect-title" className="h-section mt-3">
            One source of truth for what's happening in your plan.
          </h2>
          <p className="lede mt-5">
            Claims payers, pharmacy benefit managers, clinical teams, wellness programs, stop-loss carriers, even provider-network data: each holds one piece of an employer's plan. HCRM connects them and shows the employer what is happening in the plan, and whether every piece is doing its part.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rule bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">Today</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink2">
                Clinical and wellness teams usually get involved only after a huge claim has already landed.
              </p>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">With HCRM</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-white/85">
                They see potential large claims 12 to 18 months ahead, and reach those members first.
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-4 rounded-2xl bg-cyan-soft/60 p-6">
            <span className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-deep">Example</span>
            <p className="text-[15.5px] leading-relaxed text-ink">
              A wellness team sees which members with diabetes are falling behind on their standards of care, and which are most likely to stay compliant when targeted for education.
            </p>
          </div>

          <Link to="/our-software/" className="link-arrow mt-8">
            How Health Risk Monitor connects your data <Arrow />
          </Link>
        </div>
        <div className="lg:col-span-6" data-reveal>
          <ConnectivityDiagram />
        </div>
      </div>
    </section>
  );
}
