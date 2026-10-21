// Demo photography from Unsplash (free to use under the Unsplash License, no attribution required).
// TODO [client]: replace with HCRM's own photography, or self-host licensed images before launch.

export type Photo = { id: string; alt: string; pos?: string };

const p = (id: string, alt: string, pos?: string): Photo => ({ id, alt, pos });

export const photos = {
  worker: p("1787672357797-f5fa35bb0d18", "A plan member in a work uniform, arms crossed, standing outside his workplace", "50% 30%"),
  bloodPressure: p("1631815590058-860e4f83c1e8", "A clinician checks a patient's blood pressure during a clinic visit", "40% 40%"),
  clinicVisit: p("1631217868264-e5b90bb7e133", "A physician talks with a patient in an exam room"),
  careTeam: p("1666886573440-16ac24f89e31", "Two clinicians review a patient list on a tablet", "50% 30%"),
  consult: p("1758691462858-f1286e5daf40", "A physician consults with an older patient across a desk"),
  nurse: p("1765896387387-0538bc9f997e", "A care manager smiles with an older member during a visit", "40% 40%"),
  brokers: p("1758518731706-be5d5230e5a5", "Benefits advisors meet with an employer client around a table"),
  review: p("1630487656049-6db93a53a7e9", "An administration team reviews plan documents together"),
  boardroom: p("1758518729685-f88df7890776", "Underwriting and finance professionals in a meeting"),
  skyline: p("1493134799591-2c9eed26201a", "The Chicago skyline across Lake Michigan, home of HCRM", "50% 60%"),
  pharmacist: p("1580281657527-47f249e8f4df", "A pharmacist reaches for a medication on a pharmacy shelf", "40% 30%"),
  factory: p("1589793463357-5fb813435467", "Employees at work on a manufacturing floor"),
  couple: p("1625690987114-86f5af994b49", "An older couple walks arm in arm down a country road", "50% 40%"),
  dashboard: p("1551288049-bebda4e38f71", "Analytics charts on a laptop screen"),
  laptop: p("1542744173-05336fcc7ad4", "An analyst working through data on a laptop"),
  city: p("1477959858617-67f85cf4f1df", "Aerial view of a dense city of buildings, like a portfolio of employer groups"),
  smile: p("1679679811837-c28b2586f533", "A tradesman in a hard hat smiling", "50% 35%"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const photoSrc = (ph: Photo, w: number, h?: number) =>
  `https://images.unsplash.com/photo-${ph.id}?auto=format&fit=crop&q=70&w=${w}${h ? `&h=${h}` : ""}`;

export const audiencePhoto: Record<string, PhotoKey> = {
  "health-insurance-consultants-2": "brokers",
  "third-party-administrators-2": "review",
  "self-funded-employers-2": "factory",
  "insurance-companies-with-fully-insured-plans-2": "boardroom",
  "health-plans-2": "couple",
  "stop-loss-carriers-and-captives-2": "city",
  "clinics-and-healthcare-providers-2": "bloodPressure",
  "employer-clinics-page": "clinicVisit",
  "accountable-care-organizations-2": "consult",
  "population-health-management-teams-2": "careTeam",
  "health-management-mendors": "nurse",
};

export const groupPhoto: Record<string, PhotoKey> = {
  advisors: "brokers",
  risk: "factory",
  clinical: "bloodPressure",
  programs: "nurse",
};

export const solutionPhoto: Record<string, PhotoKey> = {
  "healthcare-predictive-analytics": "dashboard",
  "data-normalization-and-validation": "pharmacist",
  "clinical-reporting-and-outcome-assessment": "careTeam",
  "healthcare-management": "nurse",
  "stop-loss-reporting": "city",
};
