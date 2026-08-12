---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Cloud public, privé, hybride : quelles différences ?"
description:
  "Comprenez enfin la différence entre cloud public, cloud privé et cloud
  hybride. Qui possède le matériel, qui paie quoi, ce que chaque modèle apporte
  en conformité et en élasticité et pourquoi le multicloud n'est pas
  l'hybride."

imgAlt:
  Trois bâtiments côte à côte, un immeuble partagé, une maison individuelle et
  une passerelle entre les deux, pixel art
imgSrc: /images/cheatsheets/difference-cloud-public-prive-hybride.webp

author: Thomas Dimnet
kind: Fiche technique
serie: cloud
tags:
  - Cloud
  - Production
level: Débutant
publishedDate: 08/12/2026

faq:
  - question: Quelle est la différence entre cloud public et cloud privé ?
    answer:
      "Dans le cloud public, l'infrastructure appartient à un fournisseur et
      elle est mutualisée entre tous ses clients. Dans le cloud privé, elle est
      dédiée à une seule organisation, qu'elle soit installée dans ses locaux ou
      hébergée ailleurs pour son compte exclusif."
  - question: Le cloud hybride, c'est quoi exactement ?
    answer:
      "C'est un système d'information qui combine cloud public et cloud privé
      (ou serveurs internes), reliés entre eux pour que les applications et les
      données puissent circuler. On garde le sensible d'un côté, on met
      l'élastique de l'autre."
  - question: Le multicloud et le cloud hybride, est-ce la même chose ?
    answer:
      "Non. Le multicloud, c'est utiliser plusieurs fournisseurs publics en même
      temps. L'hybride, c'est mélanger du public et du privé. On peut être
      multicloud sans être hybride, et l'inverse."
---

Dans [la fiche précédente](/drafts/comprendre-le-cloud-public), on a posé ce
qu'était le cloud public. À savoir, de l'infrastructure mutualisée, pilotée par API et
facturée à l'usage. Le mot « public » y faisait déjà un peu de bruit et c'est
normal.

Parce que dès qu'on ouvre une documentation ou qu'on écoute une présentation
commerciale, trois termes arrivent ensemble, souvent dans la même phrase :
**cloud public, cloud privé, cloud hybride**. Et régulièrement un quatrième
s'invite, le **multicloud**, présenté comme un synonyme de l'hybride alors qu'il
n'a rien à voir.

Trois modèles, un intrus, et beaucoup de conversations qui partent de travers
parce que deux personnes n'emploient pas le même mot pour la même chose.

Dans cette fiche, on démêle tout ça. Vous allez voir que la question de départ
est beaucoup plus simple qu'il n'y paraît. **À qui appartient le matériel et
avec qui le partagez-vous ?**

---

## Pourquoi on les confond aussi souvent ?

Ces modèles se confondent pour une bonne raison : **de l'extérieur, ils se
ressemblent tous**. Dans les trois cas, vous obtenez des machines à la demande,
vous les pilotez par une API et vous voyez une console web.

<br>

Ce qui les sépare n'est pas visible depuis votre terminal. C'est un ensemble de
questions de propriété et de partage :

- **qui possède le matériel** — vous, votre entreprise, ou un fournisseur ?
- **avec qui le partagez-vous** — personne, ou tous les autres clients ?
- **qui paie quoi, et quand** — un investissement d'un coup, ou une facture
  mensuelle variable ?

<br>

Une fois ces trois questions posées, la classification devient limpide. On
déroule les trois modèles dans l'ordre.

---

## Le cloud public = mutualisé, chez un fournisseur

C'est le modèle qu'on a détaillé dans la fiche précédente. Le fournisseur
possède les centres de données, les machines et le réseau, et il loue de la
capacité à qui la demande. **Votre application tourne sur du matériel partagé
avec d'autres clients**, chacun isolé des autres par la virtualisation.

<br>

Ce que ça implique très concrètement :

- vous ne possédez rien, donc vous n'immobilisez pas d'argent au départ ;
- vous payez à l'usage, une dépense de fonctionnement qui suit votre activité ;
- la capacité disponible dépasse largement ce dont vous aurez jamais besoin ;
- l'exploitation du matériel — pannes de disque, mises à jour du _firmware_,
  climatisation — ne vous concerne plus du tout.

<br>

En face, deux contreparties déjà évoquées : une facture difficile à prévoir, et
une dépendance qui s'installe service après service. C'est malgré tout le choix
par défaut pour la très grande majorité des projets. Mais tout le monde ne peut
pas s'en contenter, et c'est là qu'intervient le modèle suivant.

---

## Le cloud privé = dédié, à une seule organisation

Le cloud privé, c'est **la même mécanique — libre-service, API, élasticité —
mais sur une infrastructure réservée à une seule organisation**. Personne
d'autre ne tourne sur ces machines.

<br>

Attention, deux formes très différentes se cachent derrière le même mot :

- **le cloud privé interne** : votre organisation achète ses serveurs, les
  installe dans ses propres locaux et fait tourner par-dessus une couche de
  virtualisation qui reproduit l'expérience du cloud. C'est ce qu'on appelle
  aussi l'*on-premise* ;
- **le cloud privé hébergé** : un prestataire possède et exploite le matériel,
  mais le dédie contractuellement à votre seule organisation. Vous ne partagez
  rien avec ses autres clients.

<br>

Dans les deux cas, le raisonnement financier s'inverse. On s'engage sur une
capacité **à l'avance**, on l'amortit sur plusieurs années, et la facture ne
baisse pas quand le trafic baisse. En échange, elle ne dérape pas non plus.

<br>

Les motifs qui poussent au cloud privé sont presque toujours les mêmes :

- **la conformité** : une réglementation ou un contrat impose de savoir
  précisément où sont les données et qui peut y accéder physiquement ;
- **la maîtrise** : besoin de matériel spécifique, de performances garanties ou
  d'un contrôle total sur la pile logicielle ;
- **l'existant** : un parc de serveurs déjà acheté, déjà amorti, qu'on ne va pas
  jeter parce qu'une mode est passée.

<br>

Le prix de tout ça, c'est que **l'élasticité redevient limitée**. Vous ne pouvez
pas dépasser la capacité que vous avez achetée, et vous continuez à payer pour
celle que vous n'utilisez pas. D'où l'envie, très naturelle, de combiner les
deux.

---

## Le cloud hybride = les deux, reliés

Le cloud hybride, c'est **un système d'information qui combine du cloud public
et du cloud privé (ou des serveurs internes), reliés entre eux** pour que les
applications et les données circulent de l'un à l'autre.

<br>

Le point important est dans le mot « reliés ». Avoir un serveur dans un placard
et un compte chez un fournisseur ne fait pas de vous un cloud hybride, ça fait
deux systèmes qui s'ignorent. **L'hybride suppose un lien** : un réseau privé
entre les deux, une authentification commune, un outillage de déploiement qui
sait viser les deux côtés.

<br>

Les cas d'usage classiques :

- **les données sensibles restent au chaud, le reste part au public** : la base
  clients côté privé, le site vitrine et les traitements côté public ;
- **le débordement** : l'application tourne sur l'infrastructure interne au
  quotidien, et déborde sur le public les jours de pic. Sans acheter du matériel
  pour trois jours par an ;
- **la migration progressive** : on déplace une application à la fois vers le
  public, et pendant la transition — qui dure souvent des années — les deux
  mondes cohabitent.

<br>

En contrepartie, l'hybride **cumule la complexité des deux modèles**. Deux
réseaux à faire dialoguer, deux modèles de sécurité à tenir cohérents, deux
outillages à maîtriser, et des équipes qui doivent être à l'aise partout. Ce
n'est pas un compromis gratuit, c'est un choix qui se paie en temps d'équipe.

---

## Et le multicloud, alors ?

C'est la confusion la plus fréquente, et elle vaut la peine d'être levée une
bonne fois : **le multicloud, ce n'est pas l'hybride**.

<br>

Le multicloud, c'est **utiliser plusieurs fournisseurs publics en même temps**.
Par exemple le calcul chez l'un, le stockage de fichiers chez un autre, et un
service d'envoi d'e-mails chez un troisième. Tout est public, il y a juste
plusieurs prestataires.

<br>

Les deux notions sont indépendantes, et se croisent librement :

- public seul → un fournisseur, rien d'autre ;
- **multicloud** → plusieurs fournisseurs publics, aucun privé ;
- **hybride** → du public et du privé, reliés ;
- hybride et multicloud → du privé, plus plusieurs fournisseurs publics.

<br>

On se met au multicloud pour deux raisons, généralement : **réduire la
dépendance** à un fournisseur unique, ou **aller chercher chez chacun le service
qu'il fait le mieux**. Le coût, lui, est immédiat : autant de facturations, de
consoles, de modèles de sécurité et de vocabulaires à connaître que de
fournisseurs.

Mon conseil : **ne partez jamais en multicloud « pour la résilience » sans avoir
mesuré ce que ça coûte en complexité**. Dans la plupart des cas, bien répartir
son application sur plusieurs zones d'un même fournisseur apporte l'essentiel du
bénéfice pour une fraction de l'effort.

---

## Tableau récapitulatif

Pour y voir clair en un coup d'œil :

|                               | Cloud public               | Cloud privé                     | Cloud hybride             |
| ----------------------------- | -------------------------- | ------------------------------- | ------------------------- |
| **Propriété du matériel**     | Le fournisseur             | Votre organisation              | Les deux                  |
| **Mutualisation**             | Partagé entre clients      | Dédié                           | Selon la partie           |
| **Modèle de coût**            | À l'usage (fonctionnement) | Investissement + amortissement  | Les deux                  |
| **Élasticité**                | ✅ Quasi illimitée         | ❌ Bornée à la capacité achetée | ✅ Sur la partie publique |
| **Maîtrise de l'emplacement** | ❌ Cadrée par les régions  | ✅ Totale                       | ✅ Sur la partie privée   |
| **Complexité**                | Faible                     | Élevée                          | La plus élevée            |

<br>

Une lecture rapide de ce tableau suffit à comprendre pourquoi le public s'est
imposé : c'est la seule colonne où la complexité est faible et l'élasticité
totale. Les deux autres se choisissent quand une contrainte l'impose.

---

## Alors, lequel choisir ?

Comme souvent, la bonne réponse dépend surtout de votre point de départ. Trois
situations couvrent la grande majorité des cas.

<br>

**Vous démarrez un produit, sans existant.** Allez au **cloud public**, sans
hésiter. Vous n'avez ni le temps ni les moyens d'exploiter du matériel, et votre
charge est imprévisible. Prenez simplement l'habitude de préférer les briques
standards — une base PostgreSQL managée plutôt qu'une base propriétaire — pour
garder vos options ouvertes.

<br>

**Vous manipulez des données de santé, bancaires ou classifiées.** La contrainte
réglementaire décide à votre place, et en amont du choix technique : ce sera du
**cloud privé** ou du **public qualifié** sur une offre certifiée. La question à
poser en premier n'est pas « quelle technologie ? » mais « quelle qualification
exige mon secteur ? ».

<br>

**Vous avez un parc de serveurs déjà amorti.** L'**hybride** est alors moins un
choix qu'un état de fait, celui par lequel passe toute migration un peu
sérieuse. Le piège est d'y rester par défaut : il coûte cher en complexité, il
mérite d'être une étape avec une date de fin.

---

## Astuce bonus - L'hybride n'est pas une étape obligatoire

On présente souvent ces trois modèles comme une progression : on commencerait en
privé, on passerait par l'hybride, et on finirait en public. C'est une histoire
commerciale commode, pas une trajectoire technique. Dans les faits, **la plupart
des projets récents sont partis directement en public et n'en sont jamais
sortis** : sans parc à migrer, pas de phase hybride.

<br>

Le mouvement inverse existe aussi, et il a un nom : le **repatriement**. Des
entreprises dont la charge est devenue stable constatent qu'elles paient
l'élasticité sans plus jamais s'en servir, et redescendent tout ou partie de
leur infrastructure sur du matériel dédié.

<br>

Ce qu'il faut en retenir : **ces trois modèles ne sont pas des niveaux de
maturité, ce sont des réponses à des contraintes différentes**. Le bon réflexe
n'est pas de progresser dans une échelle, c'est de vérifier de temps en temps
que la contrainte qui a motivé votre choix tient toujours.

<hr>

Et voilà, vous ne devriez plus jamais les confondre ! Pour résumer en une
phrase : **le public est mutualisé chez un fournisseur, le privé est dédié à une
organisation, l'hybride relie les deux — et le multicloud, c'est simplement
plusieurs fournisseurs publics**.

Dans la suite de cette série, on descendra d'un cran dans la technique avec les
modèles de service, ce fameux trio IaaS, PaaS et SaaS qui décrit non plus _chez
qui_ ça tourne, mais _jusqu'où_ le fournisseur s'occupe de votre pile. Restez
dans le coin 😉.

D'ici là, je vous invite :

- [à relire la fiche sur le cloud public](/drafts/comprendre-le-cloud-public) si
  le vocabulaire de base est encore frais ;
- [à (re)commencer le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose/),
  parce que le conteneur reste le format qui vous rendra ces choix réversibles.

## Ressources

- [The NIST Definition of Cloud Computing (SP 800-145)](https://csrc.nist.gov/pubs/sp/800/145/final)
- [Le référentiel SecNumCloud de l'ANSSI](https://cyber.gouv.fr/produits-services-qualifies)
- [Hybrid cloud, la documentation de Google Cloud](https://cloud.google.com/learn/what-is-hybrid-cloud)
- [Le glossaire Cloud Native de la CNCF, en français](https://glossary.cncf.io/fr/)
