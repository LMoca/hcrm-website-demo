import { motion, useReducedMotion } from "framer-motion";

interface HorizonRuleProps {
  delay?: number;
  label?: string;
  tone?: "light" | "ink";
  className?: string;
}

/**
 * The site's signature device: recorded on the left as a solid navy rule, the
 * marker for now, projection continuing right as a dashed cyan rule.
 */
const HorizonRule = ({
  delay = 0,
  label = "today",
  tone = "light",
  className = "",
}: HorizonRuleProps) => {
  const reduced = useReducedMotion();
  const onInk = tone === "ink";

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
        animate={reduced ? undefined : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="flex items-center"
      >
        <span
          className={`h-px flex-[1.4] bg-gradient-to-r ${
            onInk ? "from-white/0 via-white/40 to-white/70" : "from-navy/0 via-navy/40 to-navy/80"
          }`}
        />
        <span
          className={`mx-[3px] h-[7px] w-[7px] shrink-0 rotate-45 ${
            onInk ? "bg-cyan" : "bg-cyan"
          }`}
        />
        <span
          className={`h-0 flex-1 border-t border-dashed ${
            onInk ? "border-cyan/60" : "border-cyan/70"
          }`}
        />
      </motion.div>

      {label && (
        <motion.span
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.5 }}
          className={`absolute left-[58.3%] top-[11px] font-mono text-[9.5px] uppercase tracking-[0.2em] ${
            onInk ? "text-cyan" : "text-cyan-deep"
          }`}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};

export default HorizonRule;
