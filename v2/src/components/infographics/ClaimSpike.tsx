import { ease, lerp, seg, useScrollProgress } from "@/lib/progress";
import { Panel } from "./Panels";

// One illustrative member's year, told twice: without HCRM (the claim lands, then everyone reacts)
// and with HCRM (flagged early, reached, claim avoided). Same member as the hero's forecast tag.

const unmanaged = [420, 380, 450, 400, 520, 480, 560, 610, 700, 35730, 900, 650]; // sums to $41,800
const managed = [420, 520, 610, 480, 450, 430, 420, 400, 410, 390, 400, 380];
const SPIKE = 9;

type Marker = { m: number; label: string; kind: "gap" | "flag" | "act" };
const gaps: Marker[] = [
  { m: 2, label: "Missed A1C test", kind: "gap" },
  { m: 4, label: "Metformin refill gap", kind: "gap" },
  { m: 6, label: "No PCP visit", kind: "gap" },
];
const actions: Marker[] = [
  { m: 1, label: "HRM flags rising risk", kind: "flag" },
  { m: 2, label: "Care manager call", kind: "act" },
  { m: 3, label: "A1C tested, care plan set", kind: "act" },
  { m: 4, label: "Refill restored", kind: "act" },
];

const X = (i: number) => 64 + i * (600 / 11);
const Y = (v: number) => 268 - Math.sqrt(v / 36000) * 222;
const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
const font = {
  mono: { fontFamily: "JetBrains Mono, monospace" },
  sans: { fontFamily: "Instrument Sans, sans-serif" },
  serif: { fontFamily: "Fraunces, serif" },
} as const;

export default function ClaimSpike({ variant, dark }: { variant: "unmanaged" | "managed"; dark?: boolean }) {
  const [ref, p] = useScrollProgress(undefined, 0.85);
  const data = variant === "unmanaged" ? unmanaged : managed;
  const head = ease(seg(p, 0.04, 0.92)) * 11;
  const at = (arr: number[], t: number) => lerp(arr[Math.floor(t)], arr[Math.min(11, Math.floor(t) + 1)], t % 1);
  const pts = data
    .slice(0, Math.floor(head) + 1)
    .map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`)
    .concat(head < 11 ? [`${X(head).toFixed(1)},${Y(at(data, head)).toFixed(1)}`] : [])
    .join(" ");
  const spent = data.reduce((s, v, i) => s + (i <= head ? v * Math.min(1, head - i + 1) : 0), 0);
  const ink = dark ? "#FFFFFF" : "#0B1B2B";
  const dim = dark ? "rgba(255,255,255,0.55)" : "#6A7787";
  const grid = dark ? "rgba(255,255,255,0.08)" : "#EEF2F6";
  const markers = variant === "unmanaged" ? gaps : actions;
  const spikeOn = head >= SPIKE - 0.1;
  const line = variant === "unmanaged" ? "#D9532F" : "#00A4E4";

  return (
    <div ref={ref}>
      <Panel
        dark={dark}
        label={variant === "unmanaged" ? "Member 0417 · without HCRM" : "Member 0417 · with HCRM"}
        status={
          variant === "unmanaged"
            ? spikeOn
              ? "Care team engaged: after the claim"
              : "No one is watching"
            : head >= 1
              ? "Found 8 months before the claim"
              : "Forecast running"
        }
        note="Illustrative member"
      >
        <svg viewBox="0 0 720 330" className="block w-full" role="img" aria-label={variant === "unmanaged"
          ? "Illustrative member: three gaps in care go unnoticed, then an ER visit and inpatient stay cost $35,730 in month 9; the year totals $41,800."
          : "The same member with HCRM: flagged in month 1, reached by a care manager, gaps closed; the ER visit and inpatient stay are avoided and the year totals $5,310."}>
          {[0, 1, 2, 3].map((g) => (
            <line key={g} x1={64} x2={664} y1={46 + g * 74} y2={46 + g * 74} stroke={grid} />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <text key={i} x={X(i)} y={292} textAnchor="middle" fontSize={10.5} fill={dim} style={font.mono}>
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
            </text>
          ))}
          <text x={64} y={316} fontSize={10.5} fill={dim} letterSpacing="1" style={font.mono}>
            MONTHLY CLAIMS COST
          </text>

          {/* Managed: the claim that would have happened, as a ghost */}
          {variant === "managed" && (
            <g opacity={seg(head, SPIKE - 1, SPIKE)}>
              <polyline
                points={`${X(SPIKE - 1)},${Y(unmanaged[SPIKE - 1])} ${X(SPIKE)},${Y(unmanaged[SPIKE])} ${X(SPIKE + 1)},${Y(unmanaged[SPIKE + 1])}`}
                fill="none"
                stroke="#D9532F"
                strokeOpacity={0.55}
                strokeWidth={2}
                strokeDasharray="5 6"
              />
              <circle cx={X(SPIKE)} cy={Y(unmanaged[SPIKE])} r={7} fill="none" stroke="#D9532F" strokeOpacity={0.6} strokeDasharray="3 3" />
              <text x={X(SPIKE) - 14} y={Y(unmanaged[SPIKE]) + 4} textAnchor="end" fontSize={13} fontWeight={600} fill="#D9532F" style={font.sans}>
                ER visit + inpatient stay: avoided
              </text>
            </g>
          )}

          <polyline points={pts} fill="none" stroke={line} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={X(head)} cy={Y(at(data, head))} r={6} fill={line} />

          {/* Markers appear as the line reaches them */}
          {markers.map((mk, i) => {
            const show = seg(head, mk.m - 0.2, mk.m + 0.3);
            const y = Y(data[mk.m]);
            const color = mk.kind === "gap" ? dim : mk.kind === "flag" ? "#00A4E4" : "#2E8B6A";
            return (
              <g key={mk.label} opacity={show}>
                <circle cx={X(mk.m)} cy={y} r={7} fill={mk.kind === "gap" ? "none" : color} stroke={color} strokeWidth={2} />
                <line x1={X(mk.m)} x2={X(mk.m)} y1={y - 10} y2={150 - i * 26} stroke={color} strokeOpacity={0.5} strokeDasharray="2 3" />
                <text x={X(mk.m) + 6} y={146 - i * 26} fontSize={12} fill={mk.kind === "gap" ? dim : ink} fontWeight={mk.kind === "gap" ? 400 : 600} style={font.sans}>
                  {mk.label}
                </text>
              </g>
            );
          })}

          {variant === "unmanaged" && (
            <g opacity={seg(head, SPIKE - 0.3, SPIKE + 0.2)}>
              <text x={X(SPIKE) - 14} y={Y(unmanaged[SPIKE]) + 4} textAnchor="end" fontSize={13} fontWeight={700} fill="#D9532F" style={font.sans}>
                ER visit + inpatient stay: {money(unmanaged[SPIKE])}
              </text>
              <text x={X(SPIKE) - 14} y={Y(unmanaged[SPIKE]) + 22} textAnchor="end" fontSize={12} fill={dim} style={font.sans}>
                The first time anyone looks at this member.
              </text>
            </g>
          )}

          {/* Running total */}
          <g transform="translate(80 12)">
            <rect width={168} height={62} rx={12} fill={dark ? "rgba(255,255,255,0.06)" : "#0B1B2B"} />
            <text x={14} y={24} fontSize={10} letterSpacing="1.2" fill={line} style={font.mono}>
              12-MONTH CLAIMS
            </text>
            <text x={14} y={50} fontSize={24} fill="#FFFFFF" style={font.serif}>
              {money(spent)}
            </text>
          </g>
        </svg>
      </Panel>
    </div>
  );
}
