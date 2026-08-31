---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment déployer un conteneur Docker sur Scaleway ?"
description:
  "La mise en pratique des six étapes du déploiement, chez Scaleway, avec
  Serverless Containers et la CLI scw : registry, autorisation, création du
  conteneur, variables d'environnement, healthcheck et mise à l'échelle à zéro."

imgAlt:
  Un conteneur maritime posé sur un quai bordé de bornes lumineuses, une fusée
  de signalisation au-dessus, pixel art
imgSrc: /images/cheatsheets/deployer-conteneur-docker-sur-scaleway.webp

author: Thomas Dimnet
kind: Fiche technique
serie: cloud
tags:
  - Cloud
  - Docker
  - Production
level: Intermédiaire
publishedDate: 11/18/2026

faq:
  - question: Comment déployer un conteneur Docker sur Scaleway ?
    answer:
      "Poussez votre image sur un namespace Container Registry, créez un
      namespace Serverless Containers dans le même projet, puis créez le
      conteneur avec scw container container create en lui donnant l'adresse de
      l'image, le port et ses variables d'environnement. Le déploiement part
      automatiquement à la création."
  - question:
      Faut-il configurer des identifiants pour que Scaleway lise mon image
      privée ?
    answer:
      "Non, tant que le namespace Container Registry et le conteneur sont dans
      le même projet Scaleway : la lecture est implicite, il n'y a rien à
      configurer. En revanche, un registry externe privé n'est pas pris en
      charge — seuls les registries externes publics le sont."
  - question: Un conteneur Scaleway peut-il descendre à zéro instance ?
    answer:
      "Oui, c'est le réglage min-scale=0, et c'est même la valeur par défaut.
      Vous ne payez rien quand personne ne vient, au prix d'un démarrage à froid
      pour le premier visiteur. Pour une page vue par des clients, min-scale=1
      est souvent le meilleur arbitrage."

howTo:
  name: Déployer un conteneur Docker sur Scaleway Serverless Containers
  steps:
    - name: Publier l'image sur un registry
      text:
        Créez un namespace Container Registry, authentifiez-vous avec scw
        registry login, puis étiquetez et poussez l'image.
    - name: Autoriser le service à lire l'image
      text:
        Placez le namespace de conteneurs dans le même projet que le namespace
        du registry, ce qui rend la lecture implicite.
    - name: Créer le service à partir de l'image
      text:
        Créez un namespace de conteneurs, puis le conteneur avec son adresse
        d'image, son port, son processeur et sa mémoire.
    - name: Déclarer les variables d'environnement
      text:
        Passez la configuration ordinaire en environment-variables et les
        valeurs sensibles en secret-environment-variables.
    - name: Brancher un healthcheck
      text:
        Déclarez la route de santé de votre application avec
        health-check.http.path pour que la plateforme distingue un conteneur
        démarré d'un conteneur prêt.
    - name: Vérifier et régler la mise à l'échelle
      text:
        Lisez les journaux du premier démarrage, puis fixez min-scale et
        max-scale pour arbitrer entre coût, réactivité et facture.
---

[La fiche précédente](/drafts/deployer-conteneur-docker-dans-le-cloud) déroulait
six étapes pour faire tourner une image dans le cloud, sans jamais nommer de
fournisseur. C'était voulu : les noms changent d'un service à l'autre, les
étapes non.

On passe à la pratique. **Les six mêmes étapes, dans le même ordre, chez
Scaleway**, avec Serverless Containers et la ligne de commande. La fiche
suivante fera exactement le même parcours
[chez AWS](/drafts/deployer-conteneur-docker-sur-aws) : vous pourrez comparer
étape par étape.

<br>

Une précision d'usage : **je travaille chez Scaleway**. J'ai écrit les deux
fiches de la même main et avec les mêmes réserves, mais autant que vous le
sachiez en lisant celle-ci.

<br>

Ce qu'il vous faut pour suivre : une image déjà construite, un compte Scaleway,
et la CLI `scw` installée puis configurée avec `scw init`. Les exemples
utilisent la région `fr-par` ; les autres régions se déduisent en changeant le
préfixe.

---

## Étape 1 - Publier l'image sur un registry

Scaleway a son propre registry, Container Registry, et c'est le chemin le plus
court : l'authentification est intégrée à la CLI et le transfert vers le
conteneur reste interne.

<br>

Un namespace, d'abord. C'est l'équivalent d'un compte d'organisation sur Docker
Hub : il regroupe vos images et il est **privé par défaut**, ce qui est le bon
réglage.

```bash
# Créer le namespace qui hébergera vos images
scw registry namespace create name=nx-demo
```

<br>

Ensuite l'authentification. La CLI sait piloter Docker toute seule :

```bash
scw registry login
```

<br>

Cette commande n'existe pas dans votre CI, où vous n'aurez pas de session `scw`
interactive. La forme longue, celle à mettre dans un workflow, est celle-ci :

```bash
docker login rg.fr-par.scw.cloud/nx-demo \
  -u nologin --password-stdin <<< "$SCW_SECRET_KEY"
```

Le nom d'utilisateur est littéralement `nologin` — ce n'est pas un exemple à
remplacer, c'est la valeur attendue. Seule la clé secrète compte, et elle se
range dans les secrets de votre forge, comme on l'a vu dans
[la fiche sur les secrets GitHub Actions](/fiches/gerer-secrets-github-actions).

<br>

Reste à étiqueter et à pousser. **Avec un numéro de version, jamais `latest`** :

```bash
docker tag mon-api:1.4.0 rg.fr-par.scw.cloud/nx-demo/mon-api:1.4.0
docker push rg.fr-par.scw.cloud/nx-demo/mon-api:1.4.0
```

---

## Étape 2 - Autoriser le service à lire l'image

C'est l'étape où la fiche précédente vous mettait en garde : le droit de lecture
oublié est la cause numéro un des premiers déploiements qui échouent.

<br>

Chez Scaleway, il n'y a **rien à faire**. Tant que le namespace du registry et
le namespace de conteneurs vivent dans le même projet, la lecture est
implicite : pas de compte de service à créer, pas de jeton à ranger quelque
part, pas de politique à écrire. C'est le genre de non-étape qu'on remarque
surtout après avoir fait la même chose ailleurs.

<br>

Deux limites à connaître quand même, parce qu'elles se découvrent mal :

- **un registry dans un autre projet ne marche pas** de cette façon. Si vous
  cloisonnez vos projets, gardez le registry et le conteneur du même côté ;
- **un registry externe privé n'est pas pris en charge.** Les registries
  externes publics, oui — Docker Hub et les autres. Mais un dépôt privé chez une
  autre forge ne peut pas être lu directement, et c'est un vrai point
  d'arbitrage si vous vouliez rester portable entre fournisseurs.

---

## Étape 3 - Créer le service à partir de l'image

Deux commandes. Un namespace pour ranger, puis le conteneur lui-même.

```bash
scw container namespace create name=nx-demo
```

<br>

La sortie vous donne un identifiant de namespace, dont la commande suivante a
besoin :

```bash
scw container container create \
  name=mon-api \
  namespace-id=<ID_DU_NAMESPACE> \
  registry-image=rg.fr-par.scw.cloud/nx-demo/mon-api:1.4.0 \
  port=8080 \
  cpu-limit=500 \
  memory-limit=512 \
  privacy=public
```

<br>

Quelques mots sur ces valeurs, parce que ce sont exactement les arbitrages de la
fiche précédente :

- **`cpu-limit` est en mvCPU**, pas en cœurs : `500` vaut un demi-processeur
  virtuel. `memory-limit` est en mégaoctets. C'est le « partez petit » de la
  fiche précédente, traduit en chiffres ;
- **`port` doit être celui sur lequel votre application écoute vraiment.** Le
  `EXPOSE` de votre Dockerfile ne compte pas, il est documentaire. Et votre
  application doit écouter sur `0.0.0.0`, pas sur `127.0.0.1` ;
- **`privacy=public`** rend le conteneur joignable sans jeton. En `private`, il
  faudra présenter un jeton à chaque appel — utile pour un service interne.

<br>

Un détail qui surprend la première fois : **la création déclenche le
déploiement**. L'argument `deploy` vaut `true` par défaut. La commande
`scw container container deploy` existe, mais elle sert à redéployer après
modification, pas à finir le travail.

---

## Étape 4 - Déclarer les variables d'environnement

Le tri de la fiche précédente — configuration ordinaire d'un côté, secrets de
l'autre — se traduit ici par deux arguments distincts.

```bash
scw container container update <ID_DU_CONTENEUR> \
  environment-variables.LOG_LEVEL=info \
  environment-variables.APP_ENV=production \
  secret-environment-variables.0.key=DATABASE_URL \
  secret-environment-variables.0.value="postgres://..."
```

<br>

Notez l'asymétrie de syntaxe, elle fait trébucher tout le monde :
**`environment-variables` se suffixe du nom de la variable**, tandis que
**`secret-environment-variables` s'indexe** — `.0.key` puis `.0.value`, `.1.key`
puis `.1.value`, et ainsi de suite.

<br>

Ce qui change entre les deux : les secrets ne sont plus jamais relus après
écriture. Ils restent modifiables, mais la console et la CLI ne vous les
remontreront pas. C'est le comportement souhaitable, et c'est aussi pourquoi
votre gestionnaire de mots de passe reste la source de vérité.

<br>

Les deux points de vigilance de la fiche précédente valent tels quels ici :
**une variable oubliée ne se voit souvent qu'au premier appel**, pas au
démarrage, et **changer une variable impose un redéploiement** — le conteneur
lit son environnement au démarrage, jamais ensuite.

---

## Étape 5 - Brancher un healthcheck

Sans healthcheck, la plateforme sait que votre processus est lancé. Pas qu'il
est prêt. La configuration tient en trois arguments :

```bash
scw container container update <ID_DU_CONTENEUR> \
  health-check.http.path=/health \
  health-check.interval=10s \
  health-check.failure-threshold=3
```

<br>

Ce que vous déclarez là, c'est la route dédiée dont parlait la fiche
précédente : rapide, honnête — si l'application ne sait pas fonctionner sans sa
base, elle doit vérifier que la base répond — et silencieuse dans les journaux.

<br>

`failure-threshold` mérite une seconde de réflexion. À `3`, avec un intervalle
de dix secondes, un conteneur en vrille est remplacé au bout d'une trentaine de
secondes. Descendre à `1` rend la plateforme nerveuse : un pic de latence suffit
alors à faire redémarrer un conteneur qui allait très bien.

---

## Étape 6 - Vérifier, puis borner la mise à l'échelle

D'abord les journaux du premier démarrage. C'est là que se voient la variable
manquante et le port mal déclaré, et ça vaut vraiment les deux minutes :

```bash
scw container container get <ID_DU_CONTENEUR>
```

Le champ `status` doit être `ready`, et `error_message` vide. S'il ne l'est pas,
la réponse est presque toujours dans les étapes 3 et 4.

<br>

Vient ensuite le réglage à ne pas remettre à plus tard :

```bash
scw container container update <ID_DU_CONTENEUR> \
  min-scale=0 \
  max-scale=5
```

<br>

**`min-scale=0` est le défaut, et c'est une vraie particularité.** À zéro, vous
ne payez rien quand personne ne vient, mais le premier visiteur attend le
démarrage à froid. Parfait pour un environnement de test, discutable pour une
page vue par des clients — auquel cas `min-scale=1` coûte le prix d'une instance
qui tourne en permanence, et vous rend ces secondes.

<br>

**`max-scale` est votre garde-fou de facture.** Sans plafond, une montée de
trafic se traduit directement en euros. Mettez-le dès le premier déploiement,
même large : c'est le même réflexe que l'alerte de budget de
[la fiche sur le cloud public](/fiches/comprendre-le-cloud-public).

---

## Astuce bonus - Le même parcours dans la console

Tout ce qui précède se fait aussi à la souris, et pour un premier déploiement
c'est souvent plus confortable : la console pose les mêmes questions dans le
même ordre, avec les valeurs par défaut déjà remplies.

<br>

Mon conseil quand même, et il vaut au-delà de Scaleway : **faites-le une fois à
la console pour comprendre, puis passez à la CLI pour de bon**. Un déploiement
cliqué ne se rejoue pas, ne se relit pas en revue et ne se met pas dans un
workflow. Les commandes ci-dessus, si.

<!-- Screencast à tourner : le même parcours dans la console Scaleway.
     Pas de composant vidéo dans les fiches aujourd'hui — voir
     docs/cluster-cloud-pratique.md, section « Chantier connexe ». -->

<hr>

Et voilà, votre image tourne chez Scaleway ! Pour résumer en une phrase :
**poussez l'image sur un namespace du registry, créez le conteneur dans le même
projet avec son port et ses variables, déclarez sa route de santé, puis bornez
la mise à l'échelle des deux côtés**.

L'étape 2 aura été la plus courte de toutes — rien à faire. Gardez-la en tête :
c'est exactement celle qui occupe le plus de place dans
[la fiche AWS](/drafts/deployer-conteneur-docker-sur-aws), et la comparaison est
instructive.

D'ici là, je vous invite :

- [à relire la fiche sur le déploiement dans le cloud](/drafts/deployer-conteneur-docker-dans-le-cloud)
  si vous voulez le raisonnement derrière les six étapes ;
- [à (re)commencer le cours sur les GitHub Actions](/cours/ci-cd-github-actions/)
  pour que la construction de l'image parte d'un workflow plutôt que de votre
  machine.

## Ressources

- [Déployer un conteneur avec la CLI (Scaleway)](https://www.scaleway.com/en/docs/serverless-containers/api-cli/deploy-container-cli/)
- [La référence de `scw container` (Scaleway)](https://cli.scaleway.com/container/)
- [Container Registry, pousser et récupérer une image (Scaleway)](https://www.scaleway.com/en/docs/container-registry/api-cli/push-pull-container-images/)
- [Le glossaire Cloud Native de la CNCF, en français](https://glossary.cncf.io/fr/)
