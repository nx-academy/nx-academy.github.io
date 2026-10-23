import type { Branch, LeafColor, LeafShape, SpriteRows } from "../types/Autumn";

// Décor du thème d'automne, en pixel art. Un pixel vaut 4 px à l'échelle 1.
// Les sprites sont dessinés à la main, une chaîne par ligne.

export const LEAF_COLORS: LeafColor[] = [
  "gold",
  "ember",
  "ochre",
  "brown",
  "rust",
];

// « a » : la feuille, « b » : la nervure, « s » : la tige (en haut)
export const LEAF_SPRITES: Record<LeafShape, SpriteRows> = {
  oval: ["..s..", ".aaa.", "aabaa", "aabaa", "aabaa", ".aba.", "..a.."],
  maple: [
    "....s....",
    "....s....",
    ".aa.a.aa.",
    "..aabaa..",
    ".aabbbaa.",
    "aaaabaaaa",
    ".aaabaaa.",
    ".a.aaa.a.",
    "....a....",
  ],
};

export const HEDGEHOG_ASLEEP: SpriteRows = [
  ".....d.d.d.....",
  "...dbdbdbdbd...",
  "..dbbbbbbbbbd..",
  ".dbbbdbbbdbbbf.",
  "dbbdbbbdbbbbfff",
  "dbbbbbdbbbbfefn",
  ".dbbbbbbbbbffff",
  "..ffffffffffff.",
];

// Réveillé : l'œil s'ouvre, un pixel plus haut
export const HEDGEHOG_AWAKE: SpriteRows = HEDGEHOG_ASLEEP.map((row, i) =>
  i === 4 ? "dbbdbbbdbbbbfef" : i === 5 ? "dbbbbbdbbbbfffn" : row,
);

export const HEDGEHOG_CLASSES: Record<string, string> = {
  d: "au-hh-spike",
  b: "au-hh-body",
  f: "au-hh-face",
  e: "au-eye",
  n: "au-eye",
};

const SQUIRREL_BODY: SpriteRows = [
  "..tttt..........",
  ".tttttt.........",
  "ttt..ttt...k....",
  "tt....tt..kbbb..",
  "tt.....t.bbbebb.",
  ".t....tbbbbbbbbn",
  "......tbbbbbbbb.",
  "......bbbcccbb..",
  ".....bbbbbbbbb..",
];

// Deux images de course : seules les pattes changent
export const SQUIRREL_FRAMES: SpriteRows[] = [
  [...SQUIRREL_BODY, ".....b..b...b.b."],
  [...SQUIRREL_BODY, "......b.b..b..b."],
];

export const SQUIRREL_CLASSES: Record<string, string> = {
  t: "au-sq-tail",
  b: "au-sq-body",
  k: "au-sq-ear",
  e: "au-eye",
  n: "au-eye",
  c: "au-sq-belly",
};

// Branche gauche : feuillue, avec des rameaux déjà nus
export const BRANCH_LEFT: Branch = {
  width: 520,
  height: 240,
  curves: [
    [-4, 8, 40, 9, 90, 26, 4.5, 3],
    [90, 26, 112, 35, 131, 44, 3, 1],
    [28, 11, 33, 3, 48, 1, 2, 1],
    [52, 17, 57, 25, 59, 36, 2, 1],
    [74, 22, 84, 16, 96, 15, 1.6, 1],
    [96, 15, 100, 14, 103, 11, 1, 1],
    [92, 15, 93, 12, 94, 9, 1, 1],
    [96, 32, 98, 40, 95, 50, 1.5, 1],
    [118, 39, 122, 36, 126, 33, 1, 1],
    [124, 42, 127, 45, 129, 48, 1, 1],
  ],
  leaves: [
    { x: 48, y: 2, shape: "oval", color: "gold", fallsAt: 0.55 },
    { x: 41, y: 4, shape: "maple", color: "ochre", fallsAt: 0.9 },
    { x: 35, y: 6, shape: "oval", color: "ember", fallsAt: 0.45 },
    { x: 15, y: 11, shape: "oval", color: "gold", fallsAt: 0.75 },
    { x: 37, y: 14, shape: "maple", color: "brown", fallsAt: 0.3 },
    { x: 59, y: 37, shape: "oval", color: "ember", fallsAt: 0.85 },
    { x: 57, y: 26, shape: "oval", color: "gold", fallsAt: 0.5 },
    { x: 68, y: 21, shape: "maple", color: "gold", fallsAt: 0.65 },
    { x: 85, y: 18, shape: "oval", color: "ochre", fallsAt: 0.4 },
    // La dernière feuille, qui tient jusqu'au 30 novembre
    { x: 95, y: 51, shape: "oval", color: "rust", fallsAt: 1.5 },
    { x: 80, y: 23, shape: "oval", color: "ember", fallsAt: 0.25 },
    { x: 105, y: 34, shape: "oval", color: "gold", fallsAt: 0.6 },
  ],
};

// Branche droite : plus dégarnie, affichée en miroir
export const BRANCH_RIGHT: Branch = {
  width: 380,
  height: 200,
  curves: [
    [-4, 6, 30, 8, 56, 21, 3.5, 2],
    [56, 21, 76, 28, 94, 33, 2, 1],
    [22, 9, 26, 16, 27, 30, 1.6, 1],
    [46, 17, 52, 11, 64, 8, 1.2, 1],
    [64, 8, 68, 6, 70, 4, 1, 1],
    [60, 9, 61, 6, 61, 3, 1, 1],
    [76, 28, 79, 33, 81, 37, 1, 1],
  ],
  leaves: [
    { x: 27, y: 31, shape: "oval", color: "gold", fallsAt: 0.7 },
    { x: 14, y: 9, shape: "maple", color: "ochre", fallsAt: 0.5 },
    { x: 38, y: 14, shape: "oval", color: "ember", fallsAt: 0.35 },
    { x: 27, y: 20, shape: "oval", color: "brown", fallsAt: 0.2 },
  ],
};

/** Position du hérisson dans le tapis (viewBox 1440 × 120). Choisie près du
    centre pour qu'il reste visible sur mobile, où le tapis est rogné. */
export const HEDGEHOG_POSITION = { x: 760, y: 76 };

export const CARPET = { width: 1440, height: 120, leaves: 340, seed: 11 };
