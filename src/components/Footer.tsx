import { Link } from "react-router-dom";
import { SITE } from "@/data/site";
import { solutions } from "@/data/solutions";
import { audiences } from "@/data/audiences";

export default function Footer() {
  return (
    <footer className="bg-navy-night text-white/70">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <img src="/hcrm-logo-reverse.png" alt="HCRM — Health Cost & Risk Management" width={1000} height={224} className="h-10 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">
            Predictive analytics that forecasts every member's healthcare cost and clinical risk for the next 12 months. A claim avoided is money saved.
          </p>
          <address className="mt-6 space-y-1 text-[15px] not-italic">
            <div>
              <a href={`mailto:${SITE.email}`} className="text-white hover:text-cyan">{SITE.email}</a>
            </div>
            <div>
              <a href={`tel:${SITE.phone}`} className="text-white hover:text-cyan">{SITE.phoneDisplay}</a>
            </div>
            <div>{SITE.city}, Illinois</div>
          </address>
        </div>

        <FooterCol title="Who we serve" links={audiences.map((a) => ({ to: `/${a.slug}/`, label: a.name }))} className="md:col-span-3" />
        <FooterCol
          title="Platform"
          links={[{ to: "/our-software/", label: "Health Risk Monitor" }, ...solutions.map((s) => ({ to: `/${s.slug}/`, label: s.name }))]}
          className="md:col-span-3"
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/who-we-are/", label: "Who we are" },
            { to: "/why-choose-hcrm/", label: "Why HCRM" },
            { to: "/our-team/", label: "Team" },
            { to: "/our-partnerships/", label: "Partnerships" },
            { to: "/testimonials-and-impact/", label: "Testimonials" },
            { to: "/resources/", label: "Resources" },
            { to: "/faq/", label: "FAQ" },
            { to: "/contact/", label: "Contact" },
          ]}
          className="md:col-span-2"
        />
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {SITE.legalName}. SOC 2 Type 2 certified. Data stored in the U.S.</p>
          <div className="flex gap-5">
            <Link to="/privacy/" className="hover:text-white">Privacy</Link>
            <Link to="/terms-of-use/" className="hover:text-white">Terms of use</Link>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className }: { title: string; links: { to: string; label: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-eyebrow text-cyan">{title}</p>
      <ul className="space-y-2 text-[14.5px]">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
