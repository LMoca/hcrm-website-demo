import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/kit/Reveal";
import { useSeo } from "@/hooks/useSeo";

interface Crumb {
  label: string;
  to?: string;
}

export interface Spec {
  k: string;
  v: string;
}

interface PageHeaderProps {
  breadcrumbs: Crumb[];
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /** right-hand rail: the two or three facts that matter on this page */
  specs?: Spec[];
  /** optional supporting image, sat opposite the title */
  image?: { src: string; alt: string };
  /** optional slot rendered under the lede (e.g. a CTA) */
  children?: ReactNode;
  /** overrides the document title, which otherwise derives from `title` */
  seoTitle?: string;
  /** overrides the meta description, which otherwise derives from `lede` */
  seoDescription?: string;
}

const asText = (node: ReactNode): string | undefined =>
  typeof node === "string" ? node : undefined;

/**
 * Every inner page opens the same way: a breadcrumb rail, a short label, one
 * oversized statement, and either a spec column or a supporting image. The
 * generated field sits behind it so the band is never a flat slab of type.
 */
const PageHeader = ({
  breadcrumbs,
  label,
  title,
  lede,
  specs,
  image,
  children,
  seoTitle,
  seoDescription,
}: PageHeaderProps) => {
  useSeo(seoTitle ?? asText(title), seoDescription ?? asText(lede));

  const hasAside = Boolean(image) || Boolean(specs?.length);

  return (
    <header className="relative overflow-hidden border-b border-line bg-canvas pt-[4.25rem] md:pt-[4.75rem]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-right-top opacity-70"
        style={{ backgroundImage: "url('/img/hero-field.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent"
        aria-hidden="true"
      />

      <div className="edge relative pb-14 pt-10 md:pb-20 md:pt-14">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {breadcrumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.to ? (
                    <Link
                      to={c.to}
                      className="text-[12.5px] text-dim2 transition-colors hover:text-navy"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-[12.5px] text-dim">{c.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <span className="text-[12.5px] text-line2">/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className={hasAside ? "lg:col-span-6" : "lg:col-span-9"}>
            <Reveal delay={0.04}>
              <span className="label text-cyan-deep">{label}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 display-lg text-balance text-ink">{title}</h1>
            </Reveal>
            {lede && (
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-measure-wide lede text-pretty text-dim">
                  {lede}
                </p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.2}>
                <div className="mt-8">{children}</div>
              </Reveal>
            )}
          </div>

          {image ? (
            <Reveal delay={0.16} from="right" className="lg:col-span-6">
              <div className="img-cut aspect-[16/10] w-full bg-mist">
                <img
                  src={image.src}
                  alt={image.alt}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              {specs && specs.length > 0 && (
                <dl className="mt-6 grid grid-cols-3 gap-4">
                  {specs.slice(0, 3).map((s) => (
                    <div key={s.k}>
                      <dt className="text-[11px] uppercase tracking-[0.1em] text-dim2">
                        {s.k}
                      </dt>
                      <dd className="mt-1 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </Reveal>
          ) : (
            specs &&
            specs.length > 0 && (
              <Reveal delay={0.16} className="lg:col-span-5 lg:pt-3">
                <dl className="border-t border-line">
                  {specs.map((s) => (
                    <div
                      key={s.k}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <dt className="text-[13px] text-dim">{s.k}</dt>
                      <dd className="text-right font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
