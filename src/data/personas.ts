import {
  Building2,
  Briefcase,
  Shield,
  ShieldCheck,
  Users,
  Stethoscope,
  HeartPulse,
  ClipboardList,
  FileSpreadsheet,
  Network,
  Package,
} from "lucide-react";

export interface Persona {
  slug: string;
  title: string;
  shortTitle: string;
  icon: typeof Building2;
  tagline: string;
  challenge: string;
  howHcrmHelps: string;
  dollarOutcome: string;
  cta: string;
  keyPoints: { title: string; description: string }[];
}

export const personas: Persona[] = [
  {
    slug: "self-funded-employers",
    title: "Self-Funded Employers",
    shortTitle: "Self-Funded Employers",
    icon: Building2,
    tagline: "Control your healthcare spend before it controls you.",
    challenge:
      "You self-fund your health plan to control costs, but you're flying blind. Claims data arrives weeks late, risk scores feel abstract, and by the time a high-cost claim lands, it's too late to intervene. Renewal negotiations rely on carrier-provided data, not your own intelligence.",
    howHcrmHelps:
      "HRM ingests your medical and pharmacy claims, normalizes them to 95%+ accuracy, and forecasts which members are trending toward high-cost events, months before claims arrive. You walk into renewal with your own data, your own projections, and dollar-quantified risk.",
    dollarOutcome:
      "Identify shock-loss members before they destabilize your plan. Measure which wellness programs actually reduce cost. Negotiate renewal with 12 months of foresight, not hindsight.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "See risk in dollars",
        description:
          "Every member's risk is expressed as projected spend, not an abstract score your finance team can't use.",
      },
      {
        title: "Intervene before claims land",
        description:
          "12 months of lead time on high-risk members gives your care team time to act.",
      },
      {
        title: "Measure program ROI",
        description:
          "Know which wellness and care management programs actually avoided cost, quantified in dollars.",
      },
      {
        title: "Renewal-ready intelligence",
        description:
          "Walk into renewal negotiations with your own data-backed cost projections, not carrier narratives.",
      },
    ],
  },
  {
    slug: "health-insurance-consultants",
    title: "Health Insurance Consultants",
    shortTitle: "Consultants & Brokers",
    icon: Briefcase,
    tagline: "Give every client the foresight their competitors lack.",
    challenge:
      "Your clients expect you to deliver insights, not just plan options. But claims data is messy, delayed, and hard to translate into actionable advice. You need a tool that lets you show each client exactly where their risk is heading, in dollars, before renewal season.",
    howHcrmHelps:
      "HRM gives you a client-facing predictive analytics platform that turns raw claims into clear, dollar-quantified risk forecasts. You can show each client their high-risk members, projected spend, and program ROI, positioning yourself as a data-driven advisor rather than a plan-presenter.",
    dollarOutcome:
      "Differentiate your practice with predictive analytics that 95%+ accuracy clients can trust. Show prospects a dollar-quantified view of their risk before they sign, and demonstrate ROI on your recommendations after.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Client-ready analytics",
        description:
          "Present dollar-quantified risk forecasts to clients and prospects without building custom dashboards.",
      },
      {
        title: "Multi-client management",
        description:
          "Run HRM across multiple client populations and compare benchmarks to strengthen your advisory practice.",
      },
      {
        title: "Program ROI proof",
        description:
          "Show clients the dollar impact of programs you recommended, building retention and referrals.",
      },
      {
        title: "Prospecting tool",
        description:
          "Use the 1-month free trial as a prospecting offer: run their claims, show them their risk, win the account.",
      },
    ],
  },
  {
    slug: "insurance-companies",
    title: "Insurance Companies (Fully-Insured)",
    shortTitle: "Insurance Companies",
    icon: Shield,
    tagline: "Price risk with the accuracy your book demands.",
    challenge:
      "Pricing fully-insured plans requires accurate population risk assessment. But raw claims data is inconsistent across sources, and traditional risk-scoring tools produce abstract numbers that underwriters and actuaries struggle to translate into pricing decisions.",
    howHcrmHelps:
      "HRM normalizes claims data to 95%+ accuracy and produces dollar-quantified risk forecasts at the member and group level. Your underwriting and actuarial teams get clean, validated data and spend projections they can use directly in pricing models.",
    dollarOutcome:
      "More accurate pricing, better risk selection, and fewer surprises at renewal. HRM's dollar-denominated forecasts integrate directly into your actuarial workflow.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Underwriting-grade data",
        description:
          "95%+ accuracy normalized claims give your actuaries a reliable foundation for pricing decisions.",
      },
      {
        title: "Dollar-denominated risk",
        description:
          "Risk expressed as projected spend, not abstract scores, so pricing models can consume it directly.",
      },
      {
        title: "Group-level forecasting",
        description:
          "Project spend at the group level to support plan-level pricing and risk adjustment.",
      },
      {
        title: "Multi-source ingestion",
        description:
          "Normalize claims across any TPA, provider, or pharmacy source for consistent analysis.",
      },
    ],
  },
  {
    slug: "stop-loss-carriers-captives",
    title: "Stop-Loss Carriers & Captives",
    shortTitle: "Stop-Loss & Captives",
    icon: ShieldCheck,
    tagline: "Know your shock-loss exposure before it knows you.",
    challenge:
      "Stop-loss pricing and captive management depend on identifying which members will generate the claims that cross your attachment point. Traditional tools give you lagging indicators, not forward-looking projections, and cost drivers are often opaque.",
    howHcrmHelps:
      "HRM identifies members projected to cross your specific attachment point, ranked by dollar exposure, with cost-driver breakdowns showing the clinical conditions and service categories behind each projection. You price, negotiate, and manage risk with months of lead time.",
    dollarOutcome:
      "Price premiums with data-backed projections. Identify shock-loss members before claims land. Give captive members the intelligence to manage their own risk, reducing the claims that hit your layer.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Attachment-point projections",
        description:
          "Set your specific threshold and get member-level projections calibrated to your risk layer.",
      },
      {
        title: "Cost-driver analysis",
        description:
          "See the clinical conditions and service categories driving each high-risk member's projected spend.",
      },
      {
        title: "Captive member intelligence",
        description:
          "Give captive members their own risk forecasts so they can intervene and reduce claims that hit your layer.",
      },
      {
        title: "Negotiation-ready reports",
        description:
          "Data-backed reports that support premium pricing, renewal discussions, and captive formation decisions.",
      },
    ],
  },
  {
    slug: "population-health-management-teams",
    title: "Population Health Management Teams",
    shortTitle: "Population Health",
    icon: Users,
    tagline: "Manage populations with foresight, not just hindsight.",
    challenge:
      "Your job is to manage the health and cost of a population, but you're working with lagging indicators. By the time you see a cost trend in a claims report, the spend has already happened. You need forward-looking analytics that tell you where the population is heading, not where it's been.",
    howHcrmHelps:
      "HRM forecasts population-level spend trajectories, broken down by diagnosis category, pharmacy, and risk band. You see which segments are trending toward higher cost, which interventions are working, and where to focus your limited resources for maximum dollar impact.",
    dollarOutcome:
      "Prioritize interventions by projected dollar impact, not just clinical severity. Measure which population health programs actually reduced spend. Allocate your budget toward the segments and conditions with the highest projected cost.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Population trend forecasting",
        description:
          "See where your entire population's spend is heading, by diagnosis category, pharmacy, and risk band.",
      },
      {
        title: "Segment-level risk",
        description:
          "Identify which population segments are trending toward higher cost before the spend arrives.",
      },
      {
        title: "Intervention prioritization",
        description:
          "Rank potential interventions by projected dollar impact so you can allocate resources effectively.",
      },
      {
        title: "Outcome measurement",
        description:
          "Quantify the dollar impact of population health programs against a predicted baseline.",
      },
    ],
  },
  {
    slug: "clinics-healthcare-providers",
    title: "Clinics & Healthcare Providers",
    shortTitle: "Clinics & Providers",
    icon: Stethoscope,
    tagline: "Show payers the value you deliver, in dollars.",
    challenge:
      "You deliver care that improves outcomes and reduces cost, but proving that value to payers and employers is difficult. Participation metrics don't translate to financial impact, and you lack the claims-based analytics to quantify what you saved.",
    howHcrmHelps:
      "HRM measures the actual dollar impact of your care interventions by comparing predicted spend against actual spend for the members you treat. You get defensible, claims-based outcome reports that prove your value to payers, employers, and ACO partners.",
    dollarOutcome:
      "Demonstrate dollar-quantified ROI to payers and employers. Negotiate value-based contracts with claims-based evidence. Retain contracts by proving your interventions reduced downstream cost.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Claims-based outcome proof",
        description:
          "Measure the dollar impact of your care interventions using the same claims data payers use to evaluate you.",
      },
      {
        title: "Value-based contracting",
        description:
          "Bring dollar-quantified outcome reports to contract negotiations to support value-based care arrangements.",
      },
      {
        title: "Member risk identification",
        description:
          "See which of your attributed members are trending toward high-cost events so you can prioritize outreach.",
      },
      {
        title: "Payer-ready reports",
        description:
          "Generate outcome reports that speak the financial language payers and employers need to see.",
      },
    ],
  },
  {
    slug: "employer-clinics",
    title: "Employer Clinics",
    shortTitle: "Employer Clinics",
    icon: HeartPulse,
    tagline: "Prove your clinic is reducing downstream cost.",
    challenge:
      "Your employer-funded clinic provides care that should reduce downstream claims, but you can't prove it without claims-based analytics. When budget cuts come, you lack the dollar-denominated evidence to defend your funding.",
    howHcrmHelps:
      "HRM compares the predicted spend of members who use your clinic against their actual spend, quantifying the downstream cost your clinic avoided. You get dollar-denominated ROI reports that make the case for continued or expanded clinic funding.",
    dollarOutcome:
      "Defend your clinic's budget with dollar-quantified evidence. Show the employer exactly how much downstream cost your clinic avoided. Expand your clinic's scope with data-backed confidence.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Downstream cost avoidance",
        description:
          "Measure the dollar value of ER visits, hospitalizations, and specialist referrals your clinic prevented.",
      },
      {
        title: "Budget defense",
        description:
          "Bring dollar-quantified ROI reports to budget discussions to justify continued or expanded clinic funding.",
      },
      {
        title: "Member risk targeting",
        description:
          "Identify which employer-plan members are trending toward high-cost events so your clinic can proactively reach out.",
      },
      {
        title: "Utilization insights",
        description:
          "See how clinic utilization correlates with overall plan cost trends to optimize your service mix.",
      },
    ],
  },
  {
    slug: "health-plans",
    title: "Health Plans",
    shortTitle: "Health Plans",
    icon: ClipboardList,
    tagline: "Give your members and employers the foresight to manage risk.",
    challenge:
      "Health plans need to demonstrate value to employer groups while managing their own risk. Traditional analytics tools provide lagging reports that don't help employers act before costs arrive. You need a predictive platform that gives your groups actionable foresight.",
    howHcrmHelps:
      "HRM gives your plan a predictive analytics layer that forecasts member and group-level spend, identifies high-risk members early, and measures program outcomes in dollars. Offer it as a value-added service to employer groups, or use it internally for risk management and population health.",
    dollarOutcome:
      "Differentiate your plan with predictive analytics that employers can act on. Reduce claims cost by identifying high-risk members early. Retain employer groups by demonstrating dollar-quantified program ROI.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Employer group analytics",
        description:
          "Offer HRM as a value-added service that gives employer groups dollar-quantified risk forecasts.",
      },
      {
        title: "Member risk stratification",
        description:
          "Stratify your member population by projected dollar risk to focus care management resources effectively.",
      },
      {
        title: "Program outcome measurement",
        description:
          "Quantify the dollar impact of your health programs to demonstrate value to employer groups.",
      },
      {
        title: "Risk adjustment support",
        description:
          "Use accurate, normalized claims data to support risk adjustment submission and validation.",
      },
    ],
  },
  {
    slug: "third-party-administrators",
    title: "Third Party Administrators",
    shortTitle: "TPAs",
    icon: FileSpreadsheet,
    tagline: "Give every self-funded client predictive intelligence.",
    challenge:
      "Your self-funded clients expect more than claims processing. They want insights that help them manage cost and risk. But you lack a predictive analytics platform that can run across all your clients and produce dollar-quantified forecasts.",
    howHcrmHelps:
      "HRM integrates with your claims processing workflow, normalizes data to 95%+ accuracy, and produces member and group-level spend forecasts for each client. You deliver predictive analytics as a value-added service without building a custom platform.",
    dollarOutcome:
      "Differentiate your TPA services with predictive analytics. Retain clients by showing them dollar-quantified risk forecasts and program ROI. Win new clients by offering the 1-month free trial as a prospecting tool.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Multi-client analytics",
        description:
          "Run HRM across all your self-funded clients with consistent, 95%+ accuracy data normalization.",
      },
      {
        title: "Client-facing reports",
        description:
          "Deliver dollar-quantified risk forecasts and program ROI reports to each client without custom dashboards.",
      },
      {
        title: "Claims workflow integration",
        description:
          "HRM ingests claims directly from your processing workflow, so analytics are always current.",
      },
      {
        title: "Prospecting advantage",
        description:
          "Offer prospects a 1-month free trial on their own claims to demonstrate value before they switch TPAs.",
      },
    ],
  },
  {
    slug: "accountable-care-organizations",
    title: "Accountable Care Organizations",
    shortTitle: "ACOs",
    icon: Network,
    tagline: "Manage downside risk with dollar-quantified foresight.",
    challenge:
      "ACOs take on downside financial risk based on the total cost of care for their attributed population. But you lack claims-based predictive analytics that tell you which attributed members are trending toward high-cost events, and which interventions are actually reducing total cost of care.",
    howHcrmHelps:
      "HRM forecasts spend for your attributed population, identifies high-risk members before claims land, and measures the dollar impact of your care coordination interventions. You manage downside risk with the same data clarity your payer partners use.",
    dollarOutcome:
      "Reduce total cost of care by intervening on high-risk members before claims arrive. Quantify the dollar impact of your care coordination to demonstrate shared savings. Manage downside risk with data-backed confidence.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Attributed population forecasting",
        description:
          "Forecast total cost of care for your attributed population, by member and by diagnosis category.",
      },
      {
        title: "High-risk member identification",
        description:
          "See which attributed members are trending toward high-cost events with months of lead time.",
      },
      {
        title: "Care coordination ROI",
        description:
          "Measure the dollar impact of your care coordination interventions against a predicted baseline.",
      },
      {
        title: "Shared savings evidence",
        description:
          "Generate dollar-quantified outcome reports that support shared savings calculations and negotiations.",
      },
    ],
  },
  {
    slug: "health-management-vendors",
    title: "Health Management Vendors",
    shortTitle: "Health Mgmt Vendors",
    icon: Package,
    tagline: "Prove your program's dollar impact with claims-based evidence.",
    challenge:
      "You sell wellness, care management, or health improvement programs to employers and plans. But your clients ask for proof that your program reduced claims cost, and you lack the claims-based analytics to deliver it. Participation metrics don't satisfy finance-minded buyers.",
    howHcrmHelps:
      "HRM measures the actual dollar impact of your program by comparing predicted spend against actual spend for the members you serve. You get claims-based outcome reports that prove your program's ROI to current clients and prospects.",
    dollarOutcome:
      "Win more contracts with dollar-quantified proof of your program's impact. Retain clients by showing continuous ROI. Differentiate yourself from competitors who can only show engagement metrics.",
    cta: "Book a free demo",
    keyPoints: [
      {
        title: "Claims-based ROI proof",
        description:
          "Measure the dollar impact of your program using the same claims data your clients use to evaluate ROI.",
      },
      {
        title: "Prospect-ready reports",
        description:
          "Bring dollar-quantified outcome reports from existing clients to new prospect meetings.",
      },
      {
        title: "Program optimization",
        description:
          "See which segments of your program deliver the most dollar impact and optimize your service mix.",
      },
      {
        title: "Client retention",
        description:
          "Demonstrate ongoing ROI to retain clients at renewal, backed by claims-based evidence.",
      },
    ],
  },
];

export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find((p) => p.slug === slug);
}
