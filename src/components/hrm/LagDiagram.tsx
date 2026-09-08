import { motion, useReducedMotion } from "framer-motion";

interface Node {
  at: number;
  label: string;
  sub: string;
  tone?: "line" | "coral" | "lime";
}

const reactive: Node[] = [
  { at: 4, label: "Service", sub: "Day 0" },
  { at: 24, label: "Submitted", sub: "+14d" },
  { at: 56, label: "Adjudicated", sub: "+45d" },
  { at: 92, label: "Reported to you", sub: "+75d", tone: "coral" },
];

const forecast: Node[] = [
  { at: 4, label: "Flag raised", sub: "Today", tone: "lime" },
  { at: 92, label: "Projected event", sub: "+12 mo", tone: "coral" },
];

const dotTone = {
  line: "bg-line2",
  coral: "bg-danger",
  lime: "bg-navy",
} as const;

const Axis = ({
  nodes,
  fill,
  delay,
  window: showWindow,
}: {
  nodes: Node[];
  fill: string;
  delay: number;
  window?: boolean;
}) => {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-[4.5rem]">
      {/* base rule */}
      <div className="absolute inset-x-0 top-2 h-px bg-line" />

      {/* travelled rule */}
      <motion.div
        className={`absolute left-0 top-2 h-px ${fill}`}
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "92%", transformOrigin: "left" }}
      />

      {/* the actionable window */}
      {showWindow && (
        <motion.div
          className="absolute top-[0.1rem] h-[0.6rem] border-x border-cyan/50 bg-cyan/10"
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.5 }}
          style={{ left: "4%", width: "88%" }}
        />
      )}

      {nodes.map((n) => {
        // End labels are anchored to the edge rather than centred on their dot,
        // otherwise they run off the panel on narrow viewports.
        const edge = n.at <= 10 ? "start" : n.at >= 85 ? "end" : "mid";
        const place =
          edge === "start"
            ? "items-start"
            : edge === "end"
            ? "items-end"
            : "-translate-x-1/2 items-center";

        return (
          <div
            key={n.label}
            className={`absolute top-0 flex flex-col ${place}`}
            style={
              edge === "end"
                ? { right: `${100 - n.at}%` }
                : { left: `${n.at}%` }
            }
          >
            <span
              className={`h-[0.45rem] w-[0.45rem] translate-y-[0.28rem] ${
                dotTone[n.tone ?? "line"]
              }`}
            />
            <span
              className={`mt-3 whitespace-nowrap text-[12px] leading-none text-dim ${
                edge === "end" ? "text-right" : ""
              }`}
            >
              {n.label}
            </span>
            <span className="mt-1.5 whitespace-nowrap font-mono text-[10.5px] leading-none text-dim2">
              {n.sub}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Why lagging reporting cannot be acted on, and what a forecast changes.
 * Two rows on one axis: the claim you receive is already spent; the claim
 * HRM projects still has a window in front of it.
 */
const LagDiagram = () => (
  <div className="border border-line bg-mist">
    <div className="border-b border-line p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <span className="label text-dim2">Claims reporting</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-danger">
          Cost already incurred
        </span>
      </div>

      <Axis nodes={reactive} fill="bg-danger/70" delay={0} />

      <p className="mt-8 max-w-measure-wide text-[13.5px] leading-relaxed text-dim">
        By the time a claim reaches your report, the care has been delivered,
        the price has been set and the money has moved. There is nothing left to
        decide.
      </p>
    </div>

    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <span className="label text-dim2">Health Risk Monitor</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-navy">
          Intervention window open
        </span>
      </div>

      <Axis nodes={forecast} fill="bg-navy" delay={0.25} window />

      <p className="mt-8 max-w-measure-wide text-[13.5px] leading-relaxed text-dim">
        HRM raises the flag while the twelve months in between are still yours:
        to reach the member, redirect care, renegotiate stop-loss, or simply
        budget for it honestly.
      </p>
    </div>
  </div>
);

export default LagDiagram;
