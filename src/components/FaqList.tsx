import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/data/faqs";

/** Objection handling, set as a plain index of questions. */
const FaqList = () => {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <div className="border-t border-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-6 py-6 text-left"
              >
                <span
                  className={`flex-1 font-display text-[19px] font-semibold tracking-[-0.03em] transition-colors md:text-[22px] ${
                    isOpen ? "text-navy" : "text-ink group-hover:text-navy"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-navy text-white" : "bg-mist text-dim group-hover:bg-navy-soft"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.2} />
                  ) : (
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
                  )}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduced ? undefined : { height: 0, opacity: 0 }}
                  animate={reduced ? undefined : { height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-measure-wide pb-8 text-[15px] leading-relaxed text-dim">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqList;
