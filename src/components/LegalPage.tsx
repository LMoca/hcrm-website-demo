import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";

export interface LegalSection {
  h: string;
  p: string[];
}

interface LegalPageProps {
  title: string;
  label: string;
  intro: string;
  metaDescription: string;
  sections: LegalSection[];
}

/** Shared shell for the two legal pages: same rail, same measure, same rhythm. */
const LegalPage = ({
  title,
  label,
  intro,
  metaDescription,
  sections,
}: LegalPageProps) => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[{ label: "Home", to: "/" }, { label: title }]}
      label={label}
      title={title}
      lede={intro}
      seoDescription={metaDescription}
      specs={[{ k: "Last updated", v: String(new Date().getFullYear()) }]}
    />

    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <Reveal>
              <nav className="sticky top-28 hidden lg:block" aria-label="On this page">
                <span className="label text-dim2">Sections</span>
                <ol className="mt-5 space-y-2.5">
                  {sections.map((s, i) => (
                    <li key={s.h} className="flex gap-3">
                      <a
                        href={`#legal-${i}`}
                        className="text-[13px] leading-snug text-ink/60 transition-colors hover:text-ink"
                      >
                        {s.h}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </div>

          <div className="lg:col-span-9 lg:max-w-[44rem]">
            {sections.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i, 5) * 0.04}>
                <section
                  id={`legal-${i}`}
                  className={`scroll-mt-28 border-t border-line pt-7 ${
                    i > 0 ? "mt-11" : ""
                  }`}
                >
                  <h2 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.035em] text-ink md:text-[28px]">
                    {s.h}
                  </h2>
                  {s.p.map((para, j) => (
                    <p
                      key={j}
                      className="mt-5 text-[16px] leading-[1.75] text-ink/80"
                    >
                      {para}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default LegalPage;
