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

export const NewsFeed = sqliteTable("NewsFeed", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
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
