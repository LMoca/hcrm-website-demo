// Facts in this file are taken from hcrm.net (October 2026 crawl) unless marked TODO.

export const SITE = {
  origin: "https://hcrm.net",
  name: "HCRM",
  legalName: "Health Cost & Risk Management, LLC",
  longName: "Health Cost & Risk Management",
  tagline: "Actionable Information",
  product: "Health Risk Monitor",
  productShort: "HRM",
  email: "info@hcrm.net",
  phone: "+1-773-782-6466",
  phoneDisplay: "(773) 782-6466",
  city: "Chicago",
  region: "IL",
  country: "US",
  foundingYear: "2004",
  linkedin: "https://www.linkedin.com/company/health-cost-risk-management-llc/",
  defaultDescription:
    "With our proprietary predictive analytics software, Health Risk Monitor, we will help improve the health of your employees and reduce cost.",
  // Same share image URL as the live site (Yoast og:image). TODO [client]: a 1200x630 image would display better.
  ogImage: "/wp-content/uploads/2025/06/HCRM-Logo-Full-Name-Horizontal.png",
};

export const CTA_LABEL = "Start a conversation";

// Headline figures. Every number here is stated on hcrm.net.
export const proof = [
  { value: "2004", label: "Predictive modeling for the self-funded market since", note: "First to bring it to small and mid-size groups" },
  { value: "12 mo", label: "Forward forecast for every member", note: "Medical, pharmacy, ER visits and inpatient days" },
  { value: "95%+", label: "Data accuracy after normalization", note: "Validated across 250+ medical and Rx sources" },
  { value: "128", label: "Clinical standards of care tracked", note: "Gaps in care, member by member" },
];

export const testimonials = [
  {
    quote:
      "HCRM is a great organization to work with. I've been working with HCRM for the past 17 years, and in my experience there is no stronger technology platform out there in the medical AI, predictive modeling space.",
    name: "Michael Mitchell",
    role: "VP Business Development",
    org: "Applied Health Analytics, Inc.",
  },
  {
    quote:
      "My experience with HCRM has been outstanding! The data is well organized and insightful. The support team is knowledgeable and available. Frequent updates keep the user experience fresh and meaningful. I will continue to recommend HCRM to my colleagues!",
    name: "David Chiappino",
    role: "President",
    org: "HealthKeys",
  },
  {
    quote:
      "HCRM has been a critical component in my work for the past 4 years that I've been working in the medical management space. Not only is their product top-notch, but the customer service of their people has exceeded my expectations!",
    name: "Ron Janetzky",
    role: "Data Analyst",
    org: "AIMM",
  },
  {
    quote: "Easy to navigate system and services.",
    name: "Melissa Sowers",
    role: "VP of Clinical Operations",
    org: "AIMM",
  },
  {
    quote:
      "They help employers limit or even avoid high-cost claims by offering actionable information. With their support, you're not just seeing the numbers—you're understanding what's driving them and how to make meaningful improvements. It's a smart investment in the health of your members and the financial health of your plan.",
    long:
      "Working with HCRM has truly been a great experience. From the start, it felt more like a partnership than just a vendor relationship. The team is responsive, knowledgeable, and genuinely invested in helping us succeed. I really appreciate how easy it is to get support—help is always just an email away, and responses are not only quick but also incredibly helpful. It's clear they care about what they do and who they work with. Customer support has definitely stood out the most. HCRM goes above and beyond to make sure we feel supported and informed. Whether it's answering questions, walking us through a report, or helping us understand the next steps - it's always a smooth and positive interaction. That level of service makes a big difference in our day-to-day work. I would absolutely recommend HCRM. Not only is their customer service top-notch, but the value they bring through the insights and data they provide is a game changer. They help employers limit or even avoid high-cost claims by offering actionable information. With their support, you're not just seeing the numbers—you're understanding what's driving them and how to make meaningful improvements. It's a smart investment in the health of your members and the financial health of your plan.",
    name: "Tamela Banner",
    role: "Account Manager",
    org: "In-House Physicians",
  },
  {
    quote:
      "Working with HCRM has elevated the ability of our company to better serve the needs of our clients. Working with their team is always a pleasure. The customer support specifically is very knowledgeable and responsive. They always go the extra mile and even came to our location for on-site training with our group.",
    name: "Denise Craven",
    role: "Account Manager and Health Coach",
    org: "Healthworks",
  },
  {
    quote:
      "The team at HCRM has been nothing less than amazing. Prompt responses, custom reports, and always so friendly. We partnered with HCRM many years ago, and I would like to say that they are a true partner. Pretty simple, if you are looking for a partner with the best data and the best service, it is a no-brainer that would be with HCRM.",
    name: "Jim Bode",
    role: "CEO",
    org: "Health 180",
  },
];

export const team = [
  {
    name: "William F. Bramble",
    role: "President",
    bio: [
      "Mr. Bramble has extensive experience in executive management, strategic planning and financial management with several national health care organizations as well as other businesses. He created and led AHCP, an innovative third-party administrator integrating innovative plan designs with disease management programs and claims administration.",
      "He has also worked in the drug chemicals and pharmaceutical industries as well as medical devices with Mallinckrodt, and led a national health care provider organization as President & CEO of a multi-site cancer treatment company. Mr. Bramble holds an M.B.A. from the Harvard Business School and a B.S. in industrial and labor relations from Cornell University.",
    ],
  },
  {
    name: "Michael S. Varadian, JD, MBA",
    role: "EVP National Accounts",
    bio: [
      "Michael Varadian is a national health care leader who has operated at the highest levels of hospital management and Medicaid/Medicare managed care operations, medical technology, payment reform, legal and government regulatory functions, and health care mergers and acquisitions across a 30+ year career.",
      "He has led multiple state and region-wide programs in integrated physical and behavioral healthcare, health information services, and collaborative provider and state pilot programs for Medicaid. He advises state governments, insurers, self-insured companies, ACOs, payer organizations and start-ups on improving clinical and financial outcomes.",
    ],
  },
  {
    name: "Kelsey Simmons",
    role: "Client Services and Marketing Coordinator",
    bio: [
      "Kelsey began her career as a teacher, where she developed the problem-solving and relationship-building skills that guide her client-facing work. Since moving into healthcare she has used her ability to simplify complex concepts to support clients through detailed processes with clarity and care.",
      "She is committed to a seamless client experience, lasting relationships, and outcomes that align with each client's goals.",
    ],
  },
];

export const partners: { name: string; url?: string; kind: string; body: string }[] = [
  {
    name: "Mediterranean Wellness (MedWell)",
    url: "https://mymedwellness.com/",
    kind: "Wellness programs",
    body:
      "Established in 2003, MedWell provides targeted wellness content and programs for individual members. It is integrated with HRM: predictive modeling results are combined with MedWell biometric and Health Risk Assessment data to craft health improvement programs for each member's clinical and lifestyle needs. MedWell also refers members with chronic conditions and co-morbidities to a population health vendor using HRM, and both send data back to HCRM for outcomes reporting.",
  },
  {
    name: "Pluritem (Milliman)",
    kind: "Integrated EMR",
    body:
      "Pluritem, acquired by Milliman in 2024, provides integrated Electronic Medical Records across providers. Its clinical reporting of patient EMRs complements HCRM's clinical forecasting of member risk and cost, and it supplies biometrics to HCRM for enhanced predictions.",
  },
  {
    name: "Upswing Health",
    kind: "Musculoskeletal care",
    body:
      "Upswing provides online orthopedic management of musculoskeletal issues, focused on proper diagnosis and non-surgical programs to restore function and manage pain. When surgery is indicated it refers patients to high-quality specialists. Upswing reports nearly 70% lower costs for its patients compared with a control group.",
  },
  {
    name: "SIIA",
    url: "https://www.siia.org/",
    kind: "Industry association",
    body:
      "SIIA is the premier association of stop-loss carriers and MGUs, broker-consultants, TPAs, PBMs and other vendors to the self-funded health plan market. HCRM has been an active member since 2014.",
  },
  {
    name: "AARC 360",
    kind: "Security & privacy audit",
    body:
      "AARC 360 is a certified digital security and privacy auditor that has worked with HCRM since 2018, when HCRM secured its first SOC 2 Type 2 certification. AARC performs the security and privacy audit and the penetration testing that confirm the integrity of HCRM's data systems.",
  },
];

// Client organizations named on hcrm.net, each with the detail its own testimonial gives.
// Indexes point into `testimonials`. The "hook" is quoted or paraphrased from that testimonial, not invented.
export const clients: { org: string; hook: string; detail: string; quotes: number[] }[] = [
  { org: "Applied Health Analytics", hook: "17 years", detail: "with HCRM, and counting", quotes: [0] },
  { org: "AIMM", hook: "Medical management", detail: "A critical component for four years", quotes: [2, 3] },
  { org: "In-House Physicians", hook: "Limit high-cost claims", detail: "Actionable information for employers", quotes: [4] },
  { org: "Healthworks", hook: "On-site training", detail: "The team came to them", quotes: [5] },
  { org: "Health 180", hook: "Custom reports", detail: "A true partner for many years", quotes: [6] },
  { org: "HealthKeys", hook: "Always fresh", detail: "Frequent updates, available support", quotes: [1] },
];
