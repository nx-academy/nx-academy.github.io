# Le glossaire

> Cadrage écrit le 24 septembre 2026, après validation de la règle « strictement
> définitionnel ». Rien n'est en ligne. Ce document pose la règle de
> non-chevauchement avec les fiches, l'anatomie d'une entrée, le mécanisme du
> popover, et la liste des premiers termes — extraite du dépôt, pas imaginée.

## Pourquoi, et pourquoi c'est risqué

Le besoin réel n'est pas le référencement, c'est **le lien en cours de texte**.
Le lecteur d'une fiche CI/CD qui bute sur « runner » n'a nulle part où aller, et
lui envoyer une fiche de deux mille mots est une mauvaise réponse à une question
de dix secondes.

Le risque, lui, est net : **la cannibalisation**. Le catalogue de NX est déjà
définitionnel — « Qu'est-ce que le cloud public ? », « IaaS, PaaS, SaaS », «
Comprendre les proxys et reverse proxys ». Une page `/glossaire/conteneur` se
battrait contre ces fiches sur les mêmes requêtes. Ce ne serait pas du trafic
gagné, seulement du trafic divisé entre deux pages du même site.

Uxcel s'en sort parce que le vocabulaire du design est fini et que son catalogue
n'est pas construit sur des définitions. Ici, il l'est. La règle qui suit existe
uniquement pour tenir les deux formats à distance l'un de l'autre.

## La règle

> Le glossaire répond **« c'est quoi »**. Jamais **« comment faire »**, jamais
> **« quelle différence »**. Cent cinquante à trois cents mots, un point. Dès
> qu'il faut expliquer comment on s'en sert, c'est une fiche.
>
> Et **les fiches gardent le monopole des titres en question**. Le titre d'une
> entrée est « Conteneur », son `<title>` est `Conteneur — définition · NX`. Pas
> « Qu'est-ce qu'un conteneur ? ».

Intention de recherche différente, format de résultat différent, pas de
concurrence interne. C'est une règle applicable et vérifiable en relecture, pas
un principe.

Cas particulier, et il faut le traiter d'avance : **un terme déjà porté par le
titre d'une fiche**. L'entrée existe quand même — le popover en a besoin — mais
elle se réduit à sa phrase de définition et à un renvoi explicite : « NX traite
cette notion en détail dans _tel_ contenu. » Elle n'essaie pas de rivaliser avec
la fiche, elle y conduit.

## L'anatomie d'une entrée

Structure fixe, et vraiment fixe : c'est ce qui rend le format relisible en
série et délégable à un agent.

1. **La phrase de définition** — une seule, autonome, compréhensible hors
   contexte. C'est elle qui sera inlinée dans les popovers et elle seule.
2. **À quoi ça sert** — deux paragraphes courts. Le rôle, pas le mode d'emploi.
3. **À ne pas confondre avec** — un ou deux autres termes du glossaire, avec en
   une phrase ce qui les sépare. C'est le bloc le plus utile de la page, et
   c'est celui qui tisse le glossaire.
4. **Où NX en parle** — les contenus qui emploient réellement le terme. Dérivé
   du corpus, pas saisi à la main.

Rien d'autre. Pas de bloc de code, pas d'exemple long, pas de section « pour
aller plus loin ».

## Le popover

L'infobulle est le premier argument sérieux en faveur du glossaire, celui qui ne
dépend pas du référencement. Deux décisions.

### Le texte est inliné au build, pas récupéré par `fetch`

Le site est statique et le glossaire sera une collection : **la définition est
connue au moment du build**. Un `fetch` irait chercher au moment de la lecture
une donnée déjà en main, et il faudrait payer pour ça un état de chargement, un
état d'erreur, un cas hors-ligne, et une seconde source de vérité à garder
synchrone avec les pages.

Il y a pire. Un `/glossaire/definitions.json` unique grossit avec le glossaire :
à cent cinquante termes, chaque lecteur télécharge tout le dictionnaire pour les
trois mots de sa fiche. Et un fichier par terme, c'est autant de requêtes que de
termes liés dans la page.

Inliner la phrase de définition coûte environ deux cents caractères par terme.
Une fiche qui en lie huit paie un peu plus d'un kilo-octet, moins qu'une icône.
Zéro requête, zéro état, ça marche hors-ligne.

**On inline la phrase de définition, pas l'entrée entière.** Répéter trois
paragraphes sur vingt pages, c'est du contenu dupliqué à l'échelle du site ; une
phrase, non.

### Le lien reste un vrai lien

L'ancre est un `<a href="/glossaire/conteneur">`. Le popover est un
enrichissement : sans JavaScript, la page marche et le lien conduit à l'entrée.
C'est la doctrine du site, et ici elle ne coûte rien.

Deux points de vigilance :

- **Le mobile est le vrai piège.** Le survol n'existe pas. L'interaction est au
  clic, et le popover doit contenir lui-même le lien « lire la définition
  complète » — sinon on enferme le lecteur tactile dans une bulle sans sortie.
- **Le clavier** : ouverture au focus, fermeture à Échap, et `aria-describedby`
  de l'ancre vers la bulle.

Côté implémentation, l'API Popover native fait presque tout. Il reste une
trentaine de lignes de JavaScript vanilla à ajouter à
[`articleEnhancements/`](../src/utils/articleEnhancements/) — le déclenchement,
le clavier, et le positionnement là où l'ancrage CSS n'est pas encore
disponible. Aucune dépendance.

## Où ça vit

**Une content collection**, `src/content/glossaire/`, avec un schéma dans
`src/content.config.ts`. Puis `src/pages/glossaire/[terme].astro` et une page
d'index.

C'est une **exception assumée** à la règle du dépôt, qui veut que le contenu
vive dans `src/pages/` en routage par fichier. Elle se justifie par trois choses
que les fiches n'ont pas :

- le format est ultra-normé, donc un schéma le valide utilement au build ;
- les renvois croisés de « à ne pas confondre avec » doivent être **vérifiés**,
  pas espérés — un renvoi vers un terme inexistant doit casser le build ;
- le contenu est destiné à être proposé par un agent, et un schéma est le seul
  garde-fou qui ne dépend pas de la vigilance du relecteur.

Le changelog a déjà ouvert cette voie pour les mêmes raisons, et le cadrage
correspondant est dans
[`changelog-data-collection.md`](./changelog-data-collection.md). Si le
glossaire part, [`CLAUDE.md`](../CLAUDE.md) doit être mis à jour : il y aura
deux collections, plus une seule.

## Les premiers termes

Extraits des **68 contenus publiés** du site le 24 septembre 2026 — fiches,
articles et chapitres, brouillons exclus. Retenus : les termes cités dans au
moins trois contenus dont **aucun titre ne traite**.

| Terme         | Contenus qui l'emploient |
| ------------- | ------------------------ |
| API           | 32                       |
| conteneur     | 20                       |
| service       | 18                       |
| contexte      | 14                       |
| cache         | 14                       |
| pipeline      | 12                       |
| job           | 11                       |
| port          | 10                       |
| tag           | 9                        |
| REST          | 9                        |
| secret        | 7                        |
| volume        | 6                        |
| couche        | 6                        |
| token         | 5                        |
| agent         | 4                        |
| DNS           | 4                        |
| élasticité    | 3                        |
| step          | 3                        |
| orchestrateur | 3                        |

Dix-neuf termes : de quoi ouvrir sans se noyer, et le chiffre confirme qu'il ne
faut pas viser les deux cents entrées.

Neuf autres termes sont cités autant ou plus mais **déjà portés par un titre** —
environnement, image, workflow, registry, Dockerfile, multi-stage, Swarm,
asynchrone, SaaS. Ils relèvent du cas particulier décrit plus haut : une phrase,
puis un renvoi vers la fiche.

La requête qui produit ce tableau est à rejouer après chaque vague de
publication. Le cluster cloud sort en octobre, le cluster IA en décembre : les
deux amèneront leur lot de termes.

## La vraie difficulté : la polysémie

Elle saute aux yeux dans le tableau. **« Service » n'a pas le même sens dans un
`docker-compose.yml`, dans un catalogue cloud et dans une architecture REST.** «
Contexte » désigne le contexte de build d'une image et la fenêtre de contexte
d'un modèle. « Tag » vaut pour une image et pour Git. « Agent » change de sens
entre l'IA et un agent de CI.

Trois issues possibles, et il faut choisir avant d'écrire la première entrée :

1. **Une entrée par sens**, distinguées par la série —
   `/glossaire/service-docker` et `/glossaire/service-cloud`. Honnête, mais
   l'URL devient laide et le lien en cours de texte doit choisir.
2. **Une entrée par terme, plusieurs sens dedans.** Le lecteur lit le bon
   paragraphe. Simple, mais la phrase de définition unique — celle qui part dans
   le popover — devient impossible à écrire.
3. **Une entrée par terme, un sens retenu, les autres renvoyés.** On définit «
   service » au sens le plus fréquent sur le site, et on ouvre par « à ne pas
   confondre avec ».

Recommandation : la **3**, parce qu'elle est la seule compatible avec la phrase
unique du popover, et parce que le bloc « à ne pas confondre avec » existait
déjà pour ça. Les termes trop ambigus pour trancher — « service », peut-être «
contexte » — attendent, plutôt que de faire plier le format.

## L'agent qui l'alimente

C'est le point qui rend ce chantier intéressant au-delà du glossaire lui-même :
**c'est le seul contenu de NX qu'on peut confier à un agent**, parce que sa
source de vérité est le corpus du site.

La boucle, dans le vocabulaire de [`agents-autonomes.md`](./agents-autonomes.md)
: déclencheur, une fiche publiée ; outils, le dépôt et la requête d'extraction
ci-dessus ; **garde-fou, une pull request** ; trace, la PR elle-même. L'agent
repère les termes nouvellement au-dessus du seuil, propose une entrée conforme
au schéma, et ne touche à rien d'autre.

Il vient après `tags-audit`, qui est aujourd'hui le seul agent dont la doctrine
est écrite. C'est un bon deuxième : le format est contraint, le schéma rattrape
les dérives, et une entrée ratée coûte une relecture, pas une correction en
production.

## Ce qui reste à trancher

- **La polysémie** : confirmer l'option 3 ci-dessus avant la première entrée.
- **Le seuil d'entrée.** Trois contenus est un choix, pas une loi. Deux
  ouvrirait la porte à une trentaine de termes de plus.
- **Le marquage dans le Markdown.** Un lien ordinaire
  `[conteneur](/glossaire/conteneur)` écrit à la main, ou une détection
  automatique des termes au build ? L'automatique est séduisant et devient vite
  illisible — un texte où un mot sur dix est lié. Recommandation : à la main, et
  **une seule occurrence par page**, la première.
- **L'index `/glossaire`** : liste alphabétique simple, ou groupée par série ?
- **Si le glossaire passe avant ou après la recherche**, qui est cadrée dans
  [`roadmap-produit.md`](./roadmap-produit.md) et dont le rapport valeur /
  effort est meilleur.
