---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Qu'est-ce que le cloud public ?"
description:
  "Comprenez ce qu'est vraiment le cloud public : mutualisation, libre-service,
  élasticité et facturation à l'usage. Les cinq caractéristiques du NIST sans le
  jargon, le vocabulaire de base (région, zone de disponibilité, instance,
  stockage objet) et les limites à connaître avant de déployer."

imgAlt:
  Un immense entrepôt de serveurs vu de l'intérieur, avec un petit conteneur
  posé sur un chariot, pixel art
imgSrc: /images/cheatsheets/comprendre-le-cloud-public.webp

author: Thomas Dimnet
kind: Fiche technique
serie: cloud
tags:
  - Cloud
  - Production
level: Débutant
publishedDate: 08/05/2026

faq:
  - question: Qu'est-ce que le cloud public ?
    answer:
      "Le cloud public, c'est de la puissance de calcul, du stockage et des
      services réseau loués à la demande chez un fournisseur, sur une
      infrastructure mutualisée entre tous ses clients. Vous ne possédez aucune
      machine : vous payez ce que vous consommez, à la seconde ou au gigaoctet."
  - question:
      Quelle est la différence entre le cloud public et un hébergeur classique ?
    answer:
      "L'hébergeur classique vous loue une machine pour une durée fixe, souvent
      au mois, et vous la livrez en quelques heures. Le cloud public vous laisse
      créer et détruire des ressources vous-même, par API, en quelques secondes,
      et ne facture que le temps réellement consommé."
  - question: Le cloud public est-il moins cher qu'un serveur dédié ?
    answer:
      "Pas systématiquement. Le cloud est très avantageux pour une charge
      variable ou imprévisible, parce que vous ne payez rien quand vous ne
      consommez rien. Sur une charge stable et connue 24 h/24, un serveur dédié
      revient souvent moins cher."
---

Après plusieurs mois passés sur Docker puis sur les GitHub Actions, on ouvre
aujourd'hui une nouvelle série de fiches techniques sur NX : le cloud public.

Faisons d'abord le point sur le chemin parcouru. Vous savez
[construire une image Docker](/cours/docker-et-docker-compose/), vous savez
[la pousser sur un registry](/fiches/presentation-registry-docker/), et vous
savez même
[le faire automatiquement depuis GitHub Actions](/fiches/deployer-image-docker-github-actions/).
Il reste pourtant une question, et elle est de taille : **cette image, elle
tourne où ?**

Jusqu'ici, la réponse implicite était « sur un serveur ». Sauf que ce serveur,
quelqu'un a bien dû le commander, le brancher, l'installer, le mettre à jour et
le remplacer quand il a lâché. Le cloud public, c'est exactement ce qui a fait
disparaître cette étape du quotidien de la plupart des développeurs.

Dans cette fiche, on pose le décor : ce qu'est vraiment le cloud public, les
cinq caractéristiques qui le définissent, le vocabulaire que vous allez croiser
partout, et les limites qu'on ne découvre qu'une fois dedans. Pas de console de
fournisseur ni de tutoriel pas à pas ici — ça viendra plus tard dans la série.

---

## C'est quoi le cloud public, concrètement ?

Le cloud public, c'est de la **puissance de calcul, du stockage et du réseau
loués à la demande** chez un fournisseur, sur une infrastructure qu'il partage
entre tous ses clients.

<br>

Quatre idées suffisent à en faire le tour :

- **la mutualisation** : les mêmes machines physiques servent à des milliers de
  clients, chacun isolé des autres. C'est ce partage qui permet au fournisseur
  d'amortir un parc que personne ne pourrait s'offrir seul ;
- **le libre-service** : vous créez et détruisez vos ressources vous-même, sans
  demander l'autorisation à qui que ce soit, sans bon de commande et sans délai
  de livraison ;
- **l'élasticité** : vous montez de deux à vingt serveurs le temps d'un pic de
  trafic, puis vous redescendez. Sans rien jeter, puisque vous ne possédez
  rien ;
- **la facturation à l'usage** : vous payez ce que vous consommez, souvent à la
  seconde de calcul et au gigaoctet stocké.

<br>

Le mot « public » ne veut pas dire que vos données sont visibles de tous. Il
qualifie l'infrastructure, pas vos données : elle est **ouverte à tout client
qui la loue**, par opposition à un parc de machines réservé à une seule
organisation. On reviendra en détail sur cette distinction, c'est le sujet de
[la fiche suivante](/fiches/difference-cloud-public-prive-hybride).

<br>

Les noms que vous connaissez déjà : Amazon Web Services, Microsoft Azure et
Google Cloud pour les trois plus gros, OVHcloud, Scaleway, Clever Cloud ou
Hetzner du côté européen. Tous vendent la même chose sur le principe, avec des
catalogues et des tarifs très différents.

---

## Les cinq caractéristiques du NIST, sans le jargon

Il existe une définition de référence du _cloud computing_, publiée en 2011 par
le NIST, l'institut de normalisation américain. Elle tient en cinq
caractéristiques et, quinze ans plus tard, elle décrit toujours très bien ce
qu'on achète.

<br>

Les voici, traduites en français courant :

1. **Le libre-service à la demande** — vous provisionnez une machine ou du
   stockage tout seul, en quelques clics ou en une commande. Personne à
   appeler ;
2. **L'accès par le réseau** — tout est joignable à distance, par des protocoles
   standards, depuis n'importe quel poste ou n'importe quel outil ;
3. **La mutualisation des ressources** — le fournisseur sert plusieurs clients
   avec le même matériel, en réattribuant dynamiquement la capacité ;
4. **L'élasticité rapide** — la capacité s'ajuste vite, parfois automatiquement,
   et vous donne l'illusion de ressources infinies ;
5. **Le service mesuré** — tout est compté et facturé à l'usage, et vous pouvez
   consulter cette mesure.

<br>

Retenez surtout la cinquième, c'est la plus structurante. **Si ce n'est pas
mesuré et facturé à l'usage, ce n'est pas du cloud** : c'est de la location de
serveur avec une jolie interface. Le test est assez fiable pour trier les offres
que vous croiserez.

---

## Ce que ça change pour vous, développeur

Dans un modèle classique, obtenir un serveur passait par une demande, un budget,
un bon de commande, une livraison, un montage en rack et une installation. On
comptait en semaines, parfois en mois. Et comme la commande engageait pour trois
ans, on prenait large « au cas où ».

<br>

Dans le cloud public, l'infrastructure devient **une API**. La même que celle
qui se cache derrière la console web du fournisseur, et derrière sa CLI :

```bash
# La commande exacte dépend du fournisseur, mais la logique est toujours la même
cloud compute instance create mon-api \
  --type=2vcpu-4go \
  --region=europe-west-paris
```

<br>

Trois conséquences très concrètes pour votre travail quotidien :

- **l'infrastructure se code et se versionne**. Puisque tout passe par une API,
  on décrit son infrastructure dans des fichiers, on les met dans Git et on les
  rejoue à l'identique. C'est ce qu'on appelle l'*infrastructure as code* ;
- **l'environnement de test redevient abordable**. Monter une copie complète de
  la production pour deux heures ne coûte que deux heures ;
- **le dimensionnement n'est plus un pari**. On démarre petit, on observe, on
  ajuste. Se tromper ne coûte plus trois ans d'amortissement.

<br>

C'est aussi ce qui explique que la frontière entre développement et exploitation
se soit brouillée. Quand créer un serveur est devenu un appel d'API, la personne
qui écrit le code s'est retrouvée en situation de le déployer elle-même.

---

## Le vocabulaire de base

Quatre termes reviennent dans toutes les documentations, quel que soit le
fournisseur. Les connaître vous évitera de vous perdre dès la première page.

| Terme                     | Ce que c'est                                                                | Pourquoi ça compte                                                       |
| ------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Région**                | Une zone géographique où le fournisseur possède des centres de données      | Détermine où vos données résident et la latence pour vos clients         |
| **Zone de disponibilité** | Un centre de données isolé (électricité, réseau) à l'intérieur d'une région | Répartir votre application pour survivre à la panne d'un site            |
| **Instance**              | Une machine virtuelle louée, dimensionnée en vCPU et en Go de mémoire       | C'est là que tourne votre conteneur, votre API, votre base               |
| **Stockage objet**        | Un espace où l'on dépose des fichiers, adressés chacun par une URL          | Images, sauvegardes, artefacts de build : tout ce qui n'est pas une base |

<br>

Deux pièges classiques sur ces notions.

<br>

Le premier : **région et zone de disponibilité ne se valent pas**. Déployer deux
instances dans la même zone ne vous protège de rien — un incendie ou une coupure
électrique emporte les deux. C'est en répartissant sur plusieurs zones d'une
même région qu'on gagne en résilience.

<br>

Le second : **le stockage objet n'est pas un disque**. On n'y modifie pas un
fichier en place et on n'y monte pas un système de fichiers comme
[avec un volume Docker](/fiches/bien-utiliser-volumes-docker/). On dépose un
objet, on le récupère, on le remplace entièrement. C'est parfait pour des
fichiers immuables, très mauvais pour une base de données.

---

## Les limites qu'on découvre à l'usage

Le cloud public a des contreparties réelles, et il vaut mieux les connaître
avant de signer qu'après.

<br>

**La facture est variable, donc difficile à prévoir.** C'est le revers exact de
l'élasticité : payer à l'usage veut aussi dire payer un usage qui dérape. Une
instance oubliée un week-end, un bucket de sauvegardes qui grossit sans
surveillance, un pic de trafic inattendu, et le montant du mois n'a plus rien à
voir avec l'estimation. On consacrera un contenu entier à cette question, elle
le mérite.

<br>

**La sortie des données se paie.** Faire entrer des données chez un fournisseur
est presque toujours gratuit. Les faire sortir, non. C'est ce qu'on appelle les
frais d'_egress_, et c'est ce qui rend un déménagement bien plus coûteux qu'on
ne l'imagine.

<br>

**La dépendance au fournisseur est progressive.** Une machine virtuelle et un
disque se déplacent sans trop de peine. Une application construite sur la file
de messages maison, la base propriétaire et le service d'authentification d'un
fournisseur, beaucoup moins. C'est le _vendor lock-in_, et il s'installe
rarement d'un coup : il s'accumule service après service.

<br>

**Vous héritez des pannes du fournisseur.** Sa disponibilité devient la vôtre,
et vous n'avez aucun levier pendant l'incident. C'est en général bien meilleur
que ce qu'une petite équipe obtiendrait seule — mais vous ne pouvez qu'attendre.

---

## Astuce bonus - Lisez la grille tarifaire avant de déployer

Le réflexe qui évite les plus mauvaises surprises tient en une phrase : **ouvrez
la page des tarifs avant la documentation technique**.

<br>

Trois points à y chercher systématiquement :

- **le prix de sortie des données**, souvent relégué en bas de page alors qu'il
  décide de votre facture si vous servez des fichiers volumineux ;
- **ce qui reste facturé à l'arrêt**. Une instance éteinte ne coûte plus de
  calcul, mais son disque, son adresse IP réservée et ses sauvegardes, si ;
- **le palier gratuit et sa date de fin**. Beaucoup d'offres d'essai basculent
  au tarif plein sans prévenir au bout de douze mois.

<br>

Et dans la foulée : **posez une alerte de budget dès la création du compte**.
Tous les fournisseurs en proposent, ça prend deux minutes, et c'est le seul
garde-fou qui vous préviendra qu'un service tourne pour rien.

<hr>

Et voilà, vous avez le décor ! Si vous ne deviez retenir qu'une chose : **le
cloud public, c'est de l'infrastructure mutualisée, pilotée par API et facturée
à l'usage** — le reste en découle, l'élasticité comme l'imprévisibilité de la
facture.

Dans la prochaine fiche, on lève la confusion la plus fréquente du domaine :
[cloud public, privé, hybride, quelles différences](/fiches/difference-cloud-public-prive-hybride)
et, tant qu'à faire, ce que vient faire le multicloud là-dedans. À très vite 😉.

D'ici là, je vous invite :

- [à relire la fiche sur les registries Docker](/fiches/presentation-registry-docker/),
  puisque c'est de là que partira l'image qu'on déploiera plus tard dans cette
  série ;
- [à (re)commencer le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose/)
  si les conteneurs sont encore flous.

## Ressources

- [The NIST Definition of Cloud Computing (SP 800-145)](https://csrc.nist.gov/pubs/sp/800/145/final)
- [Régions et zones de disponibilité (AWS)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)
- [Geography and regions (Google Cloud)](https://cloud.google.com/docs/geography-and-regions)
- [Le glossaire Cloud Native de la CNCF, en français](https://glossary.cncf.io/fr/)
- [Recommandations de la CNIL sur l'informatique en nuage](https://www.cnil.fr/fr/definition/informatique-en-nuage-cloud-computing)
