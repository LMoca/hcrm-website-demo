import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Crumb } from "@/lib/seo";
import type { Faq } from "@/data/types";
import type { Milestone } from "@/data/audiences";
import { audienceGroups, audiencesInGroup } from "@/data/audiences";
import { Arrow, Bars, Plus } from "./Icons";
import Photo from "./Photo";
import { seg, useScrollProgress } from "@/lib/progress";
import { groupPhoto } from "@/data/photos";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-dim">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-ink">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-ink2">{c.name}</span>
            ) : (
              <Link to={c.path} className="hover:text-ink">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
  aside,
  labelH1,
}: {
  crumbs: Crumb[];
  /** Render the eyebrow as the H1 (matching the page name hcrm.net uses as its H1) and the title as display text. */
  labelH1?: boolean;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-rule" data-scroll>
      <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />
      <HeroTrace />
      <div className="wrap relative pb-14 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs crumbs={crumbs} />
        <div className={`mt-10 grid gap-12 ${aside ? "lg:grid-cols-12" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow && (labelH1 ? <h1 className="eyebrow rise">{eyebrow}</h1> : <p className="eyebrow rise">{eyebrow}</p>)}
            {labelH1 ? (
              <p className="rise mt-4 font-serif font-light leading-[1.04] text-ink" style={{ fontSize: "clamp(2.4rem,5vw,4.4rem)", letterSpacing: "-0.028em", animationDelay: "80ms" }}>
                {title}
              </p>
            ) : (
              <h1 className="rise mt-4 font-serif font-light leading-[1.04]" style={{ fontSize: "clamp(2.4rem,5vw,4.4rem)", letterSpacing: "-0.028em", animationDelay: "80ms" }}>
                {title}
              </h1>
            )}
            {lede && (
              <p className="lede rise mt-6 max-w-2xl" style={{ animationDelay: "160ms" }}>
                {lede}
              </p>
            )}
            {children}
          </div>
          {aside && <div className="rise lg:col-span-5" style={{ animationDelay: "240ms" }}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/** Answer-first summary. Marked for AI/voice extraction via data-answer and speakable schema. */
export function Answer({ children, label = "The short answer" }: { children: ReactNode; label?: string }) {
  return (
    <aside className="card relative overflow-hidden p-7 md:p-8" aria-label={label}>
      <div className="absolute inset-y-0 left-0 w-1 bg-cyan" aria-hidden="true" />
      <p className="eyebrow flex items-center gap-2">
        <Bars className="h-3.5 w-3.5" /> {label}
      </p>
      <p data-answer className="mt-4 text-[1.06rem] leading-relaxed text-ink">
        {children}
      </p>
    </aside>
  );
}

export function SectionHead({ eyebrow, title, lede, id }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; id?: string }) {
  return (
    <div className="max-w-3xl" data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="h-section mt-3">{title}</h2>
      {lede && <p className="lede mt-5">{lede}</p>}
    </div>
  );
}

export function FaqList({ faqs, title = "Questions people ask" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="wrap py-20 md:py-24" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h-section mt-3">{title}</h2>
          <Link to="/faq/" className="link-arrow mt-6">
            All questions <Arrow />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <FaqItems faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

export function FaqItems({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {faqs.map((f, i) => (
        <details key={f.q} className="group py-1" open={i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5">
            <h3 className="font-serif text-[1.3rem] leading-snug">{f.q}</h3>
            <span className="faq-plus mt-1 shrink-0 text-cyan-deep transition-transform duration-300">
              <Plus />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-ink2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Timeline({ items, claim, note }: { items: Milestone[]; claim?: string; note?: boolean }) {
  const [ref, p] = useScrollProgress(undefined, 0.75);
  const head = seg(p, 0.05, 0.9) * (items.length - 1);
  const pct = `${(head / (items.length - 1)) * 100}%`;
  return (
    <div ref={ref}>
      <div className="relative">
      <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-rule md:left-0 md:top-[6px] md:h-0.5 md:w-[calc(100%-1rem)]" aria-hidden="true">
        <div className="h-[var(--fill)] w-full bg-gradient-to-b from-navy to-cyan md:h-full md:w-[var(--fill)] md:bg-gradient-to-r" style={{ ["--fill" as string]: pct }} />
      </div>
      <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
        {items.map((m, i) => {
          const on = head >= i - 0.05;
          return (
          <li key={m.when} className={`relative pl-8 transition-all duration-700 md:pl-0 md:pt-10 ${on ? "opacity-100" : "translate-y-3 opacity-35"}`}>
            <span
              className={`absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 md:top-0 ${
                on ? (i === items.length - 1 ? "scale-125 border-cyan bg-cyan" : "border-navy bg-navy") : "border-rule bg-paper"
              }`}
              aria-hidden="true"
            />
            <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-cyan-deep">{m.when}</p>
            <h3 className="mt-2 font-serif text-[1.2rem] leading-snug">{m.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink2">{m.body}</p>
          </li>
          );
        })}
      </ol>
      </div>
      {claim && (
        <blockquote className="mt-14 border-l-2 border-cyan pl-6" data-reveal>
          <p className="eyebrow">What you'll be able to say</p>
          <p className="mt-3 font-serif text-[1.6rem] font-light leading-snug md:text-[2rem]">{claim}</p>
        </blockquote>
      )}
      {note && (
        <p className="mt-6 text-[13px] text-dim">
          Typical sequence. Timing depends on how quickly your carrier, TPA and PBM release historical data.
        </p>
      )}
    </div>
  );
}

/** Home-page funnel: visitor self-identifies, gets routed to their niche page. */
export function PathFinder() {
  const [active, setActive] = useState(audienceGroups[0].id);
  const group = audienceGroups.find((g) => g.id === active)!;
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div role="tablist" aria-label="Choose what describes you" className="flex flex-col gap-2 lg:col-span-5">
        {audienceGroups.map((g, i) => (
          <button
            key={g.id}
            role="tab"
            id={`tab-${g.id}`}
            aria-selected={g.id === active}
            aria-controls={`panel-${g.id}`}
            onClick={() => setActive(g.id)}
            className={`group flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 text-left transition-all ${
              g.id === active ? "border-navy bg-navy text-white shadow-lg" : "border-rule bg-white hover:border-ink/40"
            }`}
          >
            <span>
              <span className={`font-mono text-[11px] tracking-[0.12em] ${g.id === active ? "text-cyan" : "text-dim"}`}>0{i + 1}</span>
              <span className="mt-1 block font-serif text-[1.25rem] leading-snug">{g.question}</span>
            </span>
            <Arrow className={`h-5 w-5 shrink-0 transition-transform ${g.id === active ? "translate-x-1 text-cyan" : "text-dim"}`} />
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${group.id}`}
        aria-labelledby={`tab-${group.id}`}
        className="card overflow-hidden lg:col-span-7"
      >
        <Photo key={group.id} name={groupPhoto[group.id]} ratio="16/6" sizes="(min-width: 1024px) 55vw, 100vw" className="menu-in !rounded-none" />
        <div className="p-7 md:p-10">
        <p className="eyebrow">{group.label}</p>
        <p className="mt-4 font-serif text-[1.7rem] font-light leading-snug">{group.summary}</p>
        <ul className="mt-8 divide-y divide-rule border-y border-rule">
          {audiencesInGroup(group.id).map((a) => (
            <li key={a.slug}>
              <Link to={`/${a.slug}/`} className="group flex items-start justify-between gap-6 py-5">
                <span>
                  <span className="block text-[1.05rem] font-semibold text-ink group-hover:text-navy">{a.name}</span>
                  <span className="mt-1 block text-[15px] text-ink2">{a.short}</span>
                </span>
                <Arrow className="mt-1 h-5 w-5 shrink-0 text-navy transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}

export function Checklist({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-4 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-ink2">
          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-soft text-cyan-deep">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function QuoteCard({ quote, name, role, org, large }: { quote: string; name: string; role: string; org: string; large?: boolean }) {
  return (
    <figure className={`card flex h-full flex-col justify-between p-7 ${large ? "md:p-10" : ""}`}>
      <blockquote>
        <span className="font-serif text-5xl leading-none text-cyan" aria-hidden="true">&ldquo;</span>
        <p className={`font-serif font-light leading-snug ${large ? "text-[1.6rem] md:text-[1.9rem]" : "text-[1.2rem]"}`}>{quote}</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-rule pt-5 text-[14.5px]">
        <span className="block font-semibold text-ink">{name}</span>
        <span className="text-dim">
          {role}, {org}
        </span>
      </figcaption>
    </figure>
  );
}

/** Faint claims-history-and-forecast trace behind every page hero: the site's analytical signature. */
function HeroTrace() {
  const hist = [62, 58, 64, 60, 66, 63, 70, 67, 72, 69, 75, 73, 79, 76, 82];
  const X = (i: number) => 20 + i * 26;
  const Y = (v: number) => 260 - (v - 40) * 3;
  const line = hist.map((v, i) => `${X(i)},${Y(v)}`).join(" ");
  const last = { x: X(hist.length - 1), y: Y(hist[hist.length - 1]) };
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMaxYMax meet"
      className="par-up pointer-events-none absolute bottom-0 right-0 h-[90%] w-[75%] max-w-[56rem] opacity-60"
      aria-hidden="true"
    >
      {hist.map((v, i) => (
        <rect key={i} x={X(i) - 6} y={Y(v)} width={12} height={300 - Y(v)} rx={2} className="fill-ink/[0.035]" />
      ))}
      <polyline points={line} className="draw fill-none stroke-navy/30" strokeWidth={2} style={{ ["--len" as string]: 520 }} />
      <line x1={last.x} x2={last.x} y1={60} y2={300} className="stroke-ink/20" strokeDasharray="3 4" />
      <text x={last.x} y={52} textAnchor="middle" className="fill-ink/30 font-mono text-[10px] tracking-[0.14em]">
        TODAY
      </text>
      <polyline
        points={`${last.x},${last.y} 470,${last.y - 50} 520,${last.y - 92} 580,${last.y - 150}`}
        className="draw fill-none stroke-signal/40"
        strokeWidth={2}
        strokeDasharray="6 6"
        style={{ ["--len" as string]: 300, animationDelay: "1s" }}
      />
      <polyline
        points={`${last.x},${last.y} 470,${last.y - 18} 520,${last.y - 22} 580,${last.y - 20}`}
        className="draw fill-none stroke-cyan/70"
        strokeWidth={2.5}
        style={{ ["--len" as string]: 300, animationDelay: "1.3s" }}
      />
      <circle cx={580} cy={last.y - 20} r={4} className="fill-cyan" />
    </svg>
  );
}
