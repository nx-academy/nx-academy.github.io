---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment bien gérer les réseaux Docker ?"
description:
  "Bridge, host, overlay, réseaux personnalisés, DNS interne et isolation :
  découvrez comment fonctionnent les réseaux Docker et comment faire communiquer
  (ou cloisonner) vos conteneurs proprement."

imgAlt:
  Un standard téléphonique vintage avec une opératrice qui branche des câbles,
  pixel art
imgSrc: /images/cheatsheets/reseaux-docker.webp

author: Thomas
kind: Fiche technique
serie: docker
tags:
  - Réseau
level: Intermédiaire
publishedDate: 07/03/2026
---

On continue notre série Docker. Après avoir
[clarifié la différence entre Docker, Compose et Swarm](/fiches/difference-docker-compose-swarm/),
on s'attaque à un sujet qu'on a tendance à survoler, à savoir **les réseaux
Docker**.

Dans
[le chapitre réseau du cours](/cours/docker-et-docker-compose/chapitres/gestion-reseau-infrastructure),
on a vu comment exposer un port avec `ports` et `expose`. Mais derrière ce
mécanisme se cache toute une mécanique. À chaque fois que vous lancez un
conteneur, Docker le branche sur un **réseau**. Selon le réseau choisi, vos
conteneurs vont pouvoir se parler ou pas.

Dans cette fiche, on va voir quels sont les différents types de réseaux, comment
les créer et surtout comment faire communiquer proprement vos conteneurs entre
eux.

---

## Pourquoi Docker a besoin de réseaux ?

Un conteneur, c'est un environnement isolé. Par défaut, il ne sait rien du monde
extérieur ni des autres conteneurs. Le réseau, c'est précisément ce qui va lui
permettre de communiquer avec votre machine, avec Internet et avec ses voisins.

<br>

Il faut savoir que Docker gère tout ça automatiquement grâce à des **drivers
réseau**. Un driver, c'est simplement le « type » de réseau utilisé. Vous pouvez
lister les réseaux existants sur votre machine avec :

```bash
docker network ls
```

<br>

Vous verrez au moins trois réseaux créés par défaut :

```text
NETWORK ID     NAME      DRIVER    SCOPE
xxxxxxxxxxxx   bridge    bridge    local
xxxxxxxxxxxx   host      host      local
xxxxxxxxxxxx   none      none      local
```

<br>

Ces trois-là correspondent aux trois drivers que vous croiserez le plus souvent.
On va les passer en revue.

---

## Les principaux drivers réseau

### bridge - le réseau par défaut

C'est le driver utilisé automatiquement quand vous lancez un conteneur sans rien
préciser. Docker crée un **réseau privé interne** sur votre machine et chaque
conteneur y reçoit sa propre adresse IP. Pour communiquer avec l'extérieur, on
passe par la redirection de ports (le fameux `-p 8080:80`).

C'est le mode adapté à la grande majorité des cas. Plusieurs conteneurs sur une
même machine qui doivent dialoguer entre eux.

### host - on partage le réseau de la machine

Avec le driver `host`, le conteneur n'est plus isolé. Il utilise directement la
pile réseau de votre machine hôte. Plus besoin de rediriger les ports, le
conteneur écoute directement sur ceux de l'hôte.

```bash
docker container run --network host nginx
```

<br>

C'est plus performant parce qu'il n'y a pas de couche de traduction réseau. Cela
dit, vous perdez l'isolation et vous risquez les conflits de ports. À réserver à
des cas précis.

### none - pas de réseau du tout

Comme son nom l'indique, le conteneur n'a aucune connectivité réseau. Utile pour
des tâches totalement isolées, pour des raisons de sécurité ou pour des batchs
qui n'ont besoin de rien.

### overlay - pour communiquer entre plusieurs machines

Le driver `overlay` permet à des conteneurs situés sur **des machines
différentes** de communiquer comme s'ils étaient sur le même réseau local. C'est
le driver utilisé par Docker Swarm pour faire dialoguer les services d'un
cluster. Si le sujet vous intrigue, on en reparlera dans la fiche dédiée à
Swarm.

<br>

> Il existe aussi le driver `macvlan`, plus avancé, qui donne à un conteneur une
> vraie adresse MAC sur votre réseau physique. C'est un cas d'usage de niche, on
> ne s'y attarde pas ici. J'y reviendrais peut-être dans une prochaine fiche
> technique.

### Tableau récapitulatif

Pour y voir clair en un coup d'œil :

| Driver      | Portée             | Quand l'utiliser                                                      |
| ----------- | ------------------ | --------------------------------------------------------------------- |
| **bridge**  | Une machine        | Cas par défaut : plusieurs conteneurs qui dialoguent sur un même hôte |
| **host**    | Une machine        | Performance maximale, quand l'isolation réseau n'est pas nécessaire   |
| **none**    | Une machine        | Conteneur totalement isolé, sans aucun accès réseau                   |
| **overlay** | Plusieurs machines | Communication entre services d'un cluster Swarm                       |
| **macvlan** | Réseau physique    | Donner une vraie IP du réseau local à un conteneur (cas avancé)       |

<br>

Dans 90 % des cas en local comme sur un petit serveur, vous resterez sur du
`bridge`. C'est pourquoi on va s'y attarder un peu plus.

---

## Le réseau bridge par défaut n'est pas le meilleur

Voici LE point que beaucoup ignorent et qui fait toute la différence.

Le réseau `bridge` par défaut fonctionne mais il a une grosse limite. **Les
conteneurs ne peuvent s'y joindre que par adresse IP** et pas par nom. Et comme
les IP changent à chaque redémarrage, c'est ingérable.

<br>

La bonne pratique, c'est de créer **votre propre réseau bridge** (on parle de
_user-defined bridge_). Sur un réseau personnalisé, Docker active un **DNS
interne**. Ce qui fait que chaque conteneur est joignable par son nom.

```bash
# On crée notre réseau
docker network create mon-reseau

# On lance deux conteneurs dessus
docker container run -d --name api --network mon-reseau mon-api
docker container run -d --name db --network mon-reseau postgres
```

<br>

Le résultat ici est que depuis le conteneur `api`, je peux contacter la base de
données simplement en utilisant `db` comme nom d'hôte. Pas d'IP à connaître, pas
de config à maintenir. C'est propre, lisible et stable.

<br>

En plus du DNS, un réseau personnalisé apporte une meilleure isolation. Seuls
les conteneurs que vous branchez explicitement dessus peuvent communiquer entre
eux. Sur le réseau `bridge` par défaut, à l'inverse, tous les conteneurs se
retrouvent mélangés sur le même réseau, ce qui est rarement ce que vous voulez.
Bref, prenez l'habitude de toujours créer un réseau dédié à votre projet.

---

## Les commandes réseau à connaître

Quelques commandes utiles pour piloter tout ça au quotidien :

```bash
# Lister les réseaux
docker network ls

# Créer un réseau
docker network create mon-reseau

# Inspecter un réseau (voir qui est connecté, l'IP, le driver…)
docker network inspect mon-reseau

# Connecter / déconnecter un conteneur à chaud
docker network connect mon-reseau mon-conteneur
docker network disconnect mon-reseau mon-conteneur

# Supprimer les réseaux inutilisés
docker network prune
```

<br>

La commande `docker network inspect` est particulièrement précieuse pour
debugger. Elle vous montre exactement quels conteneurs sont branchés et avec
quelles adresses.

---

## Les réseaux en Docker Compose

Avec Docker Compose, tout ce travail est fait pour vous. Quand vous lancez un
`docker compose up`, Compose **crée automatiquement un réseau dédié** à votre
projet et y branche tous vos services.

C'est pour ça que, dans un `docker-compose.yml`, un service peut en joindre un
autre par son nom directement :

```yaml
services:
  api:
    image: mon-api
    # L'api peut joindre la base via le nom "db", tout simplement
  db:
    image: postgres
```

<br>

Ici, pas besoin de déclarer quoi que ce soit. Le DNS interne fonctionne tout
seul parce que Compose utilise un réseau bridge personnalisé sous le capot.

---

## Astuce bonus - Cloisonnez vos services avec plusieurs réseaux

Vous pouvez aller plus loin et créer **plusieurs réseaux** pour isoler vos
services. C'est une excellente pratique de sécurité : votre base de données n'a
aucune raison d'être joignable depuis l'extérieur.

```yaml
services:
  frontend:
    image: mon-front
    networks:
      - public

  api:
    image: mon-api
    networks:
      - public
      - prive

  db:
    image: postgres
    networks:
      - prive

networks:
  public:
  prive:
    internal: true
```

<br>

Décryptage :

- le `frontend` et l'`api` partagent le réseau `public` ;
- l'`api` et la `db` partagent le réseau `prive` ;
- le `frontend` **ne peut pas** joindre directement la `db` : ils ne sont sur
  aucun réseau commun ;
- la directive `internal: true` coupe tout accès à Internet pour le réseau
  `prive`, ce qui isole encore davantage votre base.

<br>

Avec ce découpage, même si votre frontend était compromis, l'attaquant n'aurait
pas un accès direct à la base. C'est le principe du **moindre privilège**,
appliqué au réseau.

<hr>

Et voilà ! Les réseaux Docker n'ont (presque) plus de secret pour vous. Retenez
surtout deux choses ! **Créez toujours un réseau personnalisé** pour profiter du
DNS interne et **cloisonnez vos services** dès que la sécurité l'exige.

Dans la prochaine fiche, on enchaînera justement sur un sujet voisin et sensible
: **la gestion des secrets en Docker**. À très vite 😉.

D'ici là, je vous invite :

- [à relire le chapitre réseau du cours](/cours/docker-et-docker-compose/chapitres/gestion-reseau-infrastructure)
  pour revoir les bases sur les ports.

## Ressources

- [La documentation officielle sur les réseaux Docker](https://docs.docker.com/engine/network/)
- [Les drivers réseau Docker](https://docs.docker.com/engine/network/drivers/)
- [Networking in Compose](https://docs.docker.com/compose/how-tos/networking/)
- [docker network – Référence CLI](https://docs.docker.com/reference/cli/docker/network/)
