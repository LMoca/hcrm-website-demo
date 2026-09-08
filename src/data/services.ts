import {
  Activity,
  Database,
  FileText,
  HeartPulse,
  ShieldAlert,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: typeof Activity;
  tagline: string;
  whatItDoes: string;
  mechanism: string;
  dollarOutcome: string;
  proof: string;
  cta: string;
  features: { title: string; description: string }[];
}

export const services: Service[] = [
  {
    slug: "healthcare-predictive-analytics",
    title: "Healthcare Predictive Analytics",
    shortTitle: "Predictive Analytics",
    icon: Activity,
    tagline: "See the claim before it hits your plan.",
    whatItDoes:
      "Health Risk Monitor ingests your medical and pharmacy claims, normalizes them to 95%+ accuracy, and forecasts future healthcare spending at both the member and group level. You see which members are trending toward high-cost events months before the claims arrive, giving you time to intervene.",
    mechanism:
      "HRM's predictive model analyzes 24 months of claims history, identifies patterns in diagnosis codes, pharmacy utilization, and cost trajectories, then projects each member's future spend. The model flags members crossing risk thresholds and quantifies the dollar impact so you can prioritize interventions by financial significance.",
    dollarOutcome:
      "By identifying high-risk members before claims land, HRM gives you the lead time to intervene, potentially avoiding costs that would otherwise destabilize your plan at renewal.",
    proof:
      "95%+ data-normalization accuracy. One of the most accurate claims-based models available. 24-month demo on de-identified claims, followed by a 1-month free trial on your own data.",
    cta: "Book a free demo",
    features: [
      {
        title: "Member-level forecasting",
        description:
          "Predict which individual members are trending toward high-cost events, with dollar-quantified risk scores.",
      },
      {
        title: "Group-level trend analysis",
        description:
          "See where your entire population's spend is heading, broken down by diagnosis category, pharmacy, and cost band.",
      },
      {
        title: "Early-warning flags",
        description:
          "Automatic alerts when members cross configurable risk thresholds, ranked by projected dollar impact.",
      },
      {
        title: "Renewal lead time",
        description:
          "12 months of foresight before renewal so you can negotiate from a position of data-backed clarity.",
      },
    ],
  },
  {
    slug: "data-normalization-validation",
    title: "Data Normalization & Validation",
    shortTitle: "Data Normalization",
    icon: Database,
    tagline: "Your analytics are only as good as your data.",
    whatItDoes:
      "HRM's normalization engine ingests claims from any source, cleanses and standardizes them, validates them against clinical and financial rules, and outputs a clean, analysis-ready dataset. The result is 95%+ accuracy, the foundation every prediction depends on.",
    mechanism:
      "The engine handles provider name standardization, procedure code reconciliation, diagnosis code grouping, pharmacy NDC-to-GPI mapping, duplicate detection, and cross-field validation. It flags anomalies and resolves them automatically where possible, surfacing exceptions for review when not.",
    dollarOutcome:
      "Bad data produces bad predictions, which produce bad decisions. 95%+ accuracy means your risk forecasts, cost projections, and program evaluations are built on a foundation you can defend to finance, clinical, and executive stakeholders.",
    proof:
      "95%+ data-normalization accuracy, measured across client datasets. This is the core differentiator that makes HRM one of the most accurate claims-based models available.",
    cta: "Book a free demo",
    features: [
      {
        title: "Multi-source ingestion",
        description:
          "Accepts medical claims, pharmacy claims, and clinical data from any TPA, carrier, or vendor format.",
      },
      {
        title: "Automated cleansing",
        description:
          "Standardizes provider names, reconciles code sets, maps pharmacy identifiers, and removes duplicates.",
      },
      {
        title: "Clinical validation",
        description:
          "Validates claims against clinical logic rules to catch coding errors, impossible combinations, and data gaps.",
      },
      {
        title: "Exception reporting",
        description:
          "Surfaces anomalies that need human review, so your team can resolve edge cases without drowning in raw data.",
      },
    ],
  },
  {
    slug: "clinical-reporting-outcome-assessment",
    title: "Clinical Reporting & Outcome Assessment",
    shortTitle: "Clinical Reporting",
    icon: FileText,
    tagline: "Did that program actually save money? Now you know.",
    whatItDoes:
      "HRM measures the actual financial and clinical impact of your health programs, wellness initiatives, and care management interventions. Instead of relying on participation counts or engagement metrics, you get dollar-quantified outcomes.",
    mechanism:
      "HRM compares the predicted spend trajectory of intervened members against their actual spend after the intervention. The difference, expressed in dollars, is your program's measured financial impact. Reports are generated automatically and can be sliced by program, population segment, or time period.",
    dollarOutcome:
      "Stop paying for programs that don't move the needle. HRM's outcome assessment tells you exactly which interventions avoided cost and which didn't, so you can reallocate budget toward what works.",
    proof:
      "Outcome reports are generated from the same 95%+ accuracy normalized data that powers HRM's predictions, ensuring your program evaluations are defensible and comparable across periods.",
    cta: "Book a free demo",
    features: [
      {
        title: "Program ROI measurement",
        description:
          "Quantify the dollar impact of each wellness, care management, or intervention program against a predicted baseline.",
      },
      {
        title: "Before-and-after comparison",
        description:
          "Compare predicted vs. actual spend for intervened members to isolate the program's financial effect.",
      },
      {
        title: "Segment-level analysis",
        description:
          "Slice outcomes by population segment, diagnosis category, or risk band to see where programs help most.",
      },
      {
        title: "Executive-ready reports",
        description:
          "Auto-generated reports that translate clinical activity into financial language for finance and executive audiences.",
      },
    ],
  },
  {
    slug: "healthcare-management",
    title: "Healthcare Management",
    shortTitle: "Care Management",
    icon: HeartPulse,
    tagline: "Act on the risks HRM identifies, and track the results.",
    whatItDoes:
      "The optional Care Management module adds the operational tools your care team needs to act on HRM's predictions: scheduling, member contact by phone, text, and email, encounter logging, and outcomes reporting, all integrated with the predictive analytics platform.",
    mechanism:
      "When HRM flags a high-risk member, your care team can schedule outreach, log every encounter, track interventions, and measure outcomes without leaving the platform. The module closes the loop between prediction and action, so identified risk becomes managed risk.",
    dollarOutcome:
      "Predicting risk is only valuable if you act on it. The Care Management module ensures every flagged member gets contacted, every intervention gets logged, and every outcome gets measured in dollars.",
    proof:
      "Integrated with HRM's 95%+ accuracy predictive model. Encounter data feeds back into outcome assessment, so you can measure the dollar impact of every care management interaction.",
    cta: "Book a free demo",
    features: [
      {
        title: "Outreach scheduling",
        description:
          "Schedule phone, text, or email outreach to members flagged by HRM, with automated reminders and follow-up tracking.",
      },
      {
        title: "Encounter logging",
        description:
          "Log every member interaction, intervention, and outcome in a structured format that feeds back into HRM's analytics.",
      },
      {
        title: "Care plan tracking",
        description:
          "Track each member's care plan, milestones, and progress, with automatic alerts when interventions are overdue.",
      },
      {
        title: "Outcomes reporting",
        description:
          "Measure the dollar impact of care management activities using HRM's outcome assessment engine.",
      },
    ],
  },
  {
    slug: "stop-loss-reporting",
    title: "Stop-Loss Reporting",
    shortTitle: "Stop-Loss Reporting",
    icon: ShieldAlert,
    tagline: "Know your shock-loss members before they shock your plan.",
    whatItDoes:
      "HRM identifies the members most likely to generate shock-loss claims and the cost drivers behind them, giving stop-loss carriers, captives, and self-funded employers the intelligence to price, negotiate, and manage risk with confidence.",
    mechanism:
      "HRM analyzes diagnosis trajectories, pharmacy spend patterns, and historical claim frequency to project which members are approaching stop-loss thresholds. Cost-driver analysis breaks down the clinical conditions and service categories driving each member's projected spend.",
    dollarOutcome:
      "Shock-loss claims can destabilize a self-funded plan in a single event. HRM gives you months of lead time to intervene, negotiate stop-loss premiums with data, and manage the members most likely to cross your specific threshold.",
    proof:
      "Built on the same 95%+ accuracy normalized data and predictive model that powers all of HRM's analytics. Shock-loss projections are configurable to your specific attachment point.",
    cta: "Book a free demo",
    features: [
      {
        title: "Shock-loss member identification",
        description:
          "Flag members projected to cross your specific stop-loss attachment point, ranked by projected dollar exposure.",
      },
      {
        title: "Cost-driver breakdown",
        description:
          "See the clinical conditions, service categories, and pharmacy spend driving each high-risk member's projected cost.",
      },
      {
        title: "Attachment-point configuration",
        description:
          "Set your specific stop-loss threshold and get projections calibrated to your plan's actual risk exposure.",
      },
      {
        title: "Negotiation-ready reports",
        description:
          "Data-backed reports that support stop-loss premium negotiations, renewal discussions, and captive pricing decisions.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
