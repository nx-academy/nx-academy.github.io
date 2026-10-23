/* Le thème d'automne : calendrier, avancée de la saison et décor en pixel art.
   Tout est calculé au build. La saison avance d'un build à l'autre (un build
   planifié tourne chaque lundi) : les branches se dégarnissent, le tapis de
   feuilles s'épaissit. Les composants Autumn* ne font qu'afficher. */

import { CARPET, HEDGEHOG_POSITION, LEAF_SPRITES } from "../../data/autumn";
import type {
  BranchCurve,
  BranchLeaf,
  CarpetLeaf,
  LeafColor,
  LeafShape,
  PixelRect,
  PlacedLeaf,
  SpriteRows,
} from "../../types/Autumn";

/** Taille d'un pixel du décor, en px à l'échelle 1. */
export const PIXEL = 4;

/** Du 1er octobre au 30 novembre inclus. Mois comptés à partir de 0. */
export const AUTUMN_START = { month: 9, day: 1 };
export const AUTUMN_END = { month: 10, day: 30 };

/** Le décor est généré quelques jours avant le début de la saison, pour qu'il
    soit en ligne le 1er octobre même si le build hebdomadaire tombe avant. */
export const PREVIEW_DAYS = 7;

const DAY = 86_400_000;

export function autumnBounds(year: number): { start: Date; end: Date } {
  return {
    start: new Date(year, AUTUMN_START.month, AUTUMN_START.day),
    // Exclusive : le lendemain du dernier jour, à minuit
    end: new Date(year, AUTUMN_END.month, AUTUMN_END.day + 1),
  };
}

export function isAutumn(date: Date): boolean {
  const { start, end } = autumnBounds(date.getFullYear());
  return date >= start && date < end;
}

/** Faut-il générer le décor au build ? Pendant la saison, et juste avant. */
export function shouldRenderAutumn(date: Date): boolean {
  const { start, end } = autumnBounds(date.getFullYear());
  return date >= new Date(start.getTime() - PREVIEW_DAYS * DAY) && date < end;
}

/** Avancée de la saison : 0 le 1er octobre, 1 le 30 novembre. */
export function autumnProgress(date: Date): number {
  const { start, end } = autumnBounds(date.getFullYear());
  const lastDay = end.getTime() - DAY;
  const progress =
    (date.getTime() - start.getTime()) / (lastDay - start.getTime());
  return Math.min(1, Math.max(0, progress));
}

/** Tirage pseudo-aléatoire stable (mulberry32) : même graine, même tapis. */
export function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Découpe un sprite en rectangles, en fusionnant les pixels voisins d'une
    même ligne et d'une même couleur. Coordonnées en cellules. */
export function spriteRects(
  rows: SpriteRows,
  classes: Record<string, string>,
): PixelRect[] {
  const rects: PixelRect[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      if (char === ".") {
        x++;
        continue;
      }
      let end = x;
      while (end < row.length && row[end] === char) end++;
      rects.push({ x, y, width: end - x, className: classes[char] });
      x = end;
    }
  });
  return rects;
}

export function leafClasses(color: LeafColor): Record<string, string> {
  return { a: `au-${color}-a`, b: `au-${color}-b`, s: "au-stem" };
}

export function leafSize(shape: LeafShape): { width: number; height: number } {
  const rows = LEAF_SPRITES[shape];
  return { width: rows[0].length, height: rows.length };
}

/** Pixellise les courbes d'une branche, avec trois tons : la lumière sur le
    dessus, l'ombre dessous. Coordonnées en px. */
export function branchRects(curves: BranchCurve[]): PixelRect[] {
  const cells = new Set<string>();
  for (const [x0, y0, cx, cy, x1, y1, t0, t1] of curves) {
    const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 3);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const u = 1 - t;
      const x = u * u * x0 + 2 * u * t * cx + t * t * x1;
      const y = u * u * y0 + 2 * u * t * cy + t * t * y1;
      const thickness = Math.max(1, Math.round(t0 + (t1 - t0) * t));
      const top = Math.round(y - thickness / 2);
      for (let k = 0; k < thickness; k++) {
        cells.add(`${Math.round(x)},${top + k}`);
      }
    }
  }

  const rows = new Map<number, [number, string][]>();
  for (const key of cells) {
    const [x, y] = key.split(",").map(Number);
    const up = cells.has(`${x},${y - 1}`);
    const down = cells.has(`${x},${y + 1}`);
    const tone = !up && down ? "au-b-hi" : up && !down ? "au-b-lo" : "au-b-mid";
    if (!rows.has(y)) rows.set(y, []);
    rows.get(y)!.push([x, tone]);
  }

  const rects: PixelRect[] = [];
  for (const [y, list] of [...rows].sort((a, b) => a[0] - b[0])) {
    list.sort((a, b) => a[0] - b[0]);
    let i = 0;
    while (i < list.length) {
      let j = i;
      while (
        j + 1 < list.length &&
        list[j + 1][0] === list[j][0] + 1 &&
        list[j + 1][1] === list[i][1]
      ) {
        j++;
      }
      rects.push({
        x: list[i][0] * PIXEL,
        y: y * PIXEL,
        width: (j - i + 1) * PIXEL,
        className: list[i][1],
      });
      i = j + 1;
    }
  }
  return rects;
}

/** Les feuilles encore accrochées à ce stade de la saison, placées en px.
    Une sur trois reste immobile, les autres frémissent à deux rythmes. */
export function branchLeaves(
  leaves: BranchLeaf[],
  progress: number,
): PlacedLeaf[] {
  return leaves.flatMap((leaf, i) => {
    if (progress >= leaf.fallsAt) return [];
    const { width, height } = leafSize(leaf.shape);
    return [
      {
        href: `#au-${leaf.shape}-${leaf.color}`,
        x: (leaf.x - Math.floor(width / 2)) * PIXEL,
        y: leaf.y * PIXEL,
        width: width * PIXEL,
        height: height * PIXEL,
        flutter: (["fast", "slow", ""] as const)[i % 3],
      },
    ];
  });
}

/** Part du tapis couverte : un cinquième le 1er octobre, tout le 30 novembre. */
export function carpetCoverage(progress: number): number {
  return 0.2 + 0.8 * progress;
}

/** Toutes les feuilles possibles du tapis, triées de l'arrière vers l'avant. */
export function carpetLeaves(): CarpetLeaf[] {
  const random = createRandom(CARPET.seed);
  const leaves: CarpetLeaf[] = [];
  for (let i = 0; i < CARPET.leaves; i++) {
    const y = Math.round((44 + Math.pow(random(), 0.55) * 74) / PIXEL) * PIXEL;
    const x = Math.round((random() * 1470 - 20) / PIXEL) * PIXEL;
    const shape: LeafShape = random() < 0.4 ? "maple" : "oval";
    const palette: LeafColor[] =
      y < 76
        ? ["brown", "rust", "ochre"]
        : ["gold", "ember", "ochre", "gold", "rust", "brown"];
    const color = palette[Math.floor(random() * palette.length)];
    const rotation = Math.floor(random() * 4) * 90;
    const rank = random();
    if (hidesHedgehogFace(x, y)) continue;
    leaves.push({ x, y, shape, color, rotation, rank });
  }
  return leaves.sort((a, b) => a.y - b.y);
}

/** Le visage du hérisson reste toujours dégagé. */
export function hidesHedgehogFace(x: number, y: number): boolean {
  return (
    y >= HEDGEHOG_POSITION.y - 4 &&
    x > HEDGEHOG_POSITION.x + 28 &&
    x < HEDGEHOG_POSITION.x + 70
  );
}

/** Les feuilles au sol à ce stade, réparties autour du hérisson : celles de
    derrière sont dessinées avant lui, celles de devant le recouvrent. */
export function carpetLayers(progress: number): {
  behind: CarpetLeaf[];
  inFront: CarpetLeaf[];
} {
  const coverage = carpetCoverage(progress);
  const visible = carpetLeaves().filter((leaf) => leaf.rank < coverage);
  return {
    behind: visible.filter((leaf) => leaf.y < HEDGEHOG_POSITION.y + 4),
    inFront: visible.filter((leaf) => leaf.y >= HEDGEHOG_POSITION.y + 4),
  };
}

/** Nombre de feuilles qui tombent dans les marges : la chute culmine au
    milieu de la saison, il n'en reste qu'une à la fin. */
export function fallingLeafCount(progress: number, max = 6): number {
  const count = Math.round(
    max * Math.sin(Math.PI * Math.min(1, progress * 1.1)),
  );
  return Math.min(max, Math.max(1, count));
}
