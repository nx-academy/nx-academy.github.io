---
name: changelog
description:
  À utiliser au moment de préparer une Pull Request (ou un commit) qui apporte
  un changement visible sur NX Academy — nouvelle page, fonctionnalité,
  correction, travail en cours. Propose d'ajouter ou de mettre à jour l'entrée
  du changelog du mois courant (fichier YAML dans src/content/changelog/) à
  partir des changements. Toujours proposer d'abord, Thomas valide avant
  écriture. Ne pas bloquer la PR s'il préfère passer.
---

# Mise à jour du changelog lors d'une PR

Ce skill se déclenche **au moment de préparer une PR** (ou juste avant, quand
les changements sont prêts). L'objectif : ne plus laisser le changelog prendre
du retard, en proposant l'entrée du mois pendant que le contexte du changement
est frais. **Souple par principe** : c'est une proposition, pas un passage
obligé.

La mécanique complète du changelog (schéma, fichiers, rendu) est documentée dans
`docs/changelog-migration-content-collections.md` — s'y référer en cas de doute.

## Étape 1 — Juger si une entrée est pertinente

Regarde le diff de la branche. Une entrée changelog a du sens pour un changement
**visible ou notable** : nouvelle page/fonctionnalité (`done`), correction de
bug ou mise à jour de sécurité/dépendances (`fix`), chantier en cours qu'on veut
annoncer (`in-progress`).

Elle n'en a **pas** pour du bruit interne pur : refacto invisible, tweak de CI,
formatage. Dans le doute, propose quand même — Thomas tranchera.

Si aucune entrée n'est pertinente, dis-le en une phrase et n'insiste pas.

## Étape 2 — Déterminer le fichier du mois courant

Trouve la date du jour (le contexte de session la fournit ; sinon
`date +%Y-%m`). Le fichier cible est `src/content/changelog/AAAA-MM.yaml` (ex.
juillet 2026 → `src/content/changelog/2026-07.yaml`).

- Le fichier **existe déjà** → on ajoutera une entrée dans son tableau `tasks`.
- Le fichier **n'existe pas** → on le créera avec l'en-tête `month` / `year` /
  `order` (le numéro du mois), voir le doc pour le squelette exact.

## Étape 3 — Rédiger une proposition (ne rien écrire encore)

Pour chaque changement retenu, prépare :

- un **`kind`** : `done` (🟢 sorti/terminé), `in-progress` (🟡 en cours) ou
  `fix` (🔴 correction) ;
- un **`content`** : une phrase en **HTML**, à la **première personne**, dans le
  **ton perso et direct** des entrées existantes (relis quelques `.yaml` du
  dossier pour t'en imprégner — c'est un journal, pas des release notes
  corporate). Ajoute un lien `<a href="…" target="_blank">…</a>` vers la page
  concernée quand c'est pertinent.

## Étape 4 — Soumettre à validation

Présente la ou les entrées proposées à Thomas (kind + texte + fichier cible)
**avant toute écriture**. Il valide, ajuste le ton, retire ou reformule. C'est
lui qui décide du contenu ; toi tu proposes et tu formates.

## Étape 5 — Écrire, puis vérifier

Une fois validé :

1. Édite (ou crée) le `.yaml`. Le `content` **doit** utiliser un bloc littéral
   YAML `|-` avec le texte indenté de 6 espaces — ça préserve le HTML verbatim
   sans problème de quoting (apostrophes, guillemets `"` des `href`, etc.).
2. Ordonne les nouvelles entrées en haut du tableau `tasks` (plus récent
   d'abord).
3. Lance `npm run check` (validation zod du schéma) et `npm run prettier:check`
   — les deux doivent passer avant de committer.

## Garde-fous

- **Ne jamais bloquer une PR** parce que le changelog n'est pas rempli : si
  Thomas préfère passer, on passe.
- **Ne pas réécrire les entrées existantes** des mois passés sans qu'il le
  demande — on ajoute, on ne réécrit pas l'historique.
- **Ne pas inventer** de lien ou de fonctionnalité qui ne serait pas dans le
  diff.
