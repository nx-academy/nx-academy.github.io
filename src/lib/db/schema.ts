import { sql } from "drizzle-orm";
import {
  customType,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * Reprise à l'identique du type date d'`@astrojs/db` (`dist/runtime/index.js`).
 *
 * Les dates sont stockées en TEXT et réhydratées en `Date` à la lecture. Le
 * repli `+= "Z"` couvre les valeurs écrites par `CURRENT_TIMESTAMP` (défaut de
 * `RecapLink.addedAt`), que SQLite écrit sous la forme `"2026-07-31 09:12:00"`
 * — sans `T` ni `Z`. Sans lui, `new Date()` les interpréterait en heure locale
 * et les dates affichées décaleraient d'un jour.
 *
 * Ne pas « simplifier » ce type : il doit rester le miroir exact de ce
 * qu'écrivait Astro DB, puisque les lignes déjà en base ont été produites par lui.
 */
const isISODateString = (value: string) =>
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value);

const dateColumn = customType<{ data: Date; driverData: string }>({
  dataType() {
    return "text";
  },
  toDriver(value) {
    return value.toISOString();
  },
  fromDriver(value) {
    if (!isISODateString(value)) {
      value += "Z";
    }

    return new Date(value);
  },
});

// Les noms de tables reprennent les clés de `defineDb({ tables })` de l'ancien
// `db/config.ts` : ce sont les noms physiques réellement créés dans Turso.
//
// `autoIncrement` n'est volontairement pas repris : Astro DB l'ignorait dans son
// mapping Drizzle (un INTEGER PRIMARY KEY SQLite est déjà un alias de rowid).
// L'ajouter produirait un AUTOINCREMENT que les tables existantes n'ont pas.

// Le schéma appartient à nx-mcp, qui est le seul à écrire en base : ses
// migrations vivent dans `nx_ai/turso_service/migrations/`. Ce fichier n'en est
// qu'un miroir en lecture seule, à tenir à jour à la main après chaque
// migration appliquée là-bas. Ne jamais pousser de DDL depuis ce dépôt.

export const NewsFeed = sqliteTable("NewsFeed", {
  id: integer("id").primaryKey(),
  // Ancien format d'avant août 2026, conservé le temps que `context` prenne le
  // relais partout. La colonne est supprimée par une migration ultérieure.
  content: text("content").notNull(),
  // Le résumé factuel de la source. Nullable seulement parce que la colonne a
  // été ajoutée après coup : en pratique elle est toujours remplie.
  context: text("context"),
  // Le commentaire de l'auteur. `null` veut dire « entrée de l'ancien format » —
  // c'est une information, pas une donnée manquante à combler.
  lecture: text("lecture"),
  published: dateColumn("published").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
});

export const NowNoteFeed = sqliteTable("NowNoteFeed", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  published: dateColumn("published").notNull(),
});

export const RecapLink = sqliteTable("RecapLink", {
  id: integer("id").primaryKey(),
  addedAt: dateColumn("addedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  description: text("description").notNull(),
  url: text("url").notNull(),
});
