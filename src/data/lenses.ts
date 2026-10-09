/**
 * Role lenses for the home page.
 *
 * HCRM serves eleven buyer types (see personas.ts). Eleven is too many for a
 * hero, so the home page groups them into five lenses that share the same
 * questions and the same view of the data. Every persona belongs to exactly
 * one lens. The groupings are a proposal for the client to confirm.
 */

export type LensKey =
  | "general"
  | "employers"
  | "brokers"
  | "carriers"
  | "providers"
  | "care";

export type ConsoleTab = "forecast" | "members" | "outcomes" | "stoploss";

export interface LensQuestion {
  q: string;
  a: string;
  service: string;
  to: string;
}

export interface Lens {
  key: LensKey;
  /** Name shown in the selector and the "viewing as" pill. */
  name: string;
  /** Lower-case phrase for running text ("Tailored for ..."). */
  phrase: string;
  /** Completes "I'm responsible for ..." */
  blank: string;
  /** One-line description under the option in the selector. */
  hint: string;
  personaSlugs: string[];
  kicker: string;
  headline: [string, string];
  lede: string;
  cta: string;
  questionsTitle: [string, string];
  questions: LensQuestion[];
  /** Author name in testimonials.ts to feature for this lens. */
  testimonial: string;
  consoleTab: ConsoleTab;
  /** Population view shown in the hero. */
  view: {
    title: string;
    caption: string;
  };
  /** Final scene of the "claims to dollars" story. */
  scene: { tag: string; title: string; body: string; pct: number; label: string };
}

const S = {
  predictive: "/services/healthcare-predictive-analytics",
  normalize: "/services/data-normalization-validation",
  clinical: "/services/clinical-reporting-outcome-assessment",
  care: "/services/healthcare-management",
  stoploss: "/services/stop-loss-reporting",
};

export const lenses: Lens[] = [
  {
    key: "general",
    name: "Just exploring",
    phrase: "every risk-bearing organization",
    blank: "select your role",
    hint: "Show the general overview",
    personaSlugs: [],
    kicker: "Health Risk Monitor · Claims intelligence",
    headline: ["See the claim", "before it forms."],
    lede:
      "Health Risk Monitor reads 24 months of medical and pharmacy claims and returns the next twelve: what your plan will spend, which members will drive it, and how much of that you still have time to change.",
    cta: "Book a free demo",
    questionsTitle: ["The questions every plan is asked,", "answered a year early."],
    questions: [
      {
        q: "Which members will drive next year's spend?",
        a: "Every member ranked by projected 12-month cost, with the clinical driver and the window you have left to act.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "Can we trust the data underneath?",
        a: "Claims are normalized and validated before modeling, and anything unresolvable is reported rather than averaged away.",
        service: "Data Normalization & Validation",
        to: S.normalize,
      },
      {
        q: "Did the programs we already fund work?",
        a: "Program spend measured against the baseline HRM predicted without them, including the programs that did not move the number.",
        service: "Clinical Reporting & Outcome Assessment",
        to: S.clinical,
      },
    ],
    testimonial: "Michael Mitchell",
    consoleTab: "forecast",
    view: {
      title: "A covered population, by projected risk",
      caption:
        "Each dot is one member of a synthetic plan. The highest projected spend sits at the center.",
    },
    scene: {
      tag: "Your view",
      title: "One forecast, read five ways",
      body: "Choose what you're responsible for at the top of the page to see how your team would read this forecast.",
      pct: 0.9,
      label: "Top 10% of projected spend",
    },
  },
  {
    key: "employers",
    name: "Self-funded employers",
    phrase: "self-funded employers",
    blank: "a self-funded health plan",
    hint: "See next year's high-cost members",
    personaSlugs: ["self-funded-employers"],
    kicker: "For self-funded employers",
    headline: ["See next year's claims", "while you can still change them."],
    lede:
      "Your plan carries the risk directly. HRM shows which members are trending toward high-cost events, in dollars, twelve months before the claims arrive, so renewal starts with your own projections.",
    cta: "See your plan's risk in a free demo",
    questionsTitle: ["The questions your CFO will ask,", "answered before renewal."],
    questions: [
      {
        q: "Why are our claims this high?",
        a: "The members and conditions behind the spend, at member and group level, not just a total on a carrier report.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "What will next year cost us?",
        a: "A 12-month forecast of plan spend with a confidence interval, built on your own normalized claims.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "Are our wellness programs paying off?",
        a: "Program spend measured against the baseline HRM predicted without the program, in dollars.",
        service: "Clinical Reporting & Outcome Assessment",
        to: S.clinical,
      },
    ],
    testimonial: "Tamela Banner",
    consoleTab: "forecast",
    view: {
      title: "Your plan, ranked by projected spend",
      caption:
        "Members sorted from highest to lowest projected 12-month cost. Red marks the top 5%, the members most worth acting on now.",
    },
    scene: {
      tag: "Self-funded employers",
      title: "Your plan, next year",
      body: "A small share of members drives most of the forecast. HRM shows who they are and the condition behind each one.",
      pct: 0.95,
      label: "Top 5% of members by projected spend",
    },
  },
  {
    key: "brokers",
    name: "Brokers, consultants & TPAs",
    phrase: "brokers, consultants and TPAs",
    blank: "my clients' benefit plans",
    hint: "Compare client groups before renewal",
    personaSlugs: ["health-insurance-consultants", "third-party-administrators"],
    kicker: "For brokers, benefits consultants and TPAs",
    headline: ["Walk into every renewal", "with numbers no one else has."],
    lede:
      "Give each client a dollar-denominated view of where their risk is heading, recommend point solutions that fit their population, and show what those programs achieved a year later.",
    cta: "Bring HRM to your clients",
    questionsTitle: ["The questions clients bring you,", "answered with their own data."],
    questions: [
      {
        q: "Which client groups are heading for trouble?",
        a: "Projected spend and exposure for every group in your book, compared side by side before renewal season.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "Which point solution fits this client?",
        a: "The members and conditions a program would actually reach, before you recommend it, and its measured result after.",
        service: "Clinical Reporting & Outcome Assessment",
        to: S.clinical,
      },
      {
        q: "How do we negotiate stop-loss?",
        a: "Probable large claimants and their clinical drivers, brought to the table instead of last year's averages.",
        service: "Stop-Loss Reporting",
        to: S.stoploss,
      },
    ],
    testimonial: "David Chiappino",
    consoleTab: "forecast",
    view: {
      title: "Your book, group by group",
      caption:
        "Six client groups side by side. Two are trending toward a costly renewal, and HRM shows the members behind it.",
    },
    scene: {
      tag: "Brokers, consultants & TPAs",
      title: "Every client group, side by side",
      body: "Compare projected risk across your book before renewal season and point each client to the members and conditions that matter.",
      pct: 0.9,
      label: "Above the renewal watch line",
    },
  },
  {
    key: "carriers",
    name: "Carriers, plans & stop-loss",
    phrase: "carriers, health plans and stop-loss",
    blank: "insured or stop-loss risk",
    hint: "Spot probable claimants above the attachment",
    personaSlugs: ["insurance-companies", "stop-loss-carriers-captives", "health-plans"],
    kicker: "For carriers, health plans, stop-loss carriers, MGUs and captives",
    headline: ["Price the risk that's coming,", "not the risk that's been paid."],
    lede:
      "Forecast loss ratios and risk trends by plan type, broker or underwriter, and see probable shock-loss members against the attachment point before the renewal is priced.",
    cta: "Model your book in a free demo",
    questionsTitle: ["The questions underwriters ask,", "answered a year early."],
    questions: [
      {
        q: "Who is likely to breach the specific?",
        a: "Members ranked by projected cost against the attachment point, with the clinical driver behind each one.",
        service: "Stop-Loss Reporting",
        to: S.stoploss,
      },
      {
        q: "Where is our loss ratio heading?",
        a: "Forecast loss ratios and risk trends by plan type, broker or underwriter.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "How is the captive performing?",
        a: "Pricing, performance and risk across the captive, tracked from the same normalized dataset.",
        service: "Clinical Reporting & Outcome Assessment",
        to: S.clinical,
      },
    ],
    testimonial: "Michael Mitchell",
    consoleTab: "stoploss",
    view: {
      title: "Your risk, against the attachment point",
      caption:
        "Members spread by projected cost. Red members are projected to exceed a $100K specific attachment point.",
    },
    scene: {
      tag: "Carriers & stop-loss",
      title: "Probable claimants above the attachment",
      body: "HRM identifies high-risk, high-cost members and probable shock-loss so renewals reflect what is likely to happen next.",
      pct: 0.97,
      label: "Projected to breach the specific",
    },
  },
  {
    key: "providers",
    name: "Providers, clinics & ACOs",
    phrase: "providers, clinics and ACOs",
    blank: "patients at a clinic, practice or ACO",
    hint: "Know who needs a pre-visit review",
    personaSlugs: ["clinics-healthcare-providers", "employer-clinics", "accountable-care-organizations"],
    kicker: "For providers, employer clinics and ACOs",
    headline: ["Know who needs you", "before they walk in."],
    lede:
      "Combine EMR and claims into one patient view, see projected risk before the visit, and manage the financial risk you carry across your panel.",
    cta: "See your patient panel's risk",
    questionsTitle: ["The questions your clinicians ask,", "answered before the visit."],
    questions: [
      {
        q: "What happened to this patient elsewhere?",
        a: "Claims from every provider combined with your EMR into one patient profile.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "Who should we see first?",
        a: "Patients ranked by projected risk, with the gaps in care to close at the next visit.",
        service: "Clinical Reporting & Outcome Assessment",
        to: S.clinical,
      },
      {
        q: "Can we take on more risk in our contracts?",
        a: "A forward view of panel cost to support value-based contract negotiation.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
    ],
    testimonial: "Denise Craven",
    consoleTab: "members",
    view: {
      title: "This week's visits, by day",
      caption:
        "Every scheduled patient, Monday to Friday. Highlighted patients are high risk and worth a review before they arrive.",
    },
    scene: {
      tag: "Providers, clinics & ACOs",
      title: "Your panel, sorted by risk",
      body: "Clinicians can review a patient's projected risk, drivers and gaps in care before the visit, and prioritize outreach.",
      pct: 0.88,
      label: "Patients to review before their next visit",
    },
  },
  {
    key: "care",
    name: "Care management & wellness",
    phrase: "care management and wellness teams",
    blank: "care management or wellness programs",
    hint: "Rank outreach by impact",
    personaSlugs: ["population-health-management-teams", "health-management-vendors"],
    kicker: "For population health teams and health management vendors",
    headline: ["Reach the right members first,", "then prove it worked."],
    lede:
      "Prioritize outreach by projected impact, run it in the care management module, and report outcomes to your clients against the spend HRM predicted without you.",
    cta: "See the care management module",
    questionsTitle: ["The questions your clients ask,", "answered with outcomes."],
    questions: [
      {
        q: "Who should coaches call first?",
        a: "An outreach list ranked by projected cost and how much the member's risk can still change.",
        service: "Healthcare Predictive Analytics",
        to: S.predictive,
      },
      {
        q: "Where do our encounters live?",
        a: "Calls, texts, emails and encounter data in the care management module, with billing and outcomes reports.",
        service: "Healthcare Management",
        to: S.care,
      },
      {
        q: "What did our program achieve?",
        a: "Measured spend for the members you reached, against the baseline HRM predicted without the program.",
        service: "Clinical Reporting & Outcome Assessment",
        to: S.clinical,
      },
    ],
    testimonial: "Jim Bode",
    consoleTab: "outcomes",
    view: {
      title: "Your outreach queue, ranked by impact",
      caption:
        "Members ordered by projected cost and how changeable their risk is. Highlighted members are this month's outreach list.",
    },
    scene: {
      tag: "Care management",
      title: "An outreach queue ranked by impact",
      body: "Start with members whose risk is high and still changeable, then track every encounter through to outcomes.",
      pct: 0.92,
      label: "Prioritized for outreach this month",
    },
  },
];

export const roleLenses = lenses.filter((l) => l.key !== "general");

export const lensByKey = (k: string | null | undefined): Lens | undefined =>
  lenses.find((l) => l.key === k);

export const lensForPersona = (slug: string): Lens | undefined =>
  roleLenses.find((l) => l.personaSlugs.includes(slug));
