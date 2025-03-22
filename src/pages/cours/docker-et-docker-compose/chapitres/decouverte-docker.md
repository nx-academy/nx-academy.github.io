---
layout: ../../../../layouts/CheatSheetsLayout.astro

title: Découvrez Docker
description: Une super description liée à ce chapitre.
---

<article>

# Découvrez Docker

![Un superhero regardant une ville de nuit, pixel art](/superhero.webp)

## Familiarisez-vous avec la conteneurisation

Contrairement à d’autres technologies, telles que le JavaScript, Linux et MySQL, Docker est un logiciel relativement récent dans le monde du développement. La version initiale du projet date du 20 mars 2013. Pour votre information, j’écris ces lignes le 21 mars 2023. C’était il y a 10 ans. À titre de comparaison, la première version de Google Chrome est sortie en 2008 et Node.JS en 2009.


Quand on y pense, c’est assez fou de voir à quel point Docker s’est imposé comme un standard. **D’un point de vue purement personnel, j’aurais autant de mal à voir ma vie de programmeur sans Git que sans Docker**.


En cherchant un peu sur Internet, j’ai trouvé, sur Wikipedia, une définition particulièrement explicite :

> Docker est un outil qui peut empaqueter une application et ses dépendances dans un conteneur isolé, qui pourra être exécuté sur n’importe quel serveur.

<br>

Cette définition provient de l’entreprise 451 Research et je la trouve très complète. Si on l’explique point par point, on y parle :


- D’empaqueter une application et ses dépendances ; c’est ce qu’on va appeler une image Docker. **Une image Docker est une empreinte digitale, ou blueprint, de votre application**. Vous pouvez essayer de l’imaginer comme un moule à gâteau. Ce n’est pas un gâteau mais c’est quelque chose qui va vous permettre de créer des gâteaux qui seront tous identiques (puisqu’ils utilisent le même moule).
- Dans un conteneur ; pour reprendre l’exemple ci-dessus, le conteneur, c’est votre gâteau. Au sein d’une infrastructure, vous pouvez avoir de nombreux conteneurs qui utilisent la même image. La conteneurisation est un type de virtualisation. Je reviens sur la notion de virtualisation plus loin dans ce chapitre.
- Dans un conteneur isolé ; ce concept est particulièrement important, tant d’un point de vue sécurité que d’un point de vue gestion des ressources. Un conteneur est un environnement intégralement isolé tant d’un point de vue réseau (autrement dit, il n'est au courant que de ses appels réseaux), processus (autrement dit, les tâches en cours d'exécution), stockage (autrement dit, les fichiers présents sur le disque dur), etc. Pour ce faire, Docker utilise des outils tels que [`chroot`](https://wiki.archlinux.org/title/Chroot) et [`cgroups`](https://wiki.archlinux.org/title/Cgroups).
- Exécuté sur n’importe quel serveur ; ce qui veut dire que Docker est multiplateforme. Vous pouvez faire tourner des conteneurs Docker sur Linux, PC et Mac. Vous pouvez déjà imaginer pourquoi c’est une bonne chose d’être multiplateforme mais sachez que nous reviendrons dessus dans la prochaine section.


<br>


Je vais maintenant vous parler de virtualisation et de conteneurisation. Vous allez apprendre ce qu’est une VM, un hyperviseur et des différences entre la virtualisation et la conteneurisation. Attrapez-vous un café, vous allez voir, ça va être passionnant !

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/vigile-boite-de-nuit.webp)

## Différenciez les VM des conteneurs



## Les problématiques résolues par Docker


## Les contextes d’utilisation de Docker


## Résumé

</article>
