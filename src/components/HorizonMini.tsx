// Compact horizon motif for dark sections: solid past, dashed forecast.
const pts = [62, 58, 64, 55, 60, 52, 57, 49, 53, 46, 50, 44, 47, 41];
const fut = [41, 37, 34, 30, 25, 21, 18];

export default function HorizonMini() {
  const step = 360 / (pts.length + fut.length - 2);
  const p = pts.map((v, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)},${v * 2}`).join(" ");
  const start = (pts.length - 1) * step;
  const f = fut.map((v, i) => `${i ? "L" : "M"}${(start + i * step).toFixed(1)},${v * 2}`).join(" ");
  return (
    <svg viewBox="-10 0 380 170" className="h-auto w-full" aria-hidden="true">
      <path d={p} fill="none" stroke="white" strokeOpacity={0.55} strokeWidth={2.2} />
      <path d={f} fill="none" stroke="#00A4E4" strokeWidth={2.6} strokeDasharray="7 6" />
      <line x1={start} x2={start} y1={8} y2={160} stroke="white" strokeOpacity={0.35} strokeDasharray="2 4" />
      <text x={start + 8} y={18} fill="white" fillOpacity={0.6} fontSize={10.5} fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
        TODAY
      </text>
      <circle cx={start + (fut.length - 1) * step} cy={fut.at(-1)! * 2} r={5} fill="#00A4E4" />
    </svg>
  );
}
