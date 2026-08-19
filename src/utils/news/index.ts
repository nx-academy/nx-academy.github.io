/* Dérivations d'une brève du Feed.
   Le format a changé en août 2026 : le bloc unique `content` est devenu un
   `context` — le résumé factuel de la source — accompagné d'une `lecture`, le
   commentaire de l'auteur. Les deux colonnes coexistent en base tant que des
   entrées de l'ancien format y vivent, donc c'est ici, et pas dans les
   composants, qu'on décide ce qui s'affiche.
   Le schéma appartient à nx-mcp : ce dépôt ne fait que lire. */

import type { News } from "../../types/News";

/** Le strict nécessaire pour dériver un rendu : de quoi tester sans monter
    une ligne de base complète. */
export type NewsBody = Pick<News, "content" | "context" | "lecture">;

/** Le corps d'une brève. Les entrées d'avant août 2026 n'ont que `content`,
    celles d'après ont `context` — on préfère toujours la plus récente des deux.
    Le repli couvre aussi une colonne présente mais vide. */
export const newsContext = ({ content, context }: NewsBody): string =>
  context?.trim() || content;

/** La lecture, ou `null` quand il n'y en a pas — c'est le cas de toutes les
    entrées de l'ancien format. Une chaîne vide vaut absence. */
export const newsLecture = ({ lecture }: NewsBody): string | null =>
  lecture?.trim() || null;
