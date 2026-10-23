import { describe, expect, it } from "vitest";

import { BRANCH_LEFT, HEDGEHOG_POSITION } from "../../data/autumn";
import {
  autumnProgress,
  branchLeaves,
  branchRects,
  carpetCoverage,
  carpetLayers,
  carpetLeaves,
  createRandom,
  fallingLeafCount,
  hidesHedgehogFace,
  isAutumn,
  PIXEL,
  shouldRenderAutumn,
  spriteRects,
} from "./index";

describe("isAutumn", () => {
  it("couvre du 1er octobre au 30 novembre inclus", () => {
    expect(isAutumn(new Date(2026, 8, 30, 23, 59))).toBe(false);
    expect(isAutumn(new Date(2026, 9, 1))).toBe(true);
    expect(isAutumn(new Date(2026, 9, 23))).toBe(true);
    expect(isAutumn(new Date(2026, 10, 30, 23, 59))).toBe(true);
    expect(isAutumn(new Date(2026, 11, 1))).toBe(false);
  });

  it("revient chaque année", () => {
    expect(isAutumn(new Date(2027, 9, 15))).toBe(true);
  });
});

describe("shouldRenderAutumn", () => {
  it("génère le décor une semaine avant le début de la saison", () => {
    expect(shouldRenderAutumn(new Date(2026, 8, 23))).toBe(false);
    expect(shouldRenderAutumn(new Date(2026, 8, 24))).toBe(true);
    expect(shouldRenderAutumn(new Date(2026, 9, 23))).toBe(true);
  });

  it("s'arrête après le 30 novembre", () => {
    expect(shouldRenderAutumn(new Date(2026, 11, 1))).toBe(false);
  });
});

describe("autumnProgress", () => {
  it("vaut 0 le 1er octobre et 1 le 30 novembre", () => {
    expect(autumnProgress(new Date(2026, 9, 1))).toBe(0);
    expect(autumnProgress(new Date(2026, 10, 30))).toBe(1);
  });

  it("avance entre les deux", () => {
    const progress = autumnProgress(new Date(2026, 9, 23));
    expect(progress).toBeGreaterThan(0.3);
    expect(progress).toBeLessThan(0.4);
  });

  it("reste bornée hors saison", () => {
    expect(autumnProgress(new Date(2026, 8, 25))).toBe(0);
    expect(autumnProgress(new Date(2026, 11, 15))).toBe(1);
  });
});

describe("createRandom", () => {
  it("donne la même suite pour la même graine", () => {
    const a = createRandom(7);
    const b = createRandom(7);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("reste entre 0 et 1", () => {
    const random = createRandom(42);
    for (let i = 0; i < 100; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("spriteRects", () => {
  it("fusionne les pixels voisins d'une même couleur", () => {
    expect(spriteRects(["aab.", ".bb."], { a: "A", b: "B" })).toEqual([
      { x: 0, y: 0, width: 2, className: "A" },
      { x: 2, y: 0, width: 1, className: "B" },
      { x: 1, y: 1, width: 2, className: "B" },
    ]);
  });
});

describe("branchRects", () => {
  it("éclaire le dessus et assombrit le dessous d'une branche épaisse", () => {
    const rects = branchRects([[0, 5, 5, 5, 10, 5, 3, 3]]);
    const tones = new Set(rects.map((rect) => rect.className));
    expect(tones).toEqual(new Set(["au-b-hi", "au-b-mid", "au-b-lo"]));
  });

  it("aligne tout sur la grille de pixels", () => {
    for (const rect of branchRects(BRANCH_LEFT.curves)) {
      // Math.abs : la branche part hors cadre, et -8 % 4 vaut -0
      expect(Math.abs(rect.x % PIXEL)).toBe(0);
      expect(rect.y % PIXEL).toBe(0);
      expect(rect.width % PIXEL).toBe(0);
    }
  });
});

describe("branchLeaves", () => {
  it("garde toutes les feuilles au début de la saison", () => {
    expect(branchLeaves(BRANCH_LEFT.leaves, 0)).toHaveLength(
      BRANCH_LEFT.leaves.length,
    );
  });

  it("dégarnit la branche au fil de la saison", () => {
    const early = branchLeaves(BRANCH_LEFT.leaves, 0.3).length;
    const late = branchLeaves(BRANCH_LEFT.leaves, 0.8).length;
    expect(late).toBeLessThan(early);
  });

  it("laisse une dernière feuille le 30 novembre", () => {
    expect(branchLeaves(BRANCH_LEFT.leaves, 1)).toHaveLength(1);
  });

  it("place la feuille sous sa tige, en px", () => {
    const [leaf] = branchLeaves(
      [{ x: 10, y: 4, shape: "oval", color: "gold", fallsAt: 1 }],
      0,
    );
    expect(leaf).toMatchObject({
      href: "#au-oval-gold",
      x: 8 * PIXEL,
      y: 4 * PIXEL,
      width: 5 * PIXEL,
      height: 7 * PIXEL,
    });
  });
});

describe("carpetLayers", () => {
  it("épaissit le tapis au fil de la saison", () => {
    const count = (progress: number) => {
      const { behind, inFront } = carpetLayers(progress);
      return behind.length + inFront.length;
    };
    expect(count(0.8)).toBeGreaterThan(count(0.2));
    expect(count(1)).toBe(carpetLeaves().length);
  });

  it("dessine derrière le hérisson les feuilles plus hautes que lui", () => {
    const { behind, inFront } = carpetLayers(1);
    expect(behind.every((l) => l.y < HEDGEHOG_POSITION.y + 4)).toBe(true);
    expect(inFront.every((l) => l.y >= HEDGEHOG_POSITION.y + 4)).toBe(true);
  });

  it("ne cache jamais le visage du hérisson", () => {
    expect(carpetLeaves().some((l) => hidesHedgehogFace(l.x, l.y))).toBe(false);
  });

  it("donne toujours le même tapis", () => {
    expect(carpetLeaves()).toEqual(carpetLeaves());
  });
});

describe("carpetCoverage", () => {
  it("va d'un cinquième à tout le tapis", () => {
    expect(carpetCoverage(0)).toBe(0.2);
    expect(carpetCoverage(1)).toBe(1);
  });
});

describe("fallingLeafCount", () => {
  it("culmine au milieu de la saison", () => {
    expect(fallingLeafCount(0.45)).toBe(6);
  });

  it("garde au moins une feuille qui tombe", () => {
    expect(fallingLeafCount(0)).toBe(1);
    expect(fallingLeafCount(1)).toBe(1);
  });
});
