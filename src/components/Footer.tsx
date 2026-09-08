import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { navigation } from "@/data/navigation";

const legal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms-of-use" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="edge">
        {/* wordmark band. The conversion ask lives in the band directly
            above this one, so the footer stays identity and navigation. */}
        <div className="border-b border-line py-14">
          <BrandLogo size="h-11" />
          <p className="mt-6 max-w-measure text-[15px] leading-relaxed text-dim">
            Claims-based predictive analytics for organizations that carry
            healthcare risk. Every forecast denominated in dollars, built on a
            95%+ normalized dataset.
          </p>
        </div>

        {/* link matrix */}
        <div className="grid gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {navigation
            .filter((g) => g.items)
            .map((group) => (
              <div key={group.label}>
                <h4 className="label text-dim2">{group.label}</h4>
                <ul className="mt-5 space-y-2.5">
                  {[...group.items!, ...(group.spotlight?.items ?? [])].map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-[13.5px] leading-snug text-ink/70 transition-colors hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <div>
            <h4 className="label text-dim2">Elsewhere</h4>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  to="/resources"
                  className="text-[13.5px] text-ink/70 transition-colors hover:text-navy"
                >
                  Insights
                </Link>
              </li>
              {legal.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[13.5px] text-ink/70 transition-colors hover:text-navy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.linkedin.com/company/health-cost-risk-management-llc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13.5px] text-ink/70 transition-colors hover:text-navy"
                >
                  <Linkedin className="h-3.5 w-3.5" strokeWidth={1.8} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* baseline */}
      <div className="border-t border-line">
        <div className="edge flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-dim2">
            &copy; {year} Health Cost &amp; Risk Management. All rights reserved.
          </p>
          <p className="text-[12.5px] text-dim2">
            Figures shown on this site are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
