---
layout: ../../layouts/BlogPostLayout.astro

title: "Le DevOps n'est plus l'affaire d'une équipe à part"
description:
  "L'IA accélère la vitesse de shipping mais elle ne dispense pas de rigueur.
  Pourquoi les compétences DevOps et SRE de CI, d'environnements iso-prod, de
  cloud et de sécurité réseau, deviennent l'affaire de chaque développeur, pas
  d'une équipe séparée."

imgAlt:
  Un développeur seul devant plusieurs écrans de monitoring et de déploiement,
  illustration pixel art
imgSrc: /images/articles/developpeur-devops-ecrans.webp

kind: Articles
format: reflexion
serie: devops
author: Thomas Dimnet
github: tdimnet
publishedDate: 07/31/2026

tags:
  - DevOps
  - IA
  - CI/CD
  - Cloud

faq:
  - question: Faut-il devenir expert DevOps pour coder avec l'IA ?
    answer:
      "Non. L'article ne défend pas l'expertise DevOps mais un socle minimal :
      une CI qui vérifie le code, un environnement de test iso-prod, quelques
      notions de cloud public et de sécurité réseau."
  - question: Pourquoi l'IA rend-elle les compétences DevOps plus importantes ?
    answer:
      "Parce qu'elle accélère la vitesse à laquelle on produit du code. Sans
      garde-fous (CI, environnements iso-prod), cette vitesse expose plus vite
      aux incidents et aux erreurs de configuration, au lieu de les prévenir en
      amont."
  - question: Qu'est-ce qu'un environnement iso-prod ?
    answer:
      "Un environnement de développement ou de test qui reproduit fidèlement la
      production : même OS, mêmes versions, même architecture réseau. Il évite
      les surprises du type 'ça marche chez moi, mais pas en prod'."
  - question: Le DevOps va-t-il disparaître comme métier spécialisé ?
    answer:
      "Pas nécessairement disparaître, mais se diffuser. Ses réflexes deviennent
      l'affaire de chaque développeur qui ship du code régulièrement, plutôt que
      celle d'une équipe séparée."
---

Un collègue, chez Scaleway, construit en ce moment une plateforme d'exercices.
L'idée est bonne (vraiment bonne), et il a tout codé en _vibe coding_. Cela dit,
il y a un détail qui coince : à chaque modification, il pousse directement en
prod. Pas d'environnement de dev, pas de test avant. Résultat, sa facture
grimpe, son environnement est instable et il passe un temps fou à comprendre
pourquoi ça casse.

Je ne le juge pas, loin de là. **À mes débuts, je faisais exactement la même
chose**, et mes réflexes actuels ne sont pas tombés du ciel : ils viennent de
ces ratés-là (et de deux ou trois prods cassées au passage). Aujourd'hui, sur
NX, je déploie souvent. Le site et le serveur MCP passent par des jobs
automatisés qui buildent, testent et déploient mon code. Je code plus vite
depuis que je m'appuie sur l'IA, donc je pousse plus souvent, et pourtant je
n'ai presque jamais de rollback à faire.

Même outil, même vitesse de production, deux résultats très différents. **Mon
objectif, avec cet article, est de vous montrer pourquoi l'IA rend les bases du
DevOps plus importantes, et pas moins**, et par quoi commencer si vous n'avez
jamais mis les mains dedans.

---

## L'IA a supprimé un garde-fou dont on ne parlait jamais

On pourrait croire l'inverse. Puisque l'IA écrit le code à votre place, les
tests, la CI et les environnements de test ressembleraient à de la plomberie
dont on peut se passer. Pour être honnête, je comprends ce raisonnement, mais je
pense qu'il est faux.

Pendant longtemps, écrire du code prenait du temps. Ce temps jouait un rôle
qu'on ne lui attribuait pas : il servait de garde-fou. Comme chaque ligne
coûtait cher à écrire, on réfléchissait avant de pousser. **Avec l'IA, ce frein
a disparu** : une modification peut être générée et poussée en quelques secondes
(parfois sans avoir vraiment été relue, soyons honnêtes).

Autrement dit, le problème n'a pas disparu, il s'est déplacé. Avant, on le
réglait en amont, en réfléchissant avant d'écrire. Sans CI ni environnement de
test, on le découvre en aval : en prod, devant les utilisateurs, ou devant la
facture. **Plus vous allez vite, plus il vous faut quelque chose qui vérifie à
votre place.**

---

## Par quoi commencer : quatre briques, dans un ordre précis

Vous n'avez pas besoin de devenir SRE. Vous avez besoin de quelques briques, et
surtout de les prendre dans le bon ordre. Pour chacune, je vous propose de vous
poser la question que je pose souvent dans mes cours : à quel problème est-ce
que ça répond ?

**1. Un environnement de dev et de test iso-prod.** Le problème : « ça marche
chez moi, mais pas en prod ». Un environnement iso-prod reproduit fidèlement la
production (même OS, mêmes versions, même architecture réseau). Sans lui, vous
retombez dans ce problème, sauf que cette fois, c'est l'IA qui vous assure que
tout fonctionne, et avec beaucoup d'aplomb. **C'est la brique par laquelle je
vous conseille de commencer**, parce que les trois autres en découlent.

**2. Une CI qui vérifie avant vous.** Le problème : un environnement iso-prod ne
sert pas à grand-chose si personne ne rejoue les vérifications à chaque
modification. La CI fait ce travail. Elle attrape ce que l'IA (ou vous) laisse
passer : un test cassé, un lint qui hurle, une régression silencieuse. L'idée
n'est pas d'atteindre une couverture de tests parfaite, c'est de faire en sorte
que rien n'arrive en prod sans être passé par le même tamis.

**3. Des notions de cloud public.** Le problème : votre environnement iso-prod
tourne forcément quelque part. Savoir déployer et comprendre les briques de base
(compute, stockage, réseau), c'est ce qui vous évite de dépendre d'un tutoriel
généré, ou d'une IA qui vous propose une configuration plausible mais fausse.

**4. Un minimum de sécurité réseau.** Le problème : dès que vous reproduisez le
réseau de la prod, vous devez décider ce qui est isolé et ce qui est exposé, et
pourquoi. Un VPC mal configuré ou un port ouvert par erreur arrivent vite,
surtout quand l'IA propose une solution « qui marche » sans isoler ce qui doit
l'être. Ce n'est pas de la paranoïa, c'est savoir ce que vous exposez.

Vous l'aurez compris, **l'iso-prod est la porte d'entrée** : prenez-la au
sérieux, et vous rencontrerez les trois autres briques au moment où vous en
aurez besoin.

---

## L'environnement que vous donnez à l'IA compte autant que le vôtre

Il y a un point qu'on oublie souvent : l'IA ne travaille pas dans le vide. Elle
travaille dans votre environnement, avec vos outils et vos contraintes.

Donnez-lui un environnement iso-prod et une CI qui valide chaque modification,
et elle va itérer plus vite et plus juste. Elle peut se tromper, se corriger et
retester sans risque, parce que le filet est là. Donnez-lui uniquement la prod
comme terrain de jeu, et elle fera exactement la même chose (se tromper,
corriger, retester), sauf que chaque erreur deviendra un incident réel.

**Le manque de rigueur ne vient donc pas de l'IA, mais de l'environnement qu'on
lui donne.** C'est là que la boîte à outils DevOps change de rôle : elle ne sert
plus seulement à vous, elle devient l'environnement de travail de l'IA
elle-même.

---

## Ce n'est plus un métier à part

Pendant longtemps, le DevOps a été vu comme une spécialité, avec ses experts,
son équipe et ses tickets. Vous codiez, quelqu'un d'autre déployait, et une
troisième personne surveillait la prod.

**Je pense que cette séparation est en train de s'effacer.** Pas parce que les
métiers de DevOps ou de SRE disparaissent (je ne le crois pas), mais parce que
leurs réflexes deviennent l'affaire de chaque développeur qui pousse du code
régulièrement. L'IA accélère ce mouvement : elle permet de produire seul ce qui
demandait plusieurs personnes il y a encore deux ans. Les équipes se resserrent,
les rôles se combinent, et vous héritez d'une partie de ce qui appartenait hier
au DevOps, souvent sans avoir eu le temps de l'apprendre correctement.

Pour faire simple, voici ce que je vous conseille :

- **commencez par l'iso-prod** sur un projet perso ou un petit projet en
  entreprise, même imparfait ;
- **ajoutez une CI minimale** qui lance vos tests et votre lint à chaque push,
  et itérez dessus ;
- **déployez au moins une fois vous-même** sur un cloud public, pour voir les
  briques de base (compute, stockage, réseau) ;
- **avant d'exposer quoi que ce soit, demandez-vous ce qui doit l'être**, et
  pourquoi.

---

Vous voilà arrivé au bout de cet article. Je prépare des fiches techniques sur
chacun de ces sujets (CI, environnements iso-prod, bases du cloud, sécurité
réseau) pour NX, et peut-être un cours si le format s'y prête. Si vous vous êtes
reconnu dans le profil de mon collègue (ou dans le mien, il y a quelques
années), n'hésitez pas à me dire par quelle brique vous allez commencer. On se
retrouve très vite sur NX :)
