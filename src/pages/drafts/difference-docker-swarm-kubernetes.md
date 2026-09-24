---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Docker Swarm et Kubernetes, quelles différences ?"
description: "Deux orchestrateurs de conteneurs, deux philosophies. Swarm mise sur la
  simplicité et le fichier Compose, Kubernetes sur un modèle complet et un
  écosystème immense. On compare les deux pour savoir lequel choisir."

imgAlt:
  Un petit port tranquille avec quelques bateaux à côté d'un immense terminal à
  conteneurs rempli de grues, pixel art
imgSrc: /images/cheatsheets/difference-docker-swarm-kubernetes.webp

author: Thomas Dimnet
github: tdimnet
kind: Fiche technique
serie: docker
tags:
  - Orchestration
  - Production
level: Intermédiaire
publishedDate: 10/07/2026

faq:
  - question: Quelle est la différence entre Docker Swarm et Kubernetes ?
    answer:
      "Les deux répartissent des conteneurs sur plusieurs machines. Swarm est
      intégré à Docker et reprend le format du fichier Compose il s'installe en
      une commande et se prend en main en une après-midi. Kubernetes est un
      projet à part, plus complet et plus extensible, mais nettement plus
      exigeant à apprendre et à exploiter."
  - question: Docker Swarm est-il abandonné ?
    answer:
      "Non, Swarm est toujours maintenu et fonctionne très bien en production.
      Mais il évolue peu, et l'essentiel de l'écosystème, des offres managées et
      des offres d'emploi s'est concentré sur Kubernetes."
  - question: Faut-il apprendre Kubernetes avant Docker Swarm ?
    answer:
      "Non. Les deux reposent sur les mêmes notions (image, conteneur, réplique,
      réseau, secret). Swarm est une très bonne porte d'entrée vers
      l'orchestration, et ce que vous y apprenez se transpose presque tel quel
      dans Kubernetes."
---

Dans
[la fiche sur Docker, Compose et Swarm](/fiches/difference-docker-compose-swarm),
on s'était arrêtés au dernier niveau  l'orchestration, quand une seule machine
ne suffit plus. Et on avait glissé, entre parenthèses, « ou un orchestrateur
comme Kubernetes ».

Cette parenthèse mérite sa propre fiche. Parce que dès qu'on s'intéresse à
l'orchestration, la question arrive très vite  **Swarm ou Kubernetes ** Et les
réponses qu'on trouve en ligne vont de « Swarm est mort » à « Kubernetes, c'est
de l'usine à gaz ». Les deux sont exagérées.

Dans cette fiche, on compare les deux sur ce qui compte vraiment  la prise en
main, le modèle, l'exploitation au quotidien et l'écosystème. Vous allez voir
que la bonne réponse dépend moins des outils que de votre équipe.

---

## Le même problème, deux réponses

Commençons par ce qui les rapproche. Swarm et Kubernetes répondent exactement au
même besoin  **faire tourner des conteneurs sur un ensemble de machines comme si
elles n'en formaient qu'une**.

<br>

Dans les deux cas, on retrouve les mêmes idées 

- **un état souhaité**  vous décrivez ce que vous voulez (trois répliques de
  telle image, exposées sur tel port), et l'orchestrateur se charge d'y arriver 
- **une boucle de réconciliation**  si un conteneur tombe ou si une machine
  disparaît, l'orchestrateur constate l'écart et relance ce qu'il faut ailleurs 
- **des mises à jour progressives**  on remplace les conteneurs un par un, sans
  coupure de service 
- **un réseau et des secrets partagés** à l'échelle du cluster.

<br>

Là où ils divergent, c'est sur la philosophie. **Swarm prolonge Docker**  même
outil, même vocabulaire, même fichier. **Kubernetes repart d'une page blanche**
avec son propre modèle, pensé pour tout couvrir, quitte à tout rendre explicite.

---

## Docker Swarm  l'orchestration sans quitter Docker

Swarm est intégré au moteur Docker depuis 2016. Il n'y a rien à installer  si
Docker tourne sur vos machines, Swarm aussi. Si vous l'avez manqué, on l'a vu en
détail dans [la fiche dédiée à Docker Swarm](/fiches/decouvrir-docker-swarm).

```bash
# Sur la première machine
docker swarm init

# Sur les autres, avec le jeton affiché par la commande précédente
docker swarm join --token <jeton> <ip-du-manager>:2377
```

<br>

Pour déployer une application, on reprend le fichier Compose qu'on connaît déjà,
avec une section `deploy` en plus 

```yaml
services:
  api:
    image: mon-api:1.0.0
    ports:
      - "3000:3000"
    deploy:
      replicas: 3
```

```bash
docker stack deploy -c docker-compose.yml mon-app
```

<br>

Et c'est tout. Le réseau entre les machines, la répartition de charge, la
publication du port sur tous les nœuds (le _routing mesh_)  Swarm s'en occupe
sans configuration supplémentaire.

<br>

**Sa force, c'est ce qu'il n'exige pas.** Une personne qui connaît Docker
Compose est opérationnelle sur Swarm en une après-midi. Le cluster lui-même se
résume à quelques machines Docker, sans composant à part à maintenir.

---

## Kubernetes  un modèle complet

Kubernetes a été publié par Google en 2014, puis confié à la _Cloud Native
Computing Foundation_ (CNCF). C'est aujourd'hui le standard de fait de
l'orchestration.

<br>

Son approche est différente  **tout est un objet**, décrit en YAML et envoyé à
une API centrale. Chaque objet a un rôle précis 

- le **Pod**, la plus petite unité, un ou plusieurs conteneurs qui vivent
  ensemble 
- le **Deployment**, qui maintient un nombre donné de pods identiques et gère
  leurs mises à jour 
- le **Service**, qui donne une adresse stable à un groupe de pods 
- l'**Ingress**, qui expose des services vers l'extérieur, en HTTP 
- les **ConfigMap** et **Secret**, pour la configuration.

<br>

La même application qu'au-dessus, version Kubernetes 

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: mon-api:1.0.0
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000
```

```bash
kubectl apply -f api.yaml
```

<br>

C'est plus long, et c'est voulu. Là où Swarm devine, Kubernetes vous demande de
préciser. Chaque morceau est remplaçable, extensible et pilotable par l'API.
C'est ce qui permet, par exemple 

- la **mise à l'échelle automatique** selon la charge (le _Horizontal Pod
  Autoscaler_), que Swarm ne propose pas 
- des **sondes de santé** distinctes pour savoir si un conteneur est vivant,
  prêt à recevoir du trafic, ou encore en train de démarrer 
- des **ressources sur mesure**  on peut apprendre à Kubernetes à gérer une base
  de données ou un certificat comme n'importe quel objet (les _operators_).

<br>

Le revers, c'est la courbe d'apprentissage. Et surtout l'exploitation  **un
cluster Kubernetes, c'est un plan de contrôle à maintenir** (serveur d'API, base
etcd, ordonnanceur…), à mettre à jour plusieurs fois par an. C'est pour ça que
la plupart des équipes passent par un Kubernetes managé, que tous les grands
fournisseurs cloud proposent.

---

## L'écosystème, le vrai écart

Sur le papier, les deux outils font l'essentiel du même travail. **La vraie
différence se trouve autour.**

<br>

Kubernetes a attiré à peu près tout l'écosystème 

- **Helm**, pour empaqueter et installer des applications entières en une
  commande 
- des outils de déploiement continu qui synchronisent le cluster avec un dépôt
  Git 
- la supervision, les journaux, le maillage de services… presque tout
  l'outillage récent se pense d'abord pour Kubernetes 
- des offres managées chez tous les fournisseurs, et une large majorité des
  offres d'emploi qui mentionnent l'orchestration.

<br>

Swarm, lui, est toujours maintenu, et il tourne très bien en production. Mais
**il évolue peu**, et sa communauté s'est réduite. Ce n'est pas un problème si
vos besoins sont couverts aujourd'hui. Ça le devient si vous comptez sur des
outils tiers qui n'existent que pour Kubernetes.

---

## Tableau récapitulatif

|                           | Docker Swarm                    | Kubernetes                      |
| ------------------------- | ------------------------------- | ------------------------------- |
| **Installation**          | Intégré à Docker                | Projet à part, ou offre managée |
| **Format**                | Fichier Compose + `deploy`      | Manifestes YAML, un par objet   |
| **Prise en main**         | Quelques heures                 | Plusieurs semaines              |
| **Réseau et exposition**  | Routing mesh, automatique       | Service, Ingress, à configurer  |
| **Mise à l'échelle auto** | ❌                              | ✅                              |
| **Extensibilité**         | Limitée                         | Très forte (CRD, operators)     |
| **Écosystème**            | Réduit                          | Immense                         |
| **Exploitation**          | Légère                          | Lourde, sauf en managé          |
| **Idéal pour**            | Petites équipes, quelques nœuds | Plateformes, grandes équipes    |

---

## Alors, lequel choisir 

La question à se poser n'est pas « lequel est le meilleur  » mais **« de quoi
mon équipe a-t-elle besoin, et qui va s'en occuper  »**

<br>

**Swarm a du sens si **

- vous êtes une petite équipe, sans personne dédiée à l'infrastructure 
- votre application tient sur quelques machines et ne change pas d'échelle
  brutalement 
- vous utilisez déjà Docker Compose et vous voulez passer à plusieurs serveurs
  sans tout réapprendre.

<br>

**Kubernetes a du sens si **

- vous avez beaucoup de services, plusieurs équipes, ou une charge qui varie
  fortement 
- vous avez besoin de mise à l'échelle automatique ou d'outils de l'écosystème 
- vous pouvez vous appuyer sur une offre managée, ou sur des gens dont c'est le
  métier 
- vous visez des postes où Kubernetes est demandé — autant l'apprendre.

<br>

Mon conseil  **Choisissez l'outil que votre équipe sait faire tourner à trois
heures du matin**. Un cluster Swarm bien compris vaut mieux qu'un Kubernetes que
personne ne maîtrise. Et si vous hésitez encore, rappelez-vous que
[Docker Compose sur un seul serveur](/fiches/difference-docker-compose-swarm)
couvre bien plus de projets qu'on ne le croit.

<br>

Entre les deux, il existe aussi des distributions allégées de Kubernetes, comme
**k3s**, pensées pour les petits clusters et les machines modestes. Elles
gardent l'API de Kubernetes en réduisant beaucoup la charge d'exploitation.

---

## Astuce bonus — Passer de Compose à Kubernetes avec Kompose

Si vous avez des fichiers Compose et que vous voulez voir à quoi ils
ressembleraient dans Kubernetes, il existe un outil officiel du projet 
**Kompose**.

```bash
kompose convert -f docker-compose.yml
```

<br>

Il génère un Deployment et un Service pour chacun de vos services. Le résultat
n'est pas à envoyer tel quel en production — il faudra ajouter les sondes de
santé, les limites de ressources, l'Ingress… Mais c'est un excellent support
pour **comprendre la correspondance entre les deux mondes**, à partir d'un
fichier que vous connaissez déjà.

<hr>

Et voilà, vous avez maintenant de quoi trancher  Pour résumer en une phrase 
**Swarm prolonge Docker Compose sur plusieurs machines avec un minimum d'effort,
Kubernetes offre un modèle bien plus complet et un écosystème immense, au prix
d'une vraie complexité à apprendre et à exploiter**.

En attendant d'y voir plus clair sur votre propre cas, je vous invite 

- [à relire la fiche sur Docker Swarm](/fiches/decouvrir-docker-swarm) si vous
  voulez tester l'orchestration en conditions réelles 
- [à découvrir Podman](/drafts/difference-docker-podman), qui fait le pont entre
  les conteneurs locaux et les pods de Kubernetes 
- [à (re)commencer le cours sur Docker et Docker Compose](/cours/docker-et-docker-compose/)
  si ce n'est pas déjà fait.

## Ressources

- [La documentation officielle de Docker Swarm](https://docs.docker.com/engine/swarm/)
- [La documentation officielle de Kubernetes, en français](https://kubernetes.io/fr/docs/home/)
- [Kompose, traduire un fichier Compose pour Kubernetes](https://kompose.io/)
- [k3s, une distribution légère de Kubernetes](https://k3s.io/)
