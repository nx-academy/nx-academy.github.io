import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Les anciens noms `ASTRO_DB_*` restent lus en repli le temps que les secrets
// `TURSO_*` soient ajoutés côté GitHub. À retirer une fois la bascule faite.
const url = process.env.TURSO_DATABASE_URL ?? process.env.ASTRO_DB_REMOTE_URL;
const authToken =
  process.env.TURSO_AUTH_TOKEN ?? process.env.ASTRO_DB_APP_TOKEN;

/**
 * Faux en développement local tant qu'aucun `.env` n'est présent. Les lectures
 * retombent alors sur les fixtures : `npm run dev` reste utilisable hors ligne
 * et sans secret, ce que permettait auparavant la base SQLite locale d'Astro DB.
 */
export const isRemoteConfigured = Boolean(url && authToken);

// Instanciation paresseuse : sans configuration, `createClient` lèverait à
// l'import et ferait échouer le rendu des pages qui n'ont pas besoin de la base.
export const db = isRemoteConfigured
  ? drizzle(createClient({ url: url!, authToken }))
  : null;
