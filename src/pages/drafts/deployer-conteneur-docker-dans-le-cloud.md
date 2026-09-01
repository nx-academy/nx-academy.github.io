---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment déployer un conteneur Docker dans le cloud ?"
description:
  "Votre image est sur un registry, il reste à la faire tourner. On déroule le
  déploiement d'un conteneur Docker sur un service managé : authentification au
  registry, variables d'environnement, port exposé, healthcheck, mise à
  l'échelle et coût à l'usage."

imgAlt:
  Un conteneur maritime soulevé par une grue et posé sur un socle lumineux au
  milieu d'un entrepôt de serveurs, pixel art
imgSrc: /images/cheatsheets/deployer-conteneur-docker-dans-le-cloud.webp

author: Thomas Dimnet
kind: Fiche technique
serie: cloud
tags:
  - Cloud
  - Docker
  - CI/CD
  - Production
level: Intermédiaire
publishedDate: 11/04/2026

faq:
  - question: Comment déployer un conteneur Docker dans le cloud ?
    answer:
      "En quatre temps : poussez votre image sur un registry, autorisez le
      service cloud à la lire, créez le service en lui donnant l'adresse de
      l'image, le port exposé et ses variables d'environnement, puis vérifiez
      que le healthcheck passe au vert avant d'envoyer du trafic dessus."
  - question:
      Faut-il un orchestrateur comme Kubernetes pour faire tourner un conteneur
      dans le cloud ?
    answer:
      "Non, et c'est rarement nécessaire au début. Tous les fournisseurs
      proposent un service managé de conteneurs qui prend une image et la fait
      tourner sans que vous ayez d'orchestrateur à installer ni à exploiter."
  - question: Pourquoi mon conteneur démarre en local mais pas dans le cloud ?
    answer:
      "Trois causes couvrent la grande majorité des cas : le service n'a pas le
      droit de lire l'image sur le registry, le port sur lequel l'application
      écoute n'est pas celui déclaré au service, ou une variable d'environnement
      présente dans votre fichier local manque côté cloud."

howTo:
  name: Déployer un conteneur Docker sur un service managé
  steps:
    - name: Publier l'image sur un registry
      text:
        Construisez l'image et poussez-la sur un registry accessible depuis
        Internet, avec une étiquette de version explicite plutôt que latest.
    - name: Autoriser le service à lire l'image
      text:
        Donnez au service cloud un accès en lecture au registry, par un compte
        de service dédié plutôt que par vos identifiants personnels.
    - name: Créer le service à partir de l'image
      text:
        Créez le service en lui indiquant l'adresse complète de l'image, la
        quantité de mémoire et de processeur allouée, et le port exposé.
    - name: Déclarer les variables d'environnement
      text:
        Reportez toutes les variables du fichier local, en rangeant les valeurs
        sensibles dans le gestionnaire de secrets du fournisseur.
    - name: Brancher un healthcheck
      text:
        Exposez une route de santé dans l'application et déclarez-la au service
        pour qu'il sache distinguer un conteneur démarré d'un conteneur prêt.
    - name: Vérifier et régler la mise à l'échelle
      text:
        Consultez les journaux du premier démarrage, puis fixez un nombre
        minimum et maximum d'instances pour borner la facture.
---

On arrive au moment que cette série prépare depuis le début. Vous savez
[construire une image Docker](/cours/docker-et-docker-compose/), vous savez
[la pousser sur un registry](/fiches/presentation-registry-docker/), vous savez
même
[le faire automatiquement depuis GitHub Actions](/fiches/deployer-image-docker-github-actions/).

Et dans [la fiche précédente](/drafts/iaas-paas-saas), on a vu qu'un service
managé de conteneurs occupait une place bien à lui : vous livrez une image, le
fournisseur s'occupe de la machine qui la fait tourner.

Il reste donc une seule chose à faire, et c'est celle dont on n'a jamais parlé :
**faire tourner cette image quelque part**.

Cette fiche déroule le chemin complet. Elle reste volontairement indépendante du
fournisseur : les noms changent d'un service à l'autre, les six étapes, non.

---

## Le point de départ : une image, pas un dépôt

Une précision qui évite beaucoup de confusion. Un service managé de conteneurs
ne va pas chercher votre code source. **Il va chercher une image**, déjà
construite, déjà rangée sur un registry.

<br>

Ça change deux choses par rapport à un hébergement classique :

- **la construction se fait ailleurs**, typiquement dans votre CI. Le cloud ne
  compile rien, il exécute ;
- **ce que vous déployez est exactement ce que vous avez testé**, à la version
  près, puisque c'est le même artefact qui passe de la CI au registry puis au
  service.

<br>

Un mot sur l'étiquette, tant qu'on y est. **Évitez `latest` en production.**
Elle ne dit pas ce qui tourne, elle rend les retours arrière pénibles et elle
transforme chaque redémarrage en surprise. Une étiquette de version — un numéro,
ou le hachage du commit — coûte une ligne dans votre workflow et vous fait
gagner des soirées entières.

---

## Étape 1 - Publier l'image sur un registry

Le registry doit être joignable depuis le service cloud. Deux options, et le
choix est plus structurant qu'il n'en a l'air.

<br>

**Le registry du fournisseur** — celui intégré à la plateforme où vous déployez.
C'est le chemin le plus court : l'authentification est souvent implicite, le
transfert reste interne, et il ne vous est donc pas facturé en sortie de
données.

<br>

**Un registry externe**, celui de votre forge par exemple. Plus pratique si vous
déployez chez plusieurs fournisseurs, mais chaque récupération d'image traverse
Internet, avec l'authentification et la latence que ça suppose.

<br>

Si vous avez déjà mis en place le workflow de la
[fiche sur le déploiement d'images depuis GitHub Actions](/fiches/deployer-image-docker-github-actions/),
vous êtes déjà à cette étape sans rien changer : il ne reste qu'à donner la main
au cloud sur ce registry.

---

## Étape 2 - Autoriser le service à lire l'image

C'est l'étape qu'on oublie, et c'est de loin la cause numéro un des premiers
déploiements qui échouent. Le service doit avoir **le droit de lire** votre
image. Un dépôt privé sans autorisation, ça donne un conteneur qui ne démarre
jamais et un message d'erreur qui parle de `pull access denied`.

<br>

Trois principes qui vous éviteront d'y revenir :

- **un compte de service dédié**, jamais vos identifiants personnels. Le jour où
  vous partez en vacances ou changez de mot de passe, la production ne doit pas
  s'arrêter avec vous ;
- **en lecture seule**. Le service qui exécute n'a aucune raison de pouvoir
  pousser une image ;
- **rangé dans le gestionnaire de secrets** du fournisseur, pas dans une
  variable d'environnement en clair.

<br>

Ces réflexes sont exactement ceux de la
[fiche sur la gestion des secrets dans GitHub Actions](/fiches/gerer-secrets-github-actions),
appliqués de l'autre côté de la chaîne.

---

## Étape 3 - Créer le service à partir de l'image

C'est le cœur de l'affaire, et c'est étonnamment court. Vous donnez au
fournisseur l'adresse complète de l'image, les ressources allouées et le port
exposé.

<br>

Sur les ressources, un ordre de grandeur utile : **partez petit**. Une
application web classique démarre très bien avec un demi-processeur virtuel et
512 Mo de mémoire. Vous augmenterez au vu des mesures, ce qui est infiniment
plus fiable que d'estimer à l'avance — et ça évite de payer pendant six mois une
machine dimensionnée pour un trafic qui n'est jamais venu.

<br>

Sur le port, une règle simple et deux erreurs classiques. La règle :
**l'application doit écouter sur l'interface `0.0.0.0`**, pas sur `127.0.0.1`.
Un service qui n'écoute que sur la boucle locale est injoignable depuis
l'extérieur du conteneur, et c'est le genre de détail qui ne se voit pas en
local.

<br>

Les deux erreurs :

- **déclarer un port différent de celui sur lequel l'application écoute
  vraiment**. Le `EXPOSE` du Dockerfile est documentaire, il n'ouvre rien : ce
  qui compte, c'est ce que dit votre code ;
- **coder le port en dur**. Beaucoup de services managés imposent leur propre
  port par une variable d'environnement. Lire cette variable avec une valeur de
  repli est une habitude qui rend votre image portable partout.

---

## Étape 4 - Déclarer les variables d'environnement

En local, votre fichier `.env` remplit ce rôle et vous n'y pensez plus. Dans le
cloud, il n'existe pas — et c'est très bien, il n'a jamais eu vocation à être
déployé.

<br>

Reprenez-le ligne par ligne et rangez chaque valeur dans l'une des deux
catégories :

- **la configuration ordinaire** — niveau de journalisation, nom de
  l'environnement, adresse d'un service tiers. Elle va dans les variables
  d'environnement du service, elle est lisible dans la console, ce n'est pas un
  problème ;
- **les secrets** — mots de passe de base, clés d'API, jetons. Ils vont dans le
  gestionnaire de secrets du fournisseur, qui les injecte au démarrage sans
  jamais les afficher.

<br>

Deux points de vigilance pendant qu'on y est. **Une variable oubliée ne se voit
souvent qu'au premier appel**, pas au démarrage : l'application se lance
tranquillement et casse à la première requête qui touche la base. Et **changer
une variable impose de redéployer** : le conteneur lit son environnement au
démarrage, il ne le relit jamais ensuite.

---

## Étape 5 - Brancher un healthcheck

Sans healthcheck, le service sait seulement que votre processus est lancé. Ce
n'est pas la même chose que **prêt à répondre**, et cette nuance coûte cher au
moment précis où on la découvre : pendant un déploiement.

<br>

Exposez une route dédiée — `/health` fait très bien l'affaire — qui répond un
code 200 quand l'application est réellement opérationnelle. Trois qualités pour
une bonne route de santé :

- **rapide**, quelques millisecondes, parce qu'elle sera appelée sans arrêt ;
- **honnête** : si l'application ne sait pas fonctionner sans sa base, la route
  doit vérifier que la base répond ;
- **silencieuse dans les journaux**, sous peine de noyer tout le reste.

<br>

Ce que vous y gagnez concrètement : le fournisseur n'envoie du trafic sur une
nouvelle version qu'une fois qu'elle a répondu vert, et il redémarre tout seul
un conteneur qui part en vrille. **C'est la différence entre un déploiement sans
coupure et une minute d'erreurs 502** à chaque mise en production.

---

## Étape 6 - Vérifier, puis borner la mise à l'échelle

Le premier démarrage se lit dans les journaux, et il faut vraiment prendre les
deux minutes nécessaires. C'est là que se voient la variable manquante, le port
mal déclaré et le droit de lecture oublié.

<br>

Une fois que ça tourne, il reste un réglage à ne pas remettre à plus tard :
**les bornes de la mise à l'échelle**.

<br>

Le nombre **minimum** d'instances arbitre entre coût et réactivité. À zéro, vous
ne payez rien quand personne ne vient, mais le premier visiteur attend le
démarrage à froid — quelques secondes, parfois plus. C'est parfait pour un
environnement de test, discutable pour une page vue par des clients.

<br>

Le nombre **maximum**, lui, est votre garde-fou de facture. Sans plafond, une
montée de trafic — un article qui marche, un robot un peu vif, une boucle dans
votre propre code — se traduit directement en euros. **Mettez un plafond dès le
premier déploiement**, même large. C'est le même réflexe que l'alerte de budget
dont on parlait dans
[la fiche sur le cloud public](/fiches/comprendre-le-cloud-public).

---

## Astuce bonus - Service managé ou orchestrateur ?

La question tombe toujours à ce moment-là : et Kubernetes dans tout ça ? Ou
[Docker Swarm](/fiches/decouvrir-docker-swarm), dont on a déjà parlé ?

<br>

La différence tient en une phrase. **Un service managé fait tourner vos
conteneurs, un orchestrateur vous donne les outils pour les faire tourner
vous-même.** Dans le premier cas, la couche de pilotage appartient au
fournisseur et ne vous demande rien. Dans le second, elle est à vous : à
configurer, à mettre à jour, à dépanner.

<br>

L'orchestrateur devient intéressant quand vous avez **beaucoup de services qui
se parlent**, des besoins de placement fins, ou l'intention de rester portable
entre plusieurs fournisseurs. En dessous d'une dizaine de services, il apporte
surtout de la complexité.

<br>

Mon conseil, et il vaut pour toute cette série : **commencez par le service
managé**. Votre image ne change pas, votre `Dockerfile` non plus — donc le jour
où l'orchestrateur devient justifié, la migration porte sur l'exploitation, pas
sur votre application. C'est très exactement ce que le conteneur vous a fait
gagner.

<hr>

Et voilà, votre image tourne ! Pour résumer en une phrase : **déployer un
conteneur dans le cloud, c'est publier une image, donner au service le droit de
la lire, lui décrire son port et ses variables, puis lui apprendre à savoir si
elle va bien**.

Cette fiche ferme la boucle ouverte il y a plusieurs mois avec Docker. Elle
reste volontairement sans fournisseur, alors les deux suivantes déroulent
exactement ces six étapes en ligne de commande, d'abord
[chez Scaleway](/drafts/deployer-conteneur-docker-sur-scaleway), ensuite
[chez AWS](/drafts/deployer-conteneur-docker-sur-aws). Lues côte à côte, elles
montrent où les fournisseurs se ressemblent — et où ils divergent vraiment.

Après quoi on quittera la technique pour les deux questions qu'on se pose juste
avant de signer :
[est-ce que le cloud coûte vraiment moins cher](/drafts/le-cloud-est-il-vraiment-moins-cher)
et [ce que veut dire « souverain »](/drafts/cloud-souverain). Restez dans le
coin 😉.

D'ici là, je vous invite :

- [à relire la fiche sur IaaS, PaaS et SaaS](/drafts/iaas-paas-saas) pour situer
  ce service managé dans la pile ;
- [à (re)commencer le cours sur les GitHub Actions](/cours/ci-cd-github-actions/)
  si la partie construction de l'image est encore manuelle chez vous.

## Ressources

- [Best practices for building containers (Google Cloud)](https://cloud.google.com/architecture/best-practices-for-building-containers)
- [Amazon ECS, la documentation d'AWS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [La référence du Dockerfile (Docker)](https://docs.docker.com/reference/dockerfile/)
- [Le glossaire Cloud Native de la CNCF, en français](https://glossary.cncf.io/fr/)
