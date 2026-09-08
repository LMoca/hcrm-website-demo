import { motion, useReducedMotion } from "framer-motion";
import { ATTACHMENT_POINT, stopLossMembers, usd } from "@/data/hrmDemo";

const MAX = 520000;
const attachFraction = ATTACHMENT_POINT / MAX;

/**
 * Every member measured against the plan's own attachment point. Paid-to-date
 * is solid; the projection is the part you can still act on.
 */
const StopLossPanel = () => {
  const reduced = useReducedMotion();
  const breaching = stopLossMembers.filter((m) => m.projected >= ATTACHMENT_POINT);
  const exposure = breaching.reduce(
    (sum, m) => sum + (m.projected - ATTACHMENT_POINT),
    0
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 text-[12px] text-dim">
          <span className="h-2.5 w-2.5 bg-cyan" />
          Paid to date
        </span>
        <span className="flex items-center gap-2 text-[12px] text-dim">
          <span className="h-2.5 w-2.5 bg-cyan/50" />
          Projected remainder
        </span>
        <span className="flex items-center gap-2 text-[12px] text-dim">
          <span className="inline-block h-3 w-px bg-danger" />
          Attachment point {usd(ATTACHMENT_POINT)}
        </span>
      </div>

      <div className="relative pt-7">
        {/* attachment point rule spanning the whole plot */}
        {/* The rule has to land inside the bar column, which sits 5.25rem from
            the left (member id + gap) and 4.75rem from the right (gap + value). */}
        <div
          className="pointer-events-none absolute bottom-0 top-6 z-10 w-px bg-danger"
          style={{ left: `calc(5.25rem + (100% - 10rem) * ${attachFraction})` }}
        >
          <span className="absolute -top-6 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-danger">
            attachment {usd(ATTACHMENT_POINT)}
          </span>
        </div>

        <div className="space-y-2.5">
          {stopLossMembers.map((m, i) => {
            const breach = m.projected >= ATTACHMENT_POINT;
            return (
              <div key={m.id} className="flex items-center gap-3">
                <span className="w-[4.5rem] shrink-0 font-mono text-[11.5px] text-dim">
                  {m.id}
                </span>
                <div className="relative h-4 flex-1 bg-mist2">
                  <motion.div
                    className="absolute inset-y-0 left-0 flex"
                    initial={reduced ? undefined : { scaleX: 0 }}
                    whileInView={reduced ? undefined : { scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      width: `${(m.projected / MAX) * 100}%`,
                      transformOrigin: "left",
                    }}
                  >
                    <span
                      className="h-full bg-cyan"
                      style={{ width: `${(m.paid / m.projected) * 100}%` }}
                    />
                    <span
                      className={`h-full flex-1 ${
                        breach ? "bg-cyan/60" : "bg-cyan/25"
                      }`}
                    />
                  </motion.div>
                </div>
                <span
                  className={`w-16 shrink-0 text-right font-mono text-[12px] tabular-nums ${
                    breach ? "text-navy" : "text-dim2"
                  }`}
                >
                  {usd(m.projected)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
        {[
          { k: "Projected to breach", v: String(breaching.length), unit: "members" },
          { k: "Exposure above attachment", v: usd(exposure), unit: "reimbursable" },
          { k: "Earliest projected breach", v: "Q4 2026", unit: "3 months out" },
        ].map((cell) => (
          <div key={cell.k} className="bg-mist px-5 py-4">
            <div className="label text-dim2">{cell.k}</div>
            <div className="mt-2 font-mono text-[18px] font-medium tabular-nums text-ink">
              {cell.v}
            </div>
            <div className="mt-1 text-[11.5px] text-dim2">{cell.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopLossPanel;
