import type { Faq } from "./types";

export type AudienceGroup = {
  id: string;
  label: string;
  question: string; // used by the home-page path finder
  summary: string;
};

export const audienceGroups: AudienceGroup[] = [
  {
    id: "advisors",
    label: "Brokers, consultants & TPAs",
    question: "I advise or administer plans for employer clients",
    summary: "Win and keep clients with forecasts, white-labeled reporting and proof that your recommendations worked.",
  },
  {
    id: "risk",
    label: "Employers, carriers & health plans",
    question: "My organization carries the health-cost risk",
    summary: "See next year's claims, and the members driving them, in time to change the outcome.",
  },
  {
    id: "clinical",
    label: "Clinics, providers & ACOs",
    question: "We deliver care to patients",
    summary: "Join claims to your EMR for a 360-degree view of every patient, and price risk contracts with confidence.",
  },
  {
    id: "programs",
    label: "Population health & wellness vendors",
    question: "We run care or wellness programs",
    summary: "Target the members who will benefit most, and prove your program's outcomes in dollars.",
  },
];

export type Milestone = { when: string; title: string; body: string };

export type Audience = {
  slug: string;
  group: AudienceGroup["id"];
  name: string;
  short: string;
  title: string;
  description: string;
  answer: string;
  lede: string;
  context: string[];
  means: { h: string; p: string }[];
  capabilities: string[];
  horizon: Milestone[];
  claim: string; // "what you'll be able to say in a year"
  solutions: string[];
  faqs: Faq[];
};

// Ported from each hcrm.net client page; "means", "horizon" and "claim" are new framing
// built only from capabilities stated on hcrm.net.
export const audiences: Audience[] = [
  {
    slug: "health-insurance-consultants-2",
    group: "advisors",
    name: "Health Insurance Consultants & Brokers",
    short: "Navigate plan options and point solutions with data, then show clients what your recommendations delivered.",
    title: "Predictive Analytics for Benefits Brokers & Consultants",
    description:
      "12-month claims forecasts, white-labeled reports and outcome tracking that help brokers and consultants advise employers and defend renewals.",
    answer:
      "For brokers and benefits consultants, HCRM turns each employer client's claims into a 12-month forecast of cost and risk, identifies the members and conditions driving it, and produces white-labeled reports on a set schedule. You walk into renewal with a forward view the carrier doesn't have, and a year later you can show whether your recommendations worked.",
    lede:
      "Consultants are the intermediary between organizations and insurers. HCRM's analytics simplify navigating plan options so you can offer clients more informed, tailored and cost-effective guidance and proposals.",
    context: [
      "Healthcare consultants play a crucial role between employers and the insurance market. HCRM equips your practice with health plan analytics to manage, track and report on the performance of the solutions you recommend.",
      "Instead of reporting last year's spend back to a client, you can show them where next year's spend is coming from, which point solutions address it, and how those programs perform once in place.",
    ],
    means: [
      { h: "Walk into renewal with the forecast", p: "Group-level and member-level projections of the next 12 months show the client where spend is heading before the carrier quotes it." },
      { h: "Recommend point solutions with evidence", p: "Know which conditions, cohorts and gaps in care are driving cost, then match vendors to the actual problem." },
      { h: "Report under your own brand", p: "White-labeled cohort, group and book-of-business reports run monthly, quarterly or annually and email themselves to clients." },
    ],
    capabilities: [
      "Standard reports at the cohort (e.g. asthma), employer-group and book-of-business level highlighting cost and clinical trends and opportunities to reduce risk and cost",
      "White-labeled, customized reports on a monthly, quarterly or annual schedule, automatically emailed to clients and other parties",
      "A Daily Dashboard alerting you to specific member claims or events, such as strokes or inpatient admissions, from daily medical and pharmacy claims feeds",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Data in, no client IT work", body: "HCRM collects 24 months of claims from the client's carrier or TPA and PBM in their existing layouts." },
      { when: "Month 2", title: "First forecast for each client", body: "Every group gets a 12-month projection, cost drivers, and a stratified list of rising-risk members." },
      { when: "Months 3–6", title: "Point solutions placed with evidence", body: "Recommend programs aimed at the conditions and gaps in care actually driving the forecast." },
      { when: "Months 6–12", title: "Branded reporting on autopilot", body: "Scheduled white-label reports keep every client informed between meetings." },
      { when: "Months 12–18", title: "Renewal with proof", body: "Compare actual results with the predicted baseline and show the outcome of each recommendation." },
    ],
    claim: "“We showed every client next year's claims before the carrier did, and we can show what our recommendations saved.”",
    solutions: ["healthcare-predictive-analytics", "clinical-reporting-and-outcome-assessment", "stop-loss-reporting"],
    faqs: [
      {
        q: "How do benefits consultants use predictive analytics?",
        a: "Consultants use member- and group-level forecasts to anticipate renewal trends, identify the conditions and members driving future cost, recommend targeted point solutions, and measure those programs' outcomes for the employer client.",
      },
      {
        q: "Can I resell or brand HCRM reports for my clients?",
        a: "HRM reports can be white-labeled, customized and scheduled to email automatically to your clients. Talk to HCRM about partnership arrangements for your book of business.",
      },
      {
        q: "Does HCRM work with small and mid-size employer groups?",
        a: "Yes. In 2004 HCRM pioneered predictive modeling for the small to mid-size self-funded market, and its common national dataset is designed so groups of any size can participate cost-effectively.",
      },
    ],
  },
  {
    slug: "third-party-administrators-2",
    group: "advisors",
    name: "Third Party Administrators",
    short: "Add forward-looking analytics to administration: cost containment, stop-loss negotiation and white-label reporting.",
    title: "Predictive Analytics & Reporting for TPAs",
    description:
      "Add predictive analytics to your TPA services: stratify the book, support stop-loss negotiations, evaluate vendors and deliver white-label reports.",
    answer:
      "TPAs use HCRM to add forward-looking analytics to the claims they already administer. Health Risk Monitor stratifies the book of business and each plan, forecasts cost 12 months out, supports stop-loss negotiations, evaluates care management vendors, and delivers white-labeled reports to employer groups.",
    lede:
      "A TPA handles the operational side of employer benefit plans and reports on each plan's unique risks and costs. HCRM's analytics are frequently used by TPAs for cost containment, population health management, stop-loss negotiations and customized benefit plans.",
    context: [
      "TPA reporting usually describes what has been paid. HCRM adds what is likely to be paid next, at the member and group level, so your clients see risks coming rather than reading about them in arrears.",
      "Because HCRM accepts the file layouts you already produce, adding predictive analytics to your service is not an integration project.",
    ],
    means: [
      { h: "A differentiated service line", p: "Offer employer groups forecasts and outcomes reporting under your brand, not just paid-claims reports." },
      { h: "Stronger stop-loss negotiations", p: "Bring group-level forecasts and probable shock-loss cases to the renewal conversation." },
      { h: "One view your vendors share", p: "Give your UR, large case and disease management vendors access to the same HRM data." },
    ],
    capabilities: [
      "Identify and stratify your population into cohorts by book of business, individual plan or clinical grouping",
      "Quickly assess the effectiveness of care management programs implemented by plan vendors",
      "Customized, white-label reporting of clinical and cost trends, outcomes, and areas of future risk that threaten the financial integrity of employer plans",
      "Shared HRM access for your UR, large case and disease management vendors",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Feeds connected", body: "HCRM takes your existing claims extracts plus the PBM feed. No new file formats." },
      { when: "Month 2", title: "Book of business stratified", body: "Every group and member forecast for 12 months, with risk tiers and gaps in care." },
      { when: "Months 3–6", title: "Vendors working from one list", body: "Large case and disease management vendors target the members the model flags." },
      { when: "Months 6–12", title: "White-label reports in market", body: "Employer clients receive scheduled forecast and outcomes reports from you." },
      { when: "Months 12–18", title: "Renewals backed by data", body: "Stop-loss and plan-design conversations start from a validated forecast." },
    ],
    claim: "“Our employer groups get a forward view of their plan, and our vendors are all working from the same list.”",
    solutions: ["data-normalization-and-validation", "stop-loss-reporting", "clinical-reporting-and-outcome-assessment"],
    faqs: [
      {
        q: "How is HCRM different from the reporting a TPA already provides?",
        a: "Standard TPA reporting describes claims already paid. HCRM normalizes the same data and forecasts each member's cost and clinical risk for the next 12 months, so TPAs can act on future cost rather than report past cost.",
      },
      {
        q: "Can our care management vendors access HRM?",
        a: "Yes. TPAs can share HRM access with utilization review, large case management and disease management vendors.",
      },
    ],
  },
  {
    slug: "self-funded-employers-2",
    group: "risk",
    name: "Self-Funded Employers",
    short: "Understand what's behind high utilization and cost, and manage member health before it becomes next year's claims.",
    title: "Predictive Analytics for Self-Funded Employers",
    description:
      "Forecast next year's claims, find the 20% of members driving 84% of cost, close gaps in care and measure vendor outcomes for your self-funded plan.",
    answer:
      "For a self-funded employer, HCRM forecasts each employee's and dependent's healthcare cost for the next 12 months and shows which chronic conditions and gaps in care are driving it. Roughly 20% of members, those with chronic disease, drive about 84% of claims cost, and they receive on average only half the recommended care. HCRM finds them before their claims arrive.",
    lede:
      "As a self-funded plan you bear the risk of rising costs, but you also keep the savings. HCRM's analytics show the financial risks and cost-saving opportunities in your current plan.",
    context: [
      "84% of your claims costs are driven by 20% of your members, those with one or more chronic diseases. On average, those people receive only half the care recommended for their conditions, so they are sicker than they should be and spend more as a result.",
      "HCRM's data lets you make informed decisions about programs and vendors that address those risks, then track whether they work.",
    ],
    means: [
      { h: "Know next year's number now", p: "A 12-month forecast at the group and member level, in dollars, for budgeting and renewal." },
      { h: "Spend on the members who matter", p: "Target wellness, disease management and clinic resources at the members forecast to cost the most." },
      { h: "Hold vendors accountable", p: "Measure each program's effect on cost, utilization and compliance with standards of care." },
    ],
    capabilities: [
      "Online reporting that stratifies your data by demographics, medical conditions, gaps in care and more, at the cohort, group and book-of-business level, with drill-down to member profiles",
      "PDF reports for any cohort highlighting cost and clinical trends and future risk-reduction opportunities, white-labeled and scheduled to email automatically",
      "A Daily Dashboard alerting you to specific member claims and events for large case management, stop-loss shock-loss reporting and captive risk management",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Claims collected for you", body: "HCRM requests 24 months of history from your TPA or carrier and PBM directly." },
      { when: "Month 2", title: "Your plan's next 12 months", body: "Forecast spend, top cost drivers, and the members likely to become high-cost." },
      { when: "Months 3–6", title: "Interventions aimed precisely", body: "Wellness, coaching and clinic outreach focus on rising-risk members and gaps in care." },
      { when: "Months 6–12", title: "Monthly tracking", body: "Watch cost, utilization and compliance trends for targeted members against baseline." },
      { when: "Months 12–18", title: "A renewal you saw coming", body: "Budget and negotiate stop-loss from a forecast, with program outcomes in hand." },
    ],
    claim: "“We knew which members would drive next year's claims, we got them care, and we can show the result.”",
    solutions: ["healthcare-predictive-analytics", "clinical-reporting-and-outcome-assessment", "stop-loss-reporting"],
    faqs: [
      {
        q: "How can a self-funded employer reduce healthcare costs?",
        a: "Identify the members who will drive future cost, mainly those with chronic conditions and gaps in care, and engage them in targeted care management before their claims escalate. One HCRM client reduced its cost per member from $825 to $450 over two years by working with its catastrophic population.",
      },
      {
        q: "What share of claims comes from members with chronic conditions?",
        a: "In a typical self-funded plan, about 20% of members, those with one or more chronic diseases, drive about 84% of claims cost. Around 5% of the population, the catastrophic group, drives most plan spending.",
      },
      {
        q: "Do we need our own analysts to use HCRM?",
        a: "No. HCRM collects and cleans the data, and Health Risk Monitor's reports are designed for benefits teams. HCRM's team provides training, custom reports and help interpreting results.",
      },
    ],
  },
  {
    slug: "insurance-companies-with-fully-insured-plans-2",
    group: "risk",
    name: "Insurance Companies with Fully Insured Plans",
    short: "Turn siloed legacy data into actionable forecasts for underwriting, large case management, retention and sales.",
    title: "Predictive Analytics for Fully Insured Carriers",
    description:
      "Member and group forecasts for carrier underwriting, large case management, ASO retention and broker performance. SaaS or in your data center.",
    answer:
      "Fully insured carriers use HCRM to turn siloed legacy claims data into forecasts every department can use: underwriting sees high-risk members and groups, large case management sees catastrophic cases before precertification, condition management retains ASO clients with measurable outcomes, and sales sees which brokers bring profitable business. HRM runs as SaaS or inside the carrier's data center.",
    lede:
      "Fully insured plan administrators are awash in data in legacy systems, but access to actionable information is limited. Departmental systems are siloed, with competing needs and limited IT resources.",
    context: [
      "HRM can run in SaaS mode, with HCRM processing the carrier's data and each department accessing results through a secure link, or be installed in the carrier's data center on client hardware. HCRM installs the system, trains IT to run it monthly, and supports operations with updates, improvements and ongoing user training.",
    ],
    means: [
      { h: "Underwriting", p: "Actuarial tables estimate aggregate risk well, but large claims are found by individual judgment. Predictive modeling identifies high-risk individuals and groups reliably." },
      { h: "Large case management", p: "See existing large cases and predict future ones before they precert for high-cost care." },
      { h: "Retention and sales", p: "Show ASO clients condition-management outcomes, and learn which brokers produce the lowest loss ratios and fastest growth." },
    ],
    capabilities: [
      "Risk and profit management: regular reporting of loss ratios, retention rates and high-risk areas at group and book-of-business level",
      "Underwriting: custom group reports with forecast high-risk and high-cost members, potential transplants, specialty drug use and top 10 forecast members",
      "Care management: automatic reports of members forecast above the spec alert level, with outcome reports for those members",
      "Aggregations by plan type, broker or consultant, and underwriter",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Deployment chosen", body: "SaaS processing by HCRM, or installation in your data center with IT training." },
      { when: "Month 2", title: "Departments on one dataset", body: "Underwriting, care management and sales see the same normalized forecasts." },
      { when: "Months 3–6", title: "Large cases found earlier", body: "Members forecast above the spec alert level go to case management before precert." },
      { when: "Months 6–12", title: "Outcomes ASO clients can see", body: "Condition-management results reported to clients to support retention." },
      { when: "Months 12–18", title: "Better business, by broker", body: "Loss ratio, close rate and growth by broker show where to invest." },
    ],
    claim: "“Every department works from one forecast, and we find catastrophic cases before they precert.”",
    solutions: ["healthcare-predictive-analytics", "data-normalization-and-validation", "healthcare-management"],
    faqs: [
      {
        q: "Can HCRM be installed on-premise at an insurance carrier?",
        a: "Yes. HRM can run as SaaS, with HCRM processing the data, or be installed in the carrier's data center on client-provided hardware and database software. HCRM handles installation, IT training and ongoing support.",
      },
      {
        q: "How does predictive modeling help insurance underwriting?",
        a: "Actuarial tables estimate aggregate risk well, but individual large claims depend on underwriter judgment. Predictive modeling forecasts cost at member and group level and flags high-risk individuals, potential transplants and specialty drug use for each group.",
      },
    ],
  },
  {
    slug: "health-plans-2",
    group: "risk",
    name: "Health Plans",
    short: "Assess risk across the book of business, anticipate trends and prove program ROI, including Blue Cross and Medicaid populations.",
    title: "Health Plan Analytics: Predict Member Risk & Cost",
    description:
      "Forecast member clinical and cost risk across your book, track 128 standards of care and report care-program ROI. For Blue Cross, Medicaid and more.",
    answer:
      "Health plans use HCRM to forecast clinical and cost risk for every member across the book of business, using 24 months of claims and more than 2,800 health and cost measures. Care managers get high-risk, high-need members through single sign-on, programs are measured against non-participants, and standardized reports show ROI. HRM integrates with existing care management software or runs inside the plan's data center.",
    lede:
      "Health plans can use predictive analytics to assess clinical and cost risk, anticipate trends and decide better. HCRM identifies individuals at risk for specific conditions, enabling strategies that save cost and prevent financial loss across the book and each insured group.",
    context: [
      "In 2023 the average premium for employer-sponsored family coverage was $24,000, nearly 50% higher than ten years earlier, and still rising. Chronic illness and gaps in care are the primary drivers. An asthmatic member who is non-compliant with two or more standards of care is twice as likely to visit the ER as one who is compliant with all of them.",
      "HCRM works with health plans of many types, with significant experience in Blue Cross and Blue Shield and Medicaid populations. Reports detail disease prevalence, yearly spending, future medical and pharmacy cost, several measures of risk, and compliance with 128 clinical standards of care.",
    ],
    means: [
      { h: "Your book of business, forecast", p: "Member, group and line-of-business projections show where loss ratios are heading." },
      { h: "Care managers on the right members", p: "Single sign-on access to high-risk, high-need members, inside or alongside your care management system." },
      { h: "Program ROI you can report", p: "Compare participants with non-participants and publish standardized effectiveness reports." },
    ],
    capabilities: [
      "Single sign-on access for care managers to target high-risk, high-need members at group and member level",
      "Stratify any group into cohorts of interest and compare the utilization and financial results of program participants versus non-participants",
      "Standardized reports on clinical program effectiveness and ROI",
      "Integration with existing care management software, or HCRM's Care Management Module; SaaS or in your data center",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Integration path set", body: "SaaS report server, or installation in your data center for large populations." },
      { when: "Month 2", title: "Book of business stratified", body: "Every member scored, forecast, and checked against 128 standards of care." },
      { when: "Months 3–6", title: "Care management targeting", body: "Care managers open high-need member lists through SSO and start outreach." },
      { when: "Months 6–12", title: "Participants vs. non-participants", body: "Utilization and cost compared monthly to show which programs move the needle." },
      { when: "Months 12–18", title: "ROI on the record", body: "Standardized reports document program effectiveness for leadership and regulators." },
    ],
    claim: "“We can show which care programs lowered cost, for which members, compared with those who didn't participate.”",
    solutions: ["healthcare-predictive-analytics", "healthcare-management", "clinical-reporting-and-outcome-assessment"],
    faqs: [
      {
        q: "Does HCRM work with Medicaid and Blue Cross health plans?",
        a: "Yes. HCRM serves health plans of many types and has significant experience with Blue Cross and Blue Shield plans and Medicaid populations. Its EVP of National Accounts has led Medicaid and Medicare managed care operations and state Medicaid programs.",
      },
      {
        q: "How many standards of care does HCRM measure?",
        a: "Health Risk Monitor measures each member's compliance with 128 clinical standards of care, covering chronic disease and preventive care.",
      },
    ],
  },
  {
    slug: "stop-loss-carriers-and-captives-2",
    group: "risk",
    name: "Stop-Loss Carriers & Captives",
    short: "Predict shock losses, quote renewals faster, and watch every group in the captive through the policy year.",
    title: "Predictive Analytics for Stop-Loss Carriers & Captives",
    description:
      "Predict shock losses and high-cost members 12 months out, quote renewals accurately, and monitor every group in the captive with daily alerts.",
    answer:
      "Stop-loss carriers, MGUs and captives use HCRM to forecast each group's high-cost members and probable shock losses for the next 12 months, including pharmacy and specialty drug spend. Underwriting gets fast, accurate renewal quotes; monthly updates and a Daily Dashboard flag new members likely to hit the specific deductible during the policy period, before claims are incurred.",
    lede:
      "HRM predictive modeling gives stop-loss carriers and MGUs key information about probable shock losses and overall aggregate spending, so clinical and financial risk can be managed before claims are incurred.",
    context: [
      "Captives add a layer of protection for small groups. Captive programs use HRM to price each group accurately, then track performance through the year to see which employer groups are running ahead of or behind expectations.",
      "About 85% of health plan cost is claims, and a claim not incurred is not a cost to the plan. Groups can use HRM to engage population health management, and captives can offer discounts to groups that do.",
    ],
    means: [
      { h: "Quote with the tail in view", p: "Probable shock-loss cases, specialty drugs and potential transplants per group, before you price." },
      { h: "Monitor mid-policy", p: "Monthly updates and daily alerts flag new members likely to hit the spec deductible." },
      { h: "Reward risk management", p: "Offer captive members discounts for approved population health management backed by predictive analytics." },
    ],
    capabilities: [
      "Stop-loss risk and profit management: loss ratios, retention and high-risk areas at group and book-of-business level",
      "Stop-loss underwriting reports: forecast high-risk/high-cost members, potential transplants, specialty drug use, top 10 forecast members",
      "Stop-loss and captive care management: discounts for groups using approved predictive population health management",
      "Custom Daily Dashboard: members forecast above the spec alert level, routed to large case management and provider coordination",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Group data collected", body: "Claims and Rx history gathered from each group's TPA and PBM." },
      { when: "Month 2", title: "Underwriting reports live", body: "Shock-loss candidates, specialty drugs and top 10 forecast members for each group." },
      { when: "Months 3–6", title: "Daily Dashboard on watch", body: "New members trending toward the spec deductible trigger alerts mid-policy." },
      { when: "Months 6–12", title: "Captive groups ranked", body: "See which employers are running ahead of or behind cost expectations." },
      { when: "Months 12–18", title: "Renewals priced on forecast", body: "Quote the next policy year from validated member-level predictions." },
    ],
    claim: "“We saw the shock losses before they were claims, and we priced the renewal accordingly.”",
    solutions: ["stop-loss-reporting", "healthcare-predictive-analytics", "healthcare-management"],
    faqs: [
      {
        q: "How do captives use predictive modeling?",
        a: "Captive programs use HRM to price each employer group accurately, track each group's performance through the year against expectations, flag members likely to hit the specific deductible, and encourage groups to use population health management to reduce claims.",
      },
      {
        q: "Can HCRM identify specialty drug and transplant risk?",
        a: "Yes. Underwriting reports can include forecast specialty drug use and infusions, potential transplants, and the top 10 forecast members for each group.",
      },
    ],
  },
  {
    slug: "clinics-and-healthcare-providers-2",
    group: "clinical",
    name: "Clinics & Healthcare Providers",
    short: "Join EMR and claims data for a 360-degree view of every patient, and price direct contracts with confidence.",
    title: "Claims + EMR Analytics for Clinics & Providers",
    description:
      "Join your EMR with outside claims so clinicians see all care, medications and gaps, and price direct contracts with 12-month forecasts.",
    answer:
      "HCRM gives clinics, physician groups and health systems a 360-degree view of each patient by joining their EMR with external medical and pharmacy claims. Clinicians see all gaps in care, medications and diagnoses, not only what happened in their own facility, and providers in direct contracting can assess the clinical and financial risk of an employer population before pricing it.",
    lede:
      "Health systems, physician groups and clinics are doing more direct contracting, running population health programs, and taking on more financial risk. Predictive modeling and claims analytics give them what they need to quantify that risk and demonstrate savings.",
    context: [
      "Your EMR only knows what happened inside your walls. HCRM integrates EMR patient data with external claims, giving clinicians every gap in care, every medication the patient fills, and diagnoses and treatments from other providers.",
      "For direct contracting, the HCRM system accurately assesses the clinical and financial risk of taking on an employer plan, so you can price your services equitably.",
    ],
    means: [
      { h: "See the whole patient", p: "All care, not just your encounters: outside visits, ER, inpatient stays and dispensed drugs." },
      { h: "Engage proactively", p: "Reach high-risk, high-need patients for timely care before they present acutely." },
      { h: "Contract on evidence", p: "Quantify an employer population's 12-month risk before you price a direct contract." },
    ],
    capabilities: [
      "Integration of EMR patient data with external claims for a 360-degree view of all care",
      "Seamless access for clinicians to target high-risk, high-need patients at group and member level",
      "Insight into gaps in care, medications, diagnoses and risk measures for every patient",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "EMR meets claims", body: "HCRM joins your EMR data with external medical and pharmacy claims." },
      { when: "Month 2", title: "Every patient, complete", body: "Gaps in care, outside utilization and forecast risk visible before visits." },
      { when: "Months 3–6", title: "Proactive outreach", body: "Care teams reach rising-risk patients for timely, appropriate care." },
      { when: "Months 6–12", title: "Outcomes demonstrated", body: "Show payers and employers the change in cost and compliance." },
      { when: "Months 12–18", title: "Contracts priced on forecast", body: "Enter direct-contracting negotiations with quantified population risk." },
    ],
    claim: "“We see the care our patients get everywhere, and we price risk contracts on a forecast, not a guess.”",
    solutions: ["healthcare-predictive-analytics", "clinical-reporting-and-outcome-assessment", "healthcare-management"],
    faqs: [
      {
        q: "Can HCRM integrate with our EMR?",
        a: "Yes. HCRM integrates provider EMR data with external medical and pharmacy claims, and HRM patient information can be accessed through the EMR before patient visits.",
      },
      {
        q: "How do providers use predictive analytics in direct contracting?",
        a: "Before taking on an employer plan, providers use HRM to assess the population's clinical and financial risk for the next 12 months, then price services accordingly and demonstrate outcomes and savings afterward.",
      },
    ],
  },
  {
    slug: "employer-clinics-page",
    group: "clinical",
    name: "Employer Clinics",
    short: "Give clinicians the complete patient profile and drive the right members into the clinic.",
    title: "Analytics for Employer On-Site & Near-Site Clinics",
    description:
      "Give on-site and near-site clinicians the complete patient profile from EMR plus claims, and identify members who should be using the clinic.",
    answer:
      "Employer clinics usually see only a small part of a member's health. HCRM combines the clinic's EMR with external medical and pharmacy claims so clinicians see a year of office visits, ER and inpatient encounters, dispensed drugs and compliance with 128 standards of care before each visit, and identifies members who need care but aren't using the clinic.",
    lede:
      "On-site and near-site clinics often know only a small part of a member's health. HCRM gives providers a complete profile of all the care being delivered.",
    context: [
      "Using HRM, clinics can apply proactive interventions focused on chronic disease, gaps in care, drug compliance and behavior change to improve health and lower cost.",
      "HRM identifies future high-cost members based on their current clinical condition, not just last year's high-cost members, so you can intervene for the right patients and reduce your employer client's cost and clinical risk next year.",
    ],
    means: [
      { h: "Walk into every visit prepared", p: "A year of outside care, prescriptions and gaps in care, available through your EMR." },
      { h: "Fill the clinic with the right patients", p: "Identify members who need help and encourage them to use the clinic." },
      { h: "Prove the clinic's value", p: "Show the employer how clinic engagement changes cost and compliance." },
    ],
    capabilities: [
      "Accurate clinical predictions of each patient's health and cost from clinic EMR data plus external medical and pharmacy claims",
      "A complete view of the past year: office visits, ER and inpatient encounters, drugs dispensed, compliance with 128 standards of care",
      "HRM patient information accessible through your EMR before visits",
      "Stratification of the group into cohorts, with member-level detail from risk scores to gaps in care",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Clinic EMR + plan claims", body: "HCRM joins your EMR with the employer plan's claims and Rx data." },
      { when: "Month 2", title: "Pre-visit profiles", body: "Clinicians see each patient's outside care and gaps before the appointment." },
      { when: "Months 3–6", title: "Utilization outreach", body: "Members who need care but aren't using the clinic are invited in." },
      { when: "Months 6–12", title: "Chronic care tightened", body: "Compliance with standards of care tracked for every engaged patient." },
      { when: "Months 12–18", title: "Value shown to the employer", body: "Cost and risk trends for clinic users reported against the forecast." },
    ],
    claim: "“Our clinicians see the whole patient, the right members use the clinic, and the employer can see what it's worth.”",
    solutions: ["healthcare-predictive-analytics", "clinical-reporting-and-outcome-assessment", "healthcare-management"],
    faqs: [
      {
        q: "How do employer clinics benefit from claims data?",
        a: "Claims show care delivered outside the clinic: specialist visits, ER and inpatient stays, and prescriptions filled elsewhere. Combined with the clinic EMR, they give clinicians a complete patient profile and identify members who should be engaged by the clinic.",
      },
    ],
  },
  {
    slug: "accountable-care-organizations-2",
    group: "clinical",
    name: "Accountable Care Organizations",
    short: "Forecast a population's cost before you sign, then manage it to shared savings.",
    title: "Predictive Analytics for Accountable Care Organizations",
    description:
      "Forecast a contracted population's risk and cost before you negotiate, measure provider quality, and manage care toward shared savings.",
    answer:
      "ACOs use HCRM to forecast the clinical risk and future cost of a contracted population during negotiations, avoiding or moderating financial penalties. Afterward, Health Risk Monitor integrates claims with patient EMRs, measures provider outcomes and quality, tracks treatment compliance and supports care management, helping the ACO generate shared savings.",
    lede:
      "Accountable Care Organizations focus on coordinated, high-quality, cost-effective care through shared savings models, where providers are rewarded for meeting performance standards and lowering cost.",
    context: [
      "HCRM identifies the clinical risks and future costs of a population during contract negotiations to avoid or moderate financial penalties. The system supports clinically effective, efficient care, assesses provider outcomes, measures provider quality, and integrates with patient EMRs.",
      "With accurate predictions of future cost of care, ACOs can manage toward shared savings and better clinical outcomes.",
    ],
    means: [
      { h: "Negotiate from a forecast", p: "Know the population's clinical and cost risk before you accept a benchmark." },
      { h: "Manage the attributed population", p: "Identify rising-risk patients and gaps in care across every participating provider." },
      { h: "Measure providers fairly", p: "Assess provider outcomes and quality with risk-adjusted, claims-based data." },
    ],
    capabilities: [
      "Clinical predictions of each patient's health and cost from EMR data plus external medical and pharmacy claims",
      "A complete view of the past year: office visits, ER and inpatient encounters, drugs dispensed, compliance with 128 standards of care",
      "HRM patient information accessible through the EMR before visits",
      "Cohort stratification with member-level detail, from risk scores to gaps in care",
    ],
    horizon: [
      { when: "Before signing", title: "Population risk quantified", body: "Forecast the contracted population's 12-month cost and clinical risk." },
      { when: "Months 1–3", title: "EMRs and claims joined", body: "Participating providers see complete patient profiles and gaps in care." },
      { when: "Months 3–6", title: "Care management targeted", body: "Rising-risk patients engaged across the network." },
      { when: "Months 6–12", title: "Provider quality measured", body: "Outcomes and compliance compared across providers." },
      { when: "Months 12–18", title: "Shared savings documented", body: "Actual cost compared with the predicted baseline at reconciliation." },
    ],
    claim: "“We knew the population's risk before we signed, and we managed it toward shared savings.”",
    solutions: ["healthcare-predictive-analytics", "healthcare-management", "clinical-reporting-and-outcome-assessment"],
    faqs: [
      {
        q: "How can an ACO avoid shared-savings penalties?",
        a: "By quantifying the attributed population's clinical risk and future cost before negotiating the contract, then using member-level forecasts and gap-in-care data to manage rising-risk patients throughout the performance period.",
      },
    ],
  },
  {
    slug: "population-health-management-teams-2",
    group: "programs",
    name: "Population Health Management Teams",
    short: "Identify, stratify and manage the members who will benefit most, from one system.",
    title: "Population Health Management Software & Analytics",
    description:
      "Identify, stratify and manage members by clinical and financial risk, from data aggregation to care workflows, in one population health system.",
    answer:
      "Population health management teams use HCRM to identify, stratify and manage the members who will benefit most from intervention. Health Risk Monitor aggregates claims and eligibility data from many sources, forecasts future high-cost members from their current clinical condition and gaps in care, and connects those members to care management workflows in a single system.",
    lede:
      "Population health management covers wellness, disease and condition management, large case management, social determinants of health, specialty drug sourcing and utilization management. Success depends on accurate clinical assessment and fast, flexible tools to identify and stratify the population.",
    context: [
      "HCRM enhances reporting and analysis for population health management. Providers of these programs can stratify a population by many clinical and financial metrics to find cohorts of members who need help with specific conditions.",
      "HCRM optimizes the collection of claims and eligibility data from a large number of sources, improving operating efficiency and outcomes assessment, at a competitive price.",
    ],
    means: [
      { h: "The right members, first", p: "Future high-cost members, not just last year's, ranked by condition, gaps in care and likely outcome." },
      { h: "One system end to end", p: "From data aggregation to risk profiling to care workflows, under one login." },
      { h: "Outcomes clients believe", p: "Participant cost, utilization and compliance tracked monthly against baseline." },
    ],
    capabilities: [
      "End-to-end solution from predictive data aggregation to risk profiling and care management workflows",
      "Identify, stratify and manage health conditions within a population",
      "Identify future high-cost members from current clinical condition, gaps in care and likely outcomes",
      "Choose interventions that improve member health and reduce clients' cost and risk next year",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Client data aggregated", body: "Claims and eligibility collected from each client's sources." },
      { when: "Month 2", title: "Cohorts built", body: "Members stratified by condition, risk tier, gaps in care and motivation." },
      { when: "Months 3–6", title: "Outreach in the workflow", body: "Coaches work forecast-driven assignment lists in the Care Management Module." },
      { when: "Months 6–12", title: "Monthly outcomes", body: "Participant trends in cost, utilization and compliance tracked." },
      { when: "Months 12–18", title: "Renewal-ready ROI", body: "Standardized outcome reports show each client what the program delivered." },
    ],
    claim: "“We engaged the members who would have been most expensive, and our clients can see the savings.”",
    solutions: ["healthcare-predictive-analytics", "healthcare-management", "clinical-reporting-and-outcome-assessment"],
    faqs: [
      {
        q: "What is population health management software?",
        a: "Software that aggregates a population's claims and clinical data, stratifies members by risk, identifies who needs intervention, and supports care workflows and outcome reporting. HCRM's Health Risk Monitor does all of these in a single system.",
      },
    ],
  },
  {
    slug: "health-management-mendors",
    group: "programs",
    name: "Health Management & Wellness Vendors",
    short: "Data management, analytics and outcomes reporting that make your program measurably better.",
    title: "Outcomes Reporting for Health & Wellness Vendors",
    description:
      "Help your wellness or disease management program target the right members and prove outcomes to health plans with claims-based reporting.",
    answer:
      "For wellness, disease management and other health management vendors, lowering a client's plan cost depends on improving member health. HCRM provides the data management, predictive analytics and outcome reporting to target the right members and prove results to the health plans you serve. Partners such as MedWell are integrated with HRM and send data back for outcomes reporting.",
    lede:
      "For vendors serving health plans, reducing plan cost depends on improving member health. HCRM supports that with patient data management, population health analytics, and tools for clinical improvement.",
    context: [
      "HCRM partners with vendors whose programs complement predictive modeling. Mediterranean Wellness (MedWell), for example, combines HRM predictions with its biometric and Health Risk Assessment data to craft individual programs, refers members with chronic conditions to population health vendors using HRM, and returns data to HCRM for outcomes reporting.",
    ],
    means: [
      { h: "Better targeting", p: "Enroll the members whose forecast and gaps in care show they'll benefit most." },
      { h: "Shared data with the plan", p: "Work from the same normalized dataset as the plan and its other vendors." },
      { h: "Outcomes that win renewals", p: "Report changes in claims cost, utilization and compliance, not just engagement." },
    ],
    capabilities: [
      "End-to-end solution from predictive data aggregation to risk profiling and care management workflows",
      "Identify, stratify and manage health conditions within a population",
      "Identify future high-cost members from current clinical condition and gaps in care",
      "Outcome reporting on members referred into your program",
    ],
    horizon: [
      { when: "Weeks 1–4", title: "Connected to plan data", body: "Your program joins the plan's HRM dataset, or partners with HCRM directly." },
      { when: "Month 2", title: "Targeted enrollment lists", body: "Members ranked by forecast risk and fit for your program." },
      { when: "Months 3–6", title: "Data flowing both ways", body: "Program data returns to HCRM to enrich predictions and reporting." },
      { when: "Months 6–12", title: "Participant outcomes tracked", body: "Cost and clinical trends compared with baseline and non-participants." },
      { when: "Months 12–18", title: "Proof for every client", body: "Claims-based outcome reports support renewals and new sales." },
    ],
    claim: "“We can prove our program lowered claims cost for the members we enrolled.”",
    solutions: ["clinical-reporting-and-outcome-assessment", "healthcare-management", "healthcare-predictive-analytics"],
    faqs: [
      {
        q: "Can a wellness vendor partner with HCRM?",
        a: "Yes. HCRM partners with health management vendors whose programs complement predictive modeling. Use the contact form and choose “Partnership” to start the conversation.",
      },
    ],
  },
];

export const audienceBySlug = (slug: string) => audiences.find((a) => a.slug === slug)!;
export const audiencesInGroup = (id: string) => audiences.filter((a) => a.group === id);
