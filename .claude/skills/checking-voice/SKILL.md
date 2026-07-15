---
name: checking-voice
description: Vérifie qu'un brouillon d'article ou de fiche technique NX respecte le registre attendu (carnet pour les articles, pédagogique pour les fiches) avant publication. Invoquer manuellement avec le chemin du fichier.
disable-model-invocation: true
---

# Vérification du registre éditorial

## Étape 1 — Identifier le type de contenu
Lis le frontmatter du fichier `$1`. Le champ `kind:` indique le registre à appliquer :
- `Articles` → charge `references/grille-carnet.md`
- `Fiche technique` → charge `references/grille-fiche.md`

Si le champ est absent ou ambigu, demande confirmation avant de continuer.

## Étape 2 — Relire le contenu
Lis l'intégralité du corps du fichier (hors frontmatter).

## Étape 3 — Appliquer la grille
Pour chaque écart détecté par rapport à la grille chargée :
- cite le passage concerné (extrait court)
- indique le critère enfreint
- propose une reformulation alternative, dans l'esprit du reste du texte

## Étape 4 — Restituer
Liste les écarts trouvés. Si aucun écart, dis-le clairement plutôt que d'inventer des remarques cosmétiques. Ne réécris jamais le fichier toi-même — tu signales, Thomas corrige.