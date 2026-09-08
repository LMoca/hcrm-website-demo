import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PrimaryCta } from "@/components/kit/Actions";
import HorizonRule from "@/components/kit/HorizonRule";
import { useSeo } from "@/hooks/useSeo";

const elsewhere = [
  { label: "Health Risk Monitor", to: "/about/our-software", note: "The platform, with a live console" },
  { label: "Who it's for", to: "/clients/who-we-serve", note: "Eleven buyer types" },
  { label: "Insights", to: "/resources", note: "Writing on claims, cost and risk" },
  { label: "Who we are", to: "/about/who-we-are", note: "Why HCRM exists" },
];

const NotFound = () => {
  useSeo("Page not found");

  return (
  <div className="flex min-h-screen flex-col bg-canvas">
    <Navbar />

    <main className="flex-1 border-b border-line pt-16 md:pt-[4.5rem]">
      <div className="edge band">
        <span className="label text-navy">Error 404</span>

        <h1 className="mt-7 display-xl text-ink">Not found.</h1>

        <HorizonRule delay={0.2} className="my-7 max-w-3xl" />

        <p className="max-w-measure lede text-dim">
          This one we did not see coming either. The page has moved or never
          existed; here is everything worth reading instead.
        </p>

        <div className="mt-10">
          <PrimaryCta />
        </div>

        <div className="mt-16 max-w-3xl">
          {elsewhere.map((e, i) => (
            <Link
              key={e.to}
              to={e.to}
              className="row-live group flex items-baseline gap-5 border-t border-line py-5"
            >
              <span className="flex-1">
                <span className="block font-display text-[19px] font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-navy">
                  {e.label}
                </span>
                <span className="mt-1 block text-[13px] text-dim2">{e.note}</span>
              </span>
            </Link>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </main>

    <Footer />
    </div>
  );
};

export default NotFound;
