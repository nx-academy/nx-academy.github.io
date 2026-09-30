# Passages témoins

Des extraits réels, recopiés (coquilles corrigées), avec ce qu'ils montrent. Ils
valent plus que les règles de `SKILL.md` : quand une règle et un passage
semblent se contredire, c'est le passage qui a raison.

## Enseigner

### Le problème avant la définition — `/methode`

> Et chaque pattern suit exactement la même unité. Un problème concret d'abord —
> pas la définition. Sur l'Adapter, par exemple : une API de filtrage à migrer
> vers une version plus rapide qui ne s'utilise pas de la même façon. Le pattern
> vient répondre à ce problème, pas l'inverse. Puis on le code. Vraiment,
> soi-même, avant de voir la solution.

La règle est énoncée par Thomas lui-même. Elle s'applique à tous les formats, y
compris aux articles qui expliquent un terme.

### Avant le vocabulaire, l'image — fiche `iaas-paas-saas`

> Avant le vocabulaire, l'image. Bon, ok, elle est un peu éculée dans le milieu,
> mais elle marche tellement bien que ce serait dommage de s'en priver.

Puis quatre correspondances (tout à la maison, surgelée, livraison, restaurant),
et la phrase qui dit ce que l'image enseigne vraiment :

> Ce qui compte dans cette image, ce n'est pas la pizza. C'est que **la liste de
> ce que vous fournissez raccourcit à chaque étape** et que celle de ce que vous
> contrôlez raccourcit exactement au même rythme.

L'analogie est développée, puis explicitement lâchée pour garder l'idée.

### Faire avant de nommer — cours Docker, « Créez votre premier Dockerfile »

> Je vais maintenant vous demander de lancer deux commandes. Pas d'inquiétude,
> je vous expliquerai juste après ce qu'elles font.

puis, une fois la commande lancée :

> Vous devriez normalement voir s'afficher dans votre console _hello, world_.
> **Vous venez, sans le savoir, de builder votre image Docker à partir d'un
> Dockerfile**.

« Sans le savoir » est le cœur du geste : le lecteur fait, puis on nomme ce
qu'il vient de faire.

### Dire ce qu'on laisse dehors — même chapitre et `/methode`

> Dans ce chapitre, on va se concentrer sur les instructions `FROM`, `ADD`,
> `COPY` et `CMD`.

> Les networks viendront — dans trois semaines, le jour où on aura un vrai
> problème qu'ils résolvent. Les donner tout de suite, ce n'est pas être
> généreux. C'est noyer.

### Rassurer sur le rythme — même chapitre

> Bon, ça fait pas mal de choses ! Si vous voyez que tout ne rentre pas du
> premier coup, je vous invite à revenir sur ce chapitre dans quelques jours ou
> après avoir pratiqué un peu.

### Une grille de décision — fiche `iaas-paas-saas`

> La question n'est pas « quel modèle est le meilleur ? » mais **« quelle est la
> couche la plus haute qui accepte mon besoin ? »**. On part du haut, on descend
> jusqu'à ce que ça passe.

Un outil de pensée réutilisable : le lecteur repart avec une méthode, pas avec
un classement.

### Une seule porte d'entrée — article `devops-affaire-de-chaque-developpeur`

> Quatre briques, mais une seule porte d'entrée. Prenez l'iso-prod au sérieux,
> et les trois autres suivent — dans l'ordre, au moment où vous en avez besoin.

Même dans un article de réflexion, la liste est ordonnée par le besoin et se
termine sur un geste unique.

## Écrire

### L'ouverture est une scène — `ne-plus-se-dedoubler`

> L'autre soir, il était tard et j'avançais sur trois choses à la fois : une
> page de NX, un cluster d'articles sur Docker et la réflexion qui a fini par
> donner ce texte.

### L'erreur d'abord, sans juger — `devops-affaire-de-chaque-developpeur`

> Je ne le juge pas. J'ai été exactement à sa place. À mes débuts, je poussais
> direct en prod. Mes réflexes ne sont pas tombés du ciel, ils sont sortis de
> ces ratés-là.

### La chute qui retourne l'idée

> **Plus on va vite, plus la rigueur en amont compte. Pas moins.**

> **Le code qui use, ce n'était jamais vraiment le code. C'était de résoudre des
> problèmes qui ne comptaient pas.**

### Le rythme court — `/methode`

> La version exhaustive existe, et elle est tentante. […] Tout est vrai. Tout
> est utile. Un jour.
>
> Le problème est dans ce mot : un jour.

## Corrections

Les passages que Thomas a réécrits ou refusés, avec la version rejetée et la
version retenue. C'est la rubrique la plus utile du fichier, et elle est vide :
elle se remplit à chaque relecture. Format :

```
### <date> — <contenu concerné>

Rejeté : « … »
Retenu : « … »
Pourquoi : une phrase.
```
