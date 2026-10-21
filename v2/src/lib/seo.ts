import { SITE } from "@/data/site";
import type { Faq } from "@/data/types";

export type Crumb = { name: string; path: string };

export type Head = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  pageType?: string; // schema.org WebPage subtype
  crumbs?: Crumb[];
  schema?: object[];
  noindex?: boolean;
};

const ORG_ID = `${SITE.origin}/#organization`;
const SITE_ID = `${SITE.origin}/#website`;
const PRODUCT_ID = `${SITE.origin}/#health-risk-monitor`;

export const url = (path: string) => SITE.origin + (path === "/" ? "/" : path);

// Brand suffix only when it still fits in a ~60-character search result title.
// Titles are stored complete, in hcrm.net's "Page Name – HCRM" format.
export const fullTitle = (title: string) => title;

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: [SITE.longName, "Health Cost and Risk Management"],
  url: SITE.origin,
  logo: url("/hcrm-logo.png"),
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: SITE.foundingYear,
  slogan: SITE.tagline,
  description:
    "HCRM is a healthcare predictive analytics company. Its Health Risk Monitor software forecasts each health plan member's clinical risk and cost for the next 12 months from medical and pharmacy claims.",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: [SITE.linkedin],
  knowsAbout: [
    "Healthcare predictive analytics",
    "Claims data normalization",
    "Population health management",
    "Stop-loss underwriting analytics",
    "Care management software",
    "Clinical outcome assessment",
    "Self-funded health plans",
  ],
  memberOf: { "@type": "Organization", name: "Self-Insurance Institute of America (SIIA)" },
  hasCredential: { "@type": "EducationalOccupationalCredential", name: "SOC 2 Type 2" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: "US",
    availableLanguage: "English",
  },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE.origin,
  name: "HCRM — Health Cost & Risk Management",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

export const softwareSchema = {
  "@type": "SoftwareApplication",
  "@id": PRODUCT_ID,
  name: "Health Risk Monitor (HRM)",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Healthcare predictive analytics",
  operatingSystem: "Web; on-premise installation available",
  publisher: { "@id": ORG_ID },
  description:
    "Predictive modeling software that ingests medical and pharmacy claims, eligibility, lab and EMR data, normalizes it to over 95% accuracy, and forecasts each member's medical cost, pharmacy cost, ER visits and inpatient days for the next 12 months, with compliance against 128 clinical standards of care.",
  featureList: [
    "12-month member and group cost forecasts",
    "Risk stratification and cohort reporting",
    "Compliance with 128 clinical standards of care",
    "Daily Dashboard claims alerts",
    "White-label scheduled reports",
    "Care Management Module",
    "Stop-loss underwriting reports",
  ],
};

export const faqSchema = (faqs: Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = (o: { name: string; description: string; path: string; audience?: string[] }) => ({
  "@type": "Service",
  "@id": url(o.path) + "#service",
  name: o.name,
  description: o.description,
  url: url(o.path),
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: "Healthcare analytics",
  ...(o.audience ? { audience: o.audience.map((a) => ({ "@type": "Audience", audienceType: a })) } : {}),
  isRelatedTo: { "@id": PRODUCT_ID },
});

export const articleSchema = (o: { title: string; description: string; path: string; date: string }) => ({
  "@type": "Article",
  headline: o.title,
  description: o.description,
  datePublished: o.date,
  url: url(o.path),
  mainEntityOfPage: url(o.path),
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  image: url("/hcrm-logo.png"),
});

export const personSchema = (p: { name: string; role: string }) => ({
  "@type": "Person",
  name: p.name,
  jobTitle: p.role,
  worksFor: { "@id": ORG_ID },
});

function graph(head: Head) {
  const pageUrl = url(head.path);
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...(head.crumbs ?? [])];
  const nodes: object[] = [
    organization,
    website,
    {
      "@type": head.pageType ?? "WebPage",
      "@id": pageUrl + "#webpage",
      url: pageUrl,
      name: fullTitle(head.title),
      description: head.description,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      inLanguage: "en-US",
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-answer]"] },
    },
  ];
  if (head.path !== "/") {
    nodes.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: url(c.path),
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": [...nodes, ...(head.schema ?? [])] };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Static <head> tags for prerendered HTML. */
export function renderHead(head: Head): string {
  const t = esc(fullTitle(head.title));
  const d = esc(head.description);
  const u = url(head.path);
  const img = url(SITE.ogImage);
  const json = JSON.stringify(graph(head)).replace(/</g, "\\u003c");
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${head.noindex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${u}" />`,
    `<meta property="og:type" content="${head.type ?? "website"}" />`,
    `<meta property="og:site_name" content="HCRM" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<script type="application/ld+json" data-seo>${json}</script>`,
  ].join("\n    ");
}

/** Keeps the head in sync after client-side navigation. */
export function applyHead(head: Head) {
  document.title = fullTitle(head.title);
  const set = (sel: string, attr: string, val: string) => {
    let el = document.head.querySelector(sel);
    if (!el) {
      const m = sel.match(/^(\w+)\[(\w+)="([^"]+)"\]$/)!;
      el = document.createElement(m[1]);
      el.setAttribute(m[2], m[3]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, val);
  };
  const u = url(head.path);
  set('meta[name="description"]', "content", head.description);
  set('link[rel="canonical"]', "href", u);
  set('meta[property="og:title"]', "content", fullTitle(head.title));
  set('meta[property="og:description"]', "content", head.description);
  set('meta[property="og:url"]', "content", u);
  set('meta[name="twitter:title"]', "content", fullTitle(head.title));
  set('meta[name="twitter:description"]', "content", head.description);
  let ld = document.head.querySelector("script[data-seo]");
  if (!ld) {
    ld = document.createElement("script");
    ld.setAttribute("type", "application/ld+json");
    ld.setAttribute("data-seo", "");
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify(graph(head));
}
