import { expect, describe, it } from "vitest";

import { NewsFeed, RecapLink } from "./schema";

/**
 * Garde-fou sur la colonne date, seul point délicat de la sortie d'Astro DB.
 *
 * Les lignes déjà en base ont été écrites par Astro DB, sous deux formes selon
 * la façon dont elles ont été insérées. La colonne doit continuer à relire les
 * deux correctement, sinon les dates affichées décalent d'un jour.
 */
describe("Colonne date du schéma", () => {
  it("relit une date ISO complète telle qu'écrite par un insert applicatif", () => {
    // `mapFromDriverValue` est typé `unknown` côté Drizzle : l'assertion
    // `toBeInstanceOf` ci-dessous est ce qui vérifie réellement le type.
    const value = NewsFeed.published.mapFromDriverValue(
      "2025-08-01T00:00:00.000Z",
    ) as Date;

    expect(value).toBeInstanceOf(Date);
    expect(value.toISOString()).toBe("2025-08-01T00:00:00.000Z");
  });

  it("relit une date écrite par le DEFAULT CURRENT_TIMESTAMP de SQLite", () => {
    // SQLite écrit "AAAA-MM-JJ HH:MM:SS" : ni T, ni Z. Sans le repli qui ajoute
    // le Z, la valeur serait interprétée en heure locale.
    const value = RecapLink.addedAt.mapFromDriverValue(
      "2026-07-31 16:46:01",
    ) as Date;

    expect(value).toBeInstanceOf(Date);
    expect(value.toISOString()).toBe("2026-07-31T16:46:01.000Z");
  });

  it("écrit les dates en ISO, comme le faisait Astro DB", () => {
    expect(NewsFeed.published.mapToDriverValue(new Date("2025-08-01"))).toBe(
      "2025-08-01T00:00:00.000Z",
    );
  });
});

/**
 * Garde-fou sur le miroir : ces colonnes existent en base depuis la migration
 * `001_news_context_lecture` de nx-mcp, propriétaire du schéma. Si elles
 * disparaissent d'ici sans migration correspondante là-bas, le Feed retombe en
 * silence sur l'ancien format.
 */
describe("Miroir de la table NewsFeed", () => {
  it("déclare les colonnes du format context / lecture", () => {
    expect(NewsFeed.context.name).toBe("context");
    expect(NewsFeed.lecture.name).toBe("lecture");
  });

  it("les garde nullables — une lecture absente veut dire ancien format", () => {
    expect(NewsFeed.context.notNull).toBe(false);
    expect(NewsFeed.lecture.notNull).toBe(false);
  });
});
