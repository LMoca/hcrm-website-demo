import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CtaBand, { type Cta } from "./CtaBand";

/** Every page: header, content, closing CTA, footer. */
export default function Layout({ children, cta }: { children: ReactNode; cta?: Cta }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]:not(.in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <CtaBand cta={cta} />
      <Footer />
    </>
  );
}
