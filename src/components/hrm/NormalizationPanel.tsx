import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const raw = [
  { t: "ST.LUKES HOSP #2  | 99213 | E11.9", bad: false },
  { t: "st lukes hospital | 9921 3| E119", bad: true },
  { t: "SAINT LUKE'S      | 99213 | ---", bad: true },
  { t: "ST LUKES HOSP     | 99213 | E11.9", bad: false },
  { t: "St. Lukes Hosp 2  | 99213 | E11.9", bad: false },
  { t: "STLUKESHOSPITAL   | 99Z13 | E11.9", bad: true },
];

const clean = "ST LUKE'S HOSPITAL | 99213 | E11.9";

const checks = [
  ["Provider identity", "6 variants collapsed to 1"],
  ["Procedure codes", "99Z13, 9921 3 corrected"],
  ["Diagnosis codes", "E119 mapped to E11.9"],
  ["Pharmacy", "NDC resolved to GPI"],
  ["Duplicates", "1 exact match removed"],
  ["Clinical logic", "Age/sex/procedure validated"],
];

/** What normalization actually does to a claim, shown rather than described. */
const NormalizationPanel = () => {
  const reduced = useReducedMotion();

  return (
    <div className="plate">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="label text-ink">Normalization engine</span>
        <span className="font-mono text-[11px] text-dim2">1 provider, 6 records</span>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-[1fr_auto_1fr]">
        <div className="bg-mist p-5">
          <div className="label mb-4 text-dim2">As received</div>
          <div className="space-y-1.5 font-mono text-[10.5px] leading-relaxed">
            {raw.map((r, i) => (
              <motion.div
                key={i}
                initial={reduced ? undefined : { opacity: 0, x: -6 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`truncate border-l-2 pl-2 ${
                  r.bad ? "border-danger/60 text-danger/75" : "border-line2 text-dim2"
                }`}
              >
                {r.t}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center bg-mist px-4 py-3 md:px-5">
          <ArrowRight className="h-4 w-4 rotate-90 text-navy md:rotate-0" strokeWidth={2} />
        </div>

        <div className="bg-mist p-5">
          <div className="label mb-4 text-dim2">After validation</div>
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-l-2 border-navy pl-2 font-mono text-[10.5px] leading-relaxed text-ink"
          >
            {clean}
          </motion.div>
          <div className="mt-4 space-y-2">
            {checks.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={reduced ? undefined : { opacity: 0 }}
                whileInView={reduced ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-1.5"
              >
                <span className="text-[11.5px] text-dim">{k}</span>
                <span className="text-right font-mono text-[10px] text-dim2">{v}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line px-5 py-4">
        <span className="label text-dim2">Dataset accuracy</span>
        <span className="font-mono text-[16px] font-medium tabular-nums text-navy">
          95%+
        </span>
      </div>
    </div>
  );
};

export default NormalizationPanel;
