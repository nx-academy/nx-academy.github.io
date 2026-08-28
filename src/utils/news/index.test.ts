import { it, expect, describe } from "vitest";

import type { NewsBody, NewsRow } from "./index";
import {
  buildFeed,
  isBalanced,
  isFullEntry,
  newsContext,
  newsLecture,
  newsSource,
} from "./index";

const news = (overrides: Partial<NewsBody> = {}): NewsBody => ({
  content: "Ancien bloc unique.",
  context: null,
  lecture: null,
  ...overrides,
});

/* Un jour de publication par rang : `day: 3` est plus récent que `day: 1`, ce
   qui rend l'ordre attendu lisible dans les tests. */
const row = (day: number, lecture: string | null = null): NewsRow => ({
  content: `Contenu ${day}.`,
  context: `Contexte ${day}.`,
  lecture,
  published: new Date(2026, 6, day),
  slug: `breve-${day}`,
  title: `Brève ${day}`,
  url: "https://uxdesign.cc/article",
});

/** Les blocs rendus, sous une forme comparable d'un coup d'œil. */
const shape = (rows: NewsRow[], page = 1, perPage = 12) =>
  buildFeed(rows, page, perPage).blocks.map((block) =>
    block.kind === "lines"
      ? `lines:${block.items.map((item) => item.slug).join(",")}`
      : block.kind === "entry"
        ? `entry:${block.item.slug}`
        : "mark",
  );

describe("newsContext", () => {
  it("préfère le contexte quand il existe", () => {
    expect(newsContext(news({ context: "Le résumé factuel." }))).toBe(
      "Le résumé factuel.",
    );
  });

  it("retombe sur content pour une entrée de l'ancien format", () => {
    expect(newsContext(news())).toBe("Ancien bloc unique.");
  });

  it("traite un contexte vide ou blanc comme absent", () => {
    expect(newsContext(news({ context: "" }))).toBe("Ancien bloc unique.");
    expect(newsContext(news({ context: "   " }))).toBe("Ancien bloc unique.");
  });
});

describe("newsLecture", () => {
  it("rend la lecture quand elle est renseignée", () => {
    expect(newsLecture(news({ lecture: "Ce que j'en pense." }))).toBe(
      "Ce que j'en pense.",
    );
  });

  it("rend null pour une entrée de l'ancien format", () => {
    expect(newsLecture(news())).toBeNull();
  });

  it("rend null plutôt qu'une chaîne vide", () => {
    expect(newsLecture(news({ lecture: "" }))).toBeNull();
    expect(newsLecture(news({ lecture: "  " }))).toBeNull();
  });
});

describe("newsSource", () => {
  it("nomme les médias déjà cités", () => {
    expect(newsSource("https://uxdesign.cc/ai-can-fake-your-portfolio")).toBe(
      "UX Collective",
    );
    expect(newsSource("https://www.noemamag.com/why-is-everyone-so-sad")).toBe(
      "Noema",
    );
  });

  it("retombe sur le domaine nu pour une source nouvelle", () => {
    expect(newsSource("https://www.exemple.dev/un-article")).toBe(
      "exemple.dev",
    );
  });

  it("ne casse pas sur une URL invalide", () => {
    expect(newsSource("pas-une-url")).toBe("pas-une-url");
  });
});

describe("isFullEntry", () => {
  it("distingue les deux formats par la seule lecture", () => {
    expect(isFullEntry(news({ lecture: "Ce que j'en retiens." }))).toBe(true);
    expect(isFullEntry(news())).toBe(false);
  });
});

describe("isBalanced", () => {
  it("refuse une lecture plus courte que le contexte", () => {
    expect(
      isBalanced(news({ context: "Un contexte assez long.", lecture: "Bof." })),
    ).toBe(false);
  });

  it("accepte une lecture au moins aussi longue", () => {
    expect(
      isBalanced(news({ context: "Court.", lecture: "Nettement plus long." })),
    ).toBe(true);
  });

  it("tient une brève sans lecture pour conforme", () => {
    // Elle n'est pas déséquilibrée, elle est d'un autre format.
    expect(isBalanced(news({ context: "Un contexte." }))).toBe(true);
  });
});

describe("buildFeed", () => {
  it("range du plus récent au plus ancien", () => {
    expect(shape([row(1), row(3), row(2)])).toEqual([
      "lines:breve-3,breve-2,breve-1",
    ]);
  });

  it("ne pose aucune bascule quand rien n'a de lecture", () => {
    // C'est l'état du site aujourd'hui : 31 brèves, aucune lecture.
    expect(shape([row(3), row(2), row(1)])).toEqual([
      "lines:breve-3,breve-2,breve-1",
    ]);
  });

  it("ne pose aucune bascule quand tout a une lecture", () => {
    expect(shape([row(2, "Lecture."), row(1, "Lecture.")])).toEqual([
      "entry:breve-2",
      "entry:breve-1",
    ]);
  });

  it("pose la bascule au premier passage complet → compact", () => {
    expect(shape([row(4, "Lecture."), row(3), row(2), row(1)])).toEqual([
      "entry:breve-4",
      "mark",
      "lines:breve-3,breve-2,breve-1",
    ]);
  });

  it("ne pose la bascule qu'une fois, même si un format complet revient", () => {
    expect(
      shape([row(4, "Lecture."), row(3), row(2, "Lecture."), row(1)]),
    ).toEqual([
      "entry:breve-4",
      "mark",
      "lines:breve-3",
      "entry:breve-2",
      "lines:breve-1",
    ]);
  });

  it("groupe les lignes consécutives en une seule liste", () => {
    expect(shape([row(3), row(2), row(1, "Lecture.")])).toEqual([
      "lines:breve-3,breve-2",
      "entry:breve-1",
    ]);
  });

  it("porte la bascule sur la page qui contient la transition", () => {
    const rows = [row(4, "Lecture."), row(3, "Lecture."), row(2), row(1)];

    // La transition tombe juste après la frontière de pagination : la bascule
    // doit ouvrir la page 2, pas disparaître.
    expect(shape(rows, 1, 2)).toEqual(["entry:breve-4", "entry:breve-3"]);
    expect(shape(rows, 2, 2)).toEqual(["mark", "lines:breve-2,breve-1"]);
  });

  it("compte les pages et borne celle qu'on demande", () => {
    const rows = [row(3), row(2), row(1)];

    expect(buildFeed(rows, 1, 2).pages).toBe(2);
    expect(buildFeed(rows, 9, 2).page).toBe(2);
    expect(buildFeed(rows, 0, 2).page).toBe(1);
  });

  it("rend une page unique sur un flux vide", () => {
    expect(buildFeed([])).toEqual({ blocks: [], page: 1, pages: 1 });
  });
});
