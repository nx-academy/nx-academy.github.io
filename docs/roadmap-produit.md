# Roadmap produit — NX Academy

> Ce document remplace `NEXT_FEATURES.md` (racine) et
> `docs/plan-fonctionnalites.md`, tous deux supprimés le 24 septembre 2026. Il
> ne parle que des **fonctionnalités du site**. Le contenu éditorial vit dans le
> [calendrier](./calendrier-editorial.md) et dans les cadrages de cluster.

## Comment lire ce document

Quatre états, un seul sens de circulation : **en réflexion → cadré → fait**, ou
bien **écarté**.

La section « écarté » est la plus importante des quatre. Une idée qui disparaît
d'une roadmap sans laisser de trace revient d'elle-même six mois plus tard, et
on refait le même arbitrage sans se souvenir du premier. Écarter, ici, c'est
écrire pourquoi.

Une règle de tenue : quand une ligne change d'état, elle change de section le
jour même. Un document dont les états sont faux ne sert plus à décider — c'est
exactement ce qui est arrivé aux deux fichiers que celui-ci remplace.

---

## Fait

Une ligne par fonctionnalité, pour ne pas la reproposer.

| Fonctionnalité                        | Où ça vit                                         |
| ------------------------------------- | ------------------------------------------------- |
| Flux RSS                              | `src/pages/rss.xml.js`                            |
| Sitemap, brouillons exclus            | `astro.config.ts`, brouillons routés en `/drafts` |
| Sommaire collant                      | `src/components/StickyOutline.astro`              |
| Thème clair / sombre système          | `src/styles/`                                     |
| Page 404                              | `src/pages/404.astro`                             |
| Page de présentation de cours         | `src/layouts/CourseLandingLayout.astro`           |
| Quiz et quiz arcade                   | `src/components/Quiz.jsx`, `QuizArcade.jsx`       |
| Reprise de lecture (`localStorage`)   | `src/components/ResumeSnackbar.jsx`               |
| Bouton « copier le code »             | `src/utils/articleEnhancements/`                  |
| Barre de progression de lecture       | `src/utils/articleEnhancements/`                  |
| « À lire ensuite » par pertinence     | `src/utils/relatedContent/`                       |
| Changelog en data collection YAML     | `src/content/changelog/`, voir la doc dédiée      |
| Feed, brèves publiées depuis `nx-mcp` | `src/lib/db/`, `src/utils/news/`                  |
| Récap mensuel semi-automatisé         | `nx-mcp`, articles `le-recap-*`                   |

Le maillage `serie` / `tags` mérite une précision : les deux champs existent
dans le frontmatter et alimentent le scoring de `relatedContent`, mais **aucune
page ne les expose**. C'est un signal interne, pas une navigation. Voir « en
réflexion » plus bas.

---

## Cadré — prêt à être écrit

### Les projets

Cadrage : [`projets.md`](./projets.md).

Un projet est un énoncé, pas un tutoriel : il décrit un livrable et des critères
de réussite, et renvoie aux fiches pour le _comment_. Règle qui commande tout le
reste : **zéro prérequis externe** — si une étape suppose une notion que NX ne
couvre pas, le projet n'est pas prêt à sortir.

Deux premiers projets, Docker puis CI/CD, le second reprenant le livrable du
premier. Objectif affiché dans
[`point-etape-rentree-2026`](../src/pages/articles/point-etape-rentree-2026.md)
: deux à trois projets d'ici la fin de l'année, pour **mesurer ce que coûte un
projet** avant d'en promettre dix.

### Le glossaire

Cadrage : [`glossaire.md`](./glossaire.md).

Une page par notion, **strictement définitionnelle** : le glossaire répond «
c'est quoi », jamais « comment faire ». Les fiches gardent le monopole des
titres en question, ce qui évite de les concurrencer sur leurs propres requêtes.

Deux décisions déjà prises : les définitions vivent dans une **content
collection** validée par un schéma — c'est le seul contenu du site assez normé
pour ça, et c'est ce qui le rend confiable à un agent ; et le survol d'un terme
ouvre un **popover dont le texte est inliné au build**, pas récupéré par
`fetch`.

### La recherche (Pagefind)

Le meilleur rapport valeur / effort de la liste, et il ne dépend de rien. Le
site a franchi depuis longtemps la taille où l'absence de recherche se sent : 28
fiches, 28 articles, 2 cours, le Feed.

Le plan technique, repris tel quel de l'ancien `NEXT_FEATURES.md`, qui était
juste :

- ajouter `astro-pagefind` en `devDependency` — indexation 100 % statique en
  post-build, aucun backend, aucun cookie ;
- `pagefind()` dans les `integrations` d'`astro.config.ts` ;
- `data-pagefind-body` sur la zone de contenu de `BlogPostLayout`,
  `CheatSheetsLayout` et `ChapterLayout` ; `data-pagefind-ignore` sur la
  navigation et le pied de page dans `BaseLayout` ;
- une page `src/pages/recherche.astro` en `noindex`, plus une entrée dans le
  header.

L'index n'existe qu'après `astro build` : la vérification se fait en
`npm run preview`.

---

## En réflexion

| Sujet                         | La question à trancher                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Exposer les tags**          | Pages `/tags/<tag>` et filtrage, ou bien assumer par écrit que les tags restent un signal interne ?                 |
| **Page « Roadmap » publique** | Le changelog raconte le passé, rien ne raconte le futur. Alimentée par ce document. Quel niveau de détail publier ? |
| **Feuille `@media print`**    | La version réaliste de la « zone formateurs ». Quelques heures, un usage réel.                                      |
| **Pages d'auteur**            | `github:` est déjà dans le frontmatter et `AuthorCard.astro` existe. Utile seulement si d'autres auteurs écrivent.  |

L'entre-deux des tags coûte de l'entretien sans rien rendre : c'est la première
des quatre à trancher — et les formations, ci-dessous, pourraient la trancher
d'elles-mêmes.

### Les formations — le sujet le plus lourd de cette section

Piste ouverte le 24 septembre 2026. Les cours deviendraient des **formations** :
des parcours qui assemblent des contenus existants — fiches, articles, projets,
quiz — au lieu de porter leurs propres chapitres. Une nouvelle formation
coûterait alors un assemblage, pas neuf chapitres et trente screencasts.

Ce n'est pas une fonctionnalité de plus, c'est **la structure d'organisation du
site**. À ce titre elle commande plusieurs lignes ouvertes ailleurs : si les
formations deviennent la navigation thématique, la question des pages de tags se
referme d'elle-même, et les quiz cessent d'être une page isolée pour devenir des
étapes.

Trois constats mesurés dans le dépôt, à garder sous les yeux :

- **Les quiz sont déjà à moitié prêts.** Cinq des douze entrées de
  `src/data/quiz.ts` portent le slug exact d'une fiche publiée. Le lien quiz →
  fiche existe dans la donnée, il n'est exposé nulle part. Les sept autres sont
  des niveaux d'arcade (`docker-facile`, `docker-moyen`…) sans contenu auquel
  s'adosser : ils n'ont pas d'étape naturelle dans une formation.
- **Les cours existants ne sont pas jetables.** 17 URLs publiées, en priorité
  0.9 au sitemap — le plus haut niveau après la page d'accueil — et **32
  screencasts Vimeo répartis dans 13 chapitres**. La règle la plus dure de
  [`CLAUDE.md`](../CLAUDE.md) interdit de renommer un contenu publié ; le
  supprimer est strictement pire.
- **Une fiche ne remplace pas un chapitre.** Une fiche est autonome par
  construction, et c'est ce qui la fait bien référencer. Un chapitre suppose le
  précédent. Une formation faite de fiches est donc une liste de réponses, pas
  une progression : il lui faut autre chose pour porter le lecteur d'une étape à
  la suivante.

D'où la forme qui tient le mieux, à valider : **le projet porte la continuité**
que les fiches ne peuvent pas porter, et la formation ajoute quelques lignes de
liaison entre les étapes. Voir [`projets.md`](./projets.md). Ce n'est pas
gratuit, mais c'est sans commune mesure avec l'écriture d'un cours.

Recommandation sur les deux cours en ligne : ne rien supprimer. La formation
devient le **contenant**, et les deux cours existants deviennent des formations
dont certaines étapes sont leurs chapitres actuels, aux mêmes URLs. Les
formations suivantes s'assemblent sans chapitres. Le modèle se valide là où il
est bon marché, et rien de publié ne meurt.

---

## Écarté, et pourquoi

**Migration du Markdown vers les content collections.** C'était la « phase 1,
prérequis de tout le reste » de l'ancien `NEXT_FEATURES.md`. Écartée : le
routage par fichier depuis `src/pages/` suffit, et c'est devenu une règle
explicite de [`CLAUDE.md`](../CLAUDE.md). La migration aurait fait porter un
risque réel aux URLs, au RSS et au sitemap pour un gain de confort. Seul le
changelog est une vraie collection, parce qu'il en avait besoin — et le
glossaire le sera pour la même raison.

Effet de bord à noter, parce qu'il a coûté cher : présenter cette phase comme un
prérequis a bloqué Pagefind et l'i18n pendant quinze mois, alors que ni l'un ni
l'autre n'en dépendaient.

**Version anglaise (i18n).** Le chantier le plus lourd de l'ancienne roadmap. Un
site français qui marche vaut mieux qu'un bilingue à moitié traduit, et les
supports anglophones existent déjà ailleurs. À rouvrir seulement si une demande
réelle apparaît.

**Système d'exercices avec corrections.** Absorbé par les projets : un projet
_est_ un énoncé avec ses critères de réussite et sa correction en dépôt Git.
Garder les deux chantiers séparés dédoublerait le même format.

**Newsletter ou digest du Feed.** Sans compte ni backend, cela veut dire un
prestataire, donc des cookies et des données personnelles — la ligne
privacy-first. Le flux RSS couvre le besoin.

**Gamification et scoring.** Sans compte, le score vit dans le `localStorage` et
se perd au changement de machine. Faible valeur pour la dette créée.

**Zone « NX pour formateurs ».** Écartée dans sa forme large (exports,
séquences, boîte à outils). Ce qu'il en reste d'utile tient dans la feuille
`@media print`, en réflexion ci-dessus.

---

## Archive — audit des deux documents remplacés

Relu le 24 septembre 2026, avant suppression.

`NEXT_FEATURES.md`, cinq phases :

| Phase                  | État réel                                                       |
| ---------------------- | --------------------------------------------------------------- |
| P1 Content Collections | **écartée** (voir ci-dessus)                                    |
| P2 Tags et filtrage    | à moitié faite, autrement : les tags servent `relatedContent`   |
| P3 Recherche Pagefind  | à faire — reprise en « cadré »                                  |
| P4 Confort de lecture  | **faite, les trois** : contenu lié, copier le code, progression |
| P5 i18n                | **écartée**                                                     |

Le document parlait d'Astro 6 ; le dépôt est en Astro 7.3.

`docs/plan-fonctionnalites.md`, daté « Mai à Décembre 2025 » : la moitié des
lignes étaient faites sans être marquées (page de cours, news automatisées via
`nx-mcp`, RSS, page 404, thème système). Il portait deux idées encore vivantes,
reprises ici : l'espace « projets guidés » et la page roadmap publique. Sa
dernière section était un pseudo-code du workflow RAG du Récap, remplacé depuis
par `nx-mcp`.
