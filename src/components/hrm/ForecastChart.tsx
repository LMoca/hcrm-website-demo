import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  actualSpend,
  forecastSpend,
  forecastBand,
  monthLabels,
  flaggedEvent,
} from "@/data/hrmDemo";

const W = 860;
const H = 304;
const L = 62;
const R = 844;
const T = 18;
const B = 268;
const Y_MAX = 400;

const TOTAL = actualSpend.length + forecastSpend.length; // 36
const LAST_ACTUAL = actualSpend.length - 1; // 23

const x = (i: number) => L + (i / (TOTAL - 1)) * (R - L);
const y = (v: number) => B - (v / Y_MAX) * (B - T);

interface ForecastChartProps {
  /** hides axis furniture for compact embeds */
  compact?: boolean;
  className?: string;
}

/**
 * The signature chart. Recorded claims resolve on the left in ice; the HRM
 * projection continues past the horizon in lime with its confidence interval.
 * Hovering reads the series out month by month - the interaction exists to
 * make the forecast legible, not to decorate it.
 */
const ForecastChart = ({ compact = false, className = "" }: ForecastChartProps) => {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const paths = useMemo(() => {
    const actualLine = actualSpend
      .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
      .join(" ");

    const actualArea = `${actualLine} L${x(LAST_ACTUAL).toFixed(1)},${B} L${L},${B} Z`;

    const fcPoints = [
      { i: LAST_ACTUAL, v: actualSpend[LAST_ACTUAL], b: 0 },
      ...forecastSpend.map((v, k) => ({
        i: LAST_ACTUAL + 1 + k,
        v,
        b: forecastBand[k],
      })),
    ];

    const forecastLine = fcPoints
      .map((p, k) => `${k === 0 ? "M" : "L"}${x(p.i).toFixed(1)},${y(p.v).toFixed(1)}`)
      .join(" ");

    const upper = fcPoints
      .map((p, k) => `${k === 0 ? "M" : "L"}${x(p.i).toFixed(1)},${y(p.v + p.b).toFixed(1)}`)
      .join(" ");

    const lower = [...fcPoints]
      .reverse()
      .map((p) => `L${x(p.i).toFixed(1)},${y(Math.max(p.v - p.b, 0)).toFixed(1)}`)
      .join(" ");

    return { actualLine, actualArea, forecastLine, band: `${upper} ${lower} Z` };
  }, []);

  const series = useMemo(
    () => [...actualSpend, ...forecastSpend],
    []
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const ratio = (px - L) / (R - L);
    const i = Math.round(ratio * (TOTAL - 1));
    setHover(i >= 0 && i < TOTAL ? i : null);
  };

  const hoverIsForecast = hover !== null && hover > LAST_ACTUAL;
  const hoverX = hover !== null ? (x(hover) / W) * 100 : 0;

  const xTicks = compact ? [0, 11, 23, 35] : [0, 5, 11, 17, 23, 29, 35];
  const flagY = y(forecastSpend[flaggedEvent.monthIndex - actualSpend.length]);
  // compact embeds drop the month axis, so the viewBox drops the room for it
  const viewH = compact ? B + 16 : H;

  return (
    // Below ~640px the viewBox would shrink axis labels past legibility, so the
    // chart keeps a minimum track width and the narrow viewport scrolls it.
    // min-w-0 matters: as a grid/flex child the scroller defaults to
    // min-width:auto, so the 34rem track below would size the whole column
    // instead of scrolling inside it.
    <div className={`-mx-1 min-w-0 overflow-x-auto px-1 pb-1 ${className}`}>
      <div
        ref={wrapRef}
        className="relative min-w-[34rem] select-none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
      <svg
        viewBox={`0 0 ${W} ${viewH}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Monthly plan spend: 24 recorded months followed by a 12-month Health Risk Monitor forecast with confidence interval."
      >
        <defs>
          <linearGradient id="hcrm-actual-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#004B87" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#004B87" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hcrm-band-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00A4E4" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#00A4E4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* horizontal grid + value axis */}
        {[0, 100, 200, 300, 400].map((v) => (
          <g key={v}>
            <line
              x1={L}
              y1={y(v)}
              x2={R}
              y2={y(v)}
              stroke="#E4EAF3"
              strokeWidth="1"
            />
            {!compact && (
              <text
                x={L - 12}
                y={y(v) + 4}
                textAnchor="end"
                className="fill-dim2 font-mono"
                fontSize="11"
              >
                {v === 0 ? "$0" : `$${v}K`}
              </text>
            )}
          </g>
        ))}

        {/* recorded claims */}
        <motion.path
          d={paths.actualArea}
          fill="url(#hcrm-actual-fill)"
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d={paths.actualLine}
          fill="none"
          stroke="#004B87"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* forecast interval */}
        <motion.path
          d={paths.band}
          fill="url(#hcrm-band-fill)"
          stroke="#00A4E4"
          strokeOpacity="0.22"
          strokeWidth="1"
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.25 }}
        />
        <motion.path
          d={paths.forecastLine}
          fill="none"
          stroke="#00A4E4"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* the horizon: today */}
        <line
          x1={x(LAST_ACTUAL)}
          y1={T - 8}
          x2={x(LAST_ACTUAL)}
          y2={B}
          stroke="#0A1F33"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <text
          x={x(LAST_ACTUAL) + 8}
          y={T - 2}
          className="fill-ink font-mono"
          fontSize="10"
          letterSpacing="1.4"
        >
          TODAY
        </text>

        {/* annotated shock-loss projection */}
        {!compact && (
          <motion.g
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 2.1 }}
          >
            <line
              x1={x(flaggedEvent.monthIndex)}
              y1={flagY + 8}
              x2={x(flaggedEvent.monthIndex)}
              y2={flagY + 74}
              stroke="#DC2626"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <circle
              cx={x(flaggedEvent.monthIndex)}
              cy={flagY}
              r="4.5"
              fill="#DC2626"
            />
            <text
              x={x(flaggedEvent.monthIndex) + 9}
              y={flagY + 78}
              className="fill-danger font-mono"
              fontSize="10.5"
              letterSpacing="0.7"
            >
              {flaggedEvent.amount} FLAGGED
            </text>
            <text
              x={x(flaggedEvent.monthIndex) + 9}
              y={flagY + 92}
              className="fill-dim2 font-mono"
              fontSize="9.5"
            >
              M-40817 &middot; acute event
            </text>
          </motion.g>
        )}

        {/* hover crosshair */}
        {hover !== null && (
          <g>
            <line
              x1={x(hover)}
              y1={T - 8}
              x2={x(hover)}
              y2={B}
              stroke={hoverIsForecast ? "#00A4E4" : "#004B87"}
              strokeOpacity="0.5"
              strokeWidth="1"
            />
            <circle
              cx={x(hover)}
              cy={y(series[hover])}
              r="4"
              fill={hoverIsForecast ? "#00A4E4" : "#004B87"}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}

        {/* month axis */}
        {!compact &&
          xTicks.map((i) => (
            <text
              key={i}
              x={x(i)}
              y={B + 22}
              textAnchor="middle"
              className="fill-dim2 font-mono"
              fontSize="10.5"
            >
              {monthLabels[i]}
            </text>
          ))}
      </svg>

      {/* readout */}
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-1 z-10 -translate-x-1/2 whitespace-nowrap border border-line bg-canvas/95 px-2.5 py-1.5 backdrop-blur-sm"
          style={{
            left: `${Math.min(Math.max(hoverX, 10), 90)}%`,
          }}
        >
          <div className="label text-[9px] text-dim2">{monthLabels[hover]}</div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span
              className={`font-mono text-[13px] font-medium tabular-nums ${
                hoverIsForecast ? "text-navy" : "text-cyan"
              }`}
            >
              ${series[hover]}K
            </span>
            <span className="label text-[9px] text-dim2">
              {hoverIsForecast ? "proj." : "actual"}
            </span>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ForecastChart;
