import { motion, useReducedMotion } from "framer-motion";
import { programOutcomes, usd } from "@/data/hrmDemo";

const MAX = Math.max(...programOutcomes.flatMap((p) => [p.predicted, p.actual])) * 1.04;

/**
 * A bullet chart: the bar is what the population actually spent, the tick is
 * what HRM predicted it would spend without the programme. The gap between
 * them, in dollars, is the only ROI figure a CFO can use.
 */
const OutcomePanel = () => {
  const reduced = useReducedMotion();
  const totalDelta = programOutcomes.reduce(
    (sum, p) => sum + (p.predicted - p.actual),
    0
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-x-7 gap-y-2">
        <span className="flex items-center gap-2 text-[12px] text-dim">
          <span className="inline-block h-3.5 w-0.5 bg-cyan" />
          Predicted baseline
        </span>
        <span className="flex items-center gap-2 text-[12px] text-dim">
          <span className="inline-block h-1.5 w-4 bg-navy/80" />
          Measured actual
        </span>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-dim2">
          12 months to Aug 2026
        </span>
      </div>

      <div className="space-y-7">
        {programOutcomes.map((p, i) => {
          const delta = p.predicted - p.actual;
          const avoided = delta > 0;
          return (
            <div key={p.program}>
              <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[13.5px] font-medium text-ink">
                    {p.program}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-dim2">
                    {p.members.toLocaleString("en-US")} members
                  </span>
                </div>
                <span
                  className={`font-mono text-[13px] font-medium tabular-nums ${
                    avoided ? "text-navy" : "text-danger"
                  }`}
                >
                  {avoided ? "−" : "+"}
                  {usd(Math.abs(delta))}
                  <span className="ml-1.5 text-[10px] text-dim2">
                    {avoided ? "avoided" : "over baseline"}
                  </span>
                </span>
              </div>

              <div className="relative h-3.5">
                {/* full-range track */}
                <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-mist2" />

                {/* measured actual */}
                <motion.div
                  className={`absolute top-1/2 left-0 h-1.5 -translate-y-1/2 ${
                    avoided ? "bg-cyan" : "bg-danger"
                  }`}
                  initial={reduced ? undefined : { scaleX: 0 }}
                  whileInView={reduced ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.75,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    width: `${(p.actual / MAX) * 100}%`,
                    transformOrigin: "left",
                  }}
                />

                {/* predicted baseline tick */}
                <motion.span
                  className="absolute top-0 h-full w-0.5 bg-cyan"
                  initial={reduced ? undefined : { opacity: 0 }}
                  whileInView={reduced ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                  style={{ left: `${(p.predicted / MAX) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5">
        <span className="label text-dim2">Net measured impact</span>
        <span className="font-mono text-[15px] font-medium tabular-nums text-navy">
          {usd(totalDelta)} avoided
        </span>
      </div>
      <p className="mt-3 max-w-measure-wide text-[12.5px] leading-relaxed text-dim2">
        The biometric screening incentive came back over baseline. HRM reports
        the result the data supports, which is the only way a program
        evaluation is worth taking to a CFO.
      </p>
    </div>
  );
};

export default OutcomePanel;
