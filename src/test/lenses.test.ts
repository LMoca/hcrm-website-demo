import { describe, expect, it } from "vitest";
import { lenses, roleLenses, lensByKey, lensForPersona } from "@/data/lenses";
import { personas } from "@/data/personas";
import { testimonials } from "@/data/testimonials";
import { createPopulation } from "@/components/lens/population";

describe("role lenses", () => {
  it("maps every persona to exactly one lens", () => {
    for (const p of personas) {
      const owners = roleLenses.filter((l) => l.personaSlugs.includes(p.slug));
      expect(owners, p.slug).toHaveLength(1);
      expect(lensForPersona(p.slug)).toBe(owners[0]);
    }
  });

  it("only references personas that exist", () => {
    const slugs = new Set(personas.map((p) => p.slug));
    for (const l of lenses) for (const s of l.personaSlugs) expect(slugs.has(s), s).toBe(true);
  });

  it("features a testimonial that exists for every lens", () => {
    for (const l of lenses) {
      expect(testimonials.some((t) => t.author === l.testimonial), l.key).toBe(true);
    }
  });

  it("has three questions per lens and unique keys", () => {
    expect(new Set(lenses.map((l) => l.key)).size).toBe(lenses.length);
    for (const l of lenses) expect(l.questions).toHaveLength(3);
  });

  it("rejects unknown keys", () => {
    expect(lensByKey("nope")).toBeUndefined();
    expect(lensByKey(null)).toBeUndefined();
  });
});

describe("synthetic population", () => {
  it("is deterministic for a seed", () => {
    const a = createPopulation(200, 5);
    const b = createPopulation(200, 5);
    expect(a.total).toBe(b.total);
  });

  it("is concentrated the way claims spend is", () => {
    const pop = createPopulation(1000, 17);
    const top5 = pop.desc.slice(0, 50).reduce((s, m) => s + m.cost, 0);
    expect(top5 / pop.total).toBeGreaterThan(0.25);
  });
});
