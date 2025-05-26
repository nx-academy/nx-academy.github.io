---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre les proxys et reverse proxys
description: Les proxys et reverse proxys sont des composants essentiels d'architecture réseau. Ils agissent comme intermédiaires entre les utilisateurs et les serveurs, améliorant ainsi la sécurité, les performances et la gestion du trafic.

imgAlt: Un serveur dans un café parisien, pixel art
imgSrc: /images/cheatsheets/serveur-parisien.webp

kind: Fiche technique
level: Débutant
author: Yacine
publishedDate: 10/03/2024
---

<article>

# Comprendre les proxys et reverses proxys

![Un serveur dans un café parisien, pixel art](/images/cheatsheets/serveur-parisien.webp)

En informatique, un proxy et un reverse proxy sont des types de serveurs.
Pour bien comprendre ce qu’est un proxy et un reverse proxy, il faut d'abord comprendre globalement ce qu’est un serveur et un client.

## Pour la petite histoire

En travaillant sur un projet personnel d’application, j’ai dû répondre à une problématique importante.

Mon application fonctionnait très bien mais elle était déployée sur un tout petit serveur ce qui la rendait très lente. Si lente qu’au niveau de l’expérience utilisateur elle était tout simplement inutilisable quand elle dépassait les dix utilisateurs en simultané.

On m’a conseillé d’utiliser un plus gros serveur. Le problème était qu’utiliser des serveurs puissants coûte cher, et plus un serveur est performant, plus le prix augmente.

Pour éviter de recourir à des serveurs coûteux, j'ai donc mis en place un reverse proxy.

Ce dernier capte les requêtes des utilisateurs et les répartit entre plusieurs instances répliquées de l'application exécutées sur le même serveur.

Au lieu d'avoir une seule instance de l'application qui peut vite être surchargée par toutes les requêtes. En utilisant plusieurs instances, si l’une d’entre elle est surchargée de travail le reverse proxy demande à une autre de faire le travail. Ce qui réduit les temps de réponse et améliore l'expérience utilisateur.

Avec cette technique, je n'ai donc pas eu besoin de payer pour un serveur plus puissant ou plusieurs serveurs.

L’utilisation des proxys et reverse proxy est un moyen de répondre à certaines problématiques de la vie d’une application et c’est pourquoi j’ai souhaité vous en parler dans cette fiche technique.

## 1. Qu’est-ce qu’un serveur ?

Un serveur est un ordinateur ou un programme qui offre des services ou des ressources (comme des fichiers, des vidéos, ou des applications) à d'autres ordinateurs ou utilisateurs connectés via un réseau.
Le réseau le plus connu est le réseau Internet auquel nous sommes tous connectés et grâce auquel on peut partager des informations, des ressources ou utiliser des services.

En pratique, on peut accéder aux ressources d’un serveur en lui faisant la demande. Cette demande s’appelle en vocabulaire informatique une « requête ». La ressource renvoyé est elle appelée «réponse ».
Au final un serveur web en informatique peut se comparer à un serveur dans un restaurant: On lui demande et il nous sert !

### Exemple :

Dans une application de streaming, le serveur héberge les vidéos et les délivre aux utilisateurs qui en font la demande.
Lorsqu’on veut regarder une vidéo, notre navigateur envoie une requête au serveur qui possède cette vidéo.
Le serveur reçoit la requête, traite les informations de la requête et nous envoie la vidéo pour qu’on puisse la visionner
A quoi ça sert pour développeur ?
Un serveur est essentiel pour un développeur, car c'est là où sont stockées et gérées les ressources d'une application, comme les bases de données, les fichiers ou les vidéos.

## 2. Qu’est-ce qu’un client ?

Un client désigne celui qui fait la demande au serveur. Ce client peut être un utilisateur, un programme ou même un autre serveur.

Au final, un client en informatique est un peu comme un client dans un restaurant. C’est celui qui demande au serveur ce dont il a besoin !
###Exemple :
Lorsqu’on utilise ordinateur pour pour accéder à un site, notre navigateur (le client) envoie une requête au serveur qui héberge le site. Le serveur reçoit la requête et renvoie les informations demandées au client (notre navigateur).

## 3. Qu’est-ce qu’un proxy ?

Un proxy est un serveur qui sert d’intermédiaire entre un client et un serveur.
Lorsqu’on souhaite accéder à un service ou à une vidéo, au lieu de demander directement au serveur, on peut passer par un proxy.
Le proxy fait alors la demande au serveur à notre place, il reçoit les données et nous les donne.

### À quoi ça sert pour un utilisateur lambda ?

#### Anonymat :

Le proxy masque l’adresse IP de celui qui s’y connecte, cachant ainsi notre identité et notre localisation lorsqu’on accède à un service en ligne.

#### « Accès géo-restreint » :

Certains serveurs filtrent les requêtes en fonction du pays de celui qui fait la demande.
Par exemple, sur Netflix, certaines vidéos sont disponibles uniquement dans certains pays. Le serveur est paramétré pour vérifier le pays dans lequel on est au moment de la demande. C’est pour ça que le public américain et français n’ont pas accès au même videos !

En passant par un proxy, on peut contourner cet obstacle.
En effet, en passant par un proxy situé dans un autre pays, le serveur qui fait la vérification considérera que le proxy à le droit d'accéder à la ressource (la vidéo) et renverra la vidéo au proxy qui nous la renverra à son tour.

### À quoi ça sert pour un développeur ?

#### Sécurité :

Un proxy peut ajouter une couche de sécurité en masquant les adresses IP des utilisateurs et en filtrant les requêtes avant qu'elles n'atteignent le serveur.

#### Optimisation :

Un proxy peut aussi être utilisé pour améliorer les performances d’une application. En effet un proxy peut servir à :

- Mettre en cache des ressources pour éviter des requêtes répétitives vers le serveur, réduisant ainsi la charge sur celui-ci.
- Compresser les données échangées pour accélérer le chargement des pages ou des réponses API.

### Où est utilisé un proxy ?

Un proxy est généralement installé directement sur l'ordinateur d'un utilisateur ou dans un réseau.
Ainsi, chaque requête internet passe d'abord par le proxy avant d’atteindre le serveur final, permettant de contrôler et de sécuriser les connexions sortantes depuis l'appareil ou le réseau.

## Qu’est-ce qu’un reverse proxy ?

Un reverse proxy est un proxy. Il a une fonction différente.
C’est un serveur qui se trouve entre le serveur qui reçoit les requêtes et plusieurs autres serveurs.
Lorsque notre navigateur fait une requête (par exemple pour regarder une vidéo). Cette dernière est d’abord captée par le reverse proxy, qui décide quel serveur répondra à la demande, puis nous renvoie ce qu’on a demandé.

Dans un restaurant, le reverse proxy est un peu le chef des serveurs.
Il ne fait pas lui-même le travail d’aller préparer ce qu’on lui a commandé mais il s’occupe plutôt de traiter ta demande et de la transmettre à d’autres serveurs qui eux vont s’occuper de préparer la commande et le donner au chef des serveurs une fois que c’est prêt !

### À quoi ça sert pour un développeur ?

#### Répartition de charge (Load Balancing) :

Un reverse proxy distribue les requêtes entre plusieurs serveurs pour éviter de surcharger un seul serveur.

#### Sécurité :

Il ajoute une couche de sécurité en cachant les serveurs réels derrière lui, empêchant ainsi les utilisateurs d'accéder directement aux serveurs principaux, ce qui renforce la robustesse face aux attaques.

### Où est utilisé un reverse proxy ?

Contrairement au proxy utilisé sur un ordinateur ou un réseau local, le reverse proxy est installé au niveau de l’architecture serveur.
Il se situe entre le serveur qui reçoit la requête et le réseau qui héberge le service ou l'application, gérant la répartition des requêtes vers les différents serveurs de l'application.

# Conclusion

### Serveur :

Essentiel pour stocker et gérer les ressources de ton application (comme des vidéos, des fichiers ou des bases de données).

### Client:

L'appareil ou programme qui demande un service ou une ressource.

### Proxy :

Installé sur l'ordinateur ou dans le réseau de l'utilisateur, il protège les utilisateurs, contourne les restrictions géographiques, et améliore les performances grâce à la mise en cache des données.

### Reverse Proxy :

Installé au sein de l'architecture serveur, il distribue les requêtes entre plusieurs serveurs, améliore la sécurité en cachant les serveurs principaux, et optimise les performances globales de l'application.

</article>
