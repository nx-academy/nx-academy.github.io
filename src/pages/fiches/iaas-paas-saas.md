---
layout: ../../layouts/CheatSheetsLayout.astro

title: "IaaS, PaaS, SaaS, quelles différences et comment choisir ?"
description:
  "IaaS, PaaS ou SaaS ? On compare les trois modèles de service du cloud avec un
  tableau qui gère quoi en terme de matériel, réseau, OS, runtime, application,
  données. On voit aussi ce qu'on gagne et ce qu'on perd en montant d'une
  couche."

imgAlt:
  Trois parts de pizza alignées, la première crue, la deuxième dans un carton de
  livraison et la troisième servie sur une assiette, pixel art
imgSrc: /images/cheatsheets/iaas-paas-saas.webp

author: Thomas Dimnet
kind: Fiche technique
serie: cloud
tags:
  - Cloud
  - Production
level: Intermédiaire
publishedDate: 11/02/2026

faq:
  - question: Quelle est la différence entre IaaS, PaaS et SaaS ?
    answer:
      "Les trois décrivent jusqu'où le fournisseur s'occupe de la pile. En IaaS,
      il gère le matériel et la virtualisation, vous gérez l'OS et tout ce qui
      est au-dessus. En PaaS, il gère aussi l'OS et le runtime, vous n'apportez
      que votre code. En SaaS, il gère tout et vous n'apportez que vos données."
  - question: Le PaaS est-il plus cher que le IaaS ?
    answer:
      "À ressources égales, oui, presque toujours. Vous payez le travail
      d'exploitation que le fournisseur fait à votre place. La bonne comparaison
      n'est pas le prix de la machine, c'est le prix de la machine plus le temps
      d'équipe qu'il aurait fallu pour l'administrer."
  - question: Un conteneur Docker, c'est du IaaS ou du PaaS ?
    answer:
      "Ni l'un ni l'autre, à proprement parler. Les services managés de
      conteneurs forment une couche intermédiaire souvent appelée CaaS. vVous
      livrez une image plutôt qu'un dépôt de code et le fournisseur s'occupe de
      la machine qui la fait tourner."
---

Dans [la fiche précédente](/fiches/difference-cloud-public-prive-hybride), on a
répondu à une question de propriété. À savoir, **chez qui** tourne votre
application, sur du matériel mutualisé ou dédié. Aujourd'hui, on change d'axe.

La question est plutôt **jusqu'où le fournisseur s'occupe de votre pile ?**

C'est ce que décrivent les trois sigles qu'on croise dans toutes les
documentations (sans que, souvent, personne prenne la peine de les définir) :
**IaaS, PaaS, SaaS**. Infrastructure, plateforme, logiciel, le tout « as a
service », c'est-à-dire loué à la demande.

Pour info, ces trois modèles ne s'opposent pas. Ils décrivent trois **hauteurs**
sur une même pile technique, et le seul vrai critère qui les sépare, c'est la
ligne où s'arrête la responsabilité du fournisseur et où commence la vôtre.

---

## La métaphore de la pizza pour poser l'intuition

Avant le vocabulaire, l'image. Bon, ok, Elle est un peu éculée dans le milieu,
mais elle marche tellement bien que ce serait dommage de s'en priver.

<br>

Vous voulez manger une pizza. Il y quatre manières de de faire :

- **tout à la maison** ; vous achetez la farine, vous pétrissez, vous avez votre
  four, votre gaz, votre table. C'est le serveur dans votre placard, celui qu'on
  a appelé _on-premise_ dans la fiche précédente ;
- **la pizza surgelée** ; quelqu'un l'a préparée, mais le four, le gaz et la
  table restent à votre charge. C'est le **IaaS** ;
- **la livraison** ; la pizza arrive cuite, vous fournissez la table et les
  assiettes. C'est le **PaaS** ;
- **le restaurant** ; vous ne fournissez que votre appétit. C'est le **SaaS**.

<br>

Ce qui compte dans cette image, ce n'est pas la pizza. C'est que **la liste de
ce que vous fournissez raccourcit à chaque étape** et que celle de ce que vous
contrôlez raccourcit exactement au même rythme. On ne délègue jamais sans céder
quelque chose. C'est tout l'objet de cette fiche.

---

## IaaS — vous louez la machine

L'**infrastructure as a service**, c'est le niveau le plus bas et le plus
ancien. Le fournisseur vous loue des ressources brutes, par exemple des machines
virtuelles, du stockage, du réseau. Vous les créez par API, en quelques
secondes, et vous les payez à la seconde ou au gigaoctet.

<br>

Ce que le fournisseur prend en charge s'arrête à l'hyperviseur (on reviendra sur
ce terme bientôt). **Tout ce qui est au-dessus est à vous.** Concrètement :

- le système d'exploitation, son installation et surtout ses mises à jour de
  sécurité ;
- le runtime, autrement dit la version de Node, de Python ou de Java, et ses
  dépendances système ;
- le serveur web, le pare-feu applicatif, la rotation des journaux ;
- les sauvegardes, la supervision, l'astreinte quand ça tombe à 3 h du matin.

<br>

En échange, vous obtenez **la liberté totale**. Un noyau particulier, une
version ancienne d'une bibliothèque, un logiciel propriétaire qui n'existe que
sous une distribution précise : rien ne vous en empêche. C'est aussi le modèle
le plus facile à quitter, puisqu'une machine virtuelle reste une machine
virtuelle partout.

<br>

**Le IaaS se choisit pour une contrainte, pas par défaut**. Si vous ne savez pas
nommer la raison précise qui vous oblige à administrer un OS, c'est probablement
que la couche du dessus vous ira le mieux.

---

## PaaS — vous louez la plateforme

La **plateforme as a service** monte d'un cran. Vous n'apportez plus une machine
à configurer, vous apportez **votre code**. La plateforme se charge de le
construire, de le déployer, de le faire tourner et de le redémarrer quand il
meurt.

<br>

La frontière se déplace donc franchement. C'est maintenant le fournisseur gère
maintenant l'OS, les correctifs de sécurité, le runtime et l'équilibrage de
charge. Il vous reste l'application et les données. Un déploiement se résume
souvent à pousser sur une branche.

<br>

Ce que vous y gagnez est très concret :

- **plus d'OS à maintenir**, donc plus de nuits blanches sur une faille système
  publiée un vendredi soir ;
- **la mise à l'échelle est un réglage**, pas un projet ;
- **le temps d'équipe** libéré, qui est le vrai poste d'économie du cloud bien
  plus que le prix de la machine.

<br>

Ce que vous y perdez est tout aussi concret. La plateforme impose ses versions
de runtime, ses limites de mémoire, sa durée maximale de requête, sa façon de
gérer les tâches de fond. Le jour où votre besoin sort du cadre prévu, **vous ne
pouvez pas descendre d'un étage pour bricoler**, il faut changer de modèle. Et
les mécanismes de déploiement, de configuration et de journalisation étant
propres à chaque plateforme, la porte de sortie est plus étroite qu'en IaaS.

---

## SaaS — vous louez le logiciel

Le **software as a service**, c'est le bout de la chaîne. C'est un logiciel
fini, exploité par son éditeur, auquel vous accédez par un navigateur ou une
API. Vous n'apportez plus que **vos données et vos utilisateurs**.

<br>

On a tendance à ranger le SaaS hors du sujet technique, parce qu'on ne déploie
rien dessus. C'est une erreur, pour deux raisons.

<br>

D'abord parce que **vous en consommez déjà énormément** sans le formuler ainsi.
Votre outil de tickets, votre messagerie d'équipe, votre service d'envoi
d'e-mails transactionnels, votre outil de facturation. Chacun est une dépendance
de production au même titre qu'une base de données.

<br>

Ensuite parce que la question du choix se pose exactement dans les mêmes termes
qu'aux étages du dessous : que se passe-t-il si l'éditeur double son tarif,
ferme le service ou se fait racheter ? La bonne question à poser devant un SaaS
n'est pas « est-ce que ça marche bien ? » mais **« comment je récupère mes
données si j'arrête demain ? »**. Un export documenté et testé vaut toutes les
promesses commerciales.

---

## Le tableau : qui gère quoi ?

C'est la seule chose vraiment à retenir de cette fiche. On lit ligne par ligne,
du matériel jusqu'aux données.

|                      | Sur site | IaaS           | PaaS           | SaaS           |
| -------------------- | -------- | -------------- | -------------- | -------------- |
| **Matériel**         | Vous     | Le fournisseur | Le fournisseur | Le fournisseur |
| **Réseau, stockage** | Vous     | Le fournisseur | Le fournisseur | Le fournisseur |
| **Virtualisation**   | Vous     | Le fournisseur | Le fournisseur | Le fournisseur |
| **Système**          | Vous     | **Vous**       | Le fournisseur | Le fournisseur |
| **Runtime**          | Vous     | **Vous**       | Le fournisseur | Le fournisseur |
| **Application**      | Vous     | **Vous**       | **Vous**       | Le fournisseur |
| **Données**          | Vous     | **Vous**       | **Vous**       | **Vous**       |

<br>

Deux lectures de ce tableau valent le détour.

<br>

La première, c'est que **la ligne « Données » ne bascule jamais**. Quel que soit
le modèle, elles restent les vôtres, et la responsabilité qui va avec (leur
exactitude, leur confidentialité et leur récupération) aussi. Un fournisseur qui
perd vos données est fautif ; celui qui devra s'en expliquer devant vos
utilisateurs, c'est vous.

<br>

La seconde, c'est qu'**il n'y a pas de bond**. On descend d'une case à la fois
et chaque case déléguée est un peu de contrôle en moins. C'est ce qui permet de
choisir sans se raconter d'histoire.

---

## Alors, on choisit comment ?

La question n'est pas « quel modèle est le meilleur ? » mais **« quelle est la
couche la plus haute qui accepte mon besoin ? »**. On part du haut, on descend
jusqu'à ce que ça passe.

<br>

**Un logiciel du marché fait déjà le travail ?** Prenez le SaaS et passez à
autre chose. Réécrire un outil de tickets ou un service d'e-mails
transactionnels est le meilleur moyen de dépenser six mois sur un problème que
personne ne vous demandait de résoudre.

<br>

**Votre application est une application web assez standard ?** Le PaaS est
presque toujours le bon choix, en tout cas au début. Vous n'avez ni le temps ni
l'envie d'administrer un système, et la contrainte que la plateforme vous impose
est, neuf fois sur dix, une contrainte que vous vous seriez imposée vous-même.

<br>

**Vous avez une contrainte que vous savez nommer ?** Un logiciel spécifique, un
noyau particulier, un besoin de performance mesuré, une obligation de
localisation précise, descendez en IaaS, mais **écrivez la raison quelque
part**. C'est ce qui vous permettra, dans deux ans, de vérifier qu'elle tient
toujours.

---

## Astuce bonus - Les deux couches que le trio ne décrit pas

Ce découpage en trois date de la fin des années 2000 et il a pris un petit coup
de vieux. Deux modèles très courants aujourd'hui tombent entre les cases.

<br>

Le **CaaS**, _containers as a service_. Vous ne livrez ni une machine à
configurer ni un dépôt de code, mais **une image de conteneur**. Le fournisseur
la récupère sur un registry et la fait tourner. Vous gardez la maîtrise complète
de ce qu'il y a dans l'image, donc du runtime et des dépendances système, comme
en IaaS, sans jamais administrer de machine, comme en PaaS. C'est le meilleur
des deux mondes pour beaucoup d'applications et c'est le sujet d'une prochaine
fiche.

<br>

Le **serverless**, ou fonction as a service. Vous livrez une fonction (du code),
elle s'exécute à la demande et vous ne payez que ses millisecondes d'exécution.
Sur le papier c'est l'aboutissement de la logique ; en pratique, le démarrage à
froid, la difficulté à reproduire l'environnement en local et l'attachement très
fort au fournisseur en font un choix à faire les yeux ouverts. J'ai hâte de
pouvoir vous faire des fiches sur ce modèle.

<br>

Ce qu'il faut en retenir -> **le trio IaaS/PaaS/SaaS reste un bon outil de
lecture, pas une classification exacte du marché**. Quand un service ne rentre
dans aucune case, posez-lui simplement la question du tableau, à savoir jusqu'où
va sa responsabilité et où commence la vôtre. Vous saurez alors le situer.

<hr>

Et voilà, le trio est démonté ! Pour résumer en une phrase. **IaaS, PaaS et SaaS
ne décrivent pas trois technologies mais trois hauteurs de délégation sur une
même pile et à chaque étage gagné en confort, on cède un peu de contrôle et un
peu de réversibilité**.

Dans la prochaine fiche, on arrête de parler de modèles et on met les mains dans
le cambouis :
[comment déployer un conteneur Docker dans le cloud](/drafts/deployer-conteneur-docker-dans-le-cloud),
de l'image poussée sur un registry jusqu'au healthcheck qui tourne. À très vite
😉.

D'ici là, je vous invite :

- [à relire la fiche sur le cloud public](/fiches/comprendre-le-cloud-public) si
  le vocabulaire de base est encore frais ;
- [à revoir la fiche sur les registries Docker](/fiches/presentation-registry-docker/),
  parce que c'est exactement là que commencera la fiche suivante.

## Ressources

- [The NIST Definition of Cloud Computing (SP 800-145)](https://csrc.nist.gov/pubs/sp/800/145/final)
- [Types of cloud computing (AWS)](https://aws.amazon.com/types-of-cloud-computing/)
- [PaaS versus IaaS versus SaaS (Google Cloud)](https://cloud.google.com/learn/paas-vs-iaas-vs-saas)
- [Le glossaire Cloud Native de la CNCF, en français](https://glossary.cncf.io/fr/)
