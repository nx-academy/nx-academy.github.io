---
layout: ../../../../layouts/ChapterLayout.astro

title: "Gérez le réseau de votre infrastructure Docker"
description:
  "Comprenez le fonctionnement des ports Docker et configurez expose, ports et
  variables d’environnement. Apprenez à connecter votre conteneur à votre
  machine hôte."

previousChapterLink: creation-premier-docker-compose
nextChapterLink: installation-et-configuration-services

chapterNumber: 3
sectionNumber: 2
sectionTitle: Partie 2 - Créez une API REST avec Docker et docker-compose
id: 6
---

<article>

# Gérez le réseau de votre infrastructure

![Un parking de voitures, pixel art](/images/cours-docker-et-docker-compose/parking-voitures.webp)

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre
[sur la branche `partie-2/chapitre-3-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-3-debut).
En plus de cette branche, nous allons utiliser
[cette issue Github](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/3)
comme problématique. Je vous invite à en prendre connaissance avant de passer à
la lecture du chapitre.

## Le port, un point central des réseaux informatiques

Nous abordons un chapitre assez central du cours. Rassurez-vous, ce chapitre
n’est pas très long. Il est aussi nettement moins dense que le chapitre
précédent. L’objectif de ce chapitre est de vous présenter quelques notions de
réseau de base. Nous allons voir ensemble les ports, sur votre machine hôte et
dans votre conteneur Docker et comment les deux communiquent ensemble. Nous
verrons aussi un peu les variables d’environnement et comment connaître celles
présentes dans un conteneur Docker.

Si on reprend
[notre problématique du chapitre](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/2),
nous avons en face de nous un problème “assez simple”. Nous avons configuré une
API Node via Express et nous lui avons dit explicitement d’écouter le port 3000.
Cela dit, à aucun moment, nous n’avons prévenu notre conteneur qu’il devait
ouvrir le port 3000. Idem pour notre machine hôte : elle n’est pas au courant
qu’elle doit connecter son port 3000 avec le port 3000 de notre conteneur.

Avant d’aller plus loin, j’ai envie de prendre un peu le temps de parler de
cette notion de port en informatique. Les ports, et numéros de port, sont
fortement liés aux réseaux informatiques. Les ports représentent des points
d’entrée et de sortie dans vos communications réseaux. Ils vous permettent de
contacter un service spécifique. Par exemple, le port 25 est associé au protocol
SMTP (Simple Mail Transfer Protocol) qui est utilisé pour le courrier
électronique. En Node.JS, on a tendance à utiliser le port 3000. Chaque port ne
peut être occupé que par un service.

En fait, **c’est un peu comme un gigantesque parking. Certaines places sont
réservées (certains ports le sont aussi), d’autres sont à placement libre**. Par
contre, une fois garée sur votre place, cette place ne peut plus être attribuée
à quelqu’un d’autre. Du moins, tant que vous n’avez pas quitté la place. Pour
les ports, cela fonctionne exactement de la même manière. Vous pouvez décider de
vous attribuer un port pour votre application. Ce port restera indisponible tant
que votre application l’utilisera. Pour info, c’est un grand parking : 65 535
numéros de port sont disponibles.

Les ports font partie de la couche 4 (la couche transport) du modèle OSI. Ce
modèle définit les différentes couches de communication des protocoles réseaux
et accessoirement d’Internet. Chaque couche a un rôle bien spécifique. Je vous
invite fortement à lire ces deux articles de CloudFlare qui en parlent. Vous
n’avez pas forcément à tout connaître en détail mais encore une fois, il est
important de savoir que ça existe et d’avoir des notions de base du
fonctionnement des réseaux informatiques.

- [Qu’est-ce qu’un port ?](https://www.cloudflare.com/fr-fr/learning/network-layer/what-is-a-computer-port/) -
  Article en français qui explique bien les ports, qui vous parlent un peu du
  modèle OSI et donne quelques numéros de port classiques.
- [Qu’est-ce que le modèle OSI ?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) -
  Article en anglais avec des schémas et de bonnes explications.

<br>

Il est maintenant possible que vous vous posiez la question de quel(s) port(s)
sont utilisés sur votre ordinateur (en tout cas, moi, c’est la question que je
me pose quand j’écris ces lignes ^^).

Lancez l’une des commandes suivantes :

```bash
# Sous MacOS et Linux
sudo lsof -P -i TCP -s TCP:LISTEN

# Sous Windows
netstat -aon
```

<br>

En faisant ça sur mon ordinateur (MacOS), j’ai le résultat suivant :

```bash
COMMAND 	PID   USER   FD   TYPE         	DEVICE SIZE/OFF NODE NAME
ControlCe   441 family	5u  IPv4 0x64cf0533e956993d  	0t0  TCP *:7000 (LISTEN)
ControlCe   441 family	6u  IPv6 0x64cf0538b851fed5  	0t0  TCP *:7000 (LISTEN)
ControlCe   441 family	7u  IPv4 0x64cf0533e956a44d  	0t0  TCP *:5000 (LISTEN)
ControlCe   441 family	8u  IPv6 0x64cf0538b8520655  	0t0  TCP *:5000 (LISTEN)
rapportd	462 family	3u  IPv4 0x64cf0533e954acfd  	0t0  TCP *:50327 (LISTEN)
rapportd	462 family	4u  IPv6 0x64cf0538b851a455  	0t0  TCP *:50327 (LISTEN)
Dropbox 	500 family  107u  IPv4 0x64cf0533e9562f5d  	0t0  TCP *:17500 (LISTEN)
Dropbox 	500 family  108u  IPv6 0x64cf0538b85249d5  	0t0  TCP *:17500 (LISTEN)
Dropbox 	500 family  142u  IPv4 0x64cf0533e955993d  	0t0  TCP localhost:17600 (LISTEN)
Dropbox 	500 family  149u  IPv4 0x64cf0533e955780d  	0t0  TCP localhost:17603 (LISTEN)
figma_age   511 family	3u  IPv4 0x64cf0533e9564bcd  	0t0  TCP localhost:44950 (LISTEN)
figma_age   511 family	4u  IPv4 0x64cf0533e95661ed  	0t0  TCP localhost:44960 (LISTEN)
figma_age   511 family   11u  IPv4 0x64cf0533e9566cfd  	0t0  TCP localhost:18412 (LISTEN)
figma_age   511 family   39u  IPv4 0x64cf0533e956780d  	0t0  TCP localhost:7335 (LISTEN)
agent   	551 family   10u  IPv4 0x64cf0533e9568e2d  	0t0  TCP localhost:5000 (LISTEN)
agent   	551 family   13u  IPv4 0x64cf0533e955cbcd  	0t0  TCP localhost:5001 (LISTEN)
agent   	551 family   18u  IPv4 0x64cf0533e956193d  	0t0  TCP localhost:5002 (LISTEN)
trace-age   660 family   14u  IPv4 0x64cf0533e954e44d  	0t0  TCP localhost:8126 (LISTEN)
process-a   661 family   13u  IPv4 0x64cf0533e954d93d  	0t0  TCP localhost:6062 (LISTEN)
process-a   661 family   14u  IPv4 0x64cf0533e9548bcd  	0t0  TCP localhost:6162 (LISTEN)
Spotify   23548 family   58u  IPv4 0x64cf0533e8f5e44d  	0t0  TCP *:57621 (LISTEN)
Spotify   23548 family   63u  IPv4 0x64cf0533e956244d  	0t0  TCP *:50896 (LISTEN)
```

<br>

Vous pouvez voir que Spotify occupe deux ports, respectivement le 57621 et le
50896, que Dropbox en a 4, etc. Pour votre information, je suis tombé
[sur ce blog post](https://www.micahsmith.com/blog/2019/09/find-ports-in-use-on-macos/)
pour la partie macOS et
[ce blog post](https://www.howtogeek.com/28609/how-can-i-tell-what-is-listening-on-a-tcpip-port-in-windows/)
pour la partie Windows. **Votre ordinateur, qu’il soit sous macOS ou Windows, a
donc régulièrement des ports utilisés**. Après tout, c’est ce qui permet à votre
ordinateur de communiquer, notamment avec le monde extérieur.

---

<br>

![Une femme en train de montrer un place de bateau vide dans un port, pixel art](/images/cours-docker-et-docker-compose/femme-port.webp)

## Exposez un port

Le problème, dans notre cas, est que nous avons deux ordinateurs : notre machine
hôte mais aussi notre conteneur Docker. Nous devons donc non seulement ouvrir le
port 3000 de notre machine hôte et celui de notre conteneur mais nous devons
aussi les raccorder ensemble.

C’est là que deux propriétés de notre fichier docker-compose entrent en jeu :
`expose` et `ports`. La propriété `expose` va ouvrir un port dans le conteneur
mais pas dans la machine hôte. Autrement dit, le conteneur sera capable de
dialoguer avec d’autres conteneurs, via le numéro de port, mais pas avec mon
ordinateur.

Vous vous demandez peut-être l’utilité de cette propriété. En fait, cette
propriété est intéressante en termes de sécurité informatique. **De manière
générale, il n’est jamais très sûr de laisser des ports ouverts pour rien**.
Votre serveur de production se doit d’être le plus fermé possible. La propriété
`ports` permet à l’hôte de communiquer avec le conteneur Docker. Vous pouvez
regarder
[la référence sur la documentation](https://docs.docker.com/compose/compose-file/compose-file-v3/#ports).

Il existe deux syntaxes mais pour l’instant concentrez-vous sur la syntaxe
courte. Si on prend l’exemple ci-contre `3005:3000` en syntaxe courte, la partie
gauche, avant les “:” correspond à la machine hôte ; le port 3005 de ma machine
hôte sera réservé. La partie droite, après les “:”, correspond au port dans mon
conteneur Docker ; le port 3000 de mon conteneur Docker sera réservé. Comme vous
pouvez le voir, il est tout à fait possible d’allouer des numéros de port
différents.

Il m’est arrivé un jour de devoir faire une migration complète d’infrastructure
et de devoir dockeriser une grosse partie des services. Les ports étaient très
mal configurés et ne passaient pas par des variables d'environnement. C’est
absolument immonde ! Je me suis pas mal arraché les cheveux à l’époque pour
faire fonctionner cette infrastructure, aussi bien en local qu’en production.
Les variables d'environnement vont nous aider à avoir une bonne hygiène de
serveurs. Cela dit, il est aussi important de rédiger de la documentation avec
des schémas et des procédures.

Bon, si l’on reprend l’exemple de notre docker-compose pour WordPress du
chapitre précédent, il devrait faire beaucoup sens.

<br>

```yml
services:
  db:
    image: mariadb:10.6.4-focal
    # [...]
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose: # les ports 3306 et 33060 ne sont accessibles qu'à mon service Wordpress ci-dessous
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    ports: # les ports 80 de mon conteneur et de mon hôte seront occupés par ce service
      - 80:80
    restart: always
    # [...]
```

<br>

Vous pouvez voir que :

- **Le service `db` utilise la propriété expose et ouvre deux ports dans le
  réseau interne de Docker**. Faites le test avec les commandes pour tester les
  ports ci-dessus, vous verrez que votre ordinateur ne les aura pas ouvert.
- **Le service `wordpress` expose le port 80 de l’hôte ainsi que du conteneur**.

Normalement, tout devrait commencer à se connecter dans votre tête 🙂. Si ce
n’est pas le cas, n’hésitez pas à ouvrir une issue sur notre Github pour
demander des précisions ou plus d’explications.

<br>

Ici, on reste sur l’essentiel : ouvrir et raccorder des ports. Docker gère en
réalité tout un système de réseaux (bridge, host, overlay, DNS interne…) que
vous pouvez approfondir dans la fiche
[Comment bien gérer les réseaux Docker ?](/fiches/bien-gerer-reseaux-docker/).

<br>

Passons maintenant aux variables d'environnement.

---

<br>

![Une homme asiatique en train de se préparer un burger, pixel art](/images/cours-docker-et-docker-compose/burger-homme-cuisine.webp)

## Ajoutez des variables d’environnement à votre conteneur

Avez-vous déjà vu ce genre de choses traîner dans votre code ?

<br>

```javascript
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
```

<br>

```python
import os


PORT = os.environ.get("PORT")
DB_URL = os.environ.get("DB_URL")
```

<br>

Le premier snippet de code est du JavaScript, le deuxième du Python. **Ces deux
snippets vous montrent comment récupérer des variables d'environnement**. Les
variables d'environnement sont des variables qui sont propres à l’ensemble de
votre système. Faites le test !

- Si vous êtes sur macOS ou Linux, ouvrez votre terminal et tapez `env`.
- Si vous êtes sur Windows, ouvrez PowerShell et tapez `Get-ChildItem Env`:

Cette commande vous donne toutes les variables d'environnement de votre
ordinateur. Vous pouvez faire pareil avec le projet fil rouge. Assurez-vous de
bien être
[sur la branche `partie-2/chapitre-3-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-3-debut).

- Lancez votre conteneur avec la commande `docker-compose up`.
- Ouvrez un autre terminal et tapez la commande `docker-compose exec api bash`,
  puis une fois dans le conteneur , tapez `env`.

Si je tape cette commande dans mon conteneur Docker, j’obtiens ce type de
résultat.

<br>

```bash
root@1a8c6f91c8ab:/api# env

HOSTNAME=1a8c6f91c8ab
YARN_VERSION=1.22.18
PWD=/api
HOME=/root
TERM=xterm
SHLVL=1
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
NODE_VERSION=12.22.12
_=/usr/bin/env


root@1a8c6f91c8ab:/api#
```

<br>

Il y a pas mal d’informations intéressantes ici. Par exemple, vous pouvez voir
que la version de Node utilisée est située dans les variables d'environnement.
J’ai trouvé cet article
[sur ce blog post Medium](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa),
vous pouvez lire les premières parties, il est plutôt intéressant 🙂. La bonne
nouvelle, c’est que vous avez déjà vu dans les snippets de code du chapitre
précédent comment ajouter des variables d'environnement.

<br>

Je vous propose qu’on fasse une petite pause sur le texte et qu’on regarde
comment ajouter des variables d'environnement dans le screencast ci-dessous. À
tout de suite !

<br>

<iframe src="https://player.vimeo.com/video/1096176773?h=512071f632&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 12 - Ajoutez des variables d_environnement à votre conteneur"></iframe>

<br>

Pour récapituler, vous pouvez soit :

- **Ajouter des variables d'environnement via la propriété `environment`**. Je
  vous invite à faire ça quand vous ne manipulez pas des informations sensibles,
  comme des codes d’accès à une base de données.
- **Créer un fichier `.env`, bien vérifier qu’il soit ajouté dans un
  `.gitignore`, pour ne pas être indexé, puis
  [ajouter la propriété env_file](https://docs.docker.com/compose/compose-file/compose-file-v3/#env_file)
  avec le chemin vers votre fichier**. Vous pouvez créer ensuite un fichier
  `.example.env` pour indiquer à vos utilisateurs les variables d'environnement
  requises pour lancer votre projet.
- **Vous pouvez aussi ajouter des variables d'environnement directement depuis
  votre fichier Dockerfile**. En pratique, je vous déconseille de le faire. Ce
  n’est pas forcément une bonne pratique, notamment niveau sécurité.

<br>

Votre code devrait maintenant correspondre à celui
[de la branche `partie-2/chapitre-3/section-3`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-3/section-3).

---

<br>

![Un enfant en train de s'entrainer à faire un avion en papier, pixel art](/images/cours-docker-et-docker-compose/enfant-avion-papier.webp)

## Exercez-vous

Pour rappel,
[voici la problématique](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/3)
que nous essayons de résoudre dans ce chapitre. Pensez bien
[à partir de la branche `partie-2/chapitre-3/section-3`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-3/section-3).

<br>

<iframe src="https://player.vimeo.com/video/1096177015?h=1ec05b12f6&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 13 - Exercez-vous - Gérez le réseau de votre infrastructure"></iframe>

<br>

Le code source contenant la solution de cet exercice se trouve
[sur la branche `partie-2/chapitre-3-fin`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-2/chapitre-3-fin).

---

<br>

![Un vendeur de journaux dans la rue, pixel art](/images/cours-docker-et-docker-compose/vendeur-journaux.webp)

## Résumé

- Les ports, ou numéros de port, font partie de la couche 4 (la couche
  transport) du modèle OSI. Les ports représentent les points d’entrée et et de
  sortie dans vos communications réseaux.
- Les propriétés expose et ports sont utilisées pour établir des numéros de
  port.
- Vous pouvez assigner des variables d'environnement à un conteneur Docker soit
  via la propriété environment, soit un `env_file` avec un fichier de variables
  d'environnements.
- Il est recommandé de créer un fichier `.example.env` pour préciser les
  variables d'environnement requises.

</article>
