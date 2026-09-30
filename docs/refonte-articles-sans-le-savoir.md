# Refonte des deux articles « sans le savoir »

> Cadrage (pré-réécriture). Les deux brouillons
> [`ai-native-engineering-sans-le-savoir`](../src/pages/drafts/ai-native-engineering-sans-le-savoir.md)
> et
> [`harness-engineering-sans-le-savoir`](../src/pages/drafts/harness-engineering-sans-le-savoir.md)
> ont un bon hook et une bonne idée chacun, mais ils racontent plus qu'ils
> n'enseignent. Diagnostic passé à la grille du skill `pedagogie-nx`. Rédigé le
> 30 septembre 2026, **rien n'est réécrit tant que Thomas n'a pas validé les
> plans**.

## Le constat commun

**Le hook des deux articles est exactement le geste pédagogique de Thomas, mais
il est appliqué à l'auteur et pas au lecteur.**

Dans le cours Docker : « Vous venez, **sans le savoir**, de builder votre
image. » Le lecteur a fait, et le mot vient se poser sur ce qu'il a fait. Dans
les deux articles, c'est Thomas qui découvre qu'il fait de l'AI-native ou du
harness engineering. Le lecteur, lui, regarde quelqu'un découvrir. Il ne
découvre rien.

La refonte tient donc en une phrase : **retourner le « sans le savoir » vers le
lecteur.** Qu'à la fin de la première section, ce soit lui qui se rende compte
qu'il en fait déjà (ou qu'il n'en fait pas, et où ça coince).

Les autres manques sont communs aux deux textes :

| Grille `pedagogie-nx`                | AI-native                                | Harness                                        |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------------- |
| 1. Le problème avant la définition   | Non — « Ce que le mot veut dire » ouvre  | Non — « D'où vient le mot » ouvre              |
| 2. Le lecteur fait quelque chose     | Non                                      | Non                                            |
| 3. Les artefacts sont montrés        | Un seul (le commit du 12 août)           | Les lignes du `CLAUDE.md` oui, le test **non** |
| 5. L'ordre suit le besoin du lecteur | Non — « Ce que j'ai fait, dans l'ordre » | Non — un inventaire, le concept clé en 3e      |
| 6. Un outil de pensée réutilisable   | Trois, aucun transformé en exercice      | Un excellent, pas transformé en grille         |
| 7. Un geste concret pour finir       | Un conseil en une ligne, sans méthode    | Une belle chute, pas de geste                  |
| 8. Les faits sont encore vrais       | Non — voir plus bas                      | À préciser — voir plus bas                     |

Et un recouvrement : `CLAUDE.md`, skills, PR et CI apparaissent dans les deux.
Il faut une frontière nette, et la dire dans le texte.

- **AI-native** = **qui fait quoi**. La répartition des rôles, les chemins
  d'écriture, le goulot qui se déplace.
- **Harness** = **comment la machine tient**. Dire ou empêcher, et comment une
  règle monte de l'un à l'autre.

Le premier renvoie explicitement au second pour « les fichiers, les tests, la
mécanique ». Le second ne reparle pas des PR.

---

## Article 1 — l'AI-native engineering

### Ce qui marche, et qu'on garde

- Monsieur Jourdain. C'est le bon hook.
- La distinction **assisté / natif**, courte et juste.
- **« Le niveau d'autonomie que je laisse à un agent se déduit du chemin par
  lequel il écrit. »** C'est la meilleure idée de l'article, et elle est
  réutilisable par n'importe qui. Aujourd'hui elle est au milieu d'un
  paragraphe, en gras, et on passe à autre chose.
- **« L'IA a accéléré ce qui n'était pas mon goulot d'étranglement. »** Idem.
- Le commit « *I push on Main without a PR, yeah, cool…* ». Seul artefact
  montré, et c'est celui qui marque.
- La dernière phrase sur le goût. (Elle a d'ailleurs trouvé une suite : le skill
  `pedagogie-nx` est une tentative de l'écrire. Ça peut faire une note en bas de
  l'article, ou un troisième billet.)

### Ce qui manque

1. **La définition arrive avant le problème.** Le lecteur lit une définition de
   cabinet de conseil avant d'avoir une raison de s'y intéresser.
2. **L'analogie du conteneur est la bonne, et elle tient en trois phrases.**
   C'est pourtant exactement le lecteur du cluster IA (« quelqu'un qui sait déjà
   déployer un conteneur »). Et elle porte beaucoup plus que ça, voir le plan.
3. **L'ordre est la chronologie de NX**, pas un chemin pour le lecteur. Quatre
   anecdotes, dont le lecteur doit tirer seul la leçon.
4. **Rien n'est montré.** Le dossier `docs/`, la section « Ce que ce cluster
   n'écrit pas », la phrase « proposer avant d'écrire » du skill changelog :
   tout est décrit, alors que chaque extrait tient en quatre lignes.
5. **La fin donne un conseil sans méthode.** « Regardez où vous avez déjà des
   garde-fous » : comment, concrètement ?
6. **Fait périmé** : « Le dossier `docs/` contient aujourd'hui neuf fichiers et
   un peu plus de deux mille lignes. » Au 30 septembre, douze fichiers et plus
   de trois mille lignes, et ça va continuer de bouger d'ici décembre. Soit
   dater (« au 14 septembre »), soit ne pas chiffrer.

### Plan proposé

**Ouverture** (courte, gardée). Monsieur Jourdain, puis on retourne la question
:

> Avant de vous dire ce que le mot veut dire, trois questions. Répondez pour
> vous, oui ou non.
>
> - Avez-vous déjà écrit un fichier pour expliquer votre projet à un assistant ?
> - Avez-vous déjà refusé qu'un agent pousse sans passer par la CI ?
> - Vous arrive-t-il de noter une décision pour ne pas avoir à la rediscuter ?
>
> Si vous avez répondu oui une fois, vous en faites un peu. Deux fois, vous en
> faites sans le savoir, comme moi.

Ces trois questions existent déjà, dans la conclusion. Elles sont juste au
mauvais endroit.

**1. Le mot, par l'analogie du conteneur, développée.** Le terme est calqué sur
_cloud-native_, et c'est la meilleure façon de le comprendre :

| Conteneurs                                         | IA                                                          |
| -------------------------------------------------- | ----------------------------------------------------------- |
| _Lift and shift_ : l'appli telle quelle, conteneur | **Assisté** : même façon de travailler, un outil en plus    |
| _Cloud-native_ : l'appli pensée pour le conteneur  | **Natif** : le travail pensé pour qu'un modèle en fasse     |
| Un conteneur est éphémère, sans état               | Un agent arrive à chaque session sans mémoire               |
| L'état sort du conteneur : volume, base            | Le savoir sort de la tête : `docs/`, `CLAUDE.md`, tests     |
| Un conteneur ne demande pas, il lit sa config      | Un agent n'a pas le « non, pas comme ça » de la revue orale |

La ligne qui fait tout comprendre : **ce qui n'est pas écrit n'existe pas, comme
ce qui n'est pas dans un volume disparaît au redémarrage.** Puis on lâche
l'analogie.

**2. Trois déplacements**, au lieu de quatre anecdotes chronologiques. Chacun
suit la même unité : l'extrait NX montré, puis la question que le lecteur se
pose chez lui.

- **Le savoir passe de la tête au dépôt.** Montrer les quatre lignes de « Ce que
  ce cluster n'écrit pas » de [cluster-ia.md](./cluster-ia.md), et une décision
  datée « *Arbitré le 14/09/2026* ». Question au lecteur : quelle règle de votre
  projet n'existe qu'à l'oral ?
- **L'autonomie se déduit du chemin d'écriture.** C'est ici que l'idée devient
  un outil. Un tableau :

  | Chemin d'écriture sur NX | Ce qui vérifie au passage                    | Autonomie laissée à un agent |
  | ------------------------ | -------------------------------------------- | ---------------------------- |
  | PR vers `main`           | Prettier, tests, `astro check`, ma relecture | Large : il écrit, je relis   |
  | Serveur MCP → Turso      | Rien                                         | Il propose, je publie        |

  Puis l'exercice : **listez les chemins par lesquels quelque chose arrive en
  production chez vous, et ce qui vérifie sur chacun.** L'autonomie à donner se
  lit dans la dernière colonne.

- **Le métier passe d'écrire à cadrer, arbitrer, relire.** Montrer la phrase du
  skill changelog (« Toujours proposer d'abord, Thomas valide avant écriture »).

**3. Ce que le mot ne dit pas.** On garde les trois constats, dans cet ordre :

- **le goulot se déplace** — et on en fait une question : « chez vous, qu'est-ce
  qui attend quand le code n'attend plus ? » (sur NX, les images) ;
- **ça ne tient que si on s'y tient** — le commit du 12 août, montré tel quel ;
- **le vrai changement n'est pas technique** — et la phrase sur le goût.

**4. Rendre la main.** Un geste unique, tiré de l'exercice du tableau :

> Prenez le chemin d'écriture de votre projet qui a déjà le plus de garde-fous.
> Laissez l'IA écrire là, et seulement là, pendant un mois. Le reste suit.

Puis le renvoi vers l'article harness pour la mécanique, et vers
`profils-ia-developpeur` (le « vape coder »), comme aujourd'hui.

---

## Article 2 — le harness engineering

### Ce qui marche, et qu'on garde

- Le cheval de trait : **il ne rend pas le cheval plus fort, il permet de
  diriger sa force.** Bonne analogie, à pousser un peu plus loin (voir plan).
- **Agent = modèle + harnais.**
- Les lignes du `CLAUDE.md` citées, chacune née d'une erreur. C'est le seul
  endroit des deux articles où l'artefact est montré, et ça se sent.
- **Dire ou empêcher. Probabiliste ou déterministe.** C'est le concept de
  l'article, et c'est un vrai outil de pensée.
- « Le trou que j'ai trouvé en écrivant. » L'intention est parfaite.
- La chute : « un modèle ne s'améliore pas d'une session à l'autre. Le harnais,
  si. »

### Ce qui manque

1. **L'étymologie avant le problème.** « D'où vient le mot » ouvre l'article.
2. **Le concept clé arrive en troisième sous-section**, comme une remarque.
   « Dire ou empêcher » devrait être la colonne vertébrale : c'est la grille
   avec laquelle on relit tout le reste.
3. **Le passage le plus feignant des deux articles** : « La correction est un
   test d'une vingtaine de lignes […]. Je l'ajoute à la liste. Il aurait fallu
   l'écrire la première fois. » L'article décrit le trou, dit qu'il faudrait le
   boucher, et ne le bouche pas. C'est pourtant l'exemple travaillé idéal : on
   part d'une règle « dite », on la fait monter en règle « empêchée », sous les
   yeux du lecteur.
4. **Le test « Garde-fou sur le miroir » est paraphrasé.** Il est dans
   `src/lib/db/schema.test.ts`, ligne 43. Le montrer.
5. **Le lecteur ne fait rien.** Or l'exercice est évident : prendre son propre
   fichier d'instructions et classer chaque ligne.
6. **Faits à vérifier avant publication.**
   - Hashimoto est cofondateur d'HashiCorp ; « le créateur de Terraform » est un
     raccourci courant, « cofondateur d'HashiCorp (Terraform, Vagrant) » est
     plus juste.
   - Son billet distingue lui-même deux formes de harnais : les instructions
     implicites (`AGENTS.md`) et les outils programmés (scripts, tests filtrés).
     C'est déjà presque « dire ou empêcher ». L'article dit « une distinction
     que je n'avais pas formulée avant de lire sur le sujet » : c'est honnête,
     mais autant créditer la source précisément.
   - « Dans les semaines qui ont suivi, OpenAI et Anthropic ont publié leurs
     propres articles » : l'ordre chronologique est à revérifier, au moins un
     des deux textes pourrait être antérieur au billet de Hashimoto.

### Ce qu'on a trouvé en préparant ce cadrage

C'est le meilleur matériau de l'article, et il est réel.

L'article propose un test qui échoue « si un lien pointe vers un slug qui
n'existe que dans `src/pages/drafts/` ». En le prototypant le 30 septembre (un
script de vingt lignes qui vérifie que chaque lien interne des pages publiées
pointe vers une page existante), voilà ce qui sort :

```
src/pages/fiches/deployer-conteneur-docker-dans-le-cloud.md → /drafts/iaas-paas-saas   (×2)
src/pages/fiches/iaas-paas-saas.md → /drafts/deployer-conteneur-docker-dans-le-cloud
src/pages/articles/decouvrez-les-fiches-techniques.md → /fiches/comprendre-la-propriete-css-box-sizing   (×3)
```

- **Le cas que la règle du `CLAUDE.md` vise n'existe plus** : aucune page
  publiée ne pointe vers l'URL finale d'un brouillon.
- **Mais son miroir existe, en production** : deux fiches publiées en septembre
  pointent vers leur ancienne adresse `/drafts/…`, qui n'existe plus depuis leur
  publication. Même mécanisme, sens inverse.
- **Et un troisième cas, sans rapport avec les brouillons** : une fiche CSS
  citée trois fois qui n'existe pas.

**Le test décrit dans l'article n'aurait attrapé aucun des trois.** Il gardait
l'erreur qu'on avait notée, pas la classe d'erreur. Le bon test ne demande pas
« ce lien pointe-t-il vers un brouillon ? », il demande « ce lien mène-t-il
quelque part ? ».

C'est une leçon plus forte que celle de l'article actuel, et elle est à la
portée de n'importe quel lecteur : **un garde-fou qui vise l'instance d'une
erreur laisse passer ses cousines. Il faut viser la classe.**

> Ces 404 sont à corriger dans une PR à part, indépendamment de l'article. Voir
> [dette-editoriale.md](./dette-editoriale.md), où ils ne figurent pas encore.

### Plan proposé

**Ouverture : une scène d'erreur répétée.** Une vraie, datée : la deuxième fois
qu'un agent a fait la même bêtise sur NX. _À fournir par Thomas_ — bun,
`src/content/`, ou un lien de brouillon. Puis, tout de suite, l'exercice :

> Ouvrez votre `CLAUDE.md`, votre `AGENTS.md`, votre fichier de règles, peu
> importe son nom. Pour chaque ligne, une seule question : **si l'agent
> l'ignore, qu'est-ce qui l'arrête ?**

Le lecteur trouve deux familles de lignes. Rien ne les arrête, ou quelque chose
les arrête. On nomme ensuite : c'est son harnais.

**1. Le mot.** Maintenant seulement. Hashimoto, le cheval de trait, et
l'équation. L'analogie poussée d'un cran : **les rênes** (on indique, le cheval
peut ne pas suivre) et **les brancards** (la charrette ne peut physiquement pas
aller ailleurs). Ce sont exactement les deux familles que le lecteur vient de
trouver.

**2. Dire ou empêcher** — la colonne vertébrale. Le tableau des règles de NX,
classées :

| Règle du `CLAUDE.md` de NX              | Dite ou empêchée ?  | Par quoi                           |
| --------------------------------------- | ------------------- | ---------------------------------- |
| Lancer Prettier avant de pousser        | Empêchée            | `prettier:check` bloquant en CI    |
| Les types doivent passer                | Empêchée            | `astro check` dans `npm run build` |
| Le miroir du schéma suit les migrations | Empêchée            | `src/lib/db/schema.test.ts`        |
| npm uniquement, ni bun ni yarn          | Dite                | —                                  |
| Ne jamais lier un brouillon par son URL | Dite                | — (voir section 3)                 |
| Ne jamais renommer un contenu publié    | Dite                | —                                  |
| Proposer le changelog avant d'écrire    | Dite, et c'est bien | Un jugement, pas une vérification  |

À faire vérifier par Thomas ligne par ligne avant publication. La dernière ligne
compte : **tout ne doit pas monter.** Le ton, le goût, l'arbitrage restent dans
« dire », dans des skills, et c'est leur place.

Puis le principe, qu'on garde : probabiliste contre déterministe, et « tout ce
qui compte vraiment doit finir, tôt ou tard, dans la seconde catégorie ».

**3. Faire monter une règle, sous vos yeux** — l'exemple travaillé. En cinq
temps, chacun montré :

1. la règle, dite (la ligne du `CLAUDE.md`) ;
2. l'erreur qui revient quand même (le 404 d'août, via la dette éditoriale) ;
3. le test naïf, qui vise cette erreur-là ;
4. on l'élargit à la classe (« chaque lien interne mène quelque part »), on le
   lance, **et il échoue sur trois choses qu'on ne cherchait pas** — la sortie
   du terminal, montrée telle quelle ;
5. on corrige, le test passe, il est dans la CI.

Le test complet est dans l'article : une vingtaine de lignes, comme promis.

**4. Ce que ça change, au fond** — gardé presque tel quel (le nouveau
développeur une fois par an, l'agent à chaque session).

**5. Rendre la main.**

> Reprenez votre liste de tout à l'heure. Choisissez la ligne « dite » qui a
> déjà été ignorée deux fois. Écrivez le test qui l'empêche, et faites-le viser
> la classe d'erreur, pas l'erreur. Une seule ligne, cette semaine.

Chute inchangée : **un modèle ne s'améliore pas d'une session à l'autre. Le
harnais, si.**

---

## Ordre de travail proposé

1. Thomas valide (ou corrige) les deux plans et la frontière entre les articles.
2. PR séparée : corriger les six liens cassés, puis ajouter le test de liens
   internes dans `src/utils/` avec son test colocalisé. L'article pourra alors
   citer un test qui existe vraiment et qui est vert.
3. Réécriture de l'article harness d'abord (il dépend du test), puis de
   l'article AI-native.
4. Relecture à la grille `pedagogie-nx`, puis `typo-francaise`.
5. Les corrections de Thomas pendant la relecture vont dans
   `.claude/skills/pedagogie-nx/references/passages-temoins.md`, rubrique
   « Corrections ».
