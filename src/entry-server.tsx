import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { headFor, notFoundHead, routes } from "./routes";
import { renderHead } from "./lib/seo";
import { SITE } from "./data/site";
import { faqGroups } from "./data/faqs";

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return { html, head: renderHead(url === "/404" ? notFoundHead : headFor(url)) };
}

export { routes, SITE, faqGroups };
