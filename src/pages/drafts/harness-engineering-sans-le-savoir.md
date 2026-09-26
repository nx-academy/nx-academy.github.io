---
layout: ../../layouts/BlogPostLayout.astro

title:
  Le harness engineering, ou l’art de ne pas répéter deux fois la même erreur
description:
  "Encore un terme à la mode, et encore une chose que je faisais sur NX sans lui
  donner de nom. Ce qu’il y a autour d’un modèle, pourquoi c’est là que tout se
  joue, et le trou que j’ai trouvé dans le mien en écrivant cet article."

imgAlt:
  Un développeur qui ajuste le harnais d’un cheval de trait attelé à une
  charrette pleine de code, pixel art
imgSrc: /images/articles/harness-engineering-sans-le-savoir.webp

kind: Articles
format: reflexion
serie: ia
tags:
  - IA
  - Développeur
  - NX Academy
author: Thomas Dimnet
github: tdimnet
publishedDate: 12/21/2026
---

Après [l’AI-native engineering](/drafts/ai-native-engineering-sans-le-savoir),
un deuxième terme m’est tombé dessus : le _harness engineering_. Et, de nouveau,
la même impression désagréable d’avoir découvert le nom de quelque chose que je
faisais déjà.

Le premier terme parlait de l’organisation du travail. Celui-ci parle de la
machine. Il est plus concret, plus technique, et je le trouve plus utile.

---

## D’où vient le mot

Un _harness_, c’est un harnais. Celui qu’on met sur un cheval de trait : il ne
rend pas le cheval plus fort, il permet de diriger sa force.

Le terme a été popularisé début 2026 par Mitchell Hashimoto, le créateur de
Terraform, dans un billet où il décrivait une habitude prise en travaillant avec
des agents : chaque fois qu’un agent fait une erreur, prendre le temps de
modifier son environnement pour qu’il ne la refasse jamais. Dans les semaines
qui ont suivi, OpenAI et Anthropic ont publié leurs propres articles sur le
sujet, et le mot est devenu une discipline.

La définition qui circule tient en une équation :

> **Agent = modèle + harnais.**

Le harnais, c’est tout ce qui n’est pas le modèle. Les instructions qu’il lit au
démarrage, les outils qu’il peut appeler, les tests qui lui disent qu’il s’est
trompé, les permissions, la trace de ce qu’il a fait. Si vous avez lu
[la fiche sur les agents](/drafts/comprendre-les-agents-ia), c’est la partie de
la boucle qui n’est pas le modèle — autrement dit, presque toute la boucle.

---

## Le harnais de NX, pièce par pièce

Je n’ai jamais dessiné ce qui suit. Je le reconstitue en relisant le dépôt.

### Ce que l’agent lit avant de commencer

Le `CLAUDE.md`, à la racine, ajouté début août. C’est une page qui décrit le
projet, ses commandes, où vivent les fichiers, les conventions. Claude Code le
lit automatiquement à chaque session.

Ce qui est intéressant, c’est que presque chaque ligne de ce fichier est née
d’une erreur. « *npm uniquement. Ni bun ni yarn — bun a été essayé, ça n’a pas
marché.* » « *Le piège principal : les contenus Markdown sont dans `src/pages/`,
pas dans `src/content/`.* » « *Ne jamais lier un brouillon via son URL
finale.* » Chacune de ces phrases est une erreur qu’un agent a faite, ou que
j’ai faite, et que je n’avais pas envie de voir revenir.

C’est exactement la règle de Hashimoto. Je l’appliquais sans la connaître, avec
une motivation beaucoup moins noble : la flemme de corriger deux fois la même
chose.

Viennent ensuite les skills, dans `.claude/skills/` : la typographie française,
le changelog, l’audit des tags. Ce sont des instructions qui ne se chargent que
quand elles servent. Le `CLAUDE.md` dit ce qu’est le projet ; les skills disent
comment faire une tâche précise. Les deux sont versionnés, relus en PR, et
modifiables comme du code. Quand un agent dérape, je ne le « recadre » pas dans
une conversation qui sera oubliée demain : je corrige le fichier.

### Ce qui vérifie après coup

C’est l’autre moitié du harnais, et c’est la plus importante.

**Prettier est bloquant en CI**, y compris sur les fichiers Markdown. Pour un
humain, c’est une contrainte un peu pénible. Pour un agent, c’est un retour
immédiat et sans ambiguïté : le texte est mal formaté, voici la ligne,
recommence.

**Les tests sont colocalisés et commentés.** Il y en a un par util, dans
`src/utils/<nom>/index.test.ts`. Certains ne testent presque rien de
fonctionnel : ils existent pour empêcher une erreur précise. Celui du schéma de
base de données commence par « *Garde-fou sur le miroir* » et explique que si
une colonne disparaît sans migration correspondante dans l’autre dépôt, le Feed
retombera en silence sur l’ancien format. Ce commentaire est écrit pour un
lecteur qui arrivera sans contexte. Autrement dit, pour un agent.

**`astro check`** vérifie les types à chaque build. **Les fixtures** de
`src/lib/db/` permettent de tout lancer hors ligne, sans les secrets de la
base : un agent dans un conteneur peut donc exécuter le build complet et voir
lui-même s’il a cassé quelque chose.

### La différence qui compte : dire ou empêcher

Il y a une distinction que je n’avais pas formulée avant de lire sur le sujet,
et qui me semble être le cœur de l’affaire.

Écrire « *lancer `npm run prettier:format` avant de pousser* » dans le
`CLAUDE.md`, c’est **demander**. Le modèle le fera probablement. Rendre Prettier
bloquant en CI, c’est **empêcher**. La PR ne passera pas, quelle que soit
l’humeur du modèle ce jour-là.

La première solution est probabiliste, la seconde est déterministe. Un bon
harnais utilise les deux, mais il ne confond jamais l’une avec l’autre. Tout ce
qui compte vraiment doit finir, tôt ou tard, dans la seconde catégorie.

---

## Le trou que j’ai trouvé en écrivant

C’est la partie la plus utile de cet article, au moins pour moi.

Le `CLAUDE.md` dit : « *Ne jamais lier un brouillon via son URL finale.* » C’est
une instruction. Elle demande, elle n’empêche pas. Et le document sur la dette
éditoriale du dépôt raconte ce qui s’est passé : des fiches publiées ont pointé
vers des fiches restées en brouillon, ce qui a produit des 404 en production.
Une fois corrigé, le problème s’est reproduit en août, par exactement le même
mécanisme.

La règle est écrite depuis des semaines. Aucun test ne la vérifie. C’est le
symptôme exact d’un harnais qui s’arrête à mi-chemin : on a noté l’erreur, on ne
l’a pas rendue impossible.

La correction est un test d’une vingtaine de lignes : parcourir les fichiers de
`src/pages/fiches/` et `src/pages/articles/`, relever les liens internes, et
échouer si l’un d’eux pointe vers un slug qui n’existe que dans
`src/pages/drafts/`. Je l’ajoute à la liste. Il aurait fallu l’écrire la
première fois.

---

## Ce que ça change, au fond

On peut voir le harness engineering comme une nouvelle discipline. Je le vois
plutôt comme une vieille discipline à laquelle on a trouvé un nouveau public. Un
bon `README`, une CI stricte, des tests qui expliquent pourquoi ils existent :
tout ça rendait déjà service aux humains qui arrivaient sur un projet. Il se
trouve que c’est aussi ce dont un modèle a besoin pour ne pas faire n’importe
quoi.

La différence, c’est la fréquence. Un nouveau développeur arrive sur un projet
une fois par an. Un agent y arrive à chaque session, sans aucun souvenir de la
précédente. Tout ce qui était un « bonus appréciable » devient une condition de
fonctionnement.

Et la phrase que je garderais, si je ne devais en garder qu’une : **un modèle ne
s’améliore pas d’une session à l’autre. Le harnais, si.** C’est là que va
l’effort.
