import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { headFor, routes } from "./routes";
import { applyHead } from "./lib/seo";
import { NotFound } from "./pages/Misc";

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    // Prerendered HTML already carries the right head on first load.
    if (first.current) {
      first.current = false;
      if (document.querySelector("script[data-seo]")) return;
    }
    applyHead(headFor(pathname));
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
