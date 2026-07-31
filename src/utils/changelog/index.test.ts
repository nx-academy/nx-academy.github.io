import { it, expect, describe } from "vitest";

import type { LogTasks, Task, TaskKind } from "../../types/LogTasks";
import {
  bestMonth,
  buildChangelog,
  buildTimeline,
  clip,
  counters,
  gist,
  groupGaps,
  keeps,
  monthId,
  monthLabel,
  nbsp,
  sections,
  splitRecent,
  streak,
  yearStats,
} from "./index";

const NBSP = "\u00a0";

const task = (kind: TaskKind, content: string, keep = false): Task =>
  keep ? { kind, content, keep } : { kind, content };

const month = (year: number, order: number, tasks: Task[]): LogTasks => ({
  month: String(order),
  year,
  order,
  tasks,
});

const done = (content: string, keep = false) => task("done", content, keep);

/* Un journal miniature qui reproduit la forme du vrai : deux années, un trou
   d'un mois et un trou de deux mois consécutifs. */
const JOURNAL: LogTasks[] = [
  month(2025, 11, [done("Onze A"), task("fix", "Onze B")]),
  month(2025, 12, [done("Douze A"), done("Douze B"), done("Douze C")]),
  // trou : janvier 2026
  month(2026, 2, [done("Février A")]),
  month(2026, 3, [done("Mars A"), task("in-progress", "Mars chantier")]),
  // trou : avril et mai 2026
  month(2026, 6, [done("Juin A"), task("fix", "Juin B")]),
];

describe("buildTimeline", () => {
  it("matérialise les trous entre la première et la dernière entrée", () => {
    const timeline = buildTimeline(JOURNAL);

    expect(timeline).toHaveLength(8); // nov. 2025 → juin 2026
    expect(timeline.map((slot) => monthId(slot))).toEqual([
      "2025-11",
      "2025-12",
      "2026-01",
      "2026-02",
      "2026-03",
      "2026-04",
      "2026-05",
      "2026-06",
    ]);
    expect(timeline.filter((slot) => !slot.data).map(monthId)).toEqual([
      "2026-01",
      "2026-04",
      "2026-05",
    ]);
  });

  it("compte les entrées de chaque créneau et laisse les trous à zéro", () => {
    const timeline = buildTimeline(JOURNAL);

    expect(timeline.map((slot) => slot.n)).toEqual([2, 3, 0, 1, 2, 0, 0, 2]);
  });

  it("ne suppose pas que les entrées arrivent triées", () => {
    const shuffled = [...JOURNAL].reverse();

    expect(buildTimeline(shuffled).map(monthId)).toEqual(
      buildTimeline(JOURNAL).map(monthId),
    );
  });

  it("renvoie une timeline vide sur une collection vide", () => {
    expect(buildTimeline([])).toEqual([]);
  });
});

describe("keeps", () => {
  it("ne retient que les livraisons marquées", () => {
    const m = month(2026, 6, [
      done("Non marquée"),
      done("Marquée", true),
      task("fix", "Correctif marqué", true),
      task("in-progress", "Chantier marqué", true),
    ]);

    expect(keeps(m).map((t) => t.content)).toEqual(["Marquée"]);
  });

  it("tronque au-delà de trois — le garde-fou du rendu", () => {
    const m = month(2026, 6, [
      done("Une", true),
      done("Deux", true),
      done("Trois", true),
      done("Quatre", true),
    ]);

    expect(keeps(m).map((t) => t.content)).toEqual(["Une", "Deux", "Trois"]);
  });
});

describe("gist", () => {
  it("préfère les « à retenir », joints par un point médian", () => {
    const m = month(2026, 6, [
      done("Une première livraison."),
      done("La fiche Docker Swarm.", true),
      done("Le récap de juin.", true),
    ]);

    expect(gist(m)).toBe("La fiche Docker Swarm · Le récap de juin");
  });

  it("retombe sur la première livraison quand rien n'est marqué", () => {
    const m = month(2026, 6, [
      task("fix", "Un correctif."),
      done("La première livraison."),
      done("La seconde."),
    ]);

    expect(gist(m)).toBe("La première livraison.");
  });

  it("retombe sur une phrase générique quand le mois n'a rien livré", () => {
    const m = month(2026, 6, [task("fix", "Un correctif.")]);

    expect(gist(m)).toBe("Correctifs et mises à jour de dépendances.");
  });

  it("retire les balises du résumé", () => {
    const m = month(2026, 6, [
      done('Nouvelle <a href="/fiches/x">fiche technique</a>.'),
    ]);

    expect(gist(m)).toBe("Nouvelle fiche technique.");
  });

  it("coupe sur une frontière de mot et signale la coupe", () => {
    const long = "mot ".repeat(60).trim() + ".";
    const summary = gist(month(2026, 6, [done(long)]));

    expect(summary.length).toBeLessThanOrEqual(130);
    expect(summary.endsWith("…")).toBe(true);
    expect(summary).not.toContain("mo…"); // jamais au milieu d'un mot
  });
});

describe("clip", () => {
  it("laisse un texte plus court que la limite intact", () => {
    expect(clip("court", 30)).toBe("court");
  });

  it("coupe au dernier mot entier", () => {
    expect(clip("un deux trois quatre", 14)).toBe("un deux…");
  });
});

describe("nbsp", () => {
  it("pose une espace insécable devant les signes doubles", () => {
    expect(nbsp("Attention : voilà ; et donc ! puis ?")).toBe(
      `Attention${NBSP}: voilà${NBSP}; et donc${NBSP}! puis${NBSP}?`,
    );
  });

  it("colle les guillemets français à leur contenu", () => {
    expect(nbsp("Le billet « Ne plus se dédoubler »")).toBe(
      `Le billet «${NBSP}Ne plus se dédoubler${NBSP}»`,
    );
  });

  it("ne touche pas aux attributs HTML", () => {
    const html =
      '<a href="https://nx-academy.fr/articles/x" target="_blank">le récap</a>';

    expect(nbsp(html)).toBe(html);
  });
});

describe("sections", () => {
  it("ne répète pas les « à retenir » dans les nouveautés", () => {
    const m = month(2026, 6, [
      done("Mise en avant", true),
      done("Livraison ordinaire"),
    ]);

    const [nouveautes] = sections(m, true);
    expect(nouveautes.tasks.map((t) => t.content)).toEqual([
      "Livraison ordinaire",
    ]);
  });

  it("masque les catégories vides", () => {
    const m = month(2026, 6, [done("Seule livraison")]);

    expect(sections(m, true).map((s) => s.kind)).toEqual(["done"]);
  });

  it("n'affiche pas les chantiers d'un mois passé", () => {
    const m = month(2026, 6, [
      done("Livraison"),
      task("in-progress", "Chantier"),
      task("fix", "Correctif"),
    ]);

    expect(sections(m, true).map((s) => s.kind)).toEqual([
      "done",
      "in-progress",
      "fix",
    ]);
    expect(sections(m, false).map((s) => s.kind)).toEqual(["done", "fix"]);
  });
});

describe("counters", () => {
  it("accorde en nombre et saute les catégories à zéro", () => {
    const m = month(2026, 6, [
      done("A"),
      done("B"),
      task("fix", "C"),
      // aucun chantier
    ]);

    expect(counters(m, ["done", "in-progress", "fix"])).toEqual([
      "2 nouveautés",
      "1 correctif",
    ]);
  });
});

describe("groupGaps", () => {
  it("regroupe les trous consécutifs en une seule ligne", () => {
    const desc = [...buildTimeline(JOURNAL)].reverse();
    const items = groupGaps(desc);

    const gaps = items.filter((item) => item.type === "gap");
    expect(gaps).toHaveLength(2);
    expect(gaps[0]).toMatchObject({
      label: "avril → mai 2026",
      text: "2 mois sans entrée. Le journal reprend juste après.",
    });
    expect(gaps[1]).toMatchObject({
      label: "janvier 2026",
      text: "Aucune entrée ce mois-là — le mois a existé, le journal non.",
    });
  });

  it("conserve l'ordre d'affichage des mois consignés", () => {
    const desc = [...buildTimeline(JOURNAL)].reverse();

    const months = groupGaps(desc)
      .filter((item) => item.type === "month")
      .map((item) => monthId(item.slot));

    expect(months).toEqual([
      "2026-06",
      "2026-03",
      "2026-02",
      "2025-12",
      "2025-11",
    ]);
  });
});

describe("splitRecent", () => {
  it("compte quatre mois documentés, trous non compris", () => {
    const { current, recent, rest } = splitRecent(buildTimeline(JOURNAL));

    expect(monthId(current!)).toBe("2026-06");
    // les deux trous d'avril-mai sont traversés sans compter dans les quatre
    expect(recent.map(monthId)).toEqual([
      "2026-05",
      "2026-04",
      "2026-03",
      "2026-02",
      "2026-01",
      "2025-12",
      "2025-11",
    ]);
    expect(rest).toEqual([]);
  });

  it("renvoie le surplus quand le journal dépasse le bloc récent", () => {
    const { recent, rest } = splitRecent(buildTimeline(JOURNAL), 2);

    expect(recent.filter((slot) => slot.data).map(monthId)).toEqual([
      "2026-03",
      "2026-02",
    ]);
    expect(rest.filter((slot) => slot.data).map(monthId)).toEqual([
      "2025-12",
      "2025-11",
    ]);
  });
});

describe("yearStats", () => {
  it("distingue les mois consignés des mois de la période", () => {
    const timeline = buildTimeline(JOURNAL);

    expect(yearStats(2026, timeline)).toEqual({
      months: 3, // février, mars, juin
      slots: 6, // janvier → juin
      total: 5,
      done: 3,
    });
  });

  it("ne compte que les mois couverts par le journal", () => {
    const timeline = buildTimeline(JOURNAL);

    // 2025 ne commence qu'en novembre : la période s'arrête à deux créneaux
    expect(yearStats(2025, timeline)).toMatchObject({ months: 2, slots: 2 });
  });
});

describe("streak", () => {
  it("mesure la plus longue série de mois consécutifs consignés", () => {
    const timeline = buildTimeline(JOURNAL);

    expect(streak(2026, timeline)).toBe(2); // février puis mars
    expect(streak(2025, timeline)).toBe(2); // novembre puis décembre
  });
});

describe("bestMonth", () => {
  it("retient le mois le plus fourni de l'année", () => {
    const timeline = buildTimeline(JOURNAL);

    expect(monthId(bestMonth(2025, timeline)!)).toBe("2025-12");
  });

  it("renvoie null sur une année sans entrée", () => {
    expect(bestMonth(2024, buildTimeline(JOURNAL))).toBeNull();
  });
});

describe("buildChangelog", () => {
  it("dérive les chiffres du bandeau de preuve", () => {
    const model = buildChangelog(JOURNAL);

    expect(model.span).toBe(8);
    expect(model.total).toBe(10);
    expect(model.byKind("done")).toBe(7);
    expect(model.max).toBe(3);
    expect(model.years).toEqual([2026, 2025]);
    expect(model.liveYear).toBe(2026);
    expect(monthLabel(model.current!)).toBe("juin 2026");
  });

  it("n'archive une année que si elle a un mois hors du bloc récent", () => {
    // avec quatre mois récents, tout tient sur la page principale
    expect(buildChangelog(JOURNAL).archivedYears).toEqual([]);
  });
});
