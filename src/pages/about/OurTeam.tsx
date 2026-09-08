import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/kit/Reveal";
import SectionHead from "@/components/kit/SectionHead";
import { PrimaryCta } from "@/components/kit/Actions";

const slots = [
  { role: "President & Founder", brief: "The person who identified the gap and set the accuracy standard." },
  { role: "Chief Analytics Officer", brief: "Owns the predictive model and its published accuracy." },
  { role: "Head of Data Engineering", brief: "Owns ingestion, normalization and the exception pipeline." },
  { role: "Clinical Director", brief: "Owns clinical validation logic and care-management design." },
  { role: "Client Delivery Lead", brief: "Owns demos, trials and the first ninety days." },
  { role: "Security & Compliance", brief: "Owns HIPAA posture, BAAs and security review." },
];

const OurTeam = () => (
  <div className="min-h-screen bg-canvas">
    <Navbar />

    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Company", to: "/about/who-we-are" },
        { label: "Our Team" },
      ]}
      label="Company"
      title="The people who own the number."
      lede="Accuracy claims are only as credible as the people standing behind them. This page names who owns each part of the platform, and what you can hold them to."
      seoDescription="The people who own each part of Health Risk Monitor, from the normalization engine and the predictive model to security and client delivery."
      image={{
        src: "/img/img-people.jpg",
        alt: "An organization drawn as a lattice of roles, with a few carrying the load",
      }}
      specs={[
        { k: "Owners named", v: "Per function" },
        { k: "Accountable for", v: "The number" },
      ]}
    >
      <PrimaryCta />
    </PageHeader>

    <section className="border-b border-line bg-canvas">
      <div className="edge band">
        <SectionHead
          label="Leadership"
          title={
            <>
              Six roles.{" "}
              <span className="text-dim2">Awaiting names and credentials.</span>
            </>
          }
          lede="The structure below reflects how HCRM is organised. Named leaders, credentials, tenure and photography are still to come from the client."
        />

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((s, i) => (
            <Reveal key={s.role} delay={Math.min(i, 5) * 0.05} className="bg-canvas">
              <div className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-mist">
                <div className="flex items-center justify-between">
                  <span className="h-1.5 w-1.5 bg-line2 transition-colors duration-500 group-hover:bg-navy" />
                </div>

                {/* portrait slot */}
                <div className="mt-6 flex aspect-[4/5] w-full max-w-[15rem] items-end border border-dashed border-line2 bg-mist p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim2">
                    Portrait pending
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[19px] font-semibold tracking-[-0.03em] text-ink">
                  {s.role}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-dim">
                  {s.brief}
                </p>
                <p className="mt-4 border-t border-line pt-3 font-mono text-[10.5px] leading-relaxed text-dim2">
                  [[CLIENT-SUPPLIED: name, credentials, tenure, bio]]
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="border-b border-line bg-mist text-ink">
      <div className="edge band-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <span className="label text-dim2">Why this page matters</span>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-8">
            <p className="display-md text-balance text-ink">
              In a category where every vendor claims accuracy, the fastest way
              a buyer separates the real from the assembled is by looking for
              named people with verifiable healthcare credentials.
            </p>
            <p className="mt-7 max-w-measure-wide text-[16px] leading-relaxed text-ink/70">
              This is one of the highest-value pages on the site for a
              risk-averse buyer, and currently the least complete. Populating it
              should sit ahead of most other launch work.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default OurTeam;
