import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "HCRM";
const ORIGIN = "https://www.hcrm.com";
const DEFAULT_TITLE =
  "HCRM | Health Cost & Risk Management — Claims Predictive Analytics";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * The app is client-rendered from one index.html, so every route would
 * otherwise share a single title, description and canonical. This syncs the
 * three that matter per route. If the site later moves to SSR or prerender,
 * these become the values baked into each static file.
 */
export function useSeo(title?: string, description?: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : DEFAULT_TITLE;
    document.title = full;

    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[name="twitter:title"]', "content", full);

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }

    const url = `${ORIGIN}${pathname}`;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
  }, [title, description, pathname]);
}
