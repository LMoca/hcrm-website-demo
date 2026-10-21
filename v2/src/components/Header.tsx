import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, type NavItem } from "@/lib/nav";
import { CTA_LABEL } from "@/data/site";
import { Arrow, Chevron, Close, Menu } from "./Icons";
import Photo from "./Photo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<number>();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Small delay on close so the pointer can travel from the label into the panel.
  const show = (to: string | null) => {
    window.clearTimeout(closeTimer.current);
    setMenu(to);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  };

  const active = nav.find((n) => n.to === menu && (n.groups || n.links));

  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-paper/90 backdrop-blur-md" onMouseLeave={hide}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link to="/" aria-label="HCRM home" className="shrink-0" onMouseEnter={() => show(null)}>
          <img src="/hcrm-logo.png" alt="HCRM — Health Cost & Risk Management" width={1000} height={224} className="h-9 w-auto sm:h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.to} onMouseEnter={() => show(item.to)}>
                <NavLink
                  to={item.to}
                  onFocus={() => show(item.to)}
                  aria-expanded={menu === item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                      menu === item.to ? "bg-white text-navy shadow-sm" : isActive ? "text-navy" : "text-ink2 hover:text-ink"
                    }`
                  }
                >
                  {item.label}
                  <Chevron className={`h-3 w-3 transition-transform duration-200 ${menu === item.to ? "rotate-180" : ""}`} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3" onMouseEnter={() => show(null)}>
          <Link to="/contact/" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            {CTA_LABEL} <Arrow />
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {active && (
        <div className="absolute inset-x-0 top-full hidden lg:block" onMouseEnter={() => show(active.to)}>
          <div className="menu-in border-b border-rule bg-white shadow-[0_30px_60px_-30px_rgba(11,27,43,0.35)]">
            <div className="wrap py-8">{active.groups ? <AudienceMenu item={active} /> : <SimpleMenu item={active} />}</div>
          </div>
        </div>
      )}

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-rule bg-paper lg:hidden">
          <div className="wrap divide-y divide-rule py-2">
            {nav.map((item) => (
              <details key={item.to} className="group py-3">
                <summary className="flex cursor-pointer items-center justify-between py-2 font-serif text-2xl">
                  {item.label}
                  <Chevron className="h-4 w-4 text-dim transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-2 space-y-2.5 pb-2 pl-1">
                  <li>
                    <Link to={item.to} className="text-[15px] font-semibold text-navy">
                      {item.label} overview
                    </Link>
                  </li>
                  {(item.groups?.flatMap((g) => g.links) ?? item.links ?? []).map((l) => (
                    <li key={l.to + l.label}>
                      <Link to={l.to} className="text-[15px] text-ink2">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <div className="py-6">
              <Link to="/contact/" className="btn-primary w-full">
                {CTA_LABEL} <Arrow />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function AudienceMenu({ item }: { item: NavItem }) {
  const groups = item.groups!;
  const [gid, setGid] = useState(groups[0].id);
  const group = groups.find((g) => g.id === gid)!;
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-4">
        <p className="eyebrow mb-4">Where do you sit?</p>
        <ul className="space-y-1">
          {groups.map((g, i) => (
            <li key={g.id}>
              <button
                type="button"
                onMouseEnter={() => setGid(g.id)}
                onFocus={() => setGid(g.id)}
                onClick={() => setGid(g.id)}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors ${
                  g.id === gid ? "bg-navy text-white" : "text-ink2 hover:bg-paper"
                }`}
              >
                <span className={`font-mono text-[11px] ${g.id === gid ? "text-cyan" : "text-dim"}`}>0{i + 1}</span>
                <span className="text-[15px] font-semibold leading-snug">{g.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <Link to={item.to} className="link-arrow mt-6 px-4 text-[14.5px]">
          All audiences <Arrow />
        </Link>
      </div>
      <div className="col-span-8 border-l border-rule pl-10">
        <p className="font-serif text-[1.35rem] font-light leading-snug text-ink">{group.question}.</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1">
          {group.links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="group block rounded-xl p-3 -ml-3 transition-colors hover:bg-paper">
                <span className="flex items-center gap-2 text-[15px] font-semibold text-ink group-hover:text-navy">
                  {l.label}
                  <Arrow className="h-3.5 w-3.5 -translate-x-1 text-cyan-deep opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="mt-1 line-clamp-2 block text-[13.5px] leading-snug text-dim">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SimpleMenu({ item }: { item: NavItem }) {
  const f = item.feature;
  const numbered = item.links!.some((l) => l.kicker);
  return (
    <div className="grid grid-cols-12 gap-10">
      {f && (
        <Link to={f.to} className="group col-span-4 grid grid-cols-[7.5rem_1fr] gap-5 rounded-2xl bg-paper p-3 pr-5 transition-colors hover:bg-paper2">
          <Photo name={f.photo} ratio="1/1" sizes="120px" className="!rounded-xl" />
          <span className="self-center">
            <span className="eyebrow block">{f.eyebrow}</span>
            <span className="mt-1.5 block font-serif text-[1.15rem] leading-snug text-ink">{f.title}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold text-navy">
              {f.cta} <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </span>
        </Link>
      )}
      <ul className={`col-span-8 grid grid-cols-2 content-start gap-x-8 gap-y-1 ${f ? "border-l border-rule pl-10" : ""}`}>
        {item.links!.map((l, i) => (
          <li key={l.to}>
            <Link to={l.to} className="group -ml-3 flex gap-4 rounded-xl p-3 transition-colors hover:bg-paper">
              {numbered && <span className="mt-0.5 font-mono text-[11px] text-dim">0{i + 1}</span>}
              <span>
                <span className="flex items-center gap-2 text-[15px] font-semibold text-ink group-hover:text-navy">
                  {l.label}
                  <Arrow className="h-3.5 w-3.5 -translate-x-1 text-cyan-deep opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-dim">{l.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
