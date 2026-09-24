# Les notes du dépôt

Tout est en français. Ces documents ne sont pas publiés : ce sont les notes de
travail de NX, éditoriales et techniques.

Trois familles, et un statut par document. **Vivant** veut dire qu'on le met à
jour au fil de l'eau et qu'on peut s'y fier. **Cadrage** veut dire qu'il a été
écrit avant d'agir et qu'il garde la trace des arbitrages, y compris quand la
réalité a bougé depuis — les sections datées le disent. **Référence** veut dire
qu'il décrit un mécanisme en place.

## Produit et fonctionnalités

| Document                                     | Statut  | De quoi ça parle                                                                       |
| -------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| [roadmap-produit.md](./roadmap-produit.md)   | vivant  | Ce qui est fait, cadré, en réflexion ou écarté — et pourquoi. Le point d'entrée.       |
| [agents-autonomes.md](./agents-autonomes.md) | cadrage | Ce qu'est un agent ici, où vivent les déclencheurs, lesquels valent d'être écrits.     |
| [projets.md](./projets.md)                   | cadrage | Le format des projets, la règle « zéro prérequis externe », les deux premiers énoncés. |
| [glossaire.md](./glossaire.md)               | cadrage | Le glossaire strictement définitionnel, le popover, les dix-neuf premiers termes.      |

## Éditorial

| Document                                                           | Statut  | De quoi ça parle                                                      |
| ------------------------------------------------------------------ | ------- | --------------------------------------------------------------------- |
| [calendrier-editorial.md](./calendrier-editorial.md)               | vivant  | Le rythme, les cours prévus, le planning de publication à la semaine. |
| [dette-editoriale.md](./dette-editoriale.md)                       | vivant  | Ce qui est cassé et qu'il faut réparer : liens morts, maillage abîmé. |
| [cluster-cicd-github-actions.md](./cluster-cicd-github-actions.md) | cadrage | Le cluster CI/CD, sept contenus, la recette Docker rejouée.           |
| [cluster-cloud-public.md](./cluster-cloud-public.md)               | cadrage | Le cluster cloud, du vocabulaire au premier déploiement.              |
| [cluster-cloud-pratique.md](./cluster-cloud-pratique.md)           | cadrage | Le volet pratique du cluster cloud, chez Scaleway.                    |
| [cluster-ia.md](./cluster-ia.md)                                   | cadrage | Le cluster IA, la technique sous les articles d'usage déjà en ligne.  |

## Technique

| Document                                                       | Statut    | De quoi ça parle                                                 |
| -------------------------------------------------------------- | --------- | ---------------------------------------------------------------- |
| [changelog-data-collection.md](./changelog-data-collection.md) | référence | Comment marche le changelog en YAML, et comment ajouter un mois. |

## Ce qui n'est pas ici

- Les **règles de rédaction** vivent dans les skills du dépôt
  (`.claude/skills/typo-francaise`, `typo-anglaise`, `changelog`), chargées
  seulement quand elles servent.
- Les **conventions de code et l'architecture** vivent dans
  [`CLAUDE.md`](../CLAUDE.md), lu à chaque session.
- Le **schéma de la base** appartient à `nx-mcp`. Ici on ne fait que lire.

## Tenir ces notes

Une note qui ment coûte plus cher que pas de note du tout : la roadmap produit a
passé quinze mois à décrire une migration abandonnée, et un chantier utile est
resté bloqué derrière. Deux habitudes suffisent à l'éviter :

- **dater les constats** plutôt que le document — « septembre 2026 : deux 404
  restants » vieillit bien, « à faire » ne vieillit pas du tout ;
- **écarter par écrit** au lieu de supprimer une ligne. Une idée effacée
  revient, et on refait l'arbitrage sans se souvenir du premier.
