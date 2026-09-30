# Voix et pédagogie

> Référence. Comment est construit le skill `pedagogie-nx`, d'où viennent ses
> règles, et comment il s'améliore. Les règles elles-mêmes vivent dans
> [`.claude/skills/pedagogie-nx/`](../.claude/skills/pedagogie-nx/SKILL.md), pas
> ici. Posé le 30 septembre 2026.

## Pourquoi un skill

Le constat vient de la relecture des deux articles « sans le savoir » : un
modèle qui écrit pour NX produit un texte propre, bien typographié, dans le bon
registre — et qui n'enseigne pas. Il raconte au lieu de montrer, il définit
avant de poser le problème, et il ne rend jamais la main au lecteur. Le détail
est dans
[refonte-articles-sans-le-savoir.md](./refonte-articles-sans-le-savoir.md).

`typo-francaise` couvre la forme. Il manquait ce que `/methode` appelle
« choisir » : ce qu'on montre, dans quel ordre, et ce qu'on laisse dehors.

## D'où viennent les règles

Uniquement de textes que Thomas a écrits ou validés, par ordre de poids :

1. **`/methode`** (`src/pages/methode.astro`) — la méthode énoncée par Thomas
   lui-même. Tout ce qui la contredit ailleurs perd.
2. **`/a-propos`** — la même idée vue depuis le parcours (Swarm plutôt que
   Kubernetes, NX sans base de données) : retirer est une décision.
3. **Les cours** (`src/pages/cours/`) — les gestes en situation : branche de
   départ, commande lancée avant d'être expliquée, récapitulatif, réassurance.
4. **Les fiches publiées**, `iaas-paas-saas` en tête — l'analogie développée
   puis lâchée, la section « Alors, on choisit comment ? ».
5. **Les articles de 2026** (`ne-plus-se-dedoubler`,
   `devops-affaire-de-chaque-developpeur`) — la voix : la scène d'ouverture,
   l'aveu d'erreur, la chute.

Les brouillons n'en font pas partie : ce sont eux qu'on corrige.

## Le partage entre les deux skills

| Question                                         | Skill            |
| ------------------------------------------------ | ---------------- |
| Espaces insécables, guillemets, tirets           | `typo-francaise` |
| Ce qu'on montre, dans quel ordre, pour qui       | `pedagogie-nx`   |
| La voix : je / vous / on, gras, ouverture, chute | `pedagogie-nx`   |

> **Constat du 30/09/2026** : la description de `typo-francaise` annonce aussi
> « bas-de-casse dans les titres, chasse aux anglicismes, understatement », mais
> le fichier s'arrête après les tirets. Ces règles n'ont jamais été écrites.
> L'understatement est repris dans `pedagogie-nx` ; les deux autres restent à
> écrire par Thomas, dans `typo-francaise`.

## Comment le skill s'améliore

C'est la règle du harness engineering appliquée à l'écriture : **chaque fois
qu'une relecture corrige la même chose deux fois, on l'écrit.**

- Une **tournure rejetée** va dans `references/passages-temoins.md`, rubrique
  « Corrections », avec la version retenue et une phrase de pourquoi.
- Un **geste qui manque** à la grille de relecture devient une question de plus
  dans `SKILL.md`.
- Une **règle qui se révèle fausse** est corrigée à la source, pas contournée
  dans une conversation.

Le skill ne capturera jamais le goût, et il le dit. Il peut en revanche empêcher
qu'on refasse deux fois la même erreur de pédagogie.

## Questions ouvertes pour Thomas

À trancher quand l'occasion se présente, pas maintenant :

- **Le tutoiement.** `/methode` passe au « tu » dans la scène du silence en
  salle. Le skill l'interdit partout ailleurs. Est-ce une exception voulue, ou
  une possibilité pour les articles de réflexion ?
- **Les exercices dans les articles.** Le skill demande que le lecteur « fasse
  quelque chose » même dans un article. Jusqu'où ? Une question à se poser
  suffit-elle, ou faut-il un vrai exercice encadré ?
- **Le gras.** Une phrase-clé par section est la norme observée. Certains
  articles en ont trois ou quatre. Plafond à fixer ?
