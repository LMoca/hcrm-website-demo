export type Article = {
  slug: string;
  title: string;
  date: string; // ISO
  topic: string;
  summary: string;
  body: { heading?: string; paragraphs: string[] }[];
  pdf?: string;
};

const UP = "https://hcrm.net/wp-content/uploads/2025/09/";

export const articles: Article[] = [
  {
    slug: "predictive-analytics-and-cost-containment",
    title: "Predictive Analytics and Cost Containment",
    date: "2024-08-29",
    topic: "Case study",
    summary:
      "How one employer group cut cost per member from $825 to $450 in two years by managing the 5% of members who drive most of its spend.",
    body: [
      {
        paragraphs: [
          "Predictive analytics is essential for managing medical expenses and improving health outcomes for health plan members. Health Risk Monitor identifies “Movers”: members expected to experience a substantial increase in cost and clinical risk. Clinical users can quickly find and categorize members by future healthcare expense and clinical risk, which leads to better health and lower cost.",
          "Managing these members can prevent catastrophic claims. The Stratification Report groups members by projected cost and clinical risk, giving a clear guide for cost-containment strategy.",
        ],
      },
      {
        heading: "The catastrophic 5%",
        paragraphs: [
          "Around 5% of a population drives most health plan spending. Health Risk Monitor identifies future catastrophic members so clients can be sure they are being managed before claims are incurred. Trend reporting then shows the outcome of each cost containment effort, especially for catastrophic members.",
        ],
      },
      {
        heading: "The results",
        paragraphs: [
          "In this client analysis, an employer group was compared with national and regional benchmarks to find where it was performing well and where there was room to improve.",
          "Over two years the group lowered its cost per member from $825 to $450. It did this by working with its catastrophic population. For those members, the top 5% by spend, cost fell from $6,000 per member per month to just under $4,000.",
          "HCRM has also built Care Management Admin, which works with the Health Risk Monitor “Playground” so clients can trend any of their care management programs to demonstrate outcomes.",
        ],
      },
    ],
  },
  {
    slug: "identifying-members-needing-intervention-prior-to-projected-increase-in-cost",
    title: "Identifying Members Needing Intervention Prior to Projected Increase in Cost",
    date: "2021-09-01",
    topic: "White paper",
    summary:
      "Can we find members who would benefit from intervention before their projected cost flags them? HCRM's Chronic Impact Score does.",
    body: [
      {
        paragraphs: [
          "How do you identify members at risk for future health problems? Some organizations use projected cost for the next year, or risk categories, to decide who needs intervention.",
          "The better question is whether we can identify members who would benefit from intervention before their projected costs mark them as at risk. HCRM gives each member a Chronic Impact Score for this purpose: it reflects the long-term impact of multiple co-morbid chronic conditions and poor compliance with standards of care.",
        ],
      },
    ],
    pdf: UP + "B-ChronicImpactScoreWhitePaper-Extended.pdf",
  },
  {
    slug: "hcrm-platform-to-include-covid-19-reporting",
    title: "HCRM Platform to Include COVID-19 Reporting",
    date: "2020-02-21",
    topic: "Announcement",
    summary: "HCRM added a COVID-19 report to identify plan members at elevated risk.",
    body: [
      {
        paragraphs: [
          "HCRM added COVID-19 reporting to Health Risk Monitor to help clients identify plan members at elevated risk, building on the outcome reporting available in the HRM “Playground.”",
        ],
      },
    ],
    pdf: UP + "C-HCRM-Announcement-COVID-19.pdf",
  },
  {
    slug: "impact-of-predictive-analytics",
    title: "Impact of Predictive Analytics",
    date: "2019-08-01",
    topic: "Product",
    summary: "The Playground in Health Risk Monitor produces outcome reports for cost containment efforts.",
    body: [
      {
        paragraphs: [
          "The impact of predictive analytics is demonstrated by HCRM's “Playground” enhancement in Health Risk Monitor. The Playground produces outcome reports for cost containment efforts, letting clients trend any cohort, such as catastrophic members or program participants, against a baseline.",
        ],
      },
    ],
  },
  {
    slug: "announcing-hcrms-soc-2-certification",
    title: "Announcing HCRM’s SOC 2 Certification",
    date: "2018-12-21",
    topic: "Security",
    summary: "SOC 2 certification reinforces HCRM's commitment to the security, availability and privacy of Health Risk Monitor.",
    body: [
      {
        paragraphs: [
          "HCRM announced its SOC 2 certification, reinforcing Health Cost & Risk Management's ongoing commitment to the security, availability and privacy of the Health Risk Monitor platform.",
          "HCRM has maintained SOC 2 Type 2 certification since, with security and privacy audits and penetration testing performed by AARC 360. All HCRM data is stored in the United States.",
        ],
      },
    ],
    pdf: UP + "E-SOC2CertificationAnnouncement.pdf",
  },
  {
    slug: "hrm-continues-to-lead-the-industry-in-clinical-predictive-modeling-accuracy",
    title: "HRM Continues to Lead the Industry in Clinical Predictive Modeling Accuracy",
    date: "2018-06-29",
    topic: "Research",
    summary: "Compared against the Society of Actuaries' 2016 study of claims-based risk tools, HRM leads in clinical predictive accuracy.",
    body: [
      {
        paragraphs: [
          "A comparison of Health Risk Monitor with the Society of Actuaries' 2016 study of claims-based tools for health risk assessment shows that HRM continues to lead the industry in clinical predictive modeling accuracy.",
        ],
      },
    ],
    pdf: UP + "F-2018-HRMSOA2016Comparison20180131.pdf",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug)!;

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
