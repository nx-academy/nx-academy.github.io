---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Docker et Podman, quelles différences ?"
description:
  "Podman se présente comme un remplaçant de Docker. Mêmes commandes, mêmes
  images, mais pas de démon et pas de root on regarde ce qui change vraiment, ce
  qui coince, et dans quels cas la bascule vaut le coup."

imgAlt:
  Deux grues portuaires côte à côte qui soulèvent le même conteneur, l'une
  reliée à une salle des machines, l'autre non, pixel art
imgSrc: /images/cheatsheets/difference-docker-podman.webp

author: Thomas Dimnet
github: tdimnet
kind: Fiche technique
serie: docker
tags:
  - Sécurité
  - Production
level: Intermédiaire
publishedDate: 09/30/2026

faq:
  - question: Quelle est la différence entre Docker et Podman ?
    answer:
      "Docker passe par un démon, un service qui tourne en permanence avec les
      droits root et qui lance les conteneurs pour vous. Podman n'a pas de démon
      chaque commande lance directement ses conteneurs, et par défaut sans les
      droits root. Les images, les registries et la plupart des commandes sont
      les mêmes."
  - question: Podman peut-il remplacer Docker ?
    answer:
      "Pour construire des images et faire tourner des conteneurs, oui la ligne
      de commande est compatible et les images sont au même format OCI. Les
      écarts se trouvent autour — Docker Compose, Docker Swarm, les ports
      privilégiés en mode rootless, les droits sur les volumes."
  - question: Les images Docker fonctionnent-elles avec Podman ?
    answer:
      "Oui. Docker et Podman produisent et lisent des images au format OCI, un
      standard ouvert. Une image construite avec l'un tourne avec l'autre, et
      les deux poussent vers les mêmes registries."
---

Si vous suivez un peu l'actualité des conteneurs, vous avez forcément croisé ce
nom  **Podman**. Il revient dans les articles, dans les offres d'emploi, et de
plus en plus souvent dans une phrase du type « de toute façon, on est passés à
Podman ».

La promesse tient en une ligne  **faire tout ce que fait Docker, sans démon et
sans root**. Au point que la documentation de Podman propose, très sérieusement,
de taper `alias docker=podman` et de ne plus y penser.

Alors, simple changement de nom sur la boîte ou vraie différence de conception 
Est-ce que tout ce que vous avez appris avec Docker tient toujours  Et surtout,
faut-il changer 

Dans cette fiche, on regarde ce qui est pareil, ce qui change vraiment, et ce
qui coince le jour où on essaie.

---

## Pourquoi on en parle autant 

Podman est un projet open source né chez Red Hat. Il existe depuis 2018, mais on
en parle surtout depuis quelques années, pour deux raisons.

<br>

La première est **une question de licence**. Depuis 2021, Docker Desktop —
l'application qu'on installe sur macOS et Windows — est payant pour les
entreprises de plus de 250 salariés ou de plus de 10 millions de dollars de
chiffre d'affaires. Beaucoup d'équipes ont cherché une alternative à ce
moment-là, et Podman (avec son interface graphique, Podman Desktop) était la
plus proche.

Attention à ne pas tout mélanger  **Docker Engine, le moteur, reste libre et
gratuit**. C'est l'application de bureau qui a changé de modèle, pas Docker en
tant que tel.

<br>

La seconde est **une question de sécurité**, et c'est la plus intéressante
techniquement. Elle tient à un seul mot  le démon.

---

## Ce qui ne change pas

Commençons par la bonne nouvelle. Si vous savez vous servir de Docker, vous
savez vous servir de Podman.

<br>

- **Les commandes** sont les mêmes, à quelques options près  `podman run`,
  `podman build`, `podman ps`, `podman images`, `podman push`…
- **Les images** sont au même format, le standard OCI (_Open Container
  Initiative_). Une image construite avec Docker tourne avec Podman, et
  inversement.
- **Les registries** sont les mêmes. Docker Hub, GitHub Container Registry ou
  [votre registry privé](/fiches/presentation-registry-docker)  Podman pousse et
  tire depuis les mêmes endroits.
- **Le Dockerfile** fonctionne tel quel. Podman accepte aussi le nom
  `Containerfile`, plus neutre, mais le contenu est identique.

<br>

Concrètement 

```bash
# Avec Docker
docker container run -d -p 8080:80 nginx

# Avec Podman
podman container run -d -p 8080:80 docker.io/library/nginx
```

<br>

La seule différence visible ici, c'est le nom complet de l'image. On y revient
plus bas, c'est l'un des pièges classiques.

---

## La vraie différence  le démon

Quand vous tapez une commande `docker`, ce n'est pas elle qui lance le
conteneur. **La commande envoie une requête à un démon, `dockerd`**, un service
qui tourne en permanence en arrière-plan. C'est lui qui construit les images,
lance les conteneurs, gère les réseaux et les volumes.

<br>

Ce modèle a deux conséquences 

- **le démon tourne avec les droits root**. Quiconque peut lui parler (autrement
  dit, quiconque appartient au groupe `docker`) peut, en pratique, obtenir les
  droits root sur la machine. Monter la racine du système dans un conteneur
  suffit 
- **tous les conteneurs dépendent de lui**. Si le démon s'arrête ou redémarre,
  c'est lui qui décide de ce que deviennent les conteneurs.

<br>

**Podman n'a pas de démon.** Quand vous tapez `podman run`, la commande lance
elle-même le conteneur, comme n'importe quel programme lance un sous-processus.
Le conteneur appartient à l'utilisateur qui l'a démarré, et à personne d'autre.

<br>

C'est plus simple, et c'est surtout plus facile à raisonner  un conteneur Podman
est un processus comme un autre, que vous pouvez suivre avec les outils
habituels du système.

---

## Rootless par défaut

La conséquence directe, c'est le mode **rootless**  Podman fait tourner vos
conteneurs **avec vos droits d'utilisateur**, sans jamais passer par root.

Grâce aux _user namespaces_ du noyau Linux, le processus se croit root à
l'intérieur du conteneur, mais il n'est que vous à l'extérieur. Si quelqu'un
s'échappe du conteneur, il se retrouve avec vos droits, pas avec ceux de la
machine.

<br>

Précision importante, pour être juste avec Docker  **Docker sait aussi tourner
en rootless**, depuis la version 20.10. Mais c'est une option qu'il faut activer
et configurer. Chez Podman, c'est le comportement par défaut. Et en sécurité, le
réglage par défaut est celui que tout le monde garde.

---

## Les pods, un pied dans Kubernetes

Le nom Podman vient de là  **Podman sait gérer des pods**, un concept emprunté à
Kubernetes. Un pod, c'est un groupe de conteneurs qui partagent le même réseau
(ils se joignent sur `localhost`) et qu'on démarre et arrête ensemble.

```bash
# On crée un pod qui expose le port 8080
podman pod create --name mon-app -p 8080:80

# On y ajoute deux conteneurs
podman run -d --pod mon-app docker.io/library/nginx
podman run -d --pod mon-app docker.io/library/redis
```

<br>

Mieux  Podman sait **traduire un pod en manifeste Kubernetes**, et l'inverse.

```bash
# Générer le YAML Kubernetes d'un pod existant
podman kube generate mon-app > mon-app.yaml

# Relancer ce YAML en local
podman kube play mon-app.yaml
```

<br>

C'est un vrai atout si votre production tourne sur Kubernetes  vous travaillez
en local avec le même vocabulaire que votre cluster.

---

## Là où ça coince

Voici la partie que les articles enthousiastes oublient souvent. La
compatibilité est très bonne, mais pas totale.

### Les noms d'images courts

Docker sous-entend Docker Hub  `nginx` veut dire `docker.io/library/nginx`.
Podman, lui, ne présume d'aucun registry. Selon la configuration de votre
système (le fichier `registries.conf`), il vous demandera où chercher, ou
refusera. **Écrivez toujours le nom complet**, c'est de toute façon une bonne
pratique.

### Les ports sous 1024

En rootless, un utilisateur normal ne peut pas ouvrir les ports privilégiés.
`-p 80:80` échouera. Publiez sur un port haut (`-p 8080:80`) et mettez un
[reverse proxy](/fiches/comprendre-les-proxys-et-reverse-proxys) devant, ou
abaissez la limite du noyau si vous savez ce que vous faites.

### Les droits sur les volumes

Avec les _user namespaces_, l'utilisateur « root » du conteneur correspond à
votre utilisateur sur la machine, et les autres utilisateurs du conteneur à des
identifiants décalés. Résultat  des fichiers créés dans un
[volume](/fiches/bien-utiliser-volumes-docker) peuvent apparaître avec un
propriétaire inattendu. L'option `--userns=keep-id` règle la plupart des cas.
Sur les distributions avec SELinux (Fedora, RHEL), il faut aussi ajouter `:Z` au
montage.

### Docker Compose

Podman n'embarque pas Compose. Deux solutions  `podman-compose`, une
réimplémentation en Python, ou le vrai Docker Compose branché sur la socket de
Podman, qui imite l'API de Docker. La commande `podman compose` choisit l'un ou
l'autre pour vous. Ça marche bien pour les cas courants, un peu moins pour les
fichiers complexes.

### Docker Swarm

Là, pas de solution  **Podman ne fait pas de Swarm**. Si votre production repose
sur [un cluster Swarm](/fiches/decouvrir-docker-swarm), Podman n'est pas un
remplaçant. Le projet regarde clairement vers Kubernetes.

### Sur macOS et Windows

Les conteneurs Linux ont besoin d'un noyau Linux. Comme Docker Desktop, Podman
passe donc par une machine virtuelle sur macOS et Windows, à créer avec
`podman machine init`. Sur ces systèmes, l'argument « pas de démon » perd un peu
de sa force  il y a une VM qui tourne en permanence.

---

## Tableau récapitulatif

|                           | Docker                        | Podman                       |
| ------------------------- | ----------------------------- | ---------------------------- |
| **Architecture**          | Un démon (`dockerd`)          | Pas de démon                 |
| **Droits par défaut**     | Root (rootless en option)     | Rootless                     |
| **Format d'image**        | OCI                           | OCI                          |
| **Ligne de commande**     | `docker`                      | `podman`, compatible         |
| **Compose**               | Intégré (`docker compose`)    | `podman-compose` ou Compose  |
| **Orchestration**         | Docker Swarm                  | Pods, export vers Kubernetes |
| **Démarrage automatique** | Géré par le démon (`restart`) | Géré par systemd (Quadlet)   |
| **Poste macOS / Windows** | Docker Desktop (payant > 250) | Podman Desktop (gratuit)     |

---

## Alors, lequel choisir 

Comme souvent, ça dépend de votre contexte. Mais on peut dégager quelques
repères.

<br>

**Podman a du sens si **

- vous travaillez sur un serveur Linux et la sécurité compte (plusieurs
  utilisateurs, conteneurs exposés à Internet, exigences de conformité) 
- votre production tourne sur Kubernetes, et vous voulez le même vocabulaire en
  local 
- vous êtes sur Fedora ou RHEL, où Podman est l'outil installé par défaut 
- la licence de Docker Desktop pose problème dans votre entreprise.

<br>

**Docker reste le choix le plus simple si **

- vous dépendez de Docker Compose sur des fichiers riches, ou de Docker Swarm 
- votre équipe, vos outils et votre CI sont déjà bâtis autour de Docker 
- vous débutez  l'essentiel des tutoriels, des cours et des réponses en ligne
  parlent Docker.

<br>

Mon avis  **La bonne nouvelle, c'est qu'on ne choisit pas un camp**. Les images
sont les mêmes, les registries aussi, et tout ce que vous savez sur les
conteneurs reste vrai. Si la question se pose, essayez Podman sur un projet
secondaire avec `alias docker=podman`, et regardez ce qui casse. C'est souvent
moins que prévu — mais rarement rien.

---

## Astuce bonus — Démarrer un conteneur avec la machine grâce à Quadlet

Sans démon, qui relance vos conteneurs après un redémarrage du serveur  Chez
Podman, la réponse est **systemd**, le gestionnaire de services de Linux, via un
mécanisme appelé Quadlet.

On décrit le conteneur dans un petit fichier, par exemple
`~/.config/containers/systemd/web.container` 

```ini
[Unit]
Description=Mon serveur web

[Container]
Image=docker.io/library/nginx:1.27
PublishPort=8080:80

[Install]
WantedBy=default.target
```

<br>

Puis on demande à systemd de le prendre en compte 

```bash
systemctl --user daemon-reload
systemctl --user start web.service

# Pour que vos services démarrent sans que vous soyez connecté
loginctl enable-linger $USER
```

<br>

Votre conteneur devient un service système comme les autres  journaux dans
`journalctl`, redémarrage automatique, dépendances entre services. C'est moins
immédiat qu'un `restart: always`, mais c'est la manière Linux de faire, et elle
a fait ses preuves.

<hr>

Et voilà, vous savez maintenant ce qui se cache derrière Podman  Pour résumer en
une phrase  **Podman fait la même chose que Docker, avec les mêmes images, mais
sans démon et sans root par défaut — ce qui change surtout la sécurité, et un
peu l'outillage autour**.

Et puisque Podman regarde vers Kubernetes, la prochaine fiche pose justement la
question de l'orchestration 
[Docker Swarm ou Kubernetes](/drafts/difference-docker-swarm-kubernetes)  Restez
dans le coin 😉.

D'ici là, je vous invite 

- [à relire la fiche sur les secrets Docker](/fiches/bien-gerer-secrets-docker),
  l'autre grand chantier de la sécurité des conteneurs 
- [à (re)commencer le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose/)
  si les bases sont encore fraîches.

## Ressources

- [La documentation officielle de Podman](https://docs.podman.io/)
- [Podman Desktop](https://podman-desktop.io/)
- [Faire tourner Docker en mode rootless (Docker)](https://docs.docker.com/engine/security/rootless/)
- [Quadlet, la page de manuel de podman-systemd.unit](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html)
