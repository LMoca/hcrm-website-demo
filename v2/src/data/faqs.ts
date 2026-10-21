import type { Faq } from "./types";

// Site-wide questions buyers and AI assistants ask about HCRM. Answers are written
// to stand alone (no "see above") so they can be quoted out of context.
export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "About HCRM",
    items: [
      {
        q: "What is HCRM?",
        a: "HCRM (Health Cost & Risk Management, LLC) is a Chicago-based healthcare analytics company. Its predictive modeling software, Health Risk Monitor (HRM), forecasts clinical events and costs for each health plan member for the next 12 months, identifies at-risk members, and measures the outcomes of health management and wellness programs.",
      },
      {
        q: "Who does HCRM work with?",
        a: "Self-funded employers, health insurance brokers and benefits consultants, fully insured insurance carriers, health plans (including Blue Cross and Medicaid populations), stop-loss carriers, MGUs and captives, third-party administrators, population health management teams, health management and wellness vendors, clinics and healthcare providers, employer on-site clinics, and accountable care organizations.",
      },
      {
        q: "How long has HCRM been in business?",
        a: "HCRM has provided predictive modeling since 2004, when it pioneered accurate predictive modeling tools for the small to mid-size self-funded market, which until then had been available only to large organizations. One client relationship has lasted more than 17 years.",
      },
    ],
  },
  {
    title: "Health Risk Monitor",
    items: [
      {
        q: "What is Health Risk Monitor (HRM)?",
        a: "Health Risk Monitor is HCRM's predictive modeling platform. Built on the award-winning MITCH predictive modeling engine, it integrates medical and pharmacy claims and EMR data, predicts clinical events and outcomes for each member, attaches a dollar value to those predictions, and tracks compliance with 128 clinical standards of care.",
      },
      {
        q: "What does HRM predict?",
        a: "For each member, for the next 12 months: medical cost, pharmacy cost, emergency room visits and inpatient days. It also reports relative risk against national norms, acute-care risk, the long-term impact of co-morbid chronic conditions and poor compliance (the Chronic Impact Score), and the member's motivation to maintain or improve health behaviors.",
      },
      {
        q: "How is predictive analytics different from standard claims reporting?",
        a: "Standard claims reporting is descriptive: it summarizes what has already been paid. Predictive analytics forecasts what is likely to happen next. HRM identifies future high-cost members from their current clinical condition, gaps in care and likely outcomes, not just members who were expensive last year.",
      },
      {
        q: "How accurate is HCRM's predictive model?",
        a: "HCRM's model is regarded as among the most accurate claims-based prospective models available. A comparison with the Society of Actuaries' 2016 study of claims-based risk tools showed HRM leading the industry in clinical predictive accuracy, and HCRM's data normalization produces accuracy rates over 95% before modeling.",
      },
    ],
  },
  {
    title: "Data, security & implementation",
    items: [
      {
        q: "What data does HCRM need, and who sends it?",
        a: "24 months of medical and pharmacy claims and eligibility, then a monthly feed; lab and EMR data improve predictions when available. You give HCRM contacts at your carrier or TPA and PBM, and HCRM requests the data in their existing layouts. It already works with more than 250 medical and Rx data sources.",
      },
      {
        q: "Is HCRM secure?",
        a: "HCRM is SOC 2 Type 2 certified, independently audited since 2018 by AARC 360, which also performs penetration testing. All data is stored in the United States, and organizations can choose an on-site installation to keep data in-house.",
      },
      {
        q: "Can HRM run inside our own data center?",
        a: "Yes. HRM is available as SaaS, with HCRM processing data and users accessing reports through a secure link, or installed in a client's data center on client hardware, with HCRM providing installation, IT training and ongoing support.",
      },
      {
        q: "Does HCRM integrate with our existing tools?",
        a: "HRM integrates with existing care management software and EMRs, supports single sign-on for care managers, can send a monthly feed of forecasts and normalized claims for your own reporting, and can share access with authorized vendors.",
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        q: "Can we try HCRM before committing?",
        a: "Yes. HCRM runs an online walkthrough using 24 months of real, de-identified claims and eligibility data in the Health Risk Monitor interface. Afterward, organizations can try the solution free for one month on their own medical and pharmacy claims.",
      },
      {
        q: "How much does HCRM cost?",
        a: "Pricing depends on population size, data sources and modules. HCRM's common national dataset is designed to keep costs down so organizations of any size can participate. Contact HCRM for a quote.",
      },
      {
        q: "How do I contact HCRM?",
        a: "Email info@hcrm.net, call (773) 782-6466, or use the contact form at hcrm.net/contact and choose the type of organization you represent.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
