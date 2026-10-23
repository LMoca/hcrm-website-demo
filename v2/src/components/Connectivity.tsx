
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
type HubItem = { name: string; note: string };

/** Hub diagram: items around Health Risk Monitor, with data flowing in (or out, with `outward`). */
export function ConnectivityDiagram({
  items = sources,
  kicker = "Health Risk Monitor",
  center = "One source of truth",
  caption = "Claims payers, pharmacy benefit managers, stop-loss carriers, clinical teams, wellness programs and provider networks all feed Health Risk Monitor, which gives the employer one view of the plan.",
  outward,
}: {
  items?: HubItem[];
  kicker?: string;
  center?: string;
  caption?: string;
  outward?: boolean;
}) {
  const nodes = items.map((s, i) => {
    const a = ((-90 + (i * 360) / items.length) * Math.PI) / 180;
    return { ...s, x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[34rem]" data-stagger="120">
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
        {nodes.map((n, i) => (
          <circle key={`p-${n.name}`} r="1.1" className="packet fill-cyan" opacity="0">
            <animateMotion dur="2.6s" begin={`${i * 0.43}s`} repeatCount="indefinite" path={outward ? `M50,50 L${n.x.toFixed(2)},${n.y.toFixed(2)}` : `M${n.x.toFixed(2)},${n.y.toFixed(2)} L50,50`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.6s" begin={`${i * 0.43}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="hub-ring absolute left-[33%] top-[33%] aspect-square w-[34%] rounded-full border-2 border-cyan/60" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy p-3 text-center text-white shadow-[0_24px_60px_-20px_rgba(11,74,139,0.6)]">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan sm:text-[10px]">{kicker}</span>
        <span className="mt-1 font-serif text-[0.95rem] leading-tight sm:text-[1.2rem]">{center}</span>
      </div>

      {nodes.map((n) => (
        <div key={n.name} className="absolute w-[30%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <div
            className="rounded-xl border border-rule bg-white px-2.5 py-2 text-center shadow-[0_12px_30px_-18px_rgba(11,27,43,0.45)] transition-colors hover:border-cyan sm:px-3"
            data-reveal="zoom"
          >
            <p className="text-[11.5px] font-semibold leading-tight text-ink sm:text-[13.5px]">{n.name}</p>
            <p className="mt-0.5 hidden text-[11.5px] leading-tight text-dim sm:block">{n.note}</p>
          </div>
        </div>
      ))}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
