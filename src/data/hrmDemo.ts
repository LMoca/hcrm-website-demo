/**
 * Illustrative dataset powering the on-site Health Risk Monitor console.
 *
 * These are synthetic, de-identified figures shaped to mirror the structure
 * of a real HRM output so visitors can read the product at a glance. Every
 * surface that renders them carries an explicit "illustrative data" marker.
 * Replace with client-approved anonymised outputs before launch.
 */

export const AS_OF = "Aug 2026";

/** Monthly plan spend, $000s. 24 recorded months. */
export const actualSpend: number[] = [
  172, 181, 176, 190, 186, 199, 193, 205, 198, 212, 207, 201,
  218, 224, 215, 229, 236, 227, 241, 238, 249, 244, 256, 251,
];

/** 12 forecast months following the recorded series, $000s. */
export const forecastSpend: number[] = [
  258, 266, 271, 280, 287, 294, 299, 308, 314, 321, 329, 338,
];

/** Half-width of the forecast confidence interval per month, $000s. */
export const forecastBand: number[] = [
  6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 40,
];

/** Month labels for the combined 36-point series. */
export const monthLabels: string[] = [
  "Sep 24", "Oct 24", "Nov 24", "Dec 24", "Jan 25", "Feb 25",
  "Mar 25", "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25",
  "Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26",
  "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26",
  "Sep 26", "Oct 26", "Nov 26", "Dec 26", "Jan 27", "Feb 27",
  "Mar 27", "Apr 27", "May 27", "Jun 27", "Jul 27", "Aug 27",
];

/** The single member the forecast panel annotates. */
export const flaggedEvent = {
  monthIndex: 29, // Feb 27
  label: "M-40817 projected acute event",
  amount: "$486K",
};

export interface RiskMember {
  id: string;
  cohort: string;
  driver: string;
  projected: number;
  confidence: number;
  window: string;
  trend: "rising" | "steady" | "falling";
}

/** Highest-exposure members, ranked by projected 12-month spend. */
export const riskMembers: RiskMember[] = [
  {
    id: "M-40817",
    cohort: "Cardiac",
    driver: "CHF progression + readmission pattern",
    projected: 486000,
    confidence: 94,
    window: "Q1 2027",
    trend: "rising",
  },
  {
    id: "M-11204",
    cohort: "Oncology",
    driver: "New chemo regimen, specialty Rx onset",
    projected: 412000,
    confidence: 91,
    window: "Q4 2026",
    trend: "rising",
  },
  {
    id: "M-77530",
    cohort: "Renal",
    driver: "eGFR decline, dialysis start probable",
    projected: 338000,
    confidence: 88,
    window: "Q1 2027",
    trend: "rising",
  },
  {
    id: "M-29661",
    cohort: "Musculoskeletal",
    driver: "Bilateral joint replacement pathway",
    projected: 194000,
    confidence: 83,
    window: "Q4 2026",
    trend: "steady",
  },
  {
    id: "M-58042",
    cohort: "Maternity",
    driver: "High-risk pregnancy, NICU probability",
    projected: 176000,
    confidence: 79,
    window: "Q4 2026",
    trend: "steady",
  },
  {
    id: "M-33915",
    cohort: "Metabolic",
    driver: "Uncontrolled A1c, GLP-1 titration",
    projected: 88000,
    confidence: 86,
    window: "Q2 2027",
    trend: "falling",
  },
];

export interface ProgramOutcome {
  program: string;
  members: number;
  predicted: number;
  actual: number;
}

/**
 * Predicted-baseline vs. actual spend for measured programs.
 * One program deliberately shows a negative result - HRM reports what the
 * data says, not what the budget owner hoped for.
 */
export const programOutcomes: ProgramOutcome[] = [
  { program: "Diabetes management", members: 412, predicted: 3940000, actual: 3512000 },
  { program: "Cardiac care management", members: 186, predicted: 5210000, actual: 4685000 },
  { program: "MSK / physical-therapy redirect", members: 298, predicted: 2170000, actual: 1948000 },
  { program: "Onsite employer clinic", members: 1140, predicted: 4460000, actual: 4275000 },
  { program: "Biometric screening incentive", members: 2260, predicted: 1880000, actual: 1996000 },
];

export interface StopLossMember {
  id: string;
  projected: number;
  paid: number;
}

export const ATTACHMENT_POINT = 250000;

/** Members plotted against the plan's specific stop-loss attachment point. */
export const stopLossMembers: StopLossMember[] = [
  { id: "M-40817", projected: 486000, paid: 121000 },
  { id: "M-11204", projected: 412000, paid: 168000 },
  { id: "M-77530", projected: 338000, paid: 94000 },
  { id: "M-29661", projected: 194000, paid: 41000 },
  { id: "M-58042", projected: 176000, paid: 23000 },
  { id: "M-33915", projected: 88000, paid: 37000 },
  { id: "M-62288", projected: 74000, paid: 52000 },
  { id: "M-90417", projected: 61000, paid: 19000 },
];

export const consoleSummary = {
  coveredLives: 4820,
  projectedSpend: "$3.62M",
  riskExposed: "$1.69M",
  flagged: 17,
  leadTime: "12 mo",
};

export const usd = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : `$${Math.round(n / 1000)}K`;
