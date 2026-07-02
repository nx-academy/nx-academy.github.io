import { it, expect, describe } from "vitest";

import { relevanceScore, scoreRelated, type RelatedItem } from "./index";

const makeItem = (
  url: string,
  frontmatter: Partial<RelatedItem["frontmatter"]> = {},
): RelatedItem => ({
  url,
  frontmatter: {
    title: url,
    imgSrc: "",
    imgAlt: "",
    author: "Thomas",
    publishedDate: "01/01/2025",
    ...frontmatter,
  },
});

const current = makeItem("/articles/decouvrir-pico-8", {
  serie: "gamedev",
  tags: ["Game dev", "PICO-8"],
  kind: "Articles",
});

describe("relevanceScore", () => {
  it("gives more weight to a shared serie than to a shared tag", () => {
    const sameSerie = makeItem("/fiches/intro-a-pygame", { serie: "gamedev" });
    const sameTag = makeItem("/articles/autre", { tags: ["PICO-8"] });

    expect(relevanceScore(current, sameSerie)).toBeGreaterThan(
      relevanceScore(current, sameTag),
    );
  });

  it("cumulates shared tags and is case-insensitive", () => {
    const twoTags = makeItem("/articles/x", { tags: ["game dev", "pico-8"] });

    expect(relevanceScore(current, twoTags)).toBe(2);
  });

  it("returns 0 when nothing is shared", () => {
    const unrelated = makeItem("/fiches/clamp", {
      serie: "css",
      tags: ["CSS"],
    });

    expect(relevanceScore(current, unrelated)).toBe(0);
  });
});

describe("scoreRelated", () => {
  const pool = [
    makeItem("/articles/decouvrir-pico-8", { serie: "gamedev" }), // page courante
    makeItem("/fiches/intro-a-pygame", {
      serie: "gamedev",
      kind: "Fiche technique",
      publishedDate: "02/01/2025",
    }),
    makeItem("/fiches/prendre-en-main-pico-8", {
      serie: "gamedev",
      kind: "Fiche technique",
      publishedDate: "03/01/2025",
    }),
    makeItem("/articles/nx-fait-des-jeux", {
      serie: "gamedev",
      tags: ["PICO-8"],
      kind: "Articles",
      publishedDate: "01/06/2025",
    }),
    makeItem("/fiches/clamp", { serie: "css", kind: "Fiche technique" }),
  ];

  it("excludes the current page (URL normalized without trailing slash)", () => {
    const result = scoreRelated(current, pool, 3);
    expect(result.some((i) => i.url === "/articles/decouvrir-pico-8")).toBe(
      false,
    );
  });

  it("returns the most relevant items first, mixing articles and fiches", () => {
    const result = scoreRelated(current, pool, 3);
    const urls = result.map((i) => i.url);

    expect(urls).toHaveLength(3);
    // Le seul article partageant serie + tag doit arriver en tête.
    expect(urls[0]).toBe("/articles/nx-fait-des-jeux");
    // Le hors-sujet (css) ne doit pas apparaître tant qu'il y a des pertinents.
    expect(urls).not.toContain("/fiches/clamp");
  });

  it("excludes drafts", () => {
    const withDraft = [
      ...pool,
      makeItem("/fiches/secret", { serie: "gamedev", draft: true }),
    ];
    const result = scoreRelated(current, withDraft, 5);
    expect(result.some((i) => i.url === "/fiches/secret")).toBe(false);
  });

  it("falls back to recency when nothing is relevant, never emptier than limit allows", () => {
    const lonely = makeItem("/articles/seul", { serie: "inconnu" });
    const onlyOthers = [
      makeItem("/fiches/a", {
        kind: "Fiche technique",
        publishedDate: "01/01/2024",
      }),
      makeItem("/articles/b", {
        kind: "Articles",
        publishedDate: "01/01/2025",
      }),
    ];
    const result = scoreRelated(lonely, onlyOthers, 3);
    expect(result).toHaveLength(2);
  });
});
