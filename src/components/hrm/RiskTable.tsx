import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { consoleSummary, riskMembers, usd } from "@/data/hrmDemo";

const trendMeta = {
  rising: { Icon: ArrowUpRight, className: "text-danger" },
  steady: { Icon: ArrowRight, className: "text-dim" },
  falling: { Icon: ArrowDownRight, className: "text-cyan" },
} as const;

/** Member-level exposure, ranked by projected 12-month spend. */
const RiskTable = () => {
  const reduced = useReducedMotion();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="label pb-3 pr-4 font-medium text-dim2">Member</th>
            <th className="label pb-3 pr-4 font-medium text-dim2">Cohort</th>
            <th className="label hidden pb-3 pr-4 font-medium text-dim2 lg:table-cell">
              Primary cost driver
            </th>
            <th className="label pb-3 pr-4 text-right font-medium text-dim2">
              Projected
            </th>
            <th className="label pb-3 pr-4 font-medium text-dim2">Conf.</th>
            <th className="label pb-3 text-right font-medium text-dim2">Window</th>
          </tr>
        </thead>
        <tbody>
          {riskMembers.map((m, i) => {
            const { Icon, className } = trendMeta[m.trend];
            return (
              <motion.tr
                key={m.id}
                initial={reduced ? undefined : { opacity: 0 }}
                whileInView={reduced ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group border-b border-line/60 transition-colors hover:bg-cyan/5"
              >
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${className}`} strokeWidth={2.2} />
                    <span className="font-mono text-[13px] text-ink">{m.id}</span>
                  </div>
                </td>
                <td className="py-3.5 pr-4 text-[13px] text-dim">{m.cohort}</td>
                <td className="hidden py-3.5 pr-4 text-[13px] text-dim lg:table-cell">
                  {m.driver}
                </td>
                <td className="py-3.5 pr-4 text-right font-mono text-[13px] font-medium tabular-nums text-navy">
                  {usd(m.projected)}
                </td>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 bg-line">
                      <motion.div
                        className="h-full bg-cyan"
                        initial={reduced ? undefined : { scaleX: 0 }}
                        whileInView={reduced ? undefined : { scaleX: m.confidence / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-dim2">
                      {m.confidence}%
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-right font-mono text-[12px] tabular-nums text-dim">
                  {m.window}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="label text-dim2">Trajectory</span>
        {(
          [
            ["rising", "Accelerating"],
            ["steady", "Holding"],
            ["falling", "Responding to care"],
          ] as const
        ).map(([key, copy]) => {
          const { Icon, className } = trendMeta[key];
          return (
            <span key={key} className="flex items-center gap-1.5 text-[12px] text-dim">
              <Icon className={`h-3.5 w-3.5 ${className}`} strokeWidth={2.2} />
              {copy}
            </span>
          );
        })}
        <span className="ml-auto font-mono text-[11px] tabular-nums text-dim2">
          Top {riskMembers.length} of {consoleSummary.flagged} flagged
        </span>
      </div>
    </div>
  );
};

export default RiskTable;
