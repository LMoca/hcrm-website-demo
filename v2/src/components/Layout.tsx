import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CtaBand, { type Cta } from "./CtaBand";
import { startMotion } from "@/lib/motion";

/** Every page: header, content, closing CTA, footer. */
export default function Layout({ children, cta }: { children: ReactNode; cta?: Cta }) {
  const { pathname } = useLocation();

  useEffect(() => startMotion(), [pathname]);

  return (
    <>
      <div className="scroll-bar" aria-hidden="true" />
      <Header />
      <main id="main">{children}</main>
      <CtaBand cta={cta} />
      <Footer />
    </>
  );
}
