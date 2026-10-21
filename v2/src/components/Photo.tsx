import type { ReactNode } from "react";
import { photos, photoSrc, type PhotoKey } from "@/data/photos";

/** Editorial photo: responsive Unsplash source, fixed aspect ratio, optional overlay content. */
export default function Photo({
  name,
  ratio = "4/3",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  eager,
  tint = true,
  children,
}: {
  name: PhotoKey;
  ratio?: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
  tint?: boolean;
  children?: ReactNode;
}) {
  const ph = photos[name];
  const [rw, rh] = ratio.split("/").map(Number);
  const widths = [480, 800, 1200, 1600];
  return (
    <div className={`photo relative overflow-hidden rounded-[1.25rem] bg-paper2 ${className}`} style={{ aspectRatio: ratio }}>
      <img
        src={photoSrc(ph, 1200, Math.round((1200 * rh) / rw))}
        srcSet={widths.map((w) => `${photoSrc(ph, w, Math.round((w * rh) / rw))} ${w}w`).join(", ")}
        sizes={sizes}
        alt={ph.alt}
        width={1200}
        height={Math.round((1200 * rh) / rw)}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: ph.pos ?? "50% 50%" }}
      />
      {tint && <div className="absolute inset-0 bg-gradient-to-t from-navy-night/55 via-navy-night/0 to-transparent mix-blend-multiply" aria-hidden="true" />}
      {children}
    </div>
  );
}

/** A floating HRM-style annotation chip, laid over photos. */
export function Tag({
  label,
  value,
  tone = "light",
  className = "",
  style,
}: {
  label: string;
  value: ReactNode;
  tone?: "light" | "dark" | "alert";
  className?: string;
  style?: React.CSSProperties;
}) {
  const tones = {
    light: "bg-white/95 text-ink",
    dark: "bg-navy-night/90 text-white",
    alert: "bg-white/95 text-ink",
  };
  return (
    <div
      className={`tag absolute rounded-xl px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(11,27,43,0.55)] backdrop-blur ${tones[tone]} ${className}`}
      style={style}
    >
      <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${tone === "dark" ? "text-cyan" : tone === "alert" ? "text-signal" : "text-cyan-deep"}`}>
        {label}
      </p>
      <p className="mt-0.5 text-[14px] font-semibold leading-tight">{value}</p>
    </div>
  );
}
