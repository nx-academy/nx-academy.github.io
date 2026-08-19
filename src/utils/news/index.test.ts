import { it, expect, describe } from "vitest";

import type { NewsBody } from "./index";
import { newsContext, newsLecture } from "./index";

const news = (overrides: Partial<NewsBody> = {}): NewsBody => ({
  content: "Ancien bloc unique.",
  context: null,
  lecture: null,
  ...overrides,
});

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
