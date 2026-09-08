import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ActionProps {
  to: string;
  children?: ReactNode;
  className?: string;
}

/** The one primary action on the site: book a free demo. */
export const PrimaryCta = ({
  to = "/contact",
  children = "Book a free demo",
  className = "",
}: Partial<ActionProps>) => (
  <Link to={to} className={`btn-primary group ${className}`}>
    {children}
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      strokeWidth={2}
    />
  </Link>
);

export const OutlineCta = ({ to, children, className = "" }: ActionProps) => (
  <Link to={to} className={`btn-outline group ${className}`}>
    {children}
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      strokeWidth={1.8}
    />
  </Link>
);

/** For use inside the deep navy bands. */
export const InkCta = ({ to, children, className = "" }: ActionProps) => (
  <Link to={to} className={`btn-on-ink group ${className}`}>
    {children}
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      strokeWidth={2}
    />
  </Link>
);

/** Quiet text link with a rule that draws in on hover. */
export const ArrowLink = ({ to, children, className = "" }: ActionProps) => (
  <Link
    to={to}
    className={`link-rule text-sm font-semibold text-navy transition-colors hover:text-cyan-deep ${className}`}
  >
    {children}
    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
  </Link>
);
