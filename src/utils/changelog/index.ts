/* Dérivations de la page « Mises à jour ».
   Tout ce qui est chiffré sur /changelog et /changelog/[annee] est calculé ici,
   depuis les YAML de la content collection. Rien n'est écrit à la main : ni
   compteur, ni date, ni résumé — c'est ce qui empêche la page de périmer.
   Les composants ne calculent rien, ils affichent ce que ce module renvoie. */

import type { LogTasks, Task, TaskKind } from "../../types/LogTasks";

export const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const ABBR = [
  "JAN",
  "FÉV",
  "MAR",
  "AVR",
  "MAI",
  "JUIN",
  "JUIL",
  "AOÛ",
  "SEP",
  "OCT",
  "NOV",
  "DÉC",
];

/** Au-delà de 3 « à retenir », plus rien ne ressort : le rendu tronque. */
export const MAX_KEEP = 3;

/** Nombre de mois documentés dépliables sous le mois courant. */
export const RECENT_MONTHS = 4;

const HEADINGS: Record<TaskKind, string> = {
  done: "Nouveautés",
  "in-progress": "En cours",
  fix: "Correctifs",
};

const PLURALS: Record<TaskKind, [string, string]> = {
  done: ["nouveauté", "nouveautés"],
  "in-progress": ["chantier", "chantiers"],
  fix: ["correctif", "correctifs"],
};

/** Slug CSS d'un `kind` : `sec-done`, `sec-in-progress`, `sec-fix`. */
const KIND_ORDER: TaskKind[] = ["done", "in-progress", "fix"];

export type TimelineSlot = {
  year: number;
  order: number;
  /** « Juillet » — dérivé de `order`, pas du champ YAML, pour rester homogène. */
  month: string;
  /** « JUIL » — étiquette de l'histogramme. */
  abbr: string;
  /** Le mois consigné, ou `null` si le journal a sauté ce mois-là. */
  data: LogTasks | null;
  /** Nombre d'entrées du mois (0 sur un trou). */
  n: number;
};

export type Section = {
  kind: TaskKind;
  heading: string;
  tasks: Task[];
};

export type RenderItem =
  | { type: "month"; slot: TimelineSlot; data: LogTasks }
  | { type: "gap"; slots: TimelineSlot[]; label: string; text: string };

export type YearStats = {
  /** Mois effectivement consignés. */
  months: number;
  /** Mois de la période couverte par le journal cette année-là. */
  slots: number;
  total: number;
  done: number;
};

/* ── petites primitives de texte ─────────────────────────────────── */

/**
 * Typographie française appliquée au rendu : espace insécable avant les signes
 * doubles et après le guillemet ouvrant. Le texte des YAML n'est jamais modifié.
 *
 * La substitution ne vise que les séquences « espace + ponctuation », ce qui ne
 * touche pas les attributs HTML : un `href` n'a pas d'espace avant ses `:`.
 */
export function nbsp(text: string): string {
  return text.replace(/ ([:;!?»])/g, "\u00a0$1").replace(/« /g, "«\u00a0");
}

/** Retire les balises d'une entrée pour en faire du texte de résumé. */
export function stripTags(html: string): string {
  return nbsp(html.replace(/<[^>]+>/g, ""));
}

/** Coupe sur une frontière de mot et signale la coupe. */
export function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/[\s,;:—·]+\S*$/, "") + "…";
}

/** « juillet 2026 » — minuscules, toujours. */
export function monthLabel(slot: { year: number; order: number }): string {
  return `${MONTHS[slot.order - 1].toLowerCase()} ${slot.year}`;
}

/** « d'avril 2025 » mais « de mai 2025 » — l'élision devant une voyelle. */
export function elide(text: string): string {
  return /^[aeiouyâàéèêîïôûù]/i.test(text) ? `d'${text}` : `de ${text}`;
}

/** Identifiant d'ancre et de `<details>` : `2025-06`. */
export function monthId(slot: { year: number; order: number }): string {
  return `${slot.year}-${String(slot.order).padStart(2, "0")}`;
}

/* ── lecture d'un mois ───────────────────────────────────────────── */

export function countByKind(month: LogTasks, kind: TaskKind): number {
  return month.tasks.filter((task) => task.kind === kind).length;
}

/** Les entrées mises en avant, plafonnées — au-delà, le rendu tronque. */
export function keeps(month: LogTasks): Task[] {
  return month.tasks
    .filter((task) => task.kind === "done" && task.keep)
    .slice(0, MAX_KEEP);
}

/**
 * Résumé de la ligne repliée d'un mois. Les « à retenir » d'abord, sinon la
 * première livraison, sinon une phrase de repli. Rien à rédiger à la main.
 */
export function gist(month: LogTasks): string {
  const kept = keeps(month);
  if (kept.length) {
    const parts = kept.map((task) =>
      clip(stripTags(task.content).replace(/\s*\.$/, ""), 110),
    );
    return clip(parts.join(" · "), 190);
  }
  const first = month.tasks.find((task) => task.kind === "done");
  return first
    ? clip(stripTags(first.content), 130)
    : "Correctifs et mises à jour de dépendances.";
}

/**
 * Les sections internes d'un mois. Un mois passé n'affiche pas ses chantiers :
 * sur une archive, seul compte ce qui a été livré. Les entrées « à retenir » ne
 * sont pas répétées dans « nouveautés », et une catégorie vide disparaît.
 */
export function sections(month: LogTasks, withProgress: boolean): Section[] {
  const kept = new Set(keeps(month));
  const kinds = withProgress
    ? KIND_ORDER
    : KIND_ORDER.filter((kind) => kind !== "in-progress");

  return kinds
    .map((kind) => ({
      kind,
      heading: HEADINGS[kind],
      tasks: month.tasks.filter(
        (task) => task.kind === kind && !kept.has(task),
      ),
    }))
    .filter((section) => section.tasks.length > 0);
}

/**
 * Les compteurs de l'en-tête : « 16 nouveautés · 3 chantiers · 2 correctifs ».
 * Ne liste que ce qui est réellement affiché sous le mois — une catégorie à zéro
 * n'apparaît pas.
 */
export function counters(month: LogTasks, kinds: TaskKind[]): string[] {
  return kinds
    .map((kind) => ({ kind, n: countByKind(month, kind) }))
    .filter(({ n }) => n > 0)
    .map(({ kind, n }) => `${n} ${PLURALS[kind][n > 1 ? 1 : 0]}`);
}

/* ── la timeline, et tout ce qui s'en déduit ─────────────────────── */

/**
 * La suite **continue** des mois entre la première et la dernière entrée, du
 * plus ancien au plus récent. C'est elle qui matérialise les trous : un mois
 * sans YAML est un créneau avec `data: null`, pas une absence.
 */
export function buildTimeline(entries: LogTasks[]): TimelineSlot[] {
  if (!entries.length) return [];

  const sorted = [...entries].sort(
    (a, b) => a.year - b.year || a.order - b.order,
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const span = (last.year - first.year) * 12 + (last.order - first.order) + 1;

  return Array.from({ length: span }, (_, i) => {
    const abs = first.year * 12 + (first.order - 1) + i;
    const year = Math.floor(abs / 12);
    const order = (abs % 12) + 1;
    const data =
      sorted.find((m) => m.year === year && m.order === order) ?? null;
    return {
      year,
      order,
      month: MONTHS[order - 1],
      abbr: ABBR[order - 1],
      data,
      n: data ? data.tasks.length : 0,
    };
  });
}

/**
 * Enchaîne mois et trous dans l'ordre reçu, en regroupant les trous consécutifs
 * en une seule ligne. Les mois vides sont affichés et assumés, jamais masqués.
 */
export function groupGaps(slots: TimelineSlot[]): RenderItem[] {
  const items: RenderItem[] = [];
  let gap: TimelineSlot[] = [];

  const flush = () => {
    if (!gap.length) return;
    // les créneaux arrivent dans l'ordre d'affichage ; l'étiquette se lit
    // toujours du plus ancien au plus récent (« mai → juillet 2026 »)
    const chrono = [...gap].sort(
      (a, b) => a.year - b.year || a.order - b.order,
    );
    const oldest = chrono[0];
    const newest = chrono[chrono.length - 1];
    items.push({
      type: "gap",
      slots: chrono,
      label:
        chrono.length === 1
          ? monthLabel(oldest)
          : `${oldest.month.toLowerCase()} → ${monthLabel(newest)}`,
      text:
        chrono.length === 1
          ? "Aucune entrée ce mois-là — le mois a existé, le journal non."
          : `${chrono.length} mois sans entrée. Le journal reprend juste après.`,
    });
    gap = [];
  };

  for (const slot of slots) {
    if (!slot.data) {
      gap.push(slot);
      continue;
    }
    flush();
    items.push({ type: "month", slot, data: slot.data });
  }
  flush();

  return items;
}

/**
 * Découpe la page principale : le mois courant, les `RECENT_MONTHS` mois
 * **documentés** qui précèdent (les trous traversés restent dans la tranche mais
 * ne comptent pas dans les quatre), et le reste, qui part en archive.
 */
export function splitRecent(
  timeline: TimelineSlot[],
  recent = RECENT_MONTHS,
): {
  current: TimelineSlot | null;
  recent: TimelineSlot[];
  rest: TimelineSlot[];
} {
  const desc = [...timeline].reverse();
  if (!desc.length) return { current: null, recent: [], rest: [] };

  let seen = 0;
  let cut = 1;
  while (cut < desc.length && seen < recent) {
    if (desc[cut].data) seen++;
    cut++;
  }

  return {
    current: desc[0],
    recent: desc.slice(1, cut),
    rest: desc.slice(cut),
  };
}

export function yearStats(year: number, timeline: TimelineSlot[]): YearStats {
  const slots = timeline.filter((slot) => slot.year === year);
  const months = slots.filter((slot) => slot.data).map((slot) => slot.data!);

  return {
    months: months.length,
    slots: slots.length,
    total: months.reduce((n, m) => n + m.tasks.length, 0),
    done: months.reduce((n, m) => n + countByKind(m, "done"), 0),
  };
}

/** Plus longue série de mois consécutifs consignés dans l'année (easter egg). */
export function streak(year: number, timeline: TimelineSlot[]): number {
  let run = 0;
  let best = 0;
  for (const slot of timeline.filter((s) => s.year === year)) {
    run = slot.data ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}

/** Le mois le plus fourni de l'année (easter egg). */
export function bestMonth(
  year: number,
  timeline: TimelineSlot[],
): TimelineSlot | null {
  const slots = timeline.filter((slot) => slot.year === year && slot.data);
  if (!slots.length) return null;
  return slots.reduce((best, slot) => (slot.n > best.n ? slot : best));
}

/* ── le modèle complet, construit une fois par page ──────────────── */

export type Changelog = {
  timeline: TimelineSlot[];
  /** Mois couverts par le journal, trous compris. */
  span: number;
  /** Toutes les entrées, tous mois confondus. */
  total: number;
  /** Échelle de l'histogramme : le mois le plus fourni. */
  max: number;
  /** Années consignées, de la plus récente à la plus ancienne. */
  years: number[];
  /** L'année vivante du projet : elle n'a pas d'archive, elle a `/changelog`. */
  liveYear: number;
  current: TimelineSlot | null;
  recent: TimelineSlot[];
  rest: TimelineSlot[];
  /** Années méritant leur page d'archive : un mois consigné hors du bloc récent. */
  archivedYears: number[];
  byKind: (kind: TaskKind) => number;
};

export function buildChangelog(entries: LogTasks[]): Changelog {
  const timeline = buildTimeline(entries);
  const months = timeline.filter((slot) => slot.data).map((slot) => slot.data!);
  const { current, recent, rest } = splitRecent(timeline);

  return {
    timeline,
    span: timeline.length,
    total: months.reduce((n, m) => n + m.tasks.length, 0),
    max: Math.max(1, ...timeline.map((slot) => slot.n)),
    years: [...new Set(months.map((m) => m.year))].sort((a, b) => b - a),
    liveYear: current ? current.year : new Date().getFullYear(),
    current,
    recent,
    rest,
    archivedYears: [
      ...new Set(rest.filter((slot) => slot.data).map((slot) => slot.year)),
    ].sort((a, b) => b - a),
    byKind: (kind) => months.reduce((n, m) => n + countByKind(m, kind), 0),
  };
}
