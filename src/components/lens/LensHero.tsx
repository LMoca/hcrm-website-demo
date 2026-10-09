import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HorizonRule from "@/components/kit/HorizonRule";
import { PrimaryCta, OutlineCta } from "@/components/kit/Actions";
import LensSelector from "@/components/lens/LensSelector";
import PopulationLens from "@/components/lens/PopulationLens";
import { lensByKey, roleLenses, type LensKey } from "@/data/lenses";
import { useLens } from "@/context/lens-context";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Home hero. The visitor completes "I'm responsible for ____" and both the
 * statement and the population lens beside it re-form around that role.
 * Until they engage, the lens quietly previews each role so the choice is
 * discoverable without a prompt.
 */
const LensHero = ({ children }: { children?: ReactNode }) => {
  const reduced = useReducedMotion();
  const { lens, chosen, setLens, pickerPending, consumePicker } = useLens();
  const [preview, setPreview] = useState<LensKey | null>(null);
  const [engaged, setEngaged] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // attract mode: preview each role's view until the visitor engages
  useEffect(() => {
    if (reduced || chosen || engaged) return;
    let i = -1;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (!visible.current || document.hidden) return;
        i = (i + 1) % roleLenses.length;
        setPreview(roleLenses[i].key);
      }, 4200);
    }, 2400);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [reduced, chosen, engaged]);

  const engage = useCallback(() => {
    setEngaged(true);
    setPreview(null);
  }, []);

  const choose = (key: LensKey) => {
    setEngaged(true);
    setPreview(null);
    setLens(key);
  };

  // role headlines run longer than the general one; step the size down so the
  // selector and CTA stay above the fold on a laptop
  const size = lens.key === "general" ? "" : "text-[clamp(2.35rem,4.3vw,3.9rem)]";
  const shownKey: LensKey = chosen ? lens.key : preview ?? "general";
  const blankText = chosen ? lens.blank : preview ? lensByKey(preview)!.blank : lens.blank;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-line pt-[4.25rem] md:pt-[4.75rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-right-top"
        style={{ backgroundImage: "url(/img/hero-field.jpg)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/90 to-canvas/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent"
        aria-hidden="true"
      />

      <div className="edge relative grid items-center gap-12 pb-14 pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-16">
        <div className="min-w-0 lg:col-span-6">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[1.25rem] items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={lens.key}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="label text-cyan-deep"
              >
                {lens.kicker}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lens.key}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              <h1 className={`mt-7 display-xl text-balance text-ink ${size}`}>{lens.headline[0]}</h1>
              <HorizonRule delay={0.2} className="my-4 max-w-xl md:my-5" />
              <p className={`display-xl text-balance text-ink/40 ${size}`}>
                {lens.headline[1]}
              </p>
              <p className="mt-7 max-w-measure lede text-pretty text-dim">{lens.lede}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 border-t border-line pt-7"
          >
            <LensSelector
              chosenKey={chosen ? lens.key : "general"}
              blankText={blankText}
              idle={!chosen && !engaged}
              onChoose={choose}
              onEngage={engage}
              openRequested={pickerPending}
              onOpenHandled={consumePicker}
            />
            <p className="mt-3 text-[13px] text-dim2">
              {chosen
                ? `Tailored for ${lens.phrase}. Change it anytime.`
                : "Choose one and the page tailors itself to your work."}
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <PrimaryCta to={chosen ? `/contact?for=${lens.key}` : "/contact"}>{lens.cta}</PrimaryCta>
            <OutlineCta to="/about/our-software">See the platform</OutlineCta>
          </motion.div>
          <p className="mt-5 text-[13px] text-dim2">
            A 45-minute demo on de-identified claims, then a month free on your own data.
          </p>
        </div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="min-w-0 lg:col-span-6 xl:col-span-5 xl:col-start-8"
        >
          <PopulationLens lensKey={shownKey} />
        </motion.div>
      </div>

      {children}
    </section>
  );
};

export default LensHero;
