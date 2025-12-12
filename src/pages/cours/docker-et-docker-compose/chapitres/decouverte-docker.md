---
layout: ../../../../layouts/ChapterLayout.astro

title: "Découvrez Docker"
description:
  "Comprenez la conteneurisation avec Docker : images, conteneurs, différences
  avec les VM et usages clés. Une introduction claire pour bien débuter."

nextChapterLink: installation-et-configuration-docker

chapterNumber: 1
sectionNumber: 1
sectionTitle: Partie 1 - Initiez-vous à Docker et au projet fil rouge
id: 1
---

<article>

# Découvrez Docker

![](/images/cours-docker-et-docker-compose/docker-port.webp)

## Familiarisez-vous avec la conteneurisation

Contrairement à d’autres technologies, telles que le JavaScript, Linux et MySQL,
Docker est un logiciel relativement récent dans le monde du développement. La
version initiale du projet date du 20 mars 2013. Pour votre information, j’écris
ces lignes le 21 mars 2023. C’était il y a 10 ans. À titre de comparaison, la
première version de Google Chrome est sortie en 2008 et Node.JS en 2009.

Quand on y pense, c’est assez fou de voir à quel point Docker s’est imposé comme
un standard. **D’un point de vue purement personnel, j’aurais autant de mal à
voir ma vie de programmeur sans Git que sans Docker**.

En cherchant un peu sur Internet, j’ai trouvé, sur Wikipedia, une définition
particulièrement explicite :

> Docker est un outil qui peut empaqueter une application et ses dépendances
> dans un conteneur isolé, qui pourra être exécuté sur n’importe quel serveur.

<br>

Cette définition provient de l’entreprise 451 Research et je la trouve très
complète. Si on l’explique point par point, on y parle :

- D’empaqueter une application et ses dépendances ; c’est ce qu’on va appeler
  une image Docker. **Une image Docker est une empreinte digitale, ou blueprint,
  de votre application**. Vous pouvez essayer de l’imaginer comme un moule à
  gâteau. Ce n’est pas un gâteau mais c’est quelque chose qui va vous permettre
  de créer des gâteaux qui seront tous identiques (puisqu’ils utilisent le même
  moule).
- Dans un conteneur ; pour reprendre l’exemple ci-dessus, le conteneur, c’est
  votre gâteau. Au sein d’une infrastructure, vous pouvez avoir de nombreux
  conteneurs qui utilisent la même image. La conteneurisation est un type de
  virtualisation. Je reviens sur la notion de virtualisation plus loin dans ce
  chapitre.
- Dans un conteneur isolé ; ce concept est particulièrement important, tant d’un
  point de vue sécurité que d’un point de vue gestion des ressources. Un
  conteneur est un environnement intégralement isolé tant d’un point de vue
  réseau (autrement dit, il n'est au courant que de ses appels réseaux),
  processus (autrement dit, les tâches en cours d'exécution), stockage
  (autrement dit, les fichiers présents sur le disque dur), etc. Pour ce faire,
  Docker utilise des outils tels que
  [`chroot`](https://wiki.archlinux.org/title/Chroot) et
  [`cgroups`](https://wiki.archlinux.org/title/Cgroups).
- Exécuté sur n’importe quel serveur ; ce qui veut dire que Docker est
  multiplateforme. Vous pouvez faire tourner des conteneurs Docker sur Linux, PC
  et Mac. Vous pouvez déjà imaginer pourquoi c’est une bonne chose d’être
  multiplateforme mais sachez que nous reviendrons dessus dans la prochaine
  section.

<br>

Je vais maintenant vous parler de virtualisation et de conteneurisation. Vous
allez apprendre ce qu’est une VM, un hyperviseur et des différences entre la
virtualisation et la conteneurisation. Attrapez-vous un café, vous allez voir,
ça va être passionnant !

---

<br>

![Un vigile à l'entrée d'une boite de nuit, pixel art](/images/cours-docker-et-docker-compose/homme-magasin-voiture.webp)

## Différenciez les VM des conteneurs

On va commencer par parler de VM et de conteneurs. Le terme VM signifie machine
virtuelle, ou Virtual Machine en anglais. Si vous programmez depuis quelque
temps, il est très fortement possible que vous ayez déjà entendu le terme VM.
Une VM est simplement l’émulation d’un ordinateur. Pour fonctionner une VM a
besoin d’un hyperviseur. Grâce à un hyperviseur, votre ordinateur, on l’appelle
aussi l’hôte, va être en mesure de faire tourner un ordinateur à l’intérieur de
l'ordinateur. Par exemple, le Mac sur lequel j’écris ce cours me permet de faire
tourner un serveur linux sous Ubuntu via l’hyperviseur VirtualBox.

Ce qui est assez intéressant avec les VM, c’est que vous pouvez leur allouer des
ressources bien spécifiques comme la mémoire vive (la RAM), le processeur (le
CPU) et l’espace disque. Il est très fréquent qu’un serveur physique de
datacenter, pour lequel on emploie souvent le terme Bare Metal, “hoste”
(héberge) plusieurs VM. Sachez qu’il existe différents types d’hyperviseurs. Si
le sujet vous intéresse, vous pouvez jeter
[un œil à cette ressource](https://www.it-connect.fr/les-types-dhyperviseurs/).

Globalement, un conteneur est un peu comme une VM. C’est un ordinateur dans
votre ordinateur. Cela dit, la différence entre les deux vient de la partie
virtualisation matérielle. En effet, chaque VM va émuler son matériel, soit sa
carte réseau, son micro-processeur, etc. Autrement dit, si vous avez 10 VM qui
tournent sur votre ordinateur ou votre serveur, vous avez dix fois une émulation
du matériel.

Pour les conteneurs, c’est exactement l’inverse. Tous les conteneurs partagent
cette virtualisation matérielle, ce qui a un fort impact sur les performances de
votre ordinateur hôte tant d’un point de vue CPU ou RAM qu’espace disque. Ainsi,
Les conteneurs sont beaucoup plus légers que les VM.

<br>

![Un schéma présentant de manière graphique les différences d'architecture entre une VM et une conteneur](/images/cours-docker-et-docker-compose/container-vs-vm.webp)

<br>

**Grâce au schéma ci-dessus, vous pouvez voir que chaque VM a son propre OS. Ce
sera donc votre boulot de mettre à jour les OS de chacune de vos VM**. Avec un
conteneur, vous mettez à jour l’image et cela se répercute sur l’ensemble de vos
conteneurs. Il y a une vraie notion de temporalité avec les VM qu’il n’y a pas
avec les conteneurs. Un conteneur est fait pour être éphémère. Vous le lancez,
il effectue sa tâche et vous le supprimez (on dit souvent qu’on les “kill” ou
qu’on les “bute”).

**Cette notion d'éphémère vient aussi du fait que les conteneurs se lancent
quasiment instantanément à la différence des VM qui peuvent prendre plusieurs
minutes à se lancer**. Je vous invite
[à lire cette ressource](https://www.freecodecamp.org/news/a-beginner-friendly-introduction-to-containers-vms-and-docker-79a9e3e119b)
avant de passer à la suite. Elle fournit un bon complément d’informations à ce
que je viens de vous expliquer. Vous pouvez vous arrêter à la partie Fundamental
Docker Concepts (sauf si vous souhaitez prendre de l’avance sur le cours).

---

<br>

![Un élève en train de tricher dans une classe, pixel
art](/images/cours-docker-et-docker-compose/enfant-puzzle.webp)

## Les problématiques résolues par Docker

**Quand on apprend à utiliser un outil, il y a toujours une question essentielle
que l’on doit se poser : à quelle problématique répond l’outil, le langage ou le
framework ?** Par exemple, quelle est l’utilité de la programmation orientée
objet ? A quelle problématique la programmation orientée objet essaye de
répondre ? Quelles sont les limites ? Mêmes questions pour la programmation
fonctionnelle.

Se poser ces questions fait vraiment de vous un ou une meilleure ingénieure.
C’est ce qui vous permet de prendre du recul et de bien comprendre pourquoi vous
utilisez tel ou tel outil. La qualité attendue de la réponse n’est pas la même
en fonction de si vous êtes junior ou senior. Cela dit, quand je reçois en
entretien des candidats ayant au moins 4 ans d’expérience, ce sont des questions
que je pose quasi systématiquement.

On va donc profiter de cette section pour faire un essai. J’aimerais que vous
ouvriez un autre onglet dans votre navigateur et que vous recherchiez les
problématiques que Docker cherche à résoudre. Prenez une dizaine de minutes puis
revenez sur le cours. On pourra comparer nos réponses.

<br>

![Un meme concernant Docker et OpenStack basé sur des images du film Inception](/images/cours-docker-et-docker-compose/meme-docker.webp)

<br>

C’est bon ? Alors, comparons nos réponses.

Dans la page de présentation du cours, j’ai donné un exemple d’une situation
professionnelle courante. Je l’appelle le **“ça marche chez moi mais pas chez
mon voisin”**. Combien de fois cette situation vous est déjà arrivée ? Vous
bossez sur un projet, un nouveau arrive dessus, il suit les étapes
d’installation à la lettre mais le projet ne veut pas s’installer ou ne veut pas
se lancer. Quand le projet est “simple”, autrement dit qu’il ne comprend pas de
base de données ou qu’il n’y a qu’un langage, c’est déjà ennuyeux. Mais imaginez
que le projet soit complexe, qu’il comprenne plusieurs bases de données
différentes, qu’il utilise plusieurs langages, là, ça peut clairement devenir
l’enfer.

**Un autre problème assez récurrent est la gestion des différents systèmes
d’exploitation dans une équipe**. Certains vont utiliser MacOS, d’autres Linux
et d’autres encore Windows. Seulement, voilà, la majeure partie des serveurs
webs tourne sur Linux et ses nombreuses distributions. Qu’est-ce qui vous
garantit que ce qui marche dans un environnement de développement sur un
ordinateur de l’un ou l’une de vos collègues fonctionnera aussi dans
l'environnement de production ? Vous ne pouvez pas le savoir. **C’est le fameux
“ça marche en dev mais pas en prod”**.

Admettons maintenant que vous développiez une API Rest en Node.js. Au moment du
démarrage du projet, la LTS, pour Long Term Support, était la version 16. Votre
ordinateur utilise donc Node 16 et vous avez une dizaine de serveurs qui font
tourner cette API. Eux aussi sont tous sur Node 16. Vous apprenez au cours de
l’année que cette version va être dépréciée, autrement dit qu’elle ne sera plus
mise à jour et vous allez devoir migrer tout le parc informatique vers Node 18.
Imaginez le temps que vous allez perdre à faire ces montées de versions sur tous
les serveurs.

Il existe bien des outils permettant d’automatiser tout ça mais ça ira toujours
plus lentement qu’avec Docker. **Avec Docker, vous mettez à jour votre image,
vous faites le travail de montée de version une fois et vous l’appliquez
partout**. C’est quand même sacrément plus pratique, non ?

En plus, grâce à Docker, vous n’allez pas “polluer” votre machine en installant
des logiciels. Terminée l’installation de deux versions différentes de MariaDB
ou de Redis. Docker va vous permettre de facilement changer de version entre vos
projets sans avoir à vous embêter à installer ou désinstaller des logiciels.

D’ailleurs, Docker est particulièrement pratique quand vous reprennez un projet
legacy, en Php 4 ou Python 2 par exemple. Grâce à Docker, vous allez être
capable de faire fonctionner un projet legacy sur votre ordinateur, puis en
production avant de réaliser la montée de versions.

<br>

---

<br>

Si vous avez bien compris la section précédente, vous vous dites peut-être qu’il
est possible de réaliser la même chose avec des VM. J’installe un hyperviseur
puis ma VM et je fais bosser toute l’équipe de développement dans une VM linux.
Sachez que c’est totalement possible. Vous serez dans un environnement proche de
celui de production et vous ne polluerez pas votre machine hôte. Seulement vous
aurez quand même à gérer les montées de version sur l’ensemble du parc
informatique. Autre point négatif, rappelez-vous que les VM consomment plus de
ressources que les conteneurs.

Avant de passer à la dernière section de ce premier chapitre, il y a un dernier
point que je souhaite aborder : l’écosystème. **Si vous avez déjà utilisé
VirtualBox, vous avez peut-être déjà eu des difficultés à trouver la bonne
image**. Le plus souvent cette image est un fichier ISO. C’est en quelque sorte
le disque d’installation de votre OS. Avec Docker, trouver la bonne image se
fait très facilement [grâce à DockerHub](https://hub.docker.com/). Vous pouvez
faire le parallèle avec GitHub.

Sur GitHub, vous pouvez trouver le code de projets. Sur DockerHub, vous trouvez
des images Docker. Nous verrons ensemble dans la suite de ce cours comment
choisir la bonne image et comment en envoyer sur DockerHub.

Mais vous pouvez déjà faire un essai. Cherchez des images officielles pour
Node.js ou MongoDB. Vous pourrez voir qu’il y existe beaucoup. Pour votre
information,
[c’est ici que nous récupérons nos images NodeJS](https://hub.docker.com/_/node).

![La page officielle dédiée à Node.JS sur
DockerHub](/images/cours-docker-et-docker-compose/nodejs-dockerhub.webp)

<br>

---

![Un serveur tenant un plateau dans un restaurant parisien, pixel art](/images/cours-docker-et-docker-compose/femme-manuel-utilisation.webp)

<br>

## Les contextes d’utilisation de Docker

L’objectif principal de ce cours est de vous apprendre à utiliser Docker dans un
contexte professionnel. L’idée est que vous puissiez créer vos propres images
Docker et les utiliser aussi bien dans vos environnements de développement que
ceux de production et vos CI.

Cela dit, il y a deux concepts particulièrement importants que je n’ai pas
abordés : l’orchestration (et les orchestrateurs) et les registries Docker.
[Selon RedHat](https://www.redhat.com/fr/topics/automation/what-is-orchestration)
:

> L’orchestration correspond à la configuration, gestion et coordination
> automatisées des systèmes informatiques, applications et services.
> L’orchestration facilite la gestion des tâches et workflows complexes pour le
> service informatique

<br>

Même si cette définition peut sembler un peu complexe, elle résume bien le
concept d’orchestration. Essayez de penser à un chef d’orchestre. Le rôle d’un
chef d’orchestre est de coordonner des musiciens. Il indique le tempo, les
nuances (piano, mezzo piano, etc.) et quand les musiciens commencent et
s’arrêtent. Un orchestrateur fonctionne exactement pareil. Son rôle n’est pas de
réaliser une tâche métier mais plutôt d’organiser les différentes tâches métiers
des différents exécutants.

Il existe des solutions d'orchestration pour les conteneurs Docker (mais pas
que). Vous avez sûrement entendu parlé [de Kubernetes](https://kubernetes.io/).
Docker a sa propre solution appelée
[Docker Swarm](https://docs.docker.com/engine/swarm/). Amazon Web Services (AWS)
a, entre autres, [Fargate](https://aws.amazon.com/fr/fargate/). Vous utiliserez
les orchestrateurs pour vos environnements de production.

Ils vous permettront de créer ce qu’on appelle des clusters. Autrement dit, un
ensemble de conteneurs.

<br>

![Un schéma montrant un regroupant de conteneurs dans un orchestrateur](/images/cours-docker-et-docker-compose/orchestrateur-schema.webp)

<br>

Votre orchestrateur va récupérer vos images Docker prêtes à l’emploi et ajouter
et supprimer des conteneurs Docker.

Passons maintenant aux registries Docker. Un registry Docker est un endroit où
vous allez stocker vos images Docker. Le registry peut être l’un de vos serveurs
informatiques tout comme il peut être une solution SaaS. Docker propose un
registry Docker via DockerHub.

Comme pour GitHub, les images peuvent être publiques, autrement dit tout le
monde y a accès, ou privées, c’est-à-dire que seules les personnes autorisées y
ont accès. Sachez qu’AWS propose son propre registry tout comme Google Cloud
Platform (GCP).

Dans ce cours, on utilisera DockerHub mais sachez que les règles d’utilisation
sont globalement les mêmes entre les registry Docker. Vous ne devriez pas être
perdus. Bien, maintenant que vous en savez un peu plus sur Docker, il est temps
de l’installer sur votre ordinateur !

<br>

---

<br>

![Un vendeur de journaux dans la rue, pixel art](/images/misc/vendeur-journaux.webp)

## Résumé

- Docker vous permet de faire de la conteneurisation. La conteneurisation est un
  processus de virtualisation qui vous permet de créer des ordinateurs dans
  votre ordinateur.
- La virtualisation est plus gourmande en ressources parce que l’intégralité de
  l’OS et du hardware sont virtualisés pour chaque instance. Les conteneurs les
  partagent.
- Docker vous permet de facilement répliquer un environnement et de le partager
  entre plusieurs ordinateurs.

</article>
