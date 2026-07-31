import { desc } from "drizzle-orm";

import { db, isRemoteConfigured } from "./index";
import { newsFixtures, nowNoteFixtures } from "./fixtures";
import { NewsFeed, NowNoteFeed } from "./schema";

/**
 * Les deux seules lectures du site, centralisées ici pour que la logique de
 * repli sur les fixtures ne soit pas dupliquée entre `index.astro` et
 * `feed.astro`. Le tri se fait par `id` décroissant — le plus récent d'abord —
 * comme le faisaient les requêtes `astro:db` d'origine.
 */

const byIdDesc = <T extends { id: number }>(rows: T[]) =>
  [...rows].sort((a, b) => b.id - a.id);

export async function getLatestNews(limit?: number) {
  if (!db || !isRemoteConfigured) {
    const rows = byIdDesc(newsFixtures);

    return limit === undefined ? rows : rows.slice(0, limit);
  }

  const query = db.select().from(NewsFeed).orderBy(desc(NewsFeed.id));

  return limit === undefined ? await query : await query.limit(limit);
}

/** `null` quand la table est vide : c'est aux pages de gérer l'absence de note. */
export async function getLatestNowNote() {
  if (!db || !isRemoteConfigured) {
    return byIdDesc(nowNoteFixtures)[0] ?? null;
  }

  const rows = await db
    .select()
    .from(NowNoteFeed)
    .orderBy(desc(NowNoteFeed.id))
    .limit(1);

  return rows[0] ?? null;
}
