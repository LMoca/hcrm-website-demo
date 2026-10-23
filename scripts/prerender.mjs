// Renders every route to static HTML and writes the crawl files (sitemap_index + 4 sitemaps, robots, llms.txt).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist/client");
const template = fs.readFileSync(path.join(out, "index.html"), "utf8");
const { render, routes, SITE, faqGroups } = await import(
  pathToFileURL(path.join(root, "dist/server/entry-server.js")).href
);

const today = new Date().toISOString().slice(0, 10);
const abs = (p) => SITE.origin + (p === "/" ? "/" : p);

function write(rel, content) {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function page(url) {
  const { html, head } = render(url);
  return template.replace("<!--head-->", head).replace("<!--app-->", html);
}

for (const r of routes) {
  write(r.path === "/" ? "index.html" : `${r.path.slice(1)}/index.html`, page(r.path));
}
write("404.html", page("/404"));

// Sitemaps in the same layout Yoast SEO publishes on hcrm.net today: an index plus
// page, post, category and author sitemaps, so search engines see the same files at the same URLs.
const now = new Date().toISOString().replace(/\.\d+Z$/, "+00:00");
const groups = ["post", "page", "category", "author"];
for (const g of groups) {
  write(
    `${g}-sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => r.sitemap === g)
  .map((r) => `\t<url>\n\t\t<loc>${abs(r.path)}</loc>\n\t\t<lastmod>${now}</lastmod>\n\t</url>`)
  .join("\n")}
</urlset>
`,
  );
}
write(
  "sitemap_index.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${groups.map((g) => `\t<sitemap>\n\t\t<loc>${SITE.origin}/${g}-sitemap.xml</loc>\n\t\t<lastmod>${now}</lastmod>\n\t</sitemap>`).join("\n")}
</sitemapindex>
`,
);

// robots.txt: search engines and AI answer engines are explicitly welcome.
const aiBots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
  "Amazonbot", "DuckAssistBot", "Meta-ExternalAgent", "MistralAI-User",
];
write(
  "robots.txt",
  `# HCRM welcomes search engines and AI assistants.
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE.origin}/sitemap_index.xml
`,
);

// llms.txt (https://llmstxt.org): a curated map for language models.
const section = (title, filter) =>
  `## ${title}\n\n${routes
    .filter(filter)
    .map((r) => `- [${r.head.title.replace(/ – HCRM$/, "")}](${abs(r.path)}): ${r.summary}`)
    .join("\n")}\n`;

write(
  "llms.txt",
  `# HCRM — Health Cost & Risk Management

> ${SITE.legalName} is a Chicago-based healthcare predictive analytics company (since ${SITE.foundingYear}). Its software, Health Risk Monitor (HRM), normalizes medical and pharmacy claims to over 95% accuracy and forecasts each member's medical cost, pharmacy cost, ER visits and inpatient days for the next 12 months, with compliance against 128 clinical standards of care. SOC 2 Type 2 certified; data stored in the U.S.

Key facts:
- Product: Health Risk Monitor (HRM), built on the MITCH predictive modeling engine
- Differentiator: connectivity. HRM connects claims payers, pharmacy benefit managers, clinical teams, wellness programs, stop-loss carriers and provider-network data into one source of truth for an employer's plan
- Inputs: 24 months of medical and pharmacy claims, eligibility, labs and EMR data; 250+ data sources supported
- Outputs: 12-month member and group cost forecasts, risk stratification, gaps in care, Daily Dashboard alerts, white-label reports
- Serves: self-funded employers, brokers and consultants, health plans, fully insured carriers, stop-loss carriers and captives, TPAs, clinics and providers, employer clinics, ACOs, population health teams, wellness vendors
- Contact: ${SITE.email}, ${SITE.phoneDisplay}, ${SITE.origin}/contact/
- Full text for LLMs: ${SITE.origin}/llms-full.txt

${section("Core pages", (r) => r.section === "core")}
${section("Services", (r) => r.section === "solution")}
${section("Who we serve", (r) => r.section === "audience" && r.head.path === r.path)}
${section("Company", (r) => r.section === "company")}
${section("Resources", (r) => r.section === "resource")}
## Optional

- [Privacy policy](${abs("/privacy/")})
- [Terms of use](${abs("/terms-of-use/")})
`,
);

// llms-full.txt: every answer-first summary and FAQ in one file.
write(
  "llms-full.txt",
  `# HCRM — Health Cost & Risk Management: full reference

${routes
  .filter((r) => r.sitemap && r.section !== "other" && r.head.path === r.path)
  .map((r) => `## ${r.head.title}\nURL: ${abs(r.path)}\n\n${r.head.description}\n\n${r.summary}\n`)
  .join("\n")}
# Frequently asked questions

${faqGroups.map((g) => `## ${g.title}\n\n${g.items.map((f) => `### ${f.q}\n\n${f.a}\n`).join("\n")}`).join("\n")}`,
);

// Trailing slashes, the /sitemap.xml redirect and the 404 page are handled by vercel.json.
console.log(`Prerendered ${routes.length} routes + 404, sitemap_index + 4 sitemaps, robots, llms.txt, llms-full.txt`);
