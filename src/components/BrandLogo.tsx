import { Link } from "react-router-dom";

type Tone = "dark" | "light";

interface BrandLogoProps {
  /** the square mark on its own, for tight spaces */
  compact?: boolean;
  /** "light" = the original artwork, "dark" = the knockout for navy bands */
  tone?: Tone;
  /** tailwind height class, e.g. "h-9" */
  size?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * The supplied artwork is drawn for light backgrounds, which is what the site
 * now uses, so `hcrm-logo.png` is the default. `hcrm-logo-reverse.png` is a
 * knockout of the same lockup - navy plate dissolved, wordmark reversed to
 * white, brand cyan intact - for the deep navy bands.
 */
const BrandLogo = ({
  compact = false,
  tone = "light",
  size = "h-9",
  className = "",
  onClick,
}: BrandLogoProps) => {
  // Only a reversed mark exists, so a compact request on a light surface
  // falls back to the full light lockup rather than rendering nothing.
  const useMark = compact && tone === "dark";

  const src = useMark
    ? "/hcrm-mark-reverse.png"
    : tone === "light"
    ? "/hcrm-logo.png"
    : "/hcrm-logo-reverse.png";

  const [w, h] = useMark ? [298, 153] : [1000, 224];

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="HCRM, Health Cost and Risk Management — home"
      className={`inline-flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80 ${className}`}
    >
      <img
        src={src}
        width={w}
        height={h}
        decoding="async"
        alt="HCRM — Health Cost &amp; Risk Management"
        className={`${size} w-auto`}
      />
    </Link>
  );
};

export default BrandLogo;
