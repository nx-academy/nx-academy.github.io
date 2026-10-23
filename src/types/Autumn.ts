export type LeafShape = "oval" | "maple";

export type LeafColor = "gold" | "ember" | "ochre" | "brown" | "rust";

/** Une grille de pixels : une chaîne par ligne, « . » pour un pixel vide. */
export type SpriteRows = string[];

/** Un rectangle prêt à dessiner, en cellules (sprites) ou en px (branches). */
export type PixelRect = {
  x: number;
  y: number;
  width: number;
  className: string;
};

/** Courbe de Bézier quadratique, en cellules :
    [x0, y0, cx, cy, x1, y1, épaisseur au départ, épaisseur à l'arrivée]. */
export type BranchCurve = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type BranchLeaf = {
  /** Point d'attache de la tige, en cellules. */
  x: number;
  y: number;
  shape: LeafShape;
  color: LeafColor;
  /** Avancée de la saison (0 → 1) à partir de laquelle la feuille est tombée.
      Au-delà de 1, elle tient jusqu'au bout. */
  fallsAt: number;
};

export type Branch = {
  /** Largeur et hauteur du viewBox, en px. */
  width: number;
  height: number;
  curves: BranchCurve[];
  leaves: BranchLeaf[];
};

export type PlacedLeaf = {
  href: string;
  x: number;
  y: number;
  width: number;
  height: number;
  flutter: "" | "fast" | "slow";
};

export type CarpetLeaf = {
  x: number;
  y: number;
  shape: LeafShape;
  color: LeafColor;
  rotation: number;
  /** Tirage entre 0 et 1 : la feuille est au sol si rank < couverture. */
  rank: number;
};
