/**
 * Synthetic, seeded member population shared by the hero lens and the
 * "claims to dollars" story. Nothing here is client data: costs are drawn
 * from a log-normal distribution shaped like typical plan spend, so the
 * concentration of cost in a few members reads true.
 */

export interface Member {
  cost: number;
  /** 0 = lowest projected cost, 1 = highest */
  pct: number;
  /** risk tier 0..4 */
  tier: number;
  /** data source for the story's first scene: 0 medical, 1 pharmacy, 2 eligibility, 3 EMR */
  src: number;
  j1: number;
  j2: number;
  phase: number;
  /** how changeable the member's risk is, 0..1 */
  changeable: number;
  priority: number;
  /** scheduled visit day 0..4 (providers lens) */
  day: number;
  /** client group 0..5 (brokers lens) */
  group: number;
  /** stagger used by transitions, 0..1 */
  delay: number;
  /** reached early by care management (story scene 5) */
  reached: boolean;
}

export const TIER_NAMES = ["Low", "Moderate", "Rising", "High", "Very high"];

const rng = (seed: number) => {
  let s = seed % 2147483647;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

export function createPopulation(n: number, seed = 17) {
  const r = rng(seed);
  const gauss = () => {
    let u = 0;
    let v = 0;
    while (!u) u = r();
    while (!v) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  const members: Member[] = Array.from({ length: n }, () => ({
    cost: Math.exp(8.2 + 1.55 * gauss()),
    pct: 0,
    tier: 0,
    src: Math.floor(r() * 4),
    j1: gauss(),
    j2: gauss(),
    phase: r() * Math.PI * 2,
    changeable: 0.25 + 0.75 * r(),
    priority: 0,
    day: Math.floor(r() * 5),
    group: 0,
    delay: r(),
    reached: false,
  }));

  const byCost = [...members].sort((a, b) => a.cost - b.cost);
  byCost.forEach((m, i) => {
    m.pct = i / (n - 1);
    m.tier = m.pct < 0.5 ? 0 : m.pct < 0.8 ? 1 : m.pct < 0.93 ? 2 : m.pct < 0.98 ? 3 : 4;
    m.priority = m.cost * (0.4 + 0.6 * m.changeable);
  });
  const desc = [...byCost].reverse();
  // Two client groups (C and E) carry a disproportionate share of the top cost.
  desc.forEach((m, i) => {
    m.group = i < n * 0.07 ? [2, 4, 2, 4, 2, 4, 1, 3][i % 8] : (i * 7) % 6;
  });
  members.filter((m) => m.tier >= 3).forEach((m, i) => (m.reached = i % 2 === 0));

  const total = members.reduce((s, m) => s + m.cost, 0);
  const byPriority = [...members].sort((a, b) => b.priority - a.priority);

  return { members, byCost, desc, byPriority, total };
}

export type Population = ReturnType<typeof createPopulation>;

export const sumCost = (ms: Member[]) => ms.reduce((s, m) => s + m.cost, 0);

export const money = (v: number) =>
  v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : `$${Math.round(v / 1e3)}K`;

export const pctText = (v: number) => `${Math.round(v * 100)}%`;

export const hexToRgb = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

export const mixRgb = (
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
