import type { Faq } from "./types";

export type Solution = {
  slug: string;
  name: string;
  kicker: string;
  title: string; // SEO title
  description: string; // meta description
  answer: string; // answer-first summary, quotable by AI engines
  lede: string;
  sections: { heading: string; body: string[] }[];
  listHeading: string;
  list: string[];
  forAudiences: string[]; // audience slugs
  faqs: Faq[];
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "healthcare-predictive-analytics",
    name: "Healthcare Predictive Analytics",
    kicker: "Forecast",
    title: "Healthcare Predictive Analytics for Health Plans",
    description:
      "Forecast each member's medical and pharmacy cost, ER visits and inpatient days for the next 12 months, and intervene before costs rise.",
    answer:
      "Healthcare predictive analytics combines past clinical and claims data with compliance against national standards of care to forecast each member's future health events and costs. HCRM's Health Risk Monitor produces that forecast for the next 12 months, in dollars, so care teams can reach rising-risk members before the expensive claim.",
    lede:
      "Members with chronic illness consume more than 85% of healthcare costs, especially when their disease is uncontrolled. But this year's cost doesn't tell you who will be expensive next year. Prediction does.",
    sections: [
      {
        heading: "Why current cost is the wrong signal",
        body: [
          "Identifying and stratifying members with chronic conditions for intervention can improve their health and bring costs down. The difficulty is timing: current costs do not necessarily indicate future costs, so a list built from last year's claims is always a step behind.",
          "Predictive analytics integrates past clinical and claims data with compliance with national standards of care to forecast future healthcare events and costs at the member level. You can identify high-risk patients, improve treatment plans, track treatment compliance and outcomes, and reduce the cost of your health plan.",
        ],
      },
      {
        heading: "Streamline health plan management",
        body: [
          "HCRM's goal is to quickly identify and stratify members with high future clinical risk and cost, simplify member health information, and give your team accurate information to act on. The system streamlines care management while improving member health and reducing cost.",
          "It also identifies “Movers”: members expected to see a substantial increase in cost and clinical risk. A Chronic Impact Score flags members who would benefit from intervention before projected cost alone would mark them as at risk.",
        ],
      },
    ],
    listHeading: "What organizations get from it",
    list: [
      "Overall improvement in member health",
      "Generally lower annual cost of operations",
      "Easy access to electronic health records",
      "Improved patient outcomes through early intervention",
      "Higher productivity and improved workflow",
      "Identification of high-risk members",
      "Cost reduction through preventive measures",
      "Tracked member treatment and medication compliance",
    ],
    forAudiences: ["self-funded-employers-2", "health-plans-2", "population-health-management-teams-2", "employer-clinics-page"],
    faqs: [
      {
        q: "What does HCRM's predictive model forecast?",
        a: "For every member, Health Risk Monitor predicts medical cost, pharmacy cost, emergency room visits and inpatient days for the next 12 months. It also reports relative risk against national norms, acute-care risk, the long-term impact of co-morbid chronic conditions and poor compliance with standards of care, and the member's motivation to maintain or improve health behaviors.",
      },
      {
        q: "How much claims history does the model need?",
        a: "HCRM's predictive analytics uses 24 months of medical and pharmacy claims, plus eligibility and, where available, lab and EMR data, and evaluates more than 2,800 health and cost measures per member.",
      },
      {
        q: "How accurate is it?",
        a: "HCRM's model is regarded as among the most accurate claims-based prospective models available. A published comparison against the Society of Actuaries' 2016 study of claims-based risk tools showed HRM leading the industry in clinical predictive modeling accuracy.",
      },
    ],
    cta: "See your own population's next 12 months.",
  },
  {
    slug: "data-normalization-and-validation",
    name: "Data Normalization & Validation",
    kicker: "Foundation",
    title: "Healthcare Claims Data Normalization & Validation",
    description:
      "HCRM collects claims, eligibility and lab data from 250+ sources in their existing layouts, then validates and normalizes it to over 95% accuracy.",
    answer:
      "Data normalization converts claims from hundreds of different carriers, TPAs and PBMs into one common structure, and validation finds and fixes missing, invalid or inconsistent records. HCRM does both before any prediction is made, producing accuracy rates over 95%. A forecast is only as good as the data under it.",
    lede:
      "Predictive modeling starts with data. HCRM's proprietary system transforms raw data into a common national dataset and runs extensive quality checks, so the forecast rests on records you can trust.",
    sections: [
      {
        heading: "How data gets to HCRM: no IT project required",
        body: [
          "You give HCRM contacts at your carrier or TPA and your PBM. HCRM requests the historical data and a monthly file feed using the file layouts and transmission protocols already in place with more than 250 medical and Rx data sources.",
          "On receipt, HCRM's team validates each data point, identifying problems such as missing or inconsistent data, home-grown codes and invalid diagnosis or treatment codes, and corrects them. The data is then integrated into a common national dataset, which lets organizations of any size participate and keeps costs down.",
        ],
      },
      {
        heading: "What you get back",
        body: [
          "Once the data is normalized and validated, HCRM's predictive modeling system predicts member clinical events, risks, costs, and compliance with professional standards of care. Health Risk Monitor lets you stratify the population by demographic and clinical risk metrics.",
          "Clients can also receive a monthly data feed with forecasts and normalized claims for their own reporting, or to send reports to their customers automatically. HCRM can give authorized vendors access to the same information, and offers an on-site installation for organizations that want to keep data in-house. A Daily Dashboard alert system runs on daily claims feeds from claims administrators.",
        ],
      },
    ],
    listHeading: "What HCRM takes off your plate",
    list: [
      "Collecting medical and pharmacy claims, eligibility and lab data from your vendors",
      "Accepting data in each vendor's standard layout, so no reformatting is needed",
      "Validating every data point and correcting invalid or home-grown codes",
      "Normalizing hundreds of sources into one national dataset",
      "Monthly refresh, so forecasts always reflect the latest claims",
      "Optional monthly outbound feed of forecasts and clean claims",
    ],
    forAudiences: ["third-party-administrators-2", "insurance-companies-with-fully-insured-plans-2", "health-plans-2", "health-insurance-consultants-2"],
    faqs: [
      {
        q: "What data does HCRM need?",
        a: "Medical and pharmacy claims plus eligibility, ideally 24 months of history followed by a monthly feed. Lab results and EMR data improve predictions when available. HCRM accepts the standard layouts your carrier, TPA and PBM already produce.",
      },
      {
        q: "Do we have to reformat or send the data ourselves?",
        a: "No. You provide contacts at your claims administrator and PBM, and HCRM requests the data directly using existing layouts and transmission protocols with more than 250 medical and Rx sources.",
      },
      {
        q: "Where is the data stored?",
        a: "HCRM stores all data in the United States and holds a SOC 2 Type 2 certification, independently audited since 2018. Organizations that prefer to keep data in-house can run HRM on-site in their own data center.",
      },
    ],
    cta: "Find out how fast your data could be forecast-ready.",
  },
  {
    slug: "clinical-reporting-and-outcome-assessment",
    name: "Clinical Reporting & Outcome Assessment",
    kicker: "Proof",
    title: "Clinical Reporting & Outcome Assessment for Care Programs",
    description:
      "Prove your wellness or care program works. Track participants' claims cost, utilization, risk scores and standards-of-care compliance, with ROI reports.",
    answer:
      "Clinical outcome assessment measures whether a wellness, disease management or care program is working. HCRM compares participants' claims cost, utilization, risk-score trends and compliance with standards of care over time, and against non-participants, so you can report program effectiveness and ROI in dollars.",
    lede:
      "Every care program eventually gets asked the same question: did it work? HCRM answers it with claims, not anecdotes.",
    sections: [
      {
        heading: "How the assessment works",
        body: [
          "HCRM monitors changes among participating members in claims cost, utilization trends, risk score trends, and compliance with standards of care to determine whether program strategies are effective. The Care Management Module adds customized scoring tools and member-level reporting to evaluate each intervention strategy.",
          "Through Health Risk Monitor, monthly-updated reports show the cost drivers in the population and how risk changes over the course of the program. Reports can feed automated reporting to your customers, showing the value and ROI of your programs.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Designed for organizations running a wellness or disease management program, clinical outcome reporting provides evidence that clinical practices work, tracks treatment compliance and outcomes, and gives decision-makers what they need to act early. The “Playground” in Health Risk Monitor lets clients trend any cohort, such as catastrophic members or program participants, against a baseline.",
        ],
      },
    ],
    listHeading: "What it improves",
    list: [
      "Health management strategy",
      "Targeted member engagement",
      "Actionable, meaningful reporting",
      "Productivity and workflow",
      "Fewer resources required",
      "Embedded tools to assess electronic data",
    ],
    forAudiences: ["population-health-management-teams-2", "health-management-mendors", "employer-clinics-page", "accountable-care-organizations-2"],
    faqs: [
      {
        q: "How do you measure a wellness program's ROI with claims data?",
        a: "Compare the cost, utilization and risk trends of members who participate with those who do not, and with their own predicted baseline. HRM stratifies the population into cohorts, tracks each one monthly, and produces standardized reports showing program effectiveness and ROI.",
      },
      {
        q: "Can the reports be white-labeled for our clients?",
        a: "Yes. Cohort, group and book-of-business reports can be white-labeled, customized, generated monthly, quarterly or annually, and emailed automatically to clients, consultants or other parties.",
      },
    ],
    cta: "Show your clients the outcome, not just the activity.",
  },
  {
    slug: "healthcare-management",
    name: "Healthcare Management Software",
    kicker: "Act",
    title: "Care Management Software for Health Coaches & Nurses",
    description:
      "Care management software that turns forecasts into outreach: risk-based assignments, scheduling, text and email, care plans, notes and outcomes reports.",
    answer:
      "HCRM's Care Management Module is an optional add-on to Health Risk Monitor that turns forecasts into outreach. Coaches and nurses get risk-based outreach assignments, scheduling, text and email, customized care plans, time and encounter documentation, and outcomes and billing reports, all with a single login.",
    lede:
      "A forecast is only valuable if someone acts on it. The Care Management Module puts the forecast, the member, and the outreach in the same place.",
    sections: [
      {
        heading: "One workflow from prediction to patient",
        body: [
          "The module is an end-to-end workflow system that connects the patient record to care management tools, improving the efficiency, effectiveness and control of your patient care programs. It includes predictive data aggregation, labor statistics, risk profiling, and care management workflows, all accessible with a single login.",
          "Setup, training, and ongoing support for health coaches, managers and others are included. If you already use care management software, HRM can integrate with it instead.",
        ],
      },
      {
        heading: "Built for the people doing the outreach",
        body: [
          "Coaches can create workflows and track encounters across one or more care programs, contact members by phone, text or email, and collect real-time data from patients. Trends roll up at the member, cohort, group and book-of-business level.",
          "The module also captures usage data, such as number of contacts and engagement time, so managers can allocate resources, improve processes and strengthen reporting.",
        ],
      },
    ],
    listHeading: "Key features",
    list: [
      "Schedule and track calls and outreach",
      "Customizable text and email alerts",
      "Customized care plans for coaches and nurses",
      "Outreach assignments based on forecasted risk",
      "Time documentation and patient notes",
      "Insight into each member's ability to respond to a care plan",
      "Efficient resource allocation and tailored outreach",
      "Individual and program performance measurement",
    ],
    forAudiences: ["population-health-management-teams-2", "health-management-mendors", "health-plans-2", "accountable-care-organizations-2"],
    faqs: [
      {
        q: "Do we have to replace our current care management system?",
        a: "No. The Care Management Module is optional. HRM's predictive modeling can integrate with care management software you already use.",
      },
      {
        q: "Who is the Care Management Module for?",
        a: "Health coaches, nurses and care managers in population health, disease management, wellness and large case management programs, plus the managers who need to report on their performance.",
      },
    ],
    cta: "Give your care team a list worth calling.",
  },
  {
    slug: "stop-loss-reporting",
    name: "Stop-Loss Reporting",
    kicker: "Protect",
    title: "Stop-Loss & MGU Reporting: Predict Shock Losses",
    description:
      "Stop-loss reporting for carriers, MGUs and captives: probable shock losses, high-cost members and specialty drugs for the next 12 months, with daily alerts.",
    answer:
      "HCRM's stop-loss reporting gives carriers, MGUs and captives a 12-month forward view of each group: predicted total and pharmacy cost, probable shock-loss members, clinical risk drivers and specialty drugs. Underwriters quote renewals faster and more accurately, and a Daily Dashboard flags new members likely to hit the specific deductible before claims are incurred.",
    lede:
      "Underwriting tables price the average. Shock losses live in the tail. HRM shows you who is in it.",
    sections: [
      {
        heading: "What underwriters see",
        body: [
          "HRM gives stop-loss carriers and managing general underwriters key information about probable shock losses and overall aggregate spending, including high-cost, high-risk patients for the next 12 months: predicted total cost, estimated pharmacy spend, major clinical risk drivers, and specialty pharmaceuticals.",
          "Custom underwriting reports summarize group clinical and cost risk, report on specific medical conditions, specialty drugs and infusions, and isolate probable shock-loss cases.",
        ],
      },
      {
        heading: "Monitoring through the policy period",
        body: [
          "Carriers can generate fast, accurate renewal quotes. Monthly HRM updates plus the Daily Dashboard identify new plan members likely to hit the specific deductible within the policy period, so carriers can monitor plan performance and spot new shock losses before claims are incurred.",
          "The HCRM model predicts cost by clinical risk driver, pharmacy cost, ER visits and inpatient days, and measures each member's risk relative to national norms.",
        ],
      },
    ],
    listHeading: "Report contents",
    list: [
      "Probable shock-loss cases, isolated",
      "Predicted total and pharmacy cost per member",
      "Major clinical risk drivers",
      "Specialty drugs, infusions and potential transplants",
      "Top 10 forecast members per group",
      "Loss ratio, retention and high-risk areas by group and book",
    ],
    forAudiences: ["stop-loss-carriers-and-captives-2", "self-funded-employers-2", "third-party-administrators-2", "health-insurance-consultants-2"],
    faqs: [
      {
        q: "What is a shock loss in stop-loss insurance?",
        a: "A shock loss, or shock claim, is a single member's claims that exceed the specific stop-loss deductible, typically driven by catastrophic events, transplants, cancer or high-cost specialty drugs. Predicting them before they occur lets carriers price accurately and lets plans start case management early.",
      },
      {
        q: "How does HCRM help with stop-loss renewals?",
        a: "Custom underwriting reports summarize each group's forecast clinical and cost risk, list members likely to exceed the specific deductible, and flag specialty drugs and infusions, which speeds renewal quoting and improves its accuracy.",
      },
      {
        q: "What is the Daily Dashboard?",
        a: "An alert system built on daily medical and pharmacy claims feeds. It notifies users of specific member claims for conditions such as strokes or events such as inpatient admissions, customized per client, for large case management, shock-loss reporting and captive risk management.",
      },
    ],
    cta: "Price the tail, not just the average.",
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug)!;
