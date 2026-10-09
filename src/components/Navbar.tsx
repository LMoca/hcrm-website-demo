import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Minus, Plus } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { navigation } from "@/data/navigation";
import { useLens } from "@/context/lens-context";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<number>();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const { lens, chosen, requestPicker } = useLens();
  const demoHref = chosen ? `/contact?for=${lens.key}` : "/contact";
  const changeLens = () => {
    setMobileOpen(false);
    if (pathname !== "/") navigate("/");
    requestPicker();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
    setMobileGroup(null);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPanel = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const schedulePanelClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const activeGroup = navigation.find((g) => g.label === open);
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
          scrolled || open
            ? "border-b border-line bg-canvas shadow-[0_1px_20px_-6px_rgba(10,31,51,0.14)]"
            : "border-b border-line/60 bg-canvas/90 backdrop-blur-md"
        }`}
        onMouseLeave={schedulePanelClose}
      >
        <div className="edge flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.75rem]">
          <BrandLogo size="h-9 md:h-10" />

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {navigation.map((group) =>
              group.items ? (
                <button
                  key={group.label}
                  onMouseEnter={() => openPanel(group.label)}
                  onFocus={() => openPanel(group.label)}
                  onClick={() =>
                    setOpen(open === group.label ? null : group.label)
                  }
                  aria-expanded={open === group.label}
                  className={`relative flex items-center gap-1.5 px-4 py-6 text-[14.5px] font-medium tracking-[-0.01em] transition-colors ${
                    open === group.label ? "text-navy" : "text-ink/75 hover:text-navy"
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      open === group.label ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.2}
                  />
                  <span
                    className={`absolute inset-x-3 bottom-[1.15rem] h-[2px] origin-left bg-cyan transition-transform duration-300 ease-editorial ${
                      open === group.label ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              ) : (
                <Link
                  key={group.label}
                  to={group.to!}
                  onMouseEnter={schedulePanelClose}
                  className={`relative px-4 py-6 text-[14.5px] font-medium tracking-[-0.01em] transition-colors ${
                    isActive(group.to!) ? "text-navy" : "text-ink/75 hover:text-navy"
                  }`}
                >
                  {group.label}
                  <span
                    className={`absolute inset-x-3 bottom-[1.15rem] h-[2px] origin-left bg-cyan transition-transform duration-300 ease-editorial ${
                      isActive(group.to!) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            {chosen && (
              <button
                type="button"
                onClick={changeLens}
                title="Change the role this site is tailored for"
                className="hidden max-w-[19rem] items-center gap-2 rounded-full border border-line2 bg-canvas py-1.5 pl-3 pr-3.5 text-left text-[12.5px] text-dim transition-colors hover:border-cyan hover:text-ink xl:inline-flex"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                <span className="truncate">
                  Viewing as <span className="font-semibold text-ink">{lens.name}</span>
                </span>
                <span className="shrink-0 text-navy">Change</span>
              </button>
            )}
            <Link
              to={demoHref}
              className="hidden shrink-0 items-center gap-2 rounded-[3px] border border-navy bg-navy px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(0,75,135,0.6)] transition-colors hover:border-navy-deep hover:bg-navy-deep sm:inline-flex"
            >
              Book a free demo
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-line2 text-ink lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    mobileOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-current transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* dropdown panel */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              key={activeGroup.label}
              initial={reduced ? undefined : { opacity: 0, y: -8 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => openPanel(activeGroup.label)}
              className="hidden border-t border-line bg-canvas shadow-[0_28px_50px_-28px_rgba(10,31,51,0.3)] lg:block"
            >
              <div className="edge grid grid-cols-12 gap-10 py-10">
                <div className="col-span-3">
                  <span className="label text-cyan-deep">{activeGroup.label}</span>
                  <p className="mt-4 max-w-[16rem] text-[14px] leading-relaxed text-dim">
                    {activeGroup.summary}
                  </p>
                </div>

                <div
                  className={
                    activeGroup.spotlight
                      ? "col-span-4 flex flex-col"
                      : "col-span-9 grid grid-cols-2 gap-x-10"
                  }
                >
                  {activeGroup.items!.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="group border-b border-line py-3.5 transition-colors last:border-b-0 hover:border-cyan"
                    >
                      <span
                        className={`block text-[14.5px] font-medium leading-snug transition-colors ${
                          pathname === item.to
                            ? "text-navy"
                            : "text-ink group-hover:text-navy"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.blurb && (
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-dim2">
                          {item.blurb}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                {activeGroup.spotlight && (
                  <div className="col-span-5 border-l border-line pl-10">
                    <Link
                      to={activeGroup.spotlight.to}
                      className="label text-dim2 transition-colors hover:text-navy"
                    >
                      {activeGroup.spotlight.label}
                    </Link>
                    <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1">
                      {activeGroup.spotlight.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`py-1.5 text-[13.5px] leading-snug transition-colors hover:text-navy ${
                            pathname === item.to ? "text-navy" : "text-ink/75"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-canvas pt-[4.25rem] lg:hidden"
          >
            <div className="edge pb-16 pt-6">
              {navigation.map((group) => (
                <div key={group.label} className="border-b border-line">
                  {group.items ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileGroup(
                            mobileGroup === group.label ? null : group.label
                          )
                        }
                        aria-expanded={mobileGroup === group.label}
                        className="flex w-full items-center justify-between py-5 text-left"
                      >
                        <span className="font-display text-[22px] font-semibold tracking-[-0.03em] text-ink">
                          {group.label}
                        </span>
                        {mobileGroup === group.label ? (
                          <Minus className="h-4 w-4 text-navy" strokeWidth={2} />
                        ) : (
                          <Plus className="h-4 w-4 text-dim2" strokeWidth={2} />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileGroup === group.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-5">
                              {group.items.map((item) => (
                                <Link
                                  key={item.to}
                                  to={item.to}
                                  className="block border-t border-line py-3 text-[15px] text-ink/80"
                                >
                                  {item.label}
                                </Link>
                              ))}
                              {group.spotlight && (
                                <div className="mt-3 border-t border-line pt-3">
                                  <span className="label text-dim2">
                                    {group.spotlight.label}
                                  </span>
                                  <div className="mt-2">
                                    {group.spotlight.items.map((item) => (
                                      <Link
                                        key={item.to}
                                        to={item.to}
                                        className="block py-2 text-[14px] text-dim"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={group.to!}
                      className="block py-5 font-display text-[22px] font-semibold tracking-[-0.03em] text-ink"
                    >
                      {group.label}
                    </Link>
                  )}
                </div>
              ))}

              {chosen && (
                <button
                  type="button"
                  onClick={changeLens}
                  className="mt-8 flex w-full items-center justify-between gap-3 rounded-[3px] border border-line2 px-4 py-3.5 text-left text-[14px] text-dim"
                >
                  <span>
                    Viewing as <span className="font-semibold text-ink">{lens.name}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-navy">Change</span>
                </button>
              )}

              <Link
                to={demoHref}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[3px] bg-navy px-6 py-4 text-[15px] font-semibold text-white"
              >
                Book a free demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
