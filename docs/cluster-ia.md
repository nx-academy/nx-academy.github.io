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
| 3   | Fiche   | `tokens-contexte-et-cout`     | Tokens, contexte et coût : comment estimer la facture ? | Intermédiaire | Le coût, en méthode           | Brouillon 19/09/2026 |
| 4   | Fiche   | `comprendre-les-agents-ia`    | Qu'est-ce qu'un agent IA ?                              | Intermédiaire | Requête exact-match           | Brouillon 19/09/2026 |
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

Le RAG et le quiz, évoqués au cadrage initial, sont repris dans « Sujets
potentiels » ci-dessous, avec le reste des pistes relevées depuis.

## Sujets potentiels — v2, non arbitrés

> Relevés le 14 septembre 2026, puis validés sur le principe par Thomas. Aucun
> n'est planifié, aucun n'a d'ordre. Cette liste existe pour ne pas rouvrir la
> discussion à chaque publication.

Le motif observé sur Docker, CI/CD et cloud : ce qui porte le cluster, ce ne
sont pas les définitions, ce sont les **comparatifs décisionnels** et les
**fiches-ponts entre deux clusters**. Les définitions servent de pilier interne.
La liste ci-dessous est classée selon cette grille, **pas** selon un volume de
recherche : on n'a pas de données de volume et on n'en invente pas.

### Les trois premières, si le cluster v1 tient

| Slug                                        | Titre                                               | level         | Rôle                       |
| ------------------------------------------- | --------------------------------------------------- | ------------- | -------------------------- |
| `fine-tuning-ou-rag`                        | Fine-tuning ou RAG : lequel choisir ?               | Intermédiaire | Comparatif décisionnel     |
| `tester-une-application-qui-utilise-un-llm` | Comment tester une application qui utilise un LLM ? | Avancé        | **Pont IA ↔ CI/CD**       |
| `injection-de-prompt`                       | Qu'est-ce qu'une injection de prompt ?              | Intermédiaire | Sécurité, requête montante |

**`fine-tuning-ou-rag`** — La question que tout le monde se pose au moment de
brancher un modèle sur ses propres données. Une décision, pas une définition, et
les deux approches ne bougent pas — seuls les outils changent. Structurellement,
c'est le `iaas-paas-saas` du cluster IA : un tableau « qui fait quoi », puis une
section « lequel selon votre contexte ». Si on n'en garde qu'une, c'est
celle-là.

**`tester-une-application-qui-utilise-un-llm`** — La fiche-pont manquante,
pendant exact de ce que `deployer-image-docker-github-actions` fait entre Docker
et CI/CD. Deux vraies douleurs : tester du non déterministe, et ne pas faire
exploser la facture en lançant des appels de modèle à chaque push. Le cluster
GitHub Actions fournit déjà la moitié du contenu.

**`injection-de-prompt`** — Prolonge la ligne sécurité du site
(`gerer-secrets-github-actions`, `bien-gerer-secrets-docker`). La phrase qui la
justifie est déjà dans l'angle de `comprendre-le-protocole-mcp` : un serveur MCP
est du code qui tourne avec vos droits. Le Feed a de la matière.

### La chaîne RAG, si on va là

`qu-est-ce-qu-un-embedding` → `qu-est-ce-que-le-rag` →
`base-de-donnees-vectorielle`

Deux exact-match forts (« embedding », « base vectorielle ») pour des termes
employés partout et définis nulle part, et une troisième fiche qui se raccroche
au cluster cloud par l'infra (où ça tourne, ce que ça coûte). Mais c'est +3
fiches sur un cluster qui en compte déjà 5 : une v2 entière, pas un ajout.
`fine-tuning-ou-rag` en est la porte d'entrée naturelle.

### Deux candidats à trancher en écrivant la v1

- **`llm-local-ou-api`** — « Faire tourner un LLM en local ou passer par une
  API ? ». Comparatif décisionnel et pont vers Docker et cloud (un modèle dans
  un conteneur, la question du GPU, coût fixe contre coût à l'usage). Réserve :
  la partie « ce qui tourne sur une machine normale » se périme vite. Tenable
  seulement en restant sur la méthode et les ordres de grandeur, comme la fiche
  coût.
- **`mcp-ou-api`** — bon exact-match émergent, mais ça peut rester une section
  de `comprendre-le-protocole-mcp`. À décider en écrivant cette fiche, pas
  avant.

### Articles

Trois figurent déjà dans [calendrier-editorial.md](./calendrier-editorial.md)
sans être rattachés à quoi que ce soit. Les passer en `serie: ia` les sort de
l'isolement :

- **« Les coulisses de NX : comment fonctionne la génération de quiz par
  IA ? »** (idées BONUS) — le contenu le plus différenciant possible sur l'IA :
  un vrai système, de vrais prompts, un vrai coût, de vrais ratés. Zéro
  concurrence par construction. Nourrit la fiche coût et la fiche agents.
- **« Les coulisses de NX : comment fonctionne mon système de news
  automatisé ? »** (idées BONUS) — même famille, compagnon naturel de la fiche
  MCP.
- **« L'IA va-t-elle tuer Internet ? »** (prévu octobre) — porte d'entrée grand
  public vers le cluster.
- **L'IA et l'enseignement** — pas au calendrier. Angle que Thomas est à peu
  près seul à pouvoir tenir, et le Feed a la brève sur l'heure d'IA au programme
  de seconde.

### Écartés, et pourquoi

- **Comparatifs de fournisseurs** (« OpenAI vs Anthropic vs Mistral ») : gros
  volume, et exactement ce qu'interdit « Ce que ce cluster n'écrit pas » —
  classement, prix et noms de modèles, à corriger tous les mois.
- **« Comment écrire un bon prompt ? »** : saturé, et aucun angle NX dessus.
- **« Comment bien utiliser les projets OpenAI ? »** (prévu septembre au
  calendrier) : fonctionnalité d'un produit d'un fournisseur, renommable sans
  préavis. Soit un billet daté assumé hors cluster, soit à retourner en fiche
  sur l'organisation du contexte, qui est le vrai sujet en dessous.

### Quiz

Toujours pas faisable en l'état : `src/data/quiz.ts` restreint `topic` à
`"Docker" | "CI/CD"`, il faut d'abord élargir le type. Même chantier que celui
laissé ouvert par le cluster cloud — autant le faire une seule fois, pour les
deux.

## Le volet pratique

> Ouvert le 14 septembre 2026 : « en dehors de la théorie, il faudra qu'on
> regarde pour faire aussi de la pratique ». Rien n'est cadré ici, on pose le
> vocabulaire et les pièges avant de s'engager.

### « Créer sa propre IA » recouvre trois choses très différentes

C'est la première chose à trancher, parce que les trois n'ont ni le même coût,
ni le même public, ni la même honnêteté possible.

| Niveau | Ce qu'on fait                                 | Faisable ?              | Où c'est déjà traité             |
| ------ | --------------------------------------------- | ----------------------- | -------------------------------- |
| 1      | Construire une application autour d'un modèle | Oui, c'est le quotidien | `creer-un-premier-agent-ia` (v1) |
| 2      | Spécialiser un modèle existant (fine-tuning)  | Oui, GPU loué à l'heure | Rien                             |
| 3      | Entraîner un modèle de langage depuis zéro    | Oui, en tout petit      | Rien                             |

**Niveau 2** — on part d'un modèle ouvert de petite taille et on l'ajuste sur un
jeu de données maison (LoRA / QLoRA). C'est ce que les gens veulent dire, la
plupart du temps, par « mon IA ». Le coût réel se compte en heures de GPU loué,
et le vrai travail n'est pas l'entraînement mais **la construction du jeu de
données** — ce qui est, pédagogiquement, une excellente nouvelle.

**Niveau 3** — reproduire un modèle du marché est hors de portée de qui que ce
soit hors de quelques entreprises, et il faut le dire sans détour. En revanche,
entraîner un **tout petit** modèle de langage sur un corpus minuscule est
faisable en quelques heures sur du matériel ordinaire. Ça ne sert à rien en
production et ça explique tout : tokens, poids, fonction de perte,
surapprentissage. C'est le seul moyen de vraiment comprendre la fiche pilier.

> **Le piège à ne jamais commettre sur ce sujet** : un titre qui promet le
> niveau 3 pour un contenu qui fait le niveau 2. C'est l'erreur la plus répandue
> du web francophone sur l'IA, et c'est exactement ce que la ligne éditoriale du
> site interdit.

### Le format : plutôt un projet qu'une fiche

[point-etape-rentree-2026](../src/pages/articles/point-etape-rentree-2026.md)
annonce deux à trois projets d'ici la fin de l'année, et précise que la
définition de ce qu'est un projet viendra avec les premiers, fin septembre. Un
projet IA est un bon candidat pour le premier ou le deuxième — et l'article dit
aussi pourquoi : « un projet suppose qu'il existe déjà, quelque part, de quoi
répondre aux questions qu'il soulève ». Le cluster v1 est précisément cette
base. Proposé avant, le projet devient un tutoriel qu'on recopie.

Découpage qui tient le mieux, à valider :

- **le projet guidé fait le niveau 2** — une application qui marche, puis un
  modèle spécialisé sur des données qu'on a construites soi-même ;
- **le niveau 3 devient un article**, en registre carnet : le récit de ce qu'on
  apprend en entraînant un modèle minuscule, pas un tutoriel à suivre. C'est un
  texte dont la valeur est l'expérience, pas la reproductibilité.

### Un deuxième cluster ? Non — un volet

Le précédent existe dans le dépôt :
[cluster-cloud-pratique.md](./cluster-cloud-pratique.md) est un document séparé,
adossé au cluster cloud, qui **garde la même série**. On fera pareil :
`docs/cluster-ia-pratique.md` le jour où ça démarre, `serie: ia` conservée. Deux
séries IA couperaient le maillage en deux et videraient le rayon `/fiches` de sa
moitié la plus utile.

### À trancher le moment venu

- Quel niveau pour le projet guidé (recommandation ci-dessus : le 2).
- **Corrigé le 24/09/2026 : le projet IA ne peut être ni le premier ni le
  deuxième.** [`projets.md`](./projets.md) a posé la règle « zéro prérequis
  externe » — un projet ne sort pas tant qu'une de ses étapes s'appuie sur un
  contenu absent du site. Les six fiches de ce cluster sont en brouillon jusqu'à
  décembre. Le projet IA est donc le troisième ou le quatrième, **pas avant
  janvier 2027**. Le paragraphe « le format : plutôt un projet qu'une fiche »
  ci-dessus garde son analyse des trois niveaux, mais son hypothèse de
  calendrier ne tient plus.
- Quel modèle ouvert et quel jeu de données — idéalement des données NX, pour
  rester dans la logique « coulisses » qui marche.
- Si le projet attend le cours « Développez des applications IA » ou s'il le
  précède. Le cluster cloud a montré qu'un cluster qui sort **après** le cours
  qu'il prépare ne sert à rien.

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
