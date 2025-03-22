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

On va commencer par parler de VM et de conteneurs. Le terme VM signifie machine virtuelle, ou Virtual Machine en anglais. Si vous programmez depuis quelque temps, il est très fortement possible que vous ayez déjà entendu le terme VM. Une VM est simplement l’émulation d’un ordinateur. Pour fonctionner une VM a besoin d’un hyperviseur. Grâce à un hyperviseur, votre ordinateur, on l’appelle aussi l’hôte, va être en mesure de faire tourner un ordinateur à l’intérieur de l'ordinateur. Par exemple, le Mac sur lequel j’écris ce cours me permet de faire tourner un serveur linux sous Ubuntu via l’hyperviseur VirtualBox.


Ce qui est assez intéressant avec les VM, c’est que vous pouvez leur allouer des ressources bien spécifiques comme la mémoire vive (la RAM), le processeur (le CPU) et l’espace disque. Il est très fréquent qu’un serveur physique de datacenter, pour lequel on emploie souvent le terme Bare Metal, “hoste” (héberge) plusieurs VM. Sachez qu’il existe différents types d’hyperviseurs. Si le sujet vous intéresse, vous pouvez jeter [un œil à cette ressource](https://www.it-connect.fr/les-types-dhyperviseurs/).


Globalement, un conteneur est un peu comme une VM. C’est un ordinateur dans votre ordinateur. Cela dit, la différence entre les deux vient de la partie virtualisation matérielle. En effet, chaque VM va émuler son matériel, soit sa carte réseau, son micro-processeur, etc. Autrement dit, si vous avez 10 VM qui tournent sur votre ordinateur ou votre serveur, vous avez dix fois une émulation du matériel.


Pour les conteneurs, c’est exactement l’inverse. Tous les conteneurs partagent cette virtualisation matérielle, ce qui a un fort impact sur les performances de votre ordinateur hôte tant d’un point de vue CPU ou RAM qu’espace disque. Ainsi, Les conteneurs sont beaucoup plus légers que les VM.


<br>


![Un schéma présentant de manière graphique les différences d'architecture entre une VM et une conteneur](/container-vs-vm.png)


<br>


**Grâce au schéma ci-dessus, vous pouvez voir que chaque VM a son propre OS. Ce sera donc votre boulot de mettre à jour les OS de chacune de vos VM**. Avec un conteneur, vous mettez à jour l’image et cela se répercute sur l’ensemble de vos conteneurs. Il y a une vraie notion de temporalité avec les VM qu’il n’y a pas avec les conteneurs. Un conteneur est fait pour être éphémère. Vous le lancez, il effectue sa tâche et vous le supprimez (on dit souvent qu’on les “kill” ou qu’on les “bute”).


**Cette notion d'éphémère vient aussi du fait que les conteneurs se lancent quasiment instantanément à la différence des VM qui peuvent prendre plusieurs minutes à se lancer**. Je vous invite [à lire cette ressource](https://www.freecodecamp.org/news/a-beginner-friendly-introduction-to-containers-vms-and-docker-79a9e3e119b) avant de passer à la suite. Elle fournit un bon complément d’informations à ce que je viens de vous expliquer. Vous pouvez vous arrêter à la partie Fundamental Docker Concepts (sauf si vous souhaitez prendre de l’avance sur le cours).


## Les problématiques résolues par Docker


## Les contextes d’utilisation de Docker


## Résumé

</article>
