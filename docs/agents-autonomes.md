# Agents autonomes et semi-autonomes sur NX

> Cadrage écrit en septembre 2026. Ce document répond à trois questions : ce
> qu'est un agent dans le contexte de NX, où vivent les déclencheurs, et
> lesquels valent la peine d'être écrits. **Aucune Routine n'est branchée à ce
> jour** et seul le premier agent a sa doctrine écrite
> (`.claude/skills/tags-audit/`) : le catalogue est une intention, pas un
> inventaire.

## Ce qu'est un agent, ici

Un agent n'est pas une technologie de plus. C'est une boucle à quatre pièces :

1. **Un déclencheur** — une horloge, un événement GitHub, ou une demande
   explicite.
2. **Des outils** — `nx-mcp` en fournit une partie, le dépôt en fournit d'autres
   (git, npm, les tests).
3. **Un garde-fou** — l'endroit où atterrit le résultat : une proposition, une
   PR, ou directement la production.
4. **Une trace** — de quoi relire après coup et corriger.

Le seul curseur qui compte vraiment est le troisième. Les trois autres sont de
la plomberie ; le garde-fou, lui, décide de ce qu'on risque.

## Les deux chemins d'écriture de NX

NX a deux façons d'écrire, et elles n'offrent pas du tout les mêmes garanties.
C'est la contrainte structurante de tout ce document.

| Chemin                                                     | Ce qui le contrôle                                | Autonomie raisonnable                   |
| ---------------------------------------------------------- | ------------------------------------------------- | --------------------------------------- |
| MCP → Turso → rebuild (`publish_news`, `publish_now_note`) | rien : c'est en ligne au build suivant            | faible — l'agent propose, Thomas valide |
| Git → PR → CI → Pages                                      | `prettier`, `vitest`, `astro check`, la relecture | forte — l'agent peut pousser seul       |

La conséquence est agréable : **le niveau d'autonomie ne se décide pas agent par
agent, il se déduit du chemin d'écriture.** Tout ce qui passe par une PR hérite
gratuitement des garde-fous déjà en place. Tout ce qui passe par le MCP écrit en
production sans filet, et demande donc de la retenue.

## Où vit quoi

La question revient souvent : faut-il un dépôt à part pour les agents ? **Non**
— mais le planning et la doctrine ne vivent pas au même endroit.

- **La Routine** (l'horaire, l'environnement, le prompt d'amorce) est stockée
  côté compte Anthropic. Elle n'est pas dans git, elle ne passe pas en PR, elle
  n'a pas d'historique de revue.
- **Le comportement de l'agent** vit dans ce dépôt, en `.claude/skills/`. Le
  modèle existe déjà : `.claude/skills/changelog/SKILL.md` décrit quand se
  déclencher, quoi proposer, et quoi ne surtout pas faire.

Le prompt de la Routine reste donc volontairement pauvre :

> « Lance le skill `tags-audit` sur les fiches de `src/pages/fiches/`. »

Les vraies règles — vocabulaire autorisé, seuils, « proposer avant d'écrire » —
sont dans le skill : versionnées, relues en PR, modifiables sans toucher au
réglage invisible qu'est la Routine. Quand un agent dérape, on corrige le skill
par une PR.

C'est la même séparation qu'avec `nx-mcp`, mais pour une autre raison : ce dépôt
est séparé parce que c'est **un service**, propriétaire du schéma Turso. Un
skill n'est pas un service ; il appartient au code qu'il touche.

## Déclencheurs : Routine ou `schedule:`

La différence tient en une phrase. **`schedule:` exécute un script écrit à
l'avance. Une Routine réveille un agent qui décide.**

|                      | GitHub Actions `schedule:`           | Routine                                     |
| -------------------- | ------------------------------------ | ------------------------------------------- |
| Où vit le planning   | `.github/workflows/*.yml`, versionné | sur le compte, hors dépôt                   |
| Qui le relit         | la PR                                | personne                                    |
| Ce qui s'exécute     | un script déterministe               | une session qui lit, juge, rédige           |
| Coût                 | minutes de runner                    | tokens                                      |
| Rejouer              | résultat identique                   | résultat proche, jamais identique           |
| Secrets              | `secrets.TURSO_*` du dépôt           | variables et connecteurs de l'environnement |
| Déclenchement manuel | `workflow_dispatch`                  | `fire_trigger`, avec un texte en plus       |

La règle : **si le script est écrivable, écrire le script.** Un agent se
justifie quand la tâche demande du jugement — « ce tag est-il pertinent », « ce
commentaire est-il plus faible que le contexte qu'il commente ». Pas pour
vérifier qu'un fichier existe.

### Les pièges, des deux côtés

Côté **GitHub Actions** :

- Un workflow `schedule:` ne tourne que depuis la branche par défaut : il est
  intestable sur une branche.
- Il est désactivé automatiquement après 60 jours sans commit sur le dépôt.
- Le cron est en UTC et part en retard quand GitHub est chargé, surtout à
  l'heure pile.

Côté **Routines** :

- Cron à cinq champs, en UTC également : la conversion depuis Paris est
  manuelle, et le jour se décale si l'horaire traverse minuit.
- L'intervalle minimum est de l'ordre de l'heure, pas de la minute.
- **Les connecteurs ne suivent pas tout seuls.** Une Routine stocke sa propre
  liste de connecteurs autorisés : oubliée, la session réveillée se retrouve
  sans les outils `nx-mcp`.
- La session démarre sur un dépôt fraîchement cloné, **sans `node_modules`**. Il
  lui faut un `npm ci`, de préférence via un hook `SessionStart` versionné
  plutôt que dans le prompt.

### Les trois modes de ciblage d'une Routine

C'est la partie la plus déroutante. Une Routine peut viser :

1. **La session courante** — elle réveille une conversation existante avec tout
   son contexte. Bon pour un suivi (« reviens voir la CI dans une heure »),
   mauvais pour du récurrent : le contexte gonfle indéfiniment.
2. **Une session précise, nommée** — rare, pour piloter une session sœur.
3. **Une session neuve à chaque déclenchement** — le mode à retenir pour tous
   les agents de ce catalogue. Chaque exécution repart d'un dépôt propre, sans
   mémoire de la précédente ; le prompt doit donc être autosuffisant. C'est
   aussi le seul mode qui accepte les notifications de fin de course.

Rien n'oblige une Routine à avoir un horaire : elle peut exister sans cron et
n'être déclenchée qu'à la main. C'est la bonne façon de roder un agent avant de
lui confier une horloge.

## Est-ce qu'un agent passe forcément par Claude Code ?

Non. Un agent a besoin d'un harnais, et Claude Code n'en est qu'un parmi
d'autres. Trois architectures coexistent très bien :

1. **Pas d'agent du tout** — un script déterministe dans une Action. Le meilleur
   agent est souvent celui qu'on n'écrit pas.
2. **Un modèle appelé depuis `nx-mcp`** — le dépôt est en Python et a déjà les
   mains sur Turso et NewsAPI. Une boucle maison y est parfaitement viable ;
   `docs/plan-fonctionnalites.md` en décrit déjà deux, le RAG de l'auto-Récap et
   l'auto-génération de quiz.
3. **Un harnais existant** — la boucle, les outils fichiers, git, le client MCP
   et le modèle de permissions sont fournis ; il ne reste qu'à écrire la
   doctrine.

Le critère de choix est net : **l'agent touche-t-il le dépôt, ou la base ?**
Réécrire soi-même le clonage, la boucle d'outils et l'ouverture de PR, c'est
construire un harnais, pas un agent éditorial. À l'inverse, un agent qui ne
touche qu'à Turso n'a presque pas de plomberie à emprunter : sa place naturelle
est dans `nx-mcp`.

## Le catalogue

| #   | Agent                    | Déclencheur                  | Chemin | Sortie                       | Autonomie |
| --- | ------------------------ | ---------------------------- | ------ | ---------------------------- | --------- |
| 1   | Archiviste des tags      | manuel, puis mensuel         | dépôt  | PR                           | forte     |
| 2   | Relecteur du Feed        | hebdomadaire                 | Turso  | propositions d'`update_news` | faible    |
| 3   | Gardien du Feed (veille) | quotidien                    | Turso  | brèves pré-rédigées          | faible    |
| 4   | Rédacteur du Récap       | mensuel                      | dépôt  | PR (brouillon d'article)     | moyenne   |
| 5   | Intendant du calendrier  | hebdomadaire                 | dépôt  | PR (correction de statuts)   | forte     |
| 6   | Générateur de quiz       | à la publication d'une fiche | dépôt  | PR                           | moyenne   |

### 1. L'archiviste des tags

13 des 27 fiches publiées n'ont pas de champ `tags`. Or
`src/utils/relatedContent/` score `serie` à +3 et chaque tag partagé à +1 : sans
tags, « À lire ensuite » retombe sur du chronologique à l'intérieur d'un rayon,
et ne peut jamais rapprocher deux séries (Docker ↔ CI/CD ↔ Cloud). C'est le
premier chantier, détaillé plus bas.

### 2. Le relecteur du Feed

La règle éditoriale est déjà écrite en code : `isBalanced()` dans
`src/utils/news/index.ts` — « une lecture n'est jamais plus courte que le
contexte ». Son commentaire précise que c'est au build de le signaler, et
personne ne le signale aujourd'hui. L'agent parcourt `list_news`, repère les
brèves déséquilibrées ou restées à l'ancien format, et propose des
`update_news`. C'est de la dette existante, pas de la production nouvelle : le
meilleur rapport valeur/risque des agents du Feed.

### 3. Le gardien du Feed (veille)

`fetch_news_by_topic` et `fetch_news_by_source` alimentent une proposition de
brève (`context` + `lecture`) que Thomas valide avant publication. **Ne pas lui
confier `publish_news` directement** : Le Feed a été refondu en carnet de
lecture, un agent qui publie seul le ramènerait à un agrégateur.

### 4. Le rédacteur du Récap

La table `RecapLink` est alimentée par le MCP et **n'est jamais lue par le
site** — elle n'apparaît que dans `src/lib/db/schema.ts`. C'est un tampon qui se
remplit dans le vide. L'agent fait `list_recap_links`, regroupe par thème, et
ouvre une PR avec le brouillon du récap du mois.

### 5. L'intendant du calendrier

`docs/calendrier-editorial.md` dérive : une fiche y a été marquée **DONE** alors
qu'elle dormait en brouillon, corrigé à la main le 5 septembre 2026. L'agent
réconcilie le calendrier avec l'état réel de `src/pages/`, de
`src/pages/drafts/` et du changelog, puis ouvre une PR de correction. Tâche
ingrate, parfaite à déléguer.

### 6. Le générateur de quiz

12 quiz pour 27 fiches, et `docs/plan-fonctionnalites.md` marque le chantier
« en beta » depuis plusieurs mois. Une fiche publiée déclenche une PR ajoutant
son entrée dans `src/data/quiz.ts` ; `astro check` attrape les erreurs de
typage, la relecture juge la pertinence pédagogique.

## Ce qui n'est pas un agent

**Le contrôle des liens internes est un test, pas un agent.** Vérifier que
chaque lien `/fiches/<slug>` a un fichier correspondant est déterministe : une
poignée de lignes de vitest, bloquantes en CI. Un agent y serait plus cher et
moins fiable.

L'argument n'est pas théorique. Au moment d'écrire ce document :

- les deux 404 listés dans `docs/dette-editoriale.md` sont **fermés** depuis la
  publication de `github-actions-vs-gitlab-ci` et
  `optimiser-workflows-github-actions` — le document était périmé sans que
  personne le sache ;
- mais `src/pages/articles/decouvrez-les-fiches-techniques.md` pointe **trois
  fois** vers `/fiches/comprendre-la-propriete-css-box-sizing`, qui n'a jamais
  existé (lignes 56, 125 et 127). Deux de ces trois liens sont des
  copier-coller : ils annoncent « le this en JavaScript » et « la méthode CSS
  Clamp », dont les fiches existent bel et bien sous
  `comprendre-le-mot-clef-this` et `comprendre-la-fonction-css-clamp` ;
- `src/pages/fiches/iaas-paas-saas.md` renvoie encore vers
  `/drafts/deployer-conteneur-docker-dans-le-cloud` (ligne 295). Ce n'est pas un
  404, mais le lecteur sort du sitemap.

Un inventaire tenu à la main se périme ; un test, non. Même logique pour
l'optimisation d'images : aucun jugement en jeu, donc aucun agent à écrire.

## Le premier chantier — l'archiviste des tags

C'est le meilleur point de départ : la tâche la plus « dépôt » des six, la CI en
filet, et un résultat mesurable.

### État des lieux

Les 13 fiches sans `tags`, avec leur série :

| Fiche                                     | Série    |
| ----------------------------------------- | -------- |
| `artefact-github-actions`                 | `cicd`   |
| `declencher-workflow-github-actions`      | `cicd`   |
| `gerer-secrets-github-actions`            | `cicd`   |
| `github-actions-vs-gitlab-ci`             | `cicd`   |
| `optimiser-workflows-github-actions`      | `cicd`   |
| `reutiliser-workflow-github-actions`      | `cicd`   |
| `comprendre-l-asynchrone-en-javascript`   | `js`     |
| `comprendre-le-mot-clef-this`             | `js`     |
| `les-retours-de-fonction-en-javascript`   | `js`     |
| `comprendre-la-fonction-css-clamp`        | `css`    |
| `comprendre-les-proxys-et-reverse-proxys` | `outils` |
| `comprendre-next-image-avec-storybook`    | `outils` |
| `bien-utiliser-volumes-docker`            | `docker` |

Le rayon CI/CD est le plus touché : six fiches sur six y sont muettes, alors que
c'est le cluster en cours de construction.

### La contrainte que l'agent doit respecter

Le vocabulaire existant compte **30 tags distincts, dont 15 n'apparaissent
qu'une seule fois.** Le risque n'est donc pas de manquer de tags : c'est d'en
inventer treize de plus et de diluer encore le signal. Le score de
`relatedContent` ne récompense que les tags **partagés** — un tag unique ne
rapproche rien et ne vaut rien.

Deux vocabulaires cohabitent de fait, et l'agent doit savoir les distinguer :

- **éditorial**, porté par les articles (les 25 en ont tous) : `Veille`,
  `Le Récap`, `Bilan`, `Carnet de bord`, `NX Academy`, `L'atelier` ;
- **technique**, porté par les fiches : `Production`, `Sécurité`, `Image`,
  `Registry`, `Réseau`, `Orchestration`, `Compose`, `Cloud`, `CI/CD`.

Ce sont les tags techniques qu'il faut poser sur les 13 fiches. La casse est
libre — `normalizeTag()` compare en minuscules — mais elle reste visible le jour
où les tags seront affichés : garder la capitale initiale des tags existants.

### La forme attendue

Liste YAML sous le champ `tags`, au-dessus de `level`, comme dans
`src/pages/fiches/bien-gerer-secrets-docker.md` :

```yaml
tags:
  - Production
  - Sécurité
```

### La mesure du succès

Ce n'est pas « 27 fiches sur 27 taguées ». C'est le nombre de paires de fiches
de **séries différentes** qui partagent au moins un tag : c'est exactement ce
que `relevanceScore()` sait exploiter et qui ne fonctionne pas aujourd'hui.

### La marche à suivre

1. Écrire `.claude/skills/tags-audit/SKILL.md` — fait : vocabulaire fermé,
   obligation de proposer avant d'écrire, interdiction d'inventer un tag qui
   n'existe nulle part ailleurs.
2. Créer la Routine **sans cron**, et la déclencher à la main. Regarder passer
   deux ou trois PR, ajuster le skill.
3. Ne lui donner un horaire qu'une fois la confiance établie — mensuel suffit,
   le stock de fiches ne bouge pas vite.

## Ce qu'il manque pour aller plus loin

- **Un `delete_recap_link`** (ou un marqueur « consommé ») côté `nx-mcp` : sans
  lui, le rédacteur du Récap relira chaque mois des liens déjà publiés.
- **Un hook `SessionStart`** dans ce dépôt, pour qu'une session réveillée
  atterrisse avec ses dépendances installées.
- **Un test de liens internes**, qui n'est pas un agent mais conditionne la
  sérénité de tous les autres : un agent qui édite du Markdown doit pouvoir
  casser un lien et se le faire dire par la CI.

## Ce qu'aucun agent ne débloquera

Les six brouillons de `src/pages/drafts/` sont rédigés et leur front matter est
complet. Ce qui manque, ce sont les visuels : aucun des six n'a son
`public/images/cheatsheets/<slug>.webp`. C'est le vrai goulot du calendrier
éditorial, et il est graphique, pas textuel. Aucun agent de ce catalogue n'y
change quoi que ce soit — autant le dire ici plutôt que de le redécouvrir dans
six mois.
