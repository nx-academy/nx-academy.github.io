# Cluster « IA »

> Cadrage éditorial (pré-rédaction). Objectif : poser la technique sous les
> trois articles IA déjà en ligne, avec un angle qui raccorde l'IA au reste du
> site plutôt que d'ouvrir une île. Cadré le 14 septembre 2026.

## Le constat

- **Trois articles portent déjà `serie: ia`** : `gpt-meileur-ami`,
  `ne-plus-se-dedoubler`, `profils-ia-developpeur`. Tous les trois parlent
  d'**usage** — quel type de développeur on devient, comment on travaille avec.
  Aucun ne pose ce qu'est un LLM, un agent, un token ou un coût. Le socle
  technique manque sous des textes qui le supposent acquis.
- **La clé `ia` n'existe pas dans `src/data/series.ts`.** Les trois articles se
  rapprochent quand même entre eux (`relatedContent` compare les chaînes, pas
  les clés déclarées), mais aucun rayon IA n'apparaît sur `/fiches` — il n'y a
  aucune fiche.
- **Le Feed porte déjà une voix IA, et ce n'est pas celle de ce cluster.** Les
  cinq brèves commentées depuis le 1er septembre 2026 — les seules du Feed à
  porter une `lecture` — traitent des usages malveillants bloqués, d'un
  chercheur qui quitte l'industrie, d'un modèle qui pirate seul, du scénario AI
  2027, du désenchantement de la tech. C'est un angle _qu'est-ce que ça nous
  fait_. Ce cluster est un angle _comment ça marche_. Les deux ne rentrent pas
  dans le même contenu.
- **Le calendrier anticipe déjà le sujet** : « Développez des applications IA
  (Python + GPT) » figure dans les idées de cours de
  [calendrier-editorial.md](./calendrier-editorial.md). Ce cluster lui sert de
  terrain préparé, exactement comme le cluster cloud le fait pour « Mettez vos
  applications en production ».

## L'angle

Une phrase, et tout le cluster s'y tient :

> **L'IA expliquée à quelqu'un qui sait déjà déployer un conteneur et lire une
> facture cloud.**

« Qu'est-ce qu'un LLM » est la requête la plus saturée du web francophone. Le
sujet ne suffit pas, il faut un point de vue. Celui-ci a trois conséquences
concrètes à la rédaction :

1. **On suppose le lecteur des clusters Docker, CI/CD et cloud.** On peut dire
   `image`, `registry` ou `facturation à l'usage` sans les redéfinir, et
   renvoyer vers la fiche qui le fait.
2. **On explique un coût comme on explique une facture cloud.** Le prix au
   million de tokens bouge tous les mois ; la méthode pour l'estimer, non.
   Aucune fiche ne contient de tableau de prix — voir « Ce que ce cluster
   n'écrit pas » plus bas.
3. **Chaque fiche cite au moins un contenu existant hors cluster IA.** C'est ce
   qui fait la différence entre un cluster et une île, et c'est ce qui a marché
   pour Docker.

## Ce que ce cluster n'est pas

- **Ce n'est pas un dossier d'actualité.** L'actualité IA de la rentrée 2026 va
  dans Le Récap de septembre et dans le Feed, qui sont faits pour ça. Un contenu
  qui s'ouvre sur « ces dernières semaines » est illisible quatre mois plus
  tard, et le reste du site est bâti sur l'inverse. _Arbitré le 14/09/2026._
- **Ce n'est pas un nouveau format.** Le mot « dossier » désigne ici un cluster
  doté d'une porte d'entrée éditoriale, pas un `kind` supplémentaire. Créer un
  vrai format coûterait un layout, une route, une page d'index, un type, et des
  passages dans `Card.astro`, `relatedContent`, le sitemap et le RSS — avant la
  première ligne de contenu. La mécanique existante (une `serie`, un pilier, des
  contenus qui se citent) fait le même travail pour zéro ligne de code. On
  reverra la question si un deuxième dossier arrive. _Arbitré le 14/09/2026._
- **Ce n'est pas prioritaire sur le backlog.** Voir « Condition d'entrée ».

## Le cluster (7 contenus)

Convention : une fiche = un `.md` plat dans `src/pages/fiches/<slug>.md`, front
matter `layout`, `title`, `description`, `imgAlt`, `imgSrc`, `author`, `github`,
`kind: Fiche technique`, **`serie: ia`**, `level`, `publishedDate` (MM/DD/YYYY),
plus un bloc `faq`. Un article = un `.md` dans `src/pages/articles/<slug>.md`,
`kind: Articles`, `format: reflexion`, **`serie: ia`**, `tags`.

Le champ `serie: ia` est **indispensable** pour apparaître dans le rayon IA de
`/fiches/` (`src/data/series.ts`) et alimenter le bloc « À lire ensuite »
(`src/utils/relatedContent/`, poids `serie` = +3, `tag` partagé = +1).

| #   | Type    | Slug                          | Titre                                                   | level         | Rôle                          | État                 |
| --- | ------- | ----------------------------- | ------------------------------------------------------- | ------------- | ----------------------------- | -------------------- |
| 1   | Article | `l-ia-vue-depuis-la-prod`     | L'IA vue depuis la prod                                 | —             | **Porte d'entrée** du dossier | Brouillon 14/09/2026 |
| 2   | Fiche   | `comprendre-les-llm`          | Qu'est-ce qu'un LLM et comment ça marche ?              | Débutant      | **Pilier SEO**                | Brouillon 14/09/2026 |
| 3   | Fiche   | `tokens-contexte-et-cout`     | Tokens, contexte et coût : comment estimer la facture ? | Intermédiaire | Le coût, en méthode           | À écrire             |
| 4   | Fiche   | `comprendre-les-agents-ia`    | Qu'est-ce qu'un agent IA ?                              | Intermédiaire | Requête exact-match           | À écrire             |
| 5   | Fiche   | `comprendre-le-protocole-mcp` | Qu'est-ce que le protocole MCP ?                        | Intermédiaire | Différenciant (nx-mcp)        | À écrire             |
| 6   | Fiche   | `creer-un-premier-agent-ia`   | Comment créer un premier agent IA ?                     | Avancé        | **Pont IA ↔ Docker/cloud**   | À écrire             |
| 7   | Article | _à définir_                   | _réflexion, angle à trancher_                           | —             | **Réservé à Thomas**          | À cadrer             |

### Détail des angles

1. **`l-ia-vue-depuis-la-prod`** — La porte d'entrée, celle qu'on partage sur
   LinkedIn et qui donne son nom au dossier. Elle dit pourquoi ce cluster
   existe. Le vocabulaire IA est utilisé partout et défini nulle part, et un
   développeur qui sait mettre une application en production n'a pas besoin
   d'une vulgarisation grand public, il a besoin des ordres de grandeur. Elle
   annonce les cinq fiches et renvoie vers elles. Registre carnet, pas de
   promesse de révolution, pas de prédiction. Elle fait la jonction avec les
   trois articles IA déjà en ligne, qui parlaient d'usage sans jamais poser la
   technique.

2. **`comprendre-les-llm`** — Le pilier, celui vers qui tout pointe. Miroir
   structurel de `comprendre-le-cloud-public`. Ce qu'est un modèle de langage
   (prédire le token suivant, et rien d'autre), pourquoi ça produit quand même
   du texte utile, ce que veut dire « entraîner » par rapport à « utiliser », la
   différence entre modèle, API et produit, et les limites structurelles —
   l'hallucination n'est pas un bug qu'on corrigera, c'est le fonctionnement
   normal vu sous un mauvais angle. Le vocabulaire de base posé une fois pour
   tout le cluster : token, contexte, température, poids, inférence.

3. **`tokens-contexte-et-cout`** — La fiche la plus utile du lot, et la plus
   facile à rater. Angle : **la méthode, jamais les prix.** Comment un texte
   devient des tokens, pourquoi le contexte est renvoyé en entier à chaque tour
   (et donc pourquoi une conversation coûte de plus en plus cher à mesure
   qu'elle avance), ce qui fait exploser une facture (une boucle d'agent, un RAG
   mal découpé, un prompt système gras multiplié par le nombre d'appels), et
   comment estimer un coût par requête avant d'écrire la première ligne. Le
   parallèle est explicite avec la facturation à l'usage du cloud : même
   mécanique, mêmes surprises. Cite `le-cloud-est-il-vraiment-moins-cher`.

4. **`comprendre-les-agents-ia`** — Requête exact-match, et sujet où le bruit
   est maximal. Angle : un agent, c'est une boucle. Un modèle, une liste
   d'outils, un critère d'arrêt. Ce qui distingue un agent d'un simple appel
   d'API, ce que « autonome » veut dire techniquement, et surtout les trois
   choses que personne ne dit — le coût croît avec le nombre de tours, les
   erreurs se composent d'un tour à l'autre, et le critère d'arrêt est la partie
   difficile. Renvoie à la fiche coût pour la partie facture.

5. **`comprendre-le-protocole-mcp`** — Le contenu différenciant du cluster. Le
   protocole qui standardise la manière dont un modèle accède à des outils et à
   des données : le problème qu'il résout (chaque intégration était un
   développement spécifique), la forme d'un serveur, ce que ça change à la
   sécurité (un serveur MCP est du code qui tourne avec vos droits). NX a un
   serveur MCP en production — `nx-mcp`, qui alimente le Feed — donc la fiche
   s'appuie sur une expérience réelle et pas sur la documentation recopiée.
   C'est ce qui la rendra citable.

6. **`creer-un-premier-agent-ia`** — **La fiche-pont**, celle qui porte le
   maillage vers le reste du site. Un agent minimal en Python : un appel, une
   boucle, deux outils, un critère d'arrêt, et le compteur de tokens allumé du
   début à la fin. Puis la partie que les tutoriels sautent : le conteneuriser,
   le sortir de sa machine, le faire tourner quelque part — et là on repasse la
   main aux clusters Docker et cloud, qui expliquent déjà tout ça. Bloc `howTo`
   en étapes numérotées.

   > À la rédaction : `CheatSheetsLayout` ne fait du bloc `howTo` que du
   > JSON-LD, il ne l'affiche jamais. Les mêmes étapes doivent donc être écrites
   > en clair dans le corps — sans quoi on baliserait des étapes invisibles pour
   > le lecteur, ce que Google sanctionne. Même remarque que pour la fiche-pont
   > du cluster cloud.

7. **Article de réflexion — réservé.** Thomas écrit celui-là. C'est le seul
   endroit du cluster où la voix du Feed a sa place : les agents qui agissent
   seuls, ce que l'IA change à l'enseignement, le désenchantement de la tech.
   L'angle est à trancher, et il n'a pas à être décidé maintenant — mais la
   place est réservée dans le maillage et dans le calendrier pour qu'il ne
   devienne pas un texte isolé de plus.

### Extensions possibles, hors périmètre

- Une fiche **RAG**, qui serait la suite naturelle de `comprendre-les-agents-ia`
  et de la fiche coût. Volontairement hors cluster v1 : six contenus techniques
  d'un coup, c'est déjà la taille du cluster cloud.
- Un **quiz IA**. Pas faisable en l'état : `src/data/quiz.ts` restreint `topic`
  à `"Docker" | "CI/CD"`, il faut d'abord élargir le type. Même chantier que
  celui laissé ouvert par le cluster cloud — autant le faire une seule fois,
  pour les deux.

## Maillage interne

Reproduire ce que fait Docker : chaque contenu cite explicitement un ou deux
voisins du cluster, **en dur dans le corps Markdown**, en plus du scoring
automatique.

```
              l-ia-vue-depuis-la-prod (porte d'entrée)
                          │
                          ▼
                 comprendre-les-llm (pilier)
                    │      │       │
    ┌───────────────┘      │       └──────────────┐
    ▼                      ▼                      ▼
tokens-contexte-et-cout  comprendre-les-agents-ia  article de Thomas
    │        ▲                 │        ▲
    │        └─────────────────┘        │   (coût et agents se citent :
    │                                   │    un agent, c'est une facture
    │              comprendre-le-protocole-mcp
    │                          │
    └──────────┬───────────────┘
               ▼
      creer-un-premier-agent-ia
               │
               ├─► /fiches/optimisation-images-docker      (cluster Docker)
               ├─► /fiches/presentation-registry-docker    (cluster Docker)
               ├─► /drafts/deployer-conteneur-docker-dans-le-cloud (cluster cloud)
               └─► /fiches/gerer-secrets-github-actions    (cluster CI/CD, la clé d'API)
```

**Rétro-liens à poser depuis l'existant**, le jour où le pilier sort — les trois
articles IA en ligne n'ont aujourd'hui aucune porte vers une explication
technique :

- `src/pages/articles/profils-ia-developpeur.md` → `comprendre-les-llm` ;
- `src/pages/articles/gpt-meileur-ami.md` → `comprendre-les-llm` ;
- `src/pages/articles/ne-plus-se-dedoubler.md` → `comprendre-les-agents-ia`.

**Tags partagés**, pour faire jouer le scoring inter-clusters : `IA` sur les
sept contenus, plus `Production`, `Coût`, `Docker` ou `Développeur` selon le
contenu. Les trois articles IA existants portent déjà le tag `IA` : le scoring
joue donc dès la première publication, et il ne leur manque que les rétro-liens
ci-dessus.

## Condition d'entrée

**Ce cluster ajoute sept visuels à une file qui en compte déjà huit en retard.**

Au 14 septembre 2026, les huit brouillons de `src/pages/drafts/` sont rédigés et
**aucun n'a son image de une** — c'est le constat central de
[dette-editoriale.md](./dette-editoriale.md), et c'est le seul vrai goulot du
[calendrier](./calendrier-editorial.md). La fiche prévue le 09/09 n'est
d'ailleurs toujours pas sortie, ce qui laisse un 404 ouvert en production :
`reutiliser-workflow-github-actions` (ligne 207) cite
`/fiches/optimiser-workflows-github-actions`, resté brouillon.

D'où la règle, posée ici pour ne pas avoir à la rediscuter en novembre :

> **On écrit le cluster IA maintenant, on ne le publie pas avant que le backlog
> de septembre-octobre ait ses visuels et que le cluster cloud soit bouclé.**

Écrire ne coûte rien à la file d'attente. Publier, si.

## Calendrier

Publication à partir de novembre, une par semaine, le lundi. La cadence est
volontairement plus basse que les deux par semaine de septembre-octobre : le
cours « Mettez vos applications en production » tombe en décembre et il a besoin
d'air.

| Date        | Type    | Contenu                       |
| ----------- | ------- | ----------------------------- |
| 02/11/2026  | Article | `l-ia-vue-depuis-la-prod`     |
| 09/11/2026  | Fiche   | `comprendre-les-llm`          |
| 16/11/2026  | Fiche   | `tokens-contexte-et-cout`     |
| 23/11/2026  | Fiche   | `comprendre-les-agents-ia`    |
| 30/11/2026  | Fiche   | `comprendre-le-protocole-mcp` |
| 07/12/2026  | Fiche   | `creer-un-premier-agent-ia`   |
| _à définir_ | Article | réflexion de Thomas           |

Le 07/12 est le point de friction : c'est la semaine où le cours de décembre
sort. Si les deux se marchent dessus, la fiche-pont glisse en janvier — elle
ferme le cluster, elle peut attendre. L'article de Thomas se place où il veut,
de préférence après le pilier pour bénéficier du maillage.

## Fichiers concernés

- **Créés** : 5 fiches et 2 articles, écrits d'abord dans `src/pages/drafts/`
  (ils s'y citent entre eux en `/drafts/<slug>`, comme le cluster cloud), puis
  déplacés vers `src/pages/fiches/` ou `src/pages/articles/` à la publication.
- **Édité** : `src/data/series.ts` — clé `ia`, ajoutée en amont. Elle ne crée
  pas de rayon vide : `src/pages/fiches/index.astro` filtre les rayons sans
  fiche (`.filter((shelf) => shelf.items.length > 0)`). Sa **position dans
  l'objet décide de sa position sur `/fiches`** : placée après `cloud`, dans la
  continuité de la chaîne conteneur → CI/CD → cloud → IA.
- **Édités à la publication** : les trois articles IA en ligne (rétro-liens et
  `tags`).
- **Images** : une par contenu, source `raw/cheatsheets/<slug>.png` ou
  `raw/articles/<slug>.png` → `npm run optimize-images` → référencée
  `imgSrc: /images/cheatsheets/<slug>.webp` (ou `/images/articles/`).
- **Calendrier** : mettre à jour
  [calendrier-editorial.md](./calendrier-editorial.md).
- **Changelog** : proposer une entrée dans
  `src/content/changelog/<AAAA-MM>.yaml` à chaque publication.

## Ce que ce cluster n'écrit pas

Liste tenue à jour, parce que c'est là que se crée la dette de maintenance :

- **aucun prix** au million de tokens, et aucun tableau comparatif de
  tarification ;
- **aucun nom de modèle** dans un titre, une description ou une URL — les noms
  peuvent apparaître dans le corps, à titre d'exemple daté et assumé comme tel ;
- **aucun classement** de modèles, aucun benchmark recopié ;
- **aucune prédiction** sur ce que l'IA fera dans cinq ans.

Tout ce qui tombe dans ces quatre catégories a sa place dans le Feed ou dans Le
Récap, qui sont datés par construction.

## Vérification (au moment de la rédaction)

- `npm run build` (= `astro check && astro build`) passe sans erreur.
- `npm run prettier:check` passe — y compris sur ce fichier.
- Chaque nouvelle fiche apparaît dans le rayon **IA** de `/fiches/`.
- Le bloc « À lire ensuite » de chaque contenu affiche bien ses voisins IA.
- `grep -rn "/drafts/" src/pages/fiches src/pages/articles` ne renvoie rien
  après la dernière publication du cluster.
- Registre NX : vouvoiement dans les fiches, « on » pour la progression, « je »
  pour l'avis, exemples reproductibles, typographie française.
