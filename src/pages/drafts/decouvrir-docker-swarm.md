---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Docker Swarm : déployer sur un cluster"
description:
  "Découvrez Docker Swarm, l'orchestrateur intégré à Docker : initialisez un
  cluster, déployez des services répliqués, profitez du load balancing, des
  rolling updates et déployez une stack complète depuis un docker-compose.yml."

imgAlt:
  Un essaim d'abeilles organisé autour d'une ruche en pixel art, chaque abeille
  transportant un petit conteneur
imgSrc: /images/cheatsheets/docker-swarm.webp

author: Thomas
kind: Fiche technique
level: Avancé
publishedDate: 24/09/2026
---

Ça y est, on y arrive ! C'est la fiche que je tease depuis le début de cette
série Docker : **Docker Swarm**, l'orchestrateur intégré à Docker.

On a déjà
[posé les bases dans la fiche sur la différence entre Docker, Compose et Swarm](/fiches/difference-docker-compose-swarm/)
: pour rappel, là où Docker fait tourner un conteneur et Compose en orchestre
plusieurs sur une machine, **Swarm répartit vos conteneurs sur plusieurs
machines**. On entre dans le monde de l'orchestration et de la haute
disponibilité.

Dans cette fiche, on va monter un cluster de A à Z : l'initialiser, y déployer
des services répliqués, et profiter de tout ce que Swarm apporte (load
balancing, tolérance aux pannes, mises à jour sans coupure).

---

## Le vocabulaire de Swarm

Avant de taper la moindre commande, posons trois mots de vocabulaire. Ils
reviennent en permanence dès qu'on parle de Swarm :

- un **node** (nœud) est une machine qui fait partie du cluster ;
- un **manager** orchestre le cluster : il décide où placer les conteneurs et
  maintient l'état désiré ;
- un **worker** se contente d'exécuter les tâches que le manager lui confie.

<br>

Un node peut être manager, worker, ou les deux. Pour un vrai cluster de
production, on recommande d'avoir plusieurs managers (en nombre impair) pour
tolérer les pannes. Pour découvrir, une seule machine suffit largement.

---

## Initialiser un cluster

On commence par transformer notre machine en manager Swarm :

```bash
docker swarm init
```

<br>

Docker vous répond avec une commande toute prête à exécuter sur les autres
machines pour les rattacher au cluster :

```bash
docker swarm join --token SWMTKN-1-xxxx 192.168.0.10:2377
```

<br>

C'est ce **token** qui sécurise l'arrivée de nouveaux nodes. Une fois vos
machines rattachées, vous pouvez visualiser l'ensemble du cluster depuis un
manager :

```bash
docker node ls
```

<br>

Et voilà, votre cluster est prêt. Toute la suite se pilote depuis un manager.

---

## Déployer un service répliqué

C'est ici que Swarm change tout. Au lieu de lancer des conteneurs un par un, on
déclare un **service** : une description de ce que vous voulez faire tourner, et
en combien d'exemplaires.

```bash
docker service create --name api --replicas 3 -p 3000:3000 mon-api:1.0.0
```

<br>

Décryptage :

- `--name api` nomme le service ;
- `--replicas 3` demande **3 instances** (on parle de _tasks_) du conteneur ;
- Swarm se charge de répartir ces 3 répliques sur les nodes disponibles.

<br>

Vous pouvez suivre l'état de votre service et voir où tournent les répliques :

```bash
docker service ls
docker service ps api
```

<br>

Le point essentiel à comprendre, c'est que Swarm fonctionne en **mode
déclaratif**. Vous déclarez un état désiré (« je veux 3 répliques »), et Swarm
fait tout pour le maintenir. Si une réplique plante, ou si une machine tombe,
**il en relance automatiquement une ailleurs**. Vous n'avez rien à faire.

<br>

C'est une différence de philosophie majeure avec `docker run` ou Docker Compose,
où vous décrivez plutôt _comment_ lancer les conteneurs. Avec Swarm, vous
décrivez le _résultat_ attendu, et l'orchestrateur s'occupe du reste. C'est
exactement cette logique qu'on retrouve, en plus poussé, dans Kubernetes.

---

## Scaler en une commande

Besoin de plus de puissance pour absorber un pic de trafic ? Une seule commande
suffit pour ajuster le nombre de répliques :

```bash
docker service scale api=10
```

<br>

Swarm crée les répliques manquantes et les distribue sur le cluster. Pour
revenir à 3, même logique. C'est cette élasticité qui fait toute la force de
l'orchestration.

---

## Le load balancing intégré

Voici une fonctionnalité qu'on adore une fois qu'on la comprend : le **routing
mesh**. Quand vous publiez un port avec `-p 3000:3000`, Swarm ouvre ce port sur
**tous les nodes du cluster**, même ceux qui n'exécutent aucune réplique du
service.

<br>

Concrètement, peu importe la machine du cluster que vous contactez sur le port
3000, votre requête est automatiquement redirigée vers une réplique disponible.
Vous avez donc un **répartiteur de charge intégré**, sans rien installer de
plus. C'est exactement ce qu'on cherche quand on veut tenir la charge.

---

## Les rolling updates (et le rollback)

Déployer une nouvelle version sans coupure de service, c'est natif avec Swarm.
On parle de **rolling update** : Swarm remplace les répliques **une par une**,
en s'assurant qu'il en reste toujours assez en ligne.

```bash
docker service update --image mon-api:2.0.0 api
```

<br>

Et si la nouvelle version pose problème ? Un simple rollback vous ramène à la
version précédente :

```bash
docker service rollback api
```

<br>

On retrouve là des mécanismes dignes des grandes plateformes, mais accessibles
avec une seule ligne de commande.

---

## Déployer une stack depuis un docker-compose.yml

Tout piloter à la main, c'est instructif, mais en pratique on déploie une
**stack** : on décrit toute l'application dans un `docker-compose.yml` enrichi
d'une section `deploy`.

```yaml
services:
  api:
    image: mon-api:1.0.0
    ports:
      - "3000:3000"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
      restart_policy:
        condition: on-failure
    networks:
      - backend
    secrets:
      - db_password

networks:
  backend:
    driver: overlay

secrets:
  db_password:
    external: true
```

<br>

Vous remarquerez qu'on réutilise ici tout ce qu'on a vu dans les fiches
précédentes : un réseau [`overlay`](/fiches/bien-gerer-reseaux-docker/) pour
faire communiquer les services entre machines, et un
[secret](/fiches/bien-gerer-secrets-docker/) distribué de façon sécurisée par le
cluster. Tout se déploie en une commande :

```bash
docker stack deploy -c docker-compose.yml mon-app
```

<br>

C'est exactement l'astuce qu'on évoquait dans la première fiche : le travail
fait avec Compose se réutilise tel quel sur un cluster.

---

## Les commandes Swarm à retenir

Pour vous y retrouver, voici les commandes que vous taperez le plus souvent :

| Commande                | Rôle                                      |
| ----------------------- | ----------------------------------------- |
| `docker swarm init`     | Initialiser un cluster (devient manager)  |
| `docker swarm join`     | Rattacher une machine au cluster          |
| `docker node ls`        | Lister les nodes du cluster               |
| `docker service create` | Créer un service                          |
| `docker service ls`     | Lister les services                       |
| `docker service scale`  | Ajuster le nombre de répliques            |
| `docker service update` | Mettre à jour un service (rolling update) |
| `docker stack deploy`   | Déployer une stack depuis un compose      |

<br>

Avec ces quelques commandes, vous couvrez déjà l'essentiel de la gestion d'un
cluster au quotidien.

---

## Astuce bonus - Placez vos conteneurs avec des contraintes

Parfois, vous voulez qu'un service tourne sur une machine précise : un node avec
un disque SSD pour la base, ou réserver les managers à l'orchestration. Swarm
permet ça avec des **contraintes de placement**.

```yaml
deploy:
  placement:
    constraints:
      - node.role == worker
```

<br>

Ici, le service ne tournera **que sur des workers**, jamais sur un manager.
C'est une bonne pratique pour garder vos managers dédiés à leur rôle
d'orchestration.

<hr>

Et voilà, vous avez fait le tour de Docker Swarm ! Vous savez initialiser un
cluster, déployer des services répliqués, les scaler, faire des mises à jour
sans coupure et déployer une stack complète. C'est une porte d'entrée idéale
vers l'orchestration, plus simple à prendre en main que Kubernetes.

Cette fiche clôt la première vague de notre série Docker. La suite ? On
continuera à explorer l'écosystème, avec peut-être un comparatif Swarm vs
Kubernetes pour celles et ceux qui veulent aller encore plus loin 😉.

D'ici là, je vous invite :

- [à faire le quiz](/quiz/decouvrir-docker-swarm) pour valider vos acquis ;
- [à revoir la différence entre Docker, Compose et Swarm](/fiches/difference-docker-compose-swarm/)
  si certains concepts restent flous.

## Ressources

- [La documentation officielle de Docker Swarm](https://docs.docker.com/engine/swarm/)
- [Déployer une stack sur un cluster](https://docs.docker.com/engine/swarm/stack-deploy/)
- [Mettre à jour un service (rolling updates)](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/)
- [docker service – Référence CLI](https://docs.docker.com/reference/cli/docker/service/)
