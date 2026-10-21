// Illustrative only: a deterministic series so server and client render identically.
const W = 720;
const H = 420;
const PAD = { l: 18, r: 18, t: 40, b: 64 };
const MONTHS = 36;
const TODAY = 24;

const noise = [3, -4, 6, -2, 1, -6, 4, 2, -3, 5, -1, -4, 7, -2, 3, -5, 2, 6, -3, 1, -4, 5, -2, 3];
const history = Array.from({ length: TODAY }, (_, i) => 100 + i * 1.6 + Math.sin(i / 1.9) * 6 + noise[i]);
const last = history[TODAY - 1];
const unmanaged = Array.from({ length: MONTHS - TODAY + 1 }, (_, i) => last + i * 4.2 + (i * i) / 9);
const managed = Array.from({ length: MONTHS - TODAY + 1 }, (_, i) => last + i * 1.4 - (i * i) / 30);

const max = 210;
const min = 70;
const x = (m: number) => PAD.l + (m / (MONTHS - 1)) * (W - PAD.l - PAD.r);
const y = (v: number) => PAD.t + (1 - (v - min) / (max - min)) * (H - PAD.t - PAD.b);

const path = (vals: number[], start: number) =>
  vals.map((v, i) => `${i ? "L" : "M"}${x(start + i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

const band =
  path(unmanaged, TODAY - 1) +
  " " +
  [...managed]
    .reverse()
    .map((v, i) => `L${x(MONTHS - 1 - i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ") +
  " Z";

export default function HorizonChart() {
  const tx = x(TODAY - 1);
  const endU = { x: x(MONTHS - 1), y: y(unmanaged[unmanaged.length - 1]) };
  const endM = { x: x(MONTHS - 1), y: y(managed[managed.length - 1]) };
  const gap = Math.round(((unmanaged.at(-1)! - managed.at(-1)!) / unmanaged.at(-1)!) * 100);

  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby="hc-title hc-desc"
      >
        <title id="hc-title">Claims history and 12-month forecast</title>
        <desc id="hc-desc">
          Illustrative chart: 24 months of monthly claims cost lead to today. Beyond today, Health Risk Monitor forecasts
          the next 12 months. Without intervention cost keeps rising; with early intervention on flagged members the curve
          bends down.
        </desc>

        {/* history columns */}
        {history.map((v, i) => (
          <rect
            key={i}
            x={x(i) - 5}
            y={y(v)}
            width={10}
            height={H - PAD.b - y(v)}
            rx={2}
            className="fill-ink/[0.07]"
          />
        ))}

        {/* forecast zone */}
        <rect x={tx} y={PAD.t - 24} width={W - PAD.r - tx} height={H - PAD.b - PAD.t + 24} className="fill-cyan/[0.06]" />
        <path d={band} className="fill-cyan/15" />

        {/* baseline */}
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} className="stroke-ink/25" strokeWidth={1} />

        {/* history line */}
        <path
          d={path(history, 0)}
          className="draw fill-none stroke-navy"
          strokeWidth={2.6}
          strokeLinejoin="round"
          style={{ ["--len" as string]: 900 }}
        />

        {/* forecasts */}
        <path
          d={path(unmanaged, TODAY - 1)}
          className="draw fill-none stroke-signal"
          strokeWidth={2.4}
          strokeDasharray="6 6"
          style={{ ["--len" as string]: 400, animationDelay: "1.2s" }}
        />
        <path
          d={path(managed, TODAY - 1)}
          className="draw fill-none stroke-cyan-deep"
          strokeWidth={2.8}
          style={{ ["--len" as string]: 400, animationDelay: "1.5s" }}
        />

        {/* today rule */}
        <line x1={tx} x2={tx} y1={PAD.t - 24} y2={H - PAD.b} className="stroke-ink" strokeWidth={1.2} />
        <rect x={tx - 30} y={PAD.t - 36} width={60} height={22} rx={11} className="fill-ink" />
        <text x={tx} y={PAD.t - 21} textAnchor="middle" className="fill-paper font-mono text-[11px] tracking-[0.14em]">
          TODAY
        </text>

        {/* end markers */}
        <circle cx={endU.x - 2} cy={endU.y} r={5} className="fill-signal" />
        <circle cx={endM.x - 2} cy={endM.y} r={5} className="fill-cyan-deep" />
        <circle cx={endM.x - 2} cy={endM.y} r={5} className="pulse fill-none stroke-cyan-deep" strokeWidth={1.5} />

        {/* axis labels */}
        <text x={PAD.l} y={H - PAD.b + 26} className="fill-dim font-mono text-[11.5px] tracking-[0.1em]">
          24 MONTHS OF CLAIMS
        </text>
        <text x={W - PAD.r} y={H - PAD.b + 26} textAnchor="end" className="fill-cyan-deep font-mono text-[11.5px] tracking-[0.1em]">
          12-MONTH FORECAST
        </text>
        <text x={endU.x - 14} y={endU.y - 14} textAnchor="end" className="fill-signal font-sans text-[13px] font-semibold">
          Unmanaged
        </text>
        <text x={endM.x - 14} y={endM.y + 26} textAnchor="end" className="fill-cyan-deep font-sans text-[13px] font-semibold">
          Flagged early, managed
        </text>
      </svg>
      <figcaption className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
        <span>Illustrative · group PMPM</span>
        <span className="text-ink2">
          Gap at month 12: <strong className="text-cyan-deep">{gap}%</strong>
        </span>
      </figcaption>
    </figure>
  );
}
