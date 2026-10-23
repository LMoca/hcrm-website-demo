import Scene from "@/components/Scene";
import { useState } from "react";
import { Link } from "react-router-dom";
import { clients, partners, testimonials } from "@/data/site";
import { Arrow } from "./Icons";

/** Client roster: each organization HCRM names, with the specific thing its people said. */
export default function Clients() {
  const [active, setActive] = useState(0);
  const c = clients[active];
  const t = testimonials[c.quotes[0]];

  return (
    <section className="relative overflow-hidden bg-navy-night text-white" aria-labelledby="clients-title">
      <Scene photo="careTeam" tone="dark" side="top" strength={0.4} />
      <div className="grain-light absolute inset-0" aria-hidden="true" />
      <div className="wrap relative py-24">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow !text-cyan">07 · Proof</p>
            <h2 id="clients-title" className="h-section mt-3 !text-white">
              Care teams, clinics and analytics firms already using HRM to get ahead of claims.
            </h2>
          </div>
          <Link to="/testimonials-and-impact/" className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:text-white">
            Read every testimonial <Arrow />
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-6" role="tablist" aria-label="HCRM clients" data-stagger="90">
            {clients.map((cl, i) => (
              <li key={cl.org} className="border-t border-white/12 last:border-b" data-reveal="left">
                <button
                  type="button"
                  role="tab"
                  id={`client-${i}`}
                  aria-selected={i === active}
                  aria-controls="client-panel"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-5 text-left"
                >
                  <span className={`font-mono text-[11px] ${i === active ? "text-cyan" : "text-white/40"}`}>0{i + 1}</span>
                  <span
                    className={`font-serif text-[1.55rem] leading-tight transition-colors md:text-[1.9rem] ${
                      i === active ? "text-white" : "text-white/55 group-hover:text-white/85"
                    }`}
                  >
                    {cl.org}
                  </span>
                  <span className={`hidden font-mono text-[11px] uppercase tracking-[0.12em] sm:block ${i === active ? "text-cyan" : "text-white/40"}`}>
                    {cl.hook}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6" data-reveal="right">
            <figure
              key={active}
              id="client-panel"
              role="tabpanel"
              aria-labelledby={`client-${active}`}
              className="menu-in relative h-full rounded-[1.25rem] bg-white p-8 text-ink md:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-deep">{c.org}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{c.detail}</p>
              </div>
              <blockquote className="mt-8">
                <span className="font-serif text-6xl leading-none text-cyan" aria-hidden="true">&ldquo;</span>
                <p className="font-serif text-[1.45rem] font-light leading-snug md:text-[1.7rem]">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6 text-[14.5px]">
                {c.quotes.map((q) => (
                  <span key={q}>
                    <span className="block font-semibold">{testimonials[q].name}</span>
                    <span className="text-dim">{testimonials[q].role}</span>
                  </span>
                ))}
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-16 border-t border-white/12 pt-10" data-reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Partners & integrations</p>
          <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            {partners.map((p) => (
              <li key={p.name}>
                <Link to="/our-partnerships/" className="group block">
                  <span className="block font-serif text-[1.2rem] text-white/85 group-hover:text-white">{p.name}</span>
                  <span className="text-[13px] text-white/45">{p.kind}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
