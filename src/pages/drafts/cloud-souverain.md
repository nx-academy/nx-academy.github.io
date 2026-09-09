---
layout: ../../layouts/BlogPostLayout.astro

title: "Cloud souverain : de quoi parle-t-on vraiment ?"
description:
  "Souveraineté juridique, souveraineté technique, label : le mot « souverain »
  recouvre trois choses différentes qu'on mélange en permanence. Ce que chacune
  veut dire, ce que les offres de confiance résolvent et ce qu'elles laissent
  ouvert."

imgAlt:
  Une carte d'Europe posée sur une baie de serveurs, avec un cadenas fermé sur
  l'un des tiroirs, pixel art
imgSrc: /images/articles/carte-europe-baie-serveurs.webp

kind: Articles
format: reflexion
serie: cloud
tags:
  - Cloud
  - Souveraineté
author: Thomas Dimnet
publishedDate: 10/05/2026

faq:
  - question: Qu'est-ce que le cloud souverain ?
    answer:
      "L'expression n'a pas de définition unique. Elle mélange trois questions
      distinctes : quel droit s'applique aux données, qui opère techniquement
      l'infrastructure et détient les clés de chiffrement, et de quelle
      qualification officielle l'offre dispose."
  - question: Héberger ses données en France suffit-il à être souverain ?
    answer:
      "Non. La localisation des serveurs est une condition parmi d'autres. Une
      infrastructure située en France mais opérée par une entité soumise au
      droit extraterritorial d'un autre pays reste exposée aux demandes de ce
      droit."
  - question: Qu'est-ce que la qualification SecNumCloud ?
    answer:
      "C'est un référentiel d'exigences de l'ANSSI pour les services
      d'informatique en nuage, qui couvre à la fois la sécurité technique et des
      critères de protection contre les droits extraterritoriaux. Une offre y
      est qualifiée service par service, pas globalement."
---

Il y a un moment assez précis, dans une discussion sur le cloud, où le mot
« souverain » arrive. Et il y a un moment tout aussi précis, quelques minutes
plus tard, où on s'aperçoit que les deux personnes autour de la table ne
parlaient pas de la même chose.

L'une pensait au droit. L'autre pensait à qui tient physiquement les machines.
Elles étaient d'accord depuis le début et ne le savaient pas — ou l'inverse, ce
qui est pire.

C'est le problème de ce mot : **il désigne trois questions différentes, et on
les mélange en permanence**. Les démêler prend cinq minutes et fait gagner
beaucoup de temps ensuite.

---

## Trois questions sous un seul mot

**La souveraineté juridique**, d'abord. Quel droit s'applique à vos données ? La
réponse ne dépend pas seulement de l'endroit où elles sont stockées, mais aussi
de la nationalité de l'entité qui les détient. Un fournisseur relevant d'un
droit extraterritorial — le _Cloud Act_ américain est l'exemple le plus cité —
peut se voir adresser une demande portant sur des données hébergées ailleurs. Le
RGPD encadre les transferts hors de l'Union, sans faire disparaître cette
tension : deux droits se rencontrent, et l'un ne prime pas mécaniquement sur
l'autre.

**La souveraineté technique**, ensuite. Qui exploite réellement
l'infrastructure ? Qui peut accéder aux machines, aux journaux, aux
sauvegardes ? Et surtout : **qui détient les clés de chiffrement ?** Cette
dernière question est de loin la plus opérationnelle des trois. Des données
chiffrées avec des clés que le fournisseur ne possède pas ne sont pas lisibles
par lui, quel que soit le droit qui s'applique.

**Le label**, enfin. Une qualification officielle atteste qu'une offre répond à
un référentiel donné. En France, SecNumCloud, publié par l'ANSSI, couvre à la
fois des exigences de sécurité technique et des critères visant à protéger
contre les droits extraterritoriaux. C'est un point d'appui solide — à condition
de se rappeler qu'**une qualification porte sur des services identifiés, pas sur
une marque entière**.

Ces trois questions ne se recouvrent pas. On peut être irréprochable sur l'une
et exposé sur les deux autres, et c'est précisément là que les discussions
dérapent.

---

## « Mes données sont en France » ne répond à aucune des trois

C'est la phrase qui revient le plus, et elle est trompeuse parce qu'elle n'est
pas fausse. La localisation compte : elle a des effets sur la latence, sur
l'application du RGPD, sur les obligations sectorielles.

Mais elle ne dit rien de qui opère l'infrastructure, rien de qui détient les
clés, rien du droit auquel l'entité exploitante est soumise. Choisir la région
« Paris » d'un grand fournisseur international, c'est régler une question de
géographie. Ce n'est pas régler la question juridique, et
[la fiche sur le cloud public, privé et hybride](/fiches/difference-cloud-public-prive-hybride)
donne déjà le vocabulaire pour voir pourquoi : ce qui compte n'est pas seulement
où sont les machines, mais **à qui elles appartiennent et qui les exploite**.

---

## Les offres « de confiance » et leurs zones grises

Une réponse s'est structurée ces dernières années : des coentreprises associant
un acteur européen et un fournisseur américain, exploitant sous licence la
technologie de ce dernier, avec l'ambition d'obtenir une qualification
nationale. L'intention est sérieuse et le montage n'a rien d'absurde : il
cherche à conserver la richesse fonctionnelle des grandes plateformes tout en
plaçant l'exploitation sous droit européen.

Reste que le montage porte ses propres questions, qu'il vaut mieux poser
franchement que découvrir plus tard :

Une technologie sous licence suit la feuille de route de celui qui la conçoit.
Les fonctionnalités arrivent avec un décalage, parfois partiellement. La
dépendance industrielle ne disparaît pas, elle change de forme — et une licence,
ça se renégocie.

À côté, une autre voie existe : des fournisseurs européens qui construisent leur
propre pile. Le périmètre fonctionnel est plus étroit, et il faut le regarder en
face. Mais la dépendance, elle, est d'une autre nature.

Aucune de ces options n'est « la bonne ». Ce sont des compromis différents entre
richesse fonctionnelle et indépendance, et le seul mauvais choix est celui qu'on
fait sans savoir lequel on prend.

---

## Ce que ça change, concrètement, au moment de déployer

Pour la grande majorité des projets — un site, un produit qui démarre, un outil
interne sans données sensibles — la réponse honnête est : **rien**. Le cloud
public international reste le choix par défaut, et personne ne devrait s'en
excuser.

La question devient réelle dès que des données de santé, bancaires, judiciaires
ou classifiées entrent en jeu. Là, elle arrive **avant** le choix technique, pas
après. Et la première chose à faire n'est pas de comparer des fournisseurs, mais
de savoir quelle qualification votre secteur exige : la réglementation décide,
et elle décide en amont.

Entre les deux, il y a une zone large où rien ne vous oblige et où le sujet
mérite quand même cinq minutes. Deux réflexes suffisent : **chiffrer avec des
clés que vous détenez** dès que les données le justifient, et **savoir comment
vous partiriez** — un export documenté, testé une fois, sur des formats
standards.

Ces deux réflexes ont un intérêt qui dépasse largement la souveraineté. Ils
répondent aussi à la panne, au changement de tarif, au rachat. C'est d'ailleurs
ce qui les rend faciles à défendre en réunion.

---

Cet article fait la paire avec
[celui sur le coût du cloud](/drafts/le-cloud-est-il-vraiment-moins-cher), et ce
n'est pas un hasard : ce sont les deux vraies questions qu'on se pose avant de
signer. Combien ça va coûter, et chez qui je mets mes données.

Dans les deux cas, la réponse dépend de votre situation et pas d'un principe
général. Et dans les deux cas, **la pire décision est celle qu'on prend une fois
et qu'on ne rejauge jamais**.
