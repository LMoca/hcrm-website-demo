import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { lenses, roleLenses, type LensKey } from "@/data/lenses";

interface LensSelectorProps {
  /** Lens the visitor has actually chosen ("general" if none). */
  chosenKey: LensKey;
  /** Text currently shown in the blank (may be an attract-mode preview). */
  blankText: string;
  idle: boolean;
  onChoose: (key: LensKey) => void;
  /** Called when the visitor engages with the selector at all. */
  onEngage: () => void;
  /** Open the list from outside (navbar "change" pill). */
  openRequested?: boolean;
  onOpenHandled?: () => void;
}

const options = [...roleLenses, lenses[0]];

/**
 * "I'm responsible for ____." The blank is a button that opens a listbox of
 * the five client lenses plus "Just exploring". Implements the ARIA listbox
 * pattern with aria-activedescendant so it works by keyboard and screen reader.
 */
const LensSelector = ({
  chosenKey,
  blankText,
  idle,
  onChoose,
  onEngage,
  openRequested,
  onOpenHandled,
}: LensSelectorProps) => {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const openList = useCallback(() => {
    onEngage();
    const i = options.findIndex((o) => o.key === chosenKey);
    setActive(i >= 0 && chosenKey !== "general" ? i : 0);
    setOpen(true);
  }, [chosenKey, onEngage]);

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus({ preventScroll: true });
  }, []);

  const choose = (i: number) => {
    onChoose(options[i].key);
    close(true);
  };

  useEffect(() => {
    if (open) listRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`lens-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  useEffect(() => {
    if (openRequested) {
      openList();
      buttonRef.current?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
      onOpenHandled?.();
    }
  }, [openRequested, openList, onOpenHandled, reduced]);

  const onListKey = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a === last ? 0 : a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a === 0 ? last : a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[23px] font-semibold leading-tight tracking-[-0.03em] text-ink md:text-[28px]">
        <span>I&rsquo;m responsible for</span>
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls="lens-options"
          aria-label={`Choose what you're responsible for. Currently: ${blankText}`}
          onClick={() => (open ? close(false) : openList())}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              openList();
            }
          }}
          onMouseEnter={onEngage}
          onFocus={onEngage}
          className="group inline-flex items-baseline gap-2 border-b-2 border-dashed border-cyan pb-0.5 text-left text-navy outline-none transition-colors hover:text-cyan-deep focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-cyan/50 focus-visible:ring-offset-4"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={blankText}
              initial={reduced ? undefined : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
            >
              {blankText}
            </motion.span>
          </AnimatePresence>
          {idle && (
            <span className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-cyan animate-pulse-dot" aria-hidden="true" />
          )}
          <ChevronDown
            className={`h-5 w-5 shrink-0 self-center transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={2.2}
          />
        </button>
      </p>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id="lens-options"
            role="listbox"
            tabIndex={-1}
            aria-label="What you're responsible for"
            aria-activedescendant={`lens-opt-${active}`}
            onKeyDown={onListKey}
            initial={reduced ? undefined : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="plate-raised absolute left-0 top-[calc(100%+0.75rem)] z-30 w-[min(28rem,calc(100vw-2*var(--gutter)))] p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            {options.map((o, i) => {
              const selected = o.key === chosenKey && chosenKey !== "general";
              return (
                <li
                  key={o.key}
                  id={`lens-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={`grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-[3px] px-3.5 py-3 ${
                    i === active ? "bg-mist" : ""
                  } ${o.key === "general" ? "mt-1 border-t border-line pt-3.5" : ""}`}
                >
                  <span>
                    <span className="block text-[14.5px] font-semibold text-ink">{o.name}</span>
                    <span className="block text-[12.5px] text-dim2">{o.hint}</span>
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${selected ? "bg-cyan" : "bg-transparent"}`}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LensSelector;
