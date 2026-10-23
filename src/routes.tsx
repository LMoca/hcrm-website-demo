import type { ReactElement } from "react";
import type { Head } from "@/lib/seo";
import { articleSchema, faqSchema, personSchema, serviceSchema, softwareSchema } from "@/lib/seo";
import { SITE } from "@/data/site";
import { team } from "@/data/site";
import { solutions } from "@/data/solutions";
import { audiences } from "@/data/audiences";
import { articles } from "@/data/resources";
import { allFaqs } from "@/data/faqs";

import Home, { homeFaqs } from "@/pages/Home";
import Platform, { platformFaqs } from "@/pages/Platform";
import SolutionPage from "@/pages/SolutionPage";
import AudiencePage from "@/pages/AudiencePage";
import WhoWeServe from "@/pages/WhoWeServe";
import { About, Partners, Team, Testimonials, WhyHcrm } from "@/pages/Company";
import { ArticlePage, FaqPage, Guide, guideTypes, Resources } from "@/pages/Learn";
import Contact from "@/pages/Contact";
import { Legal } from "@/pages/Misc";
import { Archive, Services } from "@/pages/Archive";

/** Which Yoast child sitemap a URL belongs to on hcrm.net. `false` keeps it out of the sitemaps. */
export type SitemapGroup = "page" | "post" | "category" | "author" | false;

export type AppRoute = {
  path: string;
  element: ReactElement;
  head: Head;
  sitemap: SitemapGroup;
  /** Grouping for llms.txt */
  section: "core" | "solution" | "audience" | "company" | "resource" | "other";
  /** One-line summary for llms.txt */
  summary: string;
};

// Every URL and title, and the meta description wherever the live page has one, mirrors hcrm.net,
// so the site structure search engines know is unchanged. Live pages with no description get one.
const t = (name: string) => `${name} – HCRM`;

// Live titles that differ from the page's display name.
const liveTitles: Record<string, string> = {
  "health-insurance-consultants-2": "Health Insurance Consultants",
  "clinics-and-healthcare-providers-2": "Clinics And Healthcare Providers",
  "stop-loss-carriers-and-captives-2": "Stop-Loss Carriers And Captives",
  "insurance-companies-with-fully-insured-plans-2": "Insurance Companies With Fully Insured Plans",
  "health-management-mendors": "Health Management Vendors",
  "healthcare-management": "Healthcare Management",
};
const liveDescriptions: Record<string, string> = {
  "clinical-reporting-and-outcome-assessment":
    "Clinical outcome assessment and reporting provides evidence of the effectiveness of clinical practices, tracks patient treatment compliance and outcomes, and provides insights to aid in proactive decision-making",
  "population-health-management-teams-2": "Identify, stratify, and manage health conditions with population health management software.",
};

const audienceRoute = (a: (typeof audiences)[number], path = `/${a.slug}/`, canonical?: string): AppRoute => ({
  path,
  element: <AudiencePage slug={a.slug} />,
  sitemap: "page",
  section: "audience",
  summary: a.answer,
  head: {
    title: t(liveTitles[a.slug] ?? a.name),
    description: liveDescriptions[a.slug] ?? a.description,
    path: canonical ?? path,
    crumbs: [
      { name: "Who we serve", path: "/who-we-serve/" },
      { name: a.name, path: `/${a.slug}/` },
    ],
    schema: [
      serviceSchema({ name: `Predictive analytics for ${a.name}`, description: a.answer, path: `/${a.slug}/`, audience: [a.name] }),
      faqSchema(a.faqs),
    ],
  },
});

const vendors = audiences.find((a) => a.slug === "health-management-mendors")!;

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <Home />,
    sitemap: "page",
    section: "core",
    summary: "Overview of HCRM and Health Risk Monitor: connected plan data, 12-month forecasts, audiences, services and client results.",
    head: {
      title: "HCRM – Predictive Analytics to Enhance your Health Plan",
      description: SITE.defaultDescription,
      path: "/",
      schema: [softwareSchema, faqSchema(homeFaqs)],
    },
  },
  {
    path: "/services/",
    element: <Services />,
    sitemap: "page",
    section: "core",
    summary: "HCRM's five services: predictive analytics, data normalization, clinical reporting, healthcare management software and stop-loss reporting.",
    head: {
      title: t("Services"),
      description:
        "HCRM services: healthcare predictive analytics, data normalization and validation, clinical reporting, healthcare management software and stop-loss reporting.",
      path: "/services/",
      pageType: "CollectionPage",
      crumbs: [{ name: "Services", path: "/services/" }],
    },
  },
  {
    path: "/our-software/",
    element: <Platform />,
    sitemap: "page",
    section: "core",
    summary: "How Health Risk Monitor and the MITCH engine work, the data it connects, the risk measures reported, and deployment options.",
    head: {
      title: t("Our Software"),
      description:
        "Health Risk Monitor predicts each member's medical and Rx cost, ER visits and inpatient days for 12 months with the MITCH engine. SaaS or on-site.",
      path: "/our-software/",
      crumbs: [{ name: "Our software", path: "/our-software/" }],
      schema: [softwareSchema, faqSchema(platformFaqs)],
    },
  },
  ...solutions.map<AppRoute>((s) => ({
    path: `/${s.slug}/`,
    element: <SolutionPage slug={s.slug} />,
    sitemap: "page",
    section: "solution",
    summary: s.answer,
    head: {
      title: t(liveTitles[s.slug] ?? s.name),
      description: liveDescriptions[s.slug] ?? s.description,
      path: `/${s.slug}/`,
      crumbs: [
        { name: "Services", path: "/services/" },
        { name: s.name, path: `/${s.slug}/` },
      ],
      schema: [
        serviceSchema({
          name: s.name,
          description: s.answer,
          path: `/${s.slug}/`,
          audience: s.forAudiences.map((a) => audiences.find((x) => x.slug === a)!.name),
        }),
        faqSchema(s.faqs),
      ],
    },
  })),
  {
    path: "/who-we-serve/",
    element: <WhoWeServe />,
    sitemap: "page",
    section: "core",
    summary: "The organizations HCRM serves, grouped into four paths.",
    head: {
      title: t("Who We Serve"),
      description:
        "Employers, brokers, health plans, carriers, stop-loss and captives, TPAs, clinics, ACOs and care programs: see what HCRM's forecast means for you.",
      path: "/who-we-serve/",
      pageType: "CollectionPage",
      crumbs: [{ name: "Who we serve", path: "/who-we-serve/" }],
    },
  },
  ...audiences.map((a) => audienceRoute(a)),
  // Both vendor URLs are in the live sitemap. The older duplicate's canonical points at the current page.
  audienceRoute(vendors, "/health-management-vendors/", "/health-management-mendors/"),
  {
    path: "/who-we-are/",
    element: <About />,
    sitemap: "page",
    section: "company",
    summary: "HCRM's story since 2004, mission and vision.",
    head: {
      title: t("Who We Are"),
      description: "HCRM delivers tailored cost solutions, data analysis, and risk management to healthcare organizations of all sizes.",
      path: "/who-we-are/",
      pageType: "AboutPage",
      crumbs: [{ name: "Who we are", path: "/who-we-are/" }],
    },
  },
  {
    path: "/why-choose-hcrm/",
    element: <WhyHcrm />,
    sitemap: "page",
    section: "company",
    summary: "Why organizations choose HCRM, plus a buyer's checklist for healthcare analytics vendors.",
    head: {
      title: t("Why Choose HCRM"),
      description:
        "Accurate AI-driven predictions, risk in dollars, SOC 2 Type 2 security. Plus six things to weigh when choosing a healthcare analytics vendor.",
      path: "/why-choose-hcrm/",
      crumbs: [{ name: "Why choose HCRM", path: "/why-choose-hcrm/" }],
    },
  },
  {
    path: "/our-team/",
    element: <Team />,
    sitemap: "page",
    section: "company",
    summary: "HCRM leadership: William F. Bramble (President), Michael S. Varadian (EVP National Accounts), Kelsey Simmons (Client Services).",
    head: {
      title: t("Our Team"),
      description:
        "Meet HCRM's team: healthcare operators with decades of experience across health plans, TPAs, Medicaid and provider organizations.",
      path: "/our-team/",
      pageType: "AboutPage",
      crumbs: [
        { name: "Who we are", path: "/who-we-are/" },
        { name: "Our team", path: "/our-team/" },
      ],
      schema: team.map(personSchema),
    },
  },
  {
    path: "/our-partnerships/",
    element: <Partners />,
    sitemap: "page",
    section: "company",
    summary: "HCRM partners: Mediterranean Wellness (MedWell), Pluritem (Milliman), Upswing Health, SIIA and AARC 360.",
    head: {
      title: t("Our Partnerships"),
      description:
        "HCRM partners with leaders in wellness, EMR integration, musculoskeletal care, self-insurance and security auditing to deliver better member outcomes.",
      path: "/our-partnerships/",
      crumbs: [
        { name: "Who we are", path: "/who-we-are/" },
        { name: "Our partnerships", path: "/our-partnerships/" },
      ],
    },
  },
  {
    path: "/testimonials-and-impact/",
    element: <Testimonials />,
    sitemap: "page",
    section: "company",
    summary: "Client testimonials and measurable impact.",
    head: {
      title: t("Testimonials & Impact"),
      description:
        "Clients from Applied Health Analytics, HealthKeys, AIMM, In-House Physicians, Healthworks and Health 180 on HCRM's data, technology and support.",
      path: "/testimonials-and-impact/",
      crumbs: [{ name: "Testimonials & impact", path: "/testimonials-and-impact/" }],
    },
  },
  {
    path: "/resources/",
    element: <Resources />,
    sitemap: "page",
    section: "core",
    summary: "Index of HCRM articles, case studies and white papers.",
    head: {
      title: t("Resources"),
      description:
        "HCRM case studies, white papers and announcements on predictive analytics, cost containment, the Chronic Impact Score, SOC 2 and modeling accuracy.",
      path: "/resources/",
      pageType: "CollectionPage",
      crumbs: [{ name: "Resources", path: "/resources/" }],
    },
  },
  {
    path: "/understanding-healthcare-analytics/",
    element: <Guide />,
    sitemap: "page",
    section: "resource",
    summary: "Guide to healthcare analytics: descriptive, diagnostic, predictive and prescriptive analytics with examples.",
    head: {
      title: t("Understanding Healthcare Analytics"),
      description:
        "Healthcare analytics explained: descriptive, diagnostic, predictive and prescriptive, with examples, benefits, and why data quality matters.",
      path: "/understanding-healthcare-analytics/",
      type: "article",
      crumbs: [
        { name: "Resources", path: "/resources/" },
        { name: "Understanding healthcare analytics", path: "/understanding-healthcare-analytics/" },
      ],
      schema: [
        faqSchema([
          {
            q: "What are healthcare analytics?",
            a: "Healthcare analytics is the analysis of claims, clinical and eligibility data to understand and improve population health and cost. It gives benefits professionals insight into hidden patterns, population health trends and how benefit programs affect productivity, satisfaction and costs.",
          },
          ...guideTypes.map((g) => ({ q: `What is ${g.name.toLowerCase()} in healthcare?`, a: `${g.def} Example: ${g.ex}` })),
        ]),
      ],
    },
  },
  ...articles.map<AppRoute>((a) => ({
    path: `/${a.slug}/`,
    element: <ArticlePage slug={a.slug} />,
    sitemap: "post",
    section: "resource",
    summary: a.summary,
    head: {
      title: t(a.title),
      description: a.summary,
      path: `/${a.slug}/`,
      type: "article",
      crumbs: [
        { name: "Resources", path: "/resources/" },
        { name: a.title, path: `/${a.slug}/` },
      ],
      schema: [articleSchema({ title: a.title, description: a.summary, path: `/${a.slug}/`, date: a.date })],
    },
  })),
  {
    path: "/category/uncategorized/",
    element: <Archive title="Uncategorized Archives" path="/category/uncategorized/" crumb="Uncategorized" />,
    sitemap: "category",
    section: "other",
    summary: "Archive of all HCRM articles.",
    head: {
      title: t("Uncategorized Archives"),
      description: "Every HCRM article, case study and announcement, newest first.",
      path: "/category/uncategorized/",
      pageType: "CollectionPage",
      crumbs: [
        { name: "Resources", path: "/resources/" },
        { name: "Uncategorized", path: "/category/uncategorized/" },
      ],
    },
  },
  {
    path: "/author/teagen/",
    element: <Archive title="Articles by HCRM" path="/author/teagen/" crumb="HCRM" />,
    sitemap: "author",
    section: "other",
    summary: "Articles published by HCRM.",
    head: {
      title: "HCRM, Author at HCRM",
      description: "Articles, case studies and announcements published by HCRM.",
      path: "/author/teagen/",
      pageType: "ProfilePage",
      crumbs: [
        { name: "Resources", path: "/resources/" },
        { name: "HCRM", path: "/author/teagen/" },
      ],
    },
  },
  {
    path: "/faq/",
    element: <FaqPage />,
    // New page, not on hcrm.net. Added for answer engines; it extends the page sitemap.
    sitemap: "page",
    section: "core",
    summary: "Answers to common questions about HCRM, Health Risk Monitor, data, security, pricing and getting started.",
    head: {
      title: t("Frequently Asked Questions"),
      description:
        "Answers to common questions about HCRM and Health Risk Monitor: what it predicts, accuracy, data needed, SOC 2 security, on-site deployment, free trial and pricing.",
      path: "/faq/",
      crumbs: [{ name: "FAQ", path: "/faq/" }],
      schema: [faqSchema(allFaqs)],
    },
  },
  {
    path: "/contact/",
    element: <Contact />,
    sitemap: "page",
    section: "core",
    summary: "Contact HCRM: info@hcrm.net, (773) 782-6466, or the contact form.",
    head: {
      title: t("Contact"),
      description:
        "See Health Risk Monitor run on 24 months of de-identified claims, then try it free for a month on your own data. info@hcrm.net · (773) 782-6466.",
      path: "/contact/",
      pageType: "ContactPage",
      crumbs: [{ name: "Contact", path: "/contact/" }],
    },
  },
  {
    path: "/terms-of-use/",
    element: <Legal kind="terms" />,
    sitemap: "page",
    section: "other",
    summary: "Terms of use.",
    head: {
      title: t("Terms of Use"),
      description: "The terms that govern use of the hcrm.net website operated by Health Cost & Risk Management, LLC.",
      path: "/terms-of-use/",
      crumbs: [{ name: "Terms of use", path: "/terms-of-use/" }],
    },
  },
  {
    path: "/privacy/",
    element: <Legal kind="privacy" />,
    // Placeholder until the client supplies a policy (hcrm.net has none), so it stays out of the index.
    sitemap: false,
    section: "other",
    summary: "Privacy policy.",
    head: {
      title: t("Privacy Policy"),
      description: "How Health Cost & Risk Management, LLC collects, uses and protects information submitted through hcrm.net.",
      path: "/privacy/",
      noindex: true,
      crumbs: [{ name: "Privacy policy", path: "/privacy/" }],
    },
  },
];

export const notFoundHead: Head = {
  title: "Page not found – HCRM",
  description: "This page could not be found.",
  path: "/404",
  noindex: true,
};

const norm = (p: string) => (p === "/" ? "/" : p.replace(/\/*$/, "/"));
export const headFor = (pathname: string) => routes.find((r) => r.path === norm(pathname))?.head ?? notFoundHead;
