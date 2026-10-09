import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "@/components/kit/SectionHead";
import { ArrowLink } from "@/components/kit/Actions";
import { useLens } from "@/context/lens-context";
import { getPersonaBySlug } from "@/data/personas";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The three questions this visitor's team is already being asked, each
 * answered by one HCRM service. Re-forms when the lens changes.
 */
const LensQuestions = () => {
  const reduced = useReducedMotion();
  const { lens, chosen, requestPicker } = useLens();
  const personas = lens.personaSlugs
    .map((s) => getPersonaBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="border-b border-line bg-mist" aria-live="polite">
      <div className="edge band">
        <SectionHead
          label={chosen ? `For ${lens.phrase}` : "Your questions"}
          title={
            <>
              {lens.questionsTitle[0]}{" "}
              <span className="text-ink/40">{lens.questionsTitle[1]}</span>
            </>
          }
          lede={
            chosen
              ? "Each answer comes from the same normalized dataset, so the numbers your team quotes agree with each other."
              : "Tell us what you're responsible for at the top of the page and these become the questions your team is actually asked."
          }
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lens.key}
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            <ol className="mt-14 grid gap-6 md:grid-cols-3">
              {lens.questions.map((q, i) => (
                <li key={q.q} className="min-w-0">
                  <Link
                    to={q.to}
                    className="plate group flex h-full flex-col p-7 transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(10,31,51,0.05),0_24px_48px_-28px_rgba(10,31,51,0.35)]"
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tabular-nums text-dim2">
                        0{i + 1}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-dim2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="mt-6 block font-display text-[21px] font-semibold leading-snug tracking-[-0.03em] text-ink text-balance md:text-[22px]">
                      {q.q}
                    </span>
                    <span className="mt-4 block flex-1 text-[14.5px] leading-relaxed text-dim">
                      {q.a}
                    </span>
                    <span className="mt-7 block border-t border-line pt-4">
                      <span className="label text-cyan-deep">{q.service}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              {personas.length > 0 ? (
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="text-[13px] text-dim2">Go deeper:</span>
                  {personas.map((p) => (
                    <ArrowLink key={p.slug} to={`/clients/${p.slug}`}>
                      {p.shortTitle}
                    </ArrowLink>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={requestPicker}
                  className="link-rule text-[14px] font-semibold text-navy"
                >
                  Choose your role
                </button>
              )}
              {chosen && (
                <button
                  type="button"
                  onClick={requestPicker}
                  className="text-[13px] text-dim2 underline decoration-line2 underline-offset-4 transition-colors hover:text-navy"
                >
                  Not your role? Change it
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LensQuestions;
