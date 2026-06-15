---
layout: ../../../../layouts/ChapterLayout.astro

title: "Installez et configurez des services avec Docker Compose"
description:
  "Apprenez à installer MongoDB avec Docker Compose, configurer vos services,
  gérer les architectures CPU et persister vos données grâce aux volumes Docker."

previousChapterLink: gestion-reseau-infrastructure
nextChapterLink: developpement-environnement-conteneurisation

chapterNumber: 1
sectionNumber: 3
sectionTitle: Partie 3 - Développez dans un environnement ISO Prod
id: 7
---

<article>

# Installez et configurez des services avec docker compose

![Une homme configurant un service sous forme de hologrammes, pixel art](/images/cours-docker-et-docker-compose/homme-hologramme.webp)

Avant de poursuivre la lecture de ce chapitre, veuillez vous mettre
[sur la branche `partie-3/chapitre-1-debut`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-1-debut).
En plus de cette branche, nous allons utiliser
[cette issue Github](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/4)
comme problématique. Je vous invite à en prendre connaissance avant de passer à
la lecture du chapitre.

## Découvrez MongoDB

J’ai une bonne nouvelle à vous annoncer. Vous venez de couvrir avec les parties
1 et 2 la majeure partie des notions de Docker. Certes, il vous en reste
quelques-unes à découvrir, notamment la partie optimisation et multi-staging,
mais vous arrivez au bout des nouvelles notions à apprendre. Autrement dit, il
va y avoir un peu de redite dans cette partie.

Je vais revenir sur certaines notions dont je vous ai parlé précédemment, comme
les volumes, les services et les variables d’environnement mais vous
rencontrerez peu de nouvelles notions. Passons à MongoDB.

L’objectif de ce chapitre est d’installer MongoDB via Docker et de connecter
notre API Rest à MongoDB. J’imagine que la majeure partie d’entre vous connait
ou a déjà utilisé MongoDB mais pour faire simple, MongoDB est une base de
données NoSQL. NoSQL signifie Not Only SQL.

Les bases de données SQL, type MariaDB et PostgreSQL, sont dites relationnelles.
Les bases de données NoSQL sont orientées document. Cette différence de
structures entre les deux a pour résultat que l’une, le SQL, est plus rigide
dans son utilisation que l’autre, le NoSQL. Attention, quand j’emploi le terme
rigide, ce n’est pas négatif. Cela veut surtout dire que leur domaine
d’utilisation est différent.

Les bases de données SQL sont intéressantes quand vous travaillez avec des
structures classiques, par exemple, des factures pour un client. Les bases de
données NoSQL offrent plus de souplesse ; vous les utilisez quand le format des
données est susceptible d’évoluer fortement. Je vous présenterais le modèle de
la base de données dans le prochain chapitre. Pour l’instant, nous allons juste
installer et configurer la base de données.

---

<br>

![Une femme en train de paramétrer un ordinateur, pixel art](/images/cours-docker-et-docker-compose/femme-configuration-ordinateur.webp)

## Configurez et connectez vos services

Étant donné que nous travaillons sur un vieux projet, nous allons utiliser une
ancienne version de MongoDB, ainsi
[qu’une ancienne version de Mongoose](https://mongoosejs.com/docs/4.x/). Vous
pouvez vous rendre sur le
[repository Dockerhub de Mongo](https://hub.docker.com/_/mongo). Pour votre
information, je voulais initialement utiliser de très anciennes versions de
MongoDB, comme Mongo 1 ou 2. En réalisant le projet fil rouge, je me suis aperçu
que ces images docker n’étaient pas compatibles avec les processeurs Apple M1.
Cela tient du fait que les architectures de microprocesseurs (CPU) Intel et
Apple ne sont pas les mêmes. Les premiers ont une architecture X86 et les autres
une architecture ARM.

Si le sujet est obscur, je vous invite à lire
[cet article Medium](https://medium.com/gitconnected/intel-x86-vs-arm-architecture-and-all-key-differences-explained-fb54a04788dc).
C’est en anglais mais l’auteur explique bien les différences entre ces
différentes architectures de CPU. Pour voir si une image est compatible avec les
architectures ARM, il est important de regarder la partie tags de vos images.

<br>

![Page DockerHub de l'image officielle mongo, onglet Tags affichant les versions, architectures et tailles des images](/images/cours-docker-et-docker-compose/dockerhub-mongo-home.webp)

<br>

Par exemple, les deux images ci-dessous sont compatibles avec les architectures
AMD et ARM. Vous pouvez aussi voir que la deuxième image (`4.4.20-rc0`) est
compatible avec les serveurs Windows.

<br>

![Recherche du tag 2.2 sur DockerHub pour mongo, le seul résultat 2.2.7 n'est disponible qu'en architecture amd64](/images/cours-docker-et-docker-compose/dockerhub-mongo-search.webp)

<br>

Quand je recherche une version de de Mongo, ici la version 2.2.7, je ne vois pas
l’architecture ARM. Cette image n’est donc pas compatible avec les puces M1, M2,
etc.

Je me souviens quand Apple a sorti ces ordinateurs avec les puces M1. Beaucoup
d’images Docker n'étaient plus compatibles, les images Alpine par exemple. Les
choses ont depuis heureusement évolué mais de nombreux logiciels restent
incompatibles avec les puces. Ce qui est un réel problème !

<br>

**Nous utiliserons ici l’image Mongo 3.7.9.**

<br>

![Recherche du tag 3.7.9 sur DockerHub pour mongo, disponible en architectures linux amd64 et arm64](/images/cours-docker-et-docker-compose/dockerhub-mongo-3.webp)

<br>

Prenez un peu le temps
[de lire la documentation](https://hub.docker.com/_/mongo). Elle contient pas
mal d’informations sur comment la configurer et les variables d’environnement à
ajouter. Elle vous donne aussi des snippets de fichier docker-compose.

<br>

```yml
# Use root/example as user/password credentials
version: "3.1"

services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
```

<br>

Dans le snippet de code ci-dessus, le service qui nous intéresse est le premier
: `mongo`. Le deuxième service correspond à une interface d’administration de la
base de données.

Amusez à créer un fichier docker-compose et à y copier/coller ce snippet de
code. Tapez ensuite la commande `docker-compose up` et ouvrez votre navigateur
avec l’url [http://localhost:8081](http://localhost:8081/).

<br>

![Interface Mongo Express listant les bases de données admin, config et local avec des boutons View et Del](/images/cours-docker-et-docker-compose/mongo-express-admin.webp)

<br>

Vous vous demandez peut-être pourquoi vous n’avez pas besoin d’utiliser la
commande `docker-compose build`. En fait, cette commande vous permet de builder
des images Docker. **Or, là, vous n’avez pas à en builder : elles sont déjà
builder sur DockerHub, vous avez simplement à les récupérer (les puller)**.

Prenez maintenant le temps d’inspecter le fichier docker-compose que vous venez
de créer. Vous ne devriez rien voir de nouveau 🙂. Quand je vous disais qu’on
allait faire un peu de redite dans cette partie.

---

<br>

![Une femme en train de sauvegarder un document sur une disquette, pixel art](/images/cours-docker-et-docker-compose/femme-ordinateur-disquette.webp)

## Persistez les données d’une base de données avec un volume

J’ai déjà un peu parlé de la notion de volume dans les chapitres précédents et
notamment dans celui dédié à docker-compose. Nous nous sommes servis des volumes
pour partager des informations entre notre machine hôte et nos conteneurs
Docker. Cela dit, les volumes ne se limitent pas à cette utilisation. Les
volumes nous permettent aussi de persister de l’information.

Souvenez-vous que le principe des conteneurs est d’être éphémère. Par défaut,
vous lancez votre conteneur, il réalise l’action que vous lui avez demandé puis
il s’éteint. Une fois que le conteneur s’est éteint, toute l’information qui
était contenue à l’intérieur est potentiellement perdue. Les conteneurs Docker,
en comparaison des VM, sont “sans état” ou stateless.

Cette notion d’état est une notion particulièrement importante en informatique.
On dit qu’une application, ou du code, est stateless quand il ou elle ne stocke
aucune information sur des transactions ou opérations passées. Par exemple, une
API REST est stateless. À chaque nouvel appel à l’API, vous devez lui fournir
l’intégralité des informations requises pour qu’elle puisse procéder à un
traitement. À contrario, une application est dite stateful quand elle persiste
des informations. Autrement dit, quand elle se souvient dans le temps des
actions qui ont été réalisées. Une base de données est donc stateful : elle
stock un état.

Si je résume, par défaut, les conteneurs sont stateless et les bases de données
sont stateful. Or, dans le cadre de notre projet fil rouge, nous souhaitons
persister des informations sur notre base de données MongoDB. Si nous gardons le
comportement par défaut des conteneurs, le contenu de la base de données sera
supprimé à chaque fois que nous “killons” le conteneur Mongo. C’est pas
franchement l’idéal ! Vous l’aurez sûrement compris, c’est à ce moment que les
volumes entrent en jeu !

Reprenons encore une fois notre docker-compose de WordPress.

<br>

```yml
services:
  db:
    # We use a mariadb image which supports both amd64 & arm64 architecture
    image: mariadb:10.6.4-focal
    # If you really want to use MySQL, uncomment the following line
    #image: mysql:8.0.27
    command: "--default-authentication-plugin=mysql_native_password"
    volumes:
      - db_data:/var/lib/mysql
    #[...]
  wordpress:
    image: wordpress:latest
    #[...]

volumes:
  db_data:
```

<br>

Regardez les deux dernières lignes. Ce docker-compose crée un volume appelé
`db_data`. Le rôle de ce volume va être de persister l’information de la base de
données du services db.

<br>

Ce volume est attaché au service `db` grâce à la propriété :

<br>

```yml
volumes:
  - db_data:/var/lib/mysql
```

<br>

Pour retrouver des informations concernant un volume, utilisez la commande
`docker volume ls`.

<br>

```yml
docker volume ls


DRIVER	VOLUME NAME local
1eb8c606e4e61037c3d8f66559efc00cd55564962dd036885a6169c5cf860d84 local
8e8cab8d227eb6641488d398cfcd20812403ef3f57d395fad7618a10a4c6050a local
9e7f28dc6e4391b31ea6b069c0a0cdcd3b538e3e7a8553391a1cf724d902be55 local
47d7606cabd7020d00192d9c1b8aba58ade8987e1af24be3f5e59f64a198150f local
251ffb3f3cda272ed811b1e355db03402c653c37b8fe3dc28056302585a9a1d3 local
390c3ca2a364dff3e907094346b216e78504a8bb237be2bd3dae5fafd9b01f01 local
439b7686d2055c8c372f4d417e2bbc8a8b78f3779b663fe7735df1c95f8ba3c8 local
904dc48dda92ae5c0f452c252a3ae598641dcb068c66e5b0b2baa0bf8dd81dc8 local
936a1422f775390a786dddf4c234d0659960679f3264a74a379b74af45cca30f local
960a3eae8125e786088496920ba51b96d2c49c7432d105668df17e5a34edd2eb local
6150d430a66c48f34e8f8ebae0b17a036600f3ea41ab3cf75f5cd1f73594f13f local
08868dd76d10ce1e8eee521b14b50f4163462c2d8c8886a3f03a18709a48b6e6 local
9147e2118c5356c06271a7a4a6d9d65c4f0b807bd9fc3d578c1f0ff0d6feea79 local
94632ad4e5a6d6d9ec5493799ce2c8aab4a237ba23a7a597afef12890c7e50f3 local
18660310ccef6100a0e720f4f3f5e9b7f5038a3703ddeb01ea7f4c191fbe8cdc local
a7a9eb88a426e635ba00877f1c2f46f722d0d8f24a1ec564e1cf1adc3fe55776 local
a55bbf0dd6f411738aae1a1ee62d5959bda458a702b5e7dcd1a4937ee9aa32e0 local
a66c53ca191f66472689b175c4a58e572b8c8a37b2bae04f4243e313d19119ac local
b9878f96c8b254ed9b70b2f6fc19f51ff797ea9c3c587b928077917bf2722c3e local
c3f698e6024a4ca1af01cfbfe7dd990584de6f2362313b32ce0204231a381679 local
d4aa7cbe0e8348ede189c5f2617fc57374006c682b14bb2d80d8045cbfae60f9 local
d41185053a3cedd29d82b6f808c8a4ef2e3fbaaeefef59f076f86bdd5bf815b1 local
e0b8d01b8b9d4b399d3b70a9d38b4929bbd8aed460ca061d321e9766257d1503 local
e6b529acfb37af29f20e2baa2e726fdc5b2190ac729836422c0cb6d56158f9c1 local
e05240c8fff3860491b09ccde0e03eef3daa4aabeb5801ba5b9b36bb777178b6 local
ec0d270208b85a056813620537122846948cc742d07cd90127b44ef30f98e331 local
faaf97dab41a77e1b7f48ed65e978e0c1eb5385d2a15ba14011daee7812aa547 local
test_db_data local 	vscode
```

<br>

Puis, si je veux avoir des informations concernant un volume en particulier, par
exemple `test_db_data`, j’utilise la commande
`docker volume inspect test_db_data`.

<br>

```bash
docker volume inspect test_db_data


[
	{
    	"CreatedAt": "2023-04-05T09:06:07Z",
    	"Driver": "local",
    	"Labels": {
        	"com.docker.compose.project": "test",
        	"com.docker.compose.version": "2.15.1",
        	"com.docker.compose.volume": "db_data"
    	},
    	"Mountpoint": "/var/lib/docker/volumes/test_db_data/_data",
    	"Name": "test_db_data",
    	"Options": null,
    	"Scope": "local"
	}
]
```

<br>

**En pratique, j’utilise relativement peu cette commande, sauf quand je souhaite
déboguer un projet**. Cela dit, ça vous permet de savoir que ça existe en plus
de vous donner une petite piqûre de rappel sur les commandes de docker 😉.

<br>

J’en profite pour vous donner quelques ressources à lire pour approfondir les
notions de volumes et de stateful vs stateless :

- [Stateful vs stateless](https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless) -
  Article de Red Hat autour de ces concepts. C’est en anglais mais je le trouve
  particulièrement bien expliqué et clair.
- [How to understand “RESTful API is stateless” ?](https://stackoverflow.com/questions/34130036/how-to-understand-restful-api-is-stateless) -
  Fil de discussion stackoverflow autour des API REST et de la notion de
  stateless.
- [Guide to Docker Volumes - How to Use Volumes with Examples](https://spacelift.io/blog/docker-volumes) -
  Blog post assez complet concernant les volumes Docker. Vous n’avez pas besoin
  de tout lire, essayez plutôt de comprendre le sens global.

---

<br>

![Un enfant en train de s'entrainer à faire un avion en papier, pixel art](/images/cours-docker-et-docker-compose/enfant-avion-papier.webp)

## Exercez-vous

Pour rappel,
[voici la problématique](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/issues/4)
que nous essayons de résoudre dans ce chapitre.

<br>

<iframe src="https://player.vimeo.com/video/1096177208?h=67818b6603&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="Screencast 14 - Exercez-vous - Installez et configurez des services avec docker-compose"></iframe>

<br>

Le code source contenant la solution de cet exercice se trouve
[sur la branche `partie-3/chapitre-1-fin`](https://github.com/nx-academy/Conteneurisez-vos-applications-avec-Docker/tree/partie-3/chapitre-1-fin).

---

<br>

![Un vendeur de journaux dans la rue, pixel art](/images/cours-docker-et-docker-compose/vendeur-journaux.webp)

## Résumé

- MongoDB est une base de données de type NoSQL. Au lieu de stocker son contenu
  dans des tables, elle le stocke dans des documents au format JSON. Ce type de
  base de données propose une structure plus souple que les bases de données
  SQL.
- **Faites bien attention au choix de vos images Docker. Elles doivent respecter
  l’architecture CPU de vos utilisateurs (les développeurs) mais aussi de vos
  serveurs**. DockerHub indique la plupart du temps si vos images sont
  compatibles avec votre architecture.
- Les volumes vous permettent de partager de l’information entre votre machine
  hôte et votre conteneur. Ils permettent aussi de persister de l’information
  tel que le contenu du base de données.
- La commande de management `docker volume` est utile si vous souhaitez avoir
  plus d’informations sur un volume.

</article>
