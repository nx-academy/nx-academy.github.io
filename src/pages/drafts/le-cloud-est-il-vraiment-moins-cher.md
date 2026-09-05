---
layout: ../../layouts/BlogPostLayout.astro

title: "Le cloud public coûte-t-il vraiment moins cher ?"
description:
  "Le paiement à l'usage promet de ne payer que ce qu'on consomme. En pratique,
  la facture surprend souvent. Ce qui coûte vraiment, ce que l'auto-hébergement
  cache en face, et pourquoi la bonne question n'est pas celle du prix."

imgAlt:
  Une facture qui se déroule interminablement depuis un écran d'ordinateur,
  pixel art
imgSrc: /images/articles/facture-cloud-qui-se-deroule.webp

kind: Articles
format: reflexion
serie: cloud
tags:
  - Cloud
  - DevOps
author: Thomas Dimnet
publishedDate: 09/30/2026

faq:
  - question: Le cloud public est-il moins cher qu'un serveur dédié ?
    answer:
      "Pas systématiquement. Le cloud est nettement avantageux sur une charge
      variable ou imprévisible, puisqu'on ne paie rien quand on ne consomme
      rien. Sur une charge stable et connue 24 h/24, un serveur dédié revient
      souvent moins cher à ressources égales."
  - question: Pourquoi ma facture cloud est-elle plus élevée que prévu ?
    answer:
      "Le plus souvent à cause de postes qui ne se voient pas au moment du
      déploiement : les frais de sortie de données, le stockage et les
      sauvegardes de ressources éteintes ou oubliées, et des instances
      dimensionnées bien au-dessus de leur usage réel."
  - question: Qu'est-ce que le repatriement ?
    answer:
      "C'est le mouvement inverse de la migration vers le cloud : une entreprise
      redescend tout ou partie de son infrastructure sur du matériel dédié,
      généralement parce que sa charge est devenue stable et qu'elle paie une
      élasticité dont elle ne se sert plus."
---

Il y a quelques mois, j'ai reçu une facture cloud à 40 € pour un mois où je
n'avais, de mon point de vue, rien fait. Pas de nouveau service, pas de pic de
trafic, pas de projet lancé.

J'ai fini par trouver. Un environnement de test monté un soir pour vérifier une
idée, laissé en marche. La machine était éteinte depuis longtemps — mais son
disque, son adresse IP réservée et ses sauvegardes automatiques, non.

Ce n'était pas une grosse somme. C'était surtout une bonne illustration de ce
que le paiement à l'usage fait vraiment : **il ne supprime pas le coût, il le
rend invisible jusqu'au relevé**.

---

## La promesse est réelle, mais elle est conditionnelle

Il faut rendre au cloud ce qui lui appartient. Ne payer que ce qu'on consomme,
c'est une vraie rupture, et pour certains profils c'est imbattable.

Un projet qui démarre, dont personne ne sait s'il aura dix ou dix mille
utilisateurs, n'a aucune raison d'immobiliser de l'argent dans du matériel. Une
charge saisonnière, un site qui prend trois fois son trafic en décembre, une
campagne qui dure six semaines : dans tous ces cas, le cloud gagne sans discuter
parce qu'il fait payer le pic sans faire payer le reste de l'année.

Mais cette promesse a une condition qu'on énonce rarement : **elle suppose que
la consommation baisse quand l'activité baisse**. Or dans beaucoup
d'installations, elle ne baisse jamais. Les environnements de test tournent la
nuit, les instances sont dimensionnées pour le pic et y restent, les sauvegardes
s'accumulent. On paie alors un modèle élastique sur une consommation
parfaitement rigide, ce qui est la pire des deux options.

---

## Ce qui coûte vraiment n'est pas ce qu'on regarde

Quand on compare deux offres, on regarde le prix de la machine. C'est presque
toujours la mauvaise ligne.

**Les frais de sortie de données** sont le poste le plus sous-estimé. Faire
entrer des données ne coûte rien ; les faire sortir, si. Tant qu'on sert des
pages web, ça reste modeste. Le jour où on sert des fichiers volumineux, des
images ou de la vidéo, cette ligne peut dépasser tout le reste. Elle a aussi un
effet de bord bien pratique pour le fournisseur : plus vos données sont
volumineuses, plus les déplacer ailleurs coûte cher.

**Ce qui reste facturé à l'arrêt**, ensuite — mes 40 €. Une machine éteinte ne
consomme plus de calcul, mais son disque persiste, son adresse réservée reste
réservée, ses instantanés dorment quelque part. Chacun de ces postes est
dérisoire pris isolément, et c'est exactement ce qui les rend durables.

**Le sur-dimensionnement**, enfin, et c'est le plus fréquent. On choisit une
taille d'instance au démarrage, sans mesure, en prenant large « pour être
tranquille ». Personne ne revient jamais dessus. J'ai vu des applications
tourner des années sur quatre fois les ressources qu'elles utilisaient
réellement, simplement parce que le sujet n'appartenait à personne.

C'est le vrai problème, d'ailleurs. **Le coût du cloud n'a pas de
propriétaire.** Une commande de serveur passait par une validation, une
signature, un budget. Un service créé en trois clics ne passe par rien du tout.

---

## En face, l'auto-hébergement n'est pas gratuit non plus

La comparaison honnête ne s'arrête pas au prix de la machine, dans un sens comme
dans l'autre. Un serveur dédié affiche un tarif mensuel très bas et c'est
souvent avec ce chiffre qu'on argumente contre le cloud. Ce chiffre est
incomplet.

Il manque l'astreinte, c'est-à-dire quelqu'un qui répond quand le disque lâche à
3 h du matin. Il manque le remplacement du matériel, qui n'attend pas votre
trésorerie. Il manque le temps d'équipe passé à mettre à jour des systèmes,
gérer des sauvegardes et les tester. Il manque, surtout, **les compétences**, et
le fait qu'elles ne sont pas interchangeables : deux personnes qui savent
exploiter du matériel, ça se recrute, ça se garde, et ça ne se remplace pas en
une semaine.

Le cloud ne fait pas disparaître ce travail. Il le remplace par une ligne de
facture, ce qui est un progrès quand on est trois et une dépense discutable
quand on est une DSI de deux cents personnes qui a déjà les équipes.

---

## Le repatriement dit quelque chose d'utile

Ces dernières années, quelques entreprises ont fait le chemin inverse et l'ont
raconté publiquement. On a beaucoup lu que c'était la fin du cloud. Je crois que
c'est un contresens.

Ce que ces retours ont en commun, ce n'est pas une déception technique, c'est un
**profil de charge devenu stable**. Une entreprise installée, dont le trafic
varie de 20 % d'un mois sur l'autre et dont le métier n'évolue plus par sauts,
paie une élasticité qu'elle n'utilise plus. C'est un calcul, pas un revirement
idéologique.

Ce qui devrait nous intéresser là-dedans, c'est la méthode. **Ils ont
recalculé.** Le choix pris au démarrage, quand tout était incertain, n'a pas été
considéré comme définitif. C'est probablement la seule leçon vraiment
transposable, et elle vaut aussi dans l'autre sens : beaucoup de parcs
auto-hébergés n'ont jamais été rejaugés depuis leur achat.

---

## Alors, moins cher ?

La question, telle qu'elle est posée, n'a pas de réponse. Il manque toujours la
seule variable qui compte : **moins cher pour quel profil de charge ?**

Sur une charge variable, imprévisible ou qui démarre, le cloud gagne largement,
et le débat n'a pas grand intérêt. Sur une charge stable, connue, tournant en
continu depuis des années, il est très souvent plus cher — et ce n'est pas un
défaut, c'est le prix d'une option dont on ne se sert plus.

Ce que je retiens de ma facture à 40 €, c'est finalement moins une histoire de
coût qu'une histoire d'attention. **Le cloud ne rend pas les choses moins
chères, il rend les décisions moins visibles.** La contrepartie du confort,
c'est de devoir regarder de temps en temps ce qui tourne — et si la raison qui a
motivé le choix initial tient toujours.
