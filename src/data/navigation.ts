export interface NavItem {
  label: string;
  to: string;
  blurb?: string;
}

export interface NavGroup {
  label: string;
  /** direct link, for groups with no dropdown */
  to?: string;
  /** short line shown in the panel's left rail */
  summary?: string;
  /** the dropdown's primary links */
  items?: NavItem[];
  /** a secondary column, e.g. the eleven buyer types under Who We Serve */
  spotlight?: { label: string; to: string; items: NavItem[] };
}

export const navigation: NavGroup[] = [
  {
    label: "About",
    summary: "Why HCRM exists, who builds it, and what it runs on.",
    items: [
      { label: "Who We Are", to: "/about/who-we-are", blurb: "The gap we set out to close" },
      { label: "Why Choose HCRM", to: "/about/why-choose-hcrm", blurb: "Three claims, each with its test" },
      { label: "Our Software", to: "/about/our-software", blurb: "Health Risk Monitor, end to end" },
      { label: "Our Team", to: "/about/our-team", blurb: "The people behind the model" },
      { label: "Our Partnerships", to: "/about/our-partnerships", blurb: "Who we build alongside" },
    ],
  },
  {
    label: "Services",
    summary: "Five capabilities on one claims engine, every output in dollars.",
    items: [
      {
        label: "Healthcare Predictive Analytics",
        to: "/services/healthcare-predictive-analytics",
        blurb: "Member and group spend, 12 months forward",
      },
      {
        label: "Data Normalization & Validation",
        to: "/services/data-normalization-validation",
        blurb: "The 95%+ accuracy layer everything rests on",
      },
      {
        label: "Clinical Reporting & Outcome Assessment",
        to: "/services/clinical-reporting-outcome-assessment",
        blurb: "Program impact against a predicted baseline",
      },
      {
        label: "Healthcare Management",
        to: "/services/healthcare-management",
        blurb: "Outreach, encounters and results in one loop",
      },
      {
        label: "Stop-Loss Reporting",
        to: "/services/stop-loss-reporting",
        blurb: "Shock-loss members against your attachment point",
      },
    ],
  },
  {
    label: "Clients",
    summary: "Eleven buyer types, one shared problem: claims data that only reports the past.",
    items: [
      {
        label: "Who We Serve",
        to: "/clients/who-we-serve",
        blurb: "All eleven, side by side",
      },
      {
        label: "Understanding Healthcare Analytics",
        to: "/clients/understanding-healthcare-analytics",
        blurb: "A plain-language primer",
      },
      {
        label: "Testimonials & Impact",
        to: "/clients/testimonials",
        blurb: "Named people, named organizations",
      },
    ],
    spotlight: {
      label: "Who we serve",
      to: "/clients/who-we-serve",
      items: [
        { label: "Self-Funded Employers", to: "/clients/self-funded-employers" },
        { label: "Health Insurance Consultants", to: "/clients/health-insurance-consultants" },
        { label: "Insurance Companies", to: "/clients/insurance-companies" },
        { label: "Stop-Loss Carriers & Captives", to: "/clients/stop-loss-carriers-captives" },
        { label: "Population Health Management Teams", to: "/clients/population-health-management-teams" },
        { label: "Clinics & Healthcare Providers", to: "/clients/clinics-healthcare-providers" },
        { label: "Employer Clinics", to: "/clients/employer-clinics" },
        { label: "Health Plans", to: "/clients/health-plans" },
        { label: "Third Party Administrators", to: "/clients/third-party-administrators" },
        { label: "Accountable Care Organizations", to: "/clients/accountable-care-organizations" },
        { label: "Health Management Vendors", to: "/clients/health-management-vendors" },
      ],
    },
  },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];
