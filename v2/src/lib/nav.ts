import { solutions } from "@/data/solutions";
import { audienceGroups, audiencesInGroup } from "@/data/audiences";
import type { PhotoKey } from "@/data/photos";

export type NavLink = { label: string; to: string; note?: string; kicker?: string };
export type NavGroup = { id: string; title: string; question: string; links: NavLink[] };
export type NavFeature = { eyebrow: string; title: string; body: string; to: string; cta: string; photo: PhotoKey };

export type NavItem = {
  label: string;
  to: string;
  /** Audience menu: groups on the left, the active group's links on the right. */
  groups?: NavGroup[];
  /** Simple menu: one list of links, each with a one-line note. */
  links?: NavLink[];
  feature?: NavFeature;
};

const solutionNotes: Record<string, string> = {
  "healthcare-predictive-analytics": "12-month cost and risk for every member",
  "data-normalization-and-validation": "250+ sources, validated to 95%+",
  "clinical-reporting-and-outcome-assessment": "Prove what your programs saved",
  "healthcare-management": "Outreach, care plans and outcomes",
  "stop-loss-reporting": "Shock-loss alerts and faster renewals",
};

export const nav: NavItem[] = [
  {
    // Top-level labels match hcrm.net's menu: Clients, Services, Resources, About.
    label: "Clients",
    to: "/who-we-serve/",
    groups: audienceGroups.map((g) => ({
      id: g.id,
      title: g.label,
      question: g.question,
      links: audiencesInGroup(g.id).map((a) => ({ label: a.name, to: `/${a.slug}/`, note: a.short })),
    })),
  },
  {
    label: "Services",
    to: "/services/",
    feature: {
      eyebrow: "Our software",
      title: "Health Risk Monitor (HRM): one source of truth for your plan.",
      body: "See how HRM connects plan data and forecasts every member's next 12 months.",
      to: "/our-software/",
      cta: "Our software",
      photo: "dashboard",
    },
    links: solutions.map((s) => ({ label: s.name, to: `/${s.slug}/`, kicker: s.kicker, note: solutionNotes[s.slug] })),
  },
  {
    label: "Resources",
    to: "/resources/",
    feature: {
      eyebrow: "Case study",
      title: "Cost per member, $825 to $450.",
      body: "How one employer group managed its catastrophic 5% before the claims arrived.",
      to: "/predictive-analytics-and-cost-containment/",
      cta: "Read the case study",
      photo: "factory",
    },
    links: [
      { label: "Articles & white papers", to: "/resources/", note: "Research, announcements and client results" },
      { label: "Understanding healthcare analytics", to: "/understanding-healthcare-analytics/", note: "A plain-language guide" },
      { label: "Testimonials & impact", to: "/testimonials-and-impact/", note: "In our clients' words" },
      { label: "Frequently asked questions", to: "/faq/", note: "Data, security, pricing and setup" },
    ],
  },
  {
    label: "About",
    to: "/who-we-are/",
    feature: {
      eyebrow: "Chicago · Since 2004",
      title: "Twenty years of predicting the next claim.",
      body: "The company, the people and the partners behind Health Risk Monitor.",
      to: "/who-we-are/",
      cta: "Who we are",
      photo: "skyline",
    },
    links: [
      { label: "Why choose HCRM", to: "/why-choose-hcrm/", note: "Accuracy, in dollars, with a team behind it" },
      { label: "Our team", to: "/our-team/", note: "Leadership and client services" },
      { label: "Our software", to: "/our-software/", note: "Health Risk Monitor (HRM)" },
      { label: "Our partnerships", to: "/our-partnerships/", note: "MedWell, Pluritem, Upswing, SIIA, AARC 360" },
    ],
  },
];
