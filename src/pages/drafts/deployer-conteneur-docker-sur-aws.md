---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment déployer un conteneur Docker sur AWS (ECS Fargate) ?"
description:
  "La mise en pratique des six étapes du déploiement, chez AWS, avec ECS sur
  Fargate : dépôt ECR, les deux rôles IAM, définition de tâche, service,
  variables et secrets, les deux healthchecks et la mise à l'échelle."

imgAlt:
  Un conteneur maritime suspendu par une grue au-dessus d'un labyrinthe de quais
  balisés, un gardien à l'entrée, pixel art
imgSrc: /images/cheatsheets/deployer-conteneur-docker-sur-aws.webp

author: Thomas Dimnet
kind: Fiche technique
serie: cloud
tags:
  - Cloud
  - Docker
  - Production
level: Avancé
publishedDate: 09/28/2026

faq:
  - question: Comment déployer un conteneur Docker sur AWS ?
    answer:
      "Poussez votre image sur un dépôt ECR, créez les deux rôles IAM attendus
      par ECS, enregistrez une définition de tâche qui décrit l'image, le port,
      les variables et le healthcheck, puis créez un service ECS sur Fargate en
      lui donnant ses sous-réseaux et son groupe de sécurité."
  - question:
      Quelle est la différence entre le rôle d'exécution et le rôle de tâche
      dans ECS ?
    answer:
      "Le rôle d'exécution sert à ECS lui-même, avant que votre code ne
      démarre : récupérer l'image sur ECR, écrire les journaux, lire les
      secrets. Le rôle de tâche sert à votre application pendant qu'elle tourne,
      pour appeler S3, DynamoDB ou toute autre API AWS. Le premier est presque
      toujours le même, le second vous appartient."
  - question: Un service ECS sur Fargate peut-il descendre à zéro instance ?
    answer:
      "Non, pas de manière native. Un service ECS maintient le nombre de tâches
      que vous lui demandez, et la facturation Fargate court tant qu'une tâche
      tourne. Si la mise à l'échelle à zéro compte pour vous, regardez plutôt du
      côté d'App Runner ou d'un autre service à l'usage."

howTo:
  name: Déployer un conteneur Docker sur AWS ECS Fargate
  steps:
    - name: Publier l'image sur un registry
      text:
        Créez un dépôt ECR, authentifiez Docker avec aws ecr get-login-password,
        puis étiquetez et poussez l'image.
    - name: Autoriser le service à lire l'image
      text:
        Créez le rôle d'exécution attendu par ECS et attachez-lui la politique
        gérée AmazonECSTaskExecutionRolePolicy, puis le rôle de tâche de votre
        application.
    - name: Créer le service à partir de l'image
      text:
        Créez un cluster, enregistrez une définition de tâche Fargate décrivant
        le conteneur, puis créez le service avec ses sous-réseaux et son groupe
        de sécurité.
    - name: Déclarer les variables d'environnement
      text:
        Renseignez environment pour la configuration ordinaire et secrets avec
        valueFrom pour les valeurs sensibles rangées dans Secrets Manager.
    - name: Brancher un healthcheck
      text:
        Déclarez le healthCheck de la définition de tâche, et celui du groupe
        cible du répartiteur de charge si vous en avez un.
    - name: Vérifier et régler la mise à l'échelle
      text:
        Lisez les journaux du premier démarrage, puis enregistrez le service
        auprès d'Application Auto Scaling pour borner le nombre de tâches.
---

[La fiche Scaleway](/drafts/deployer-conteneur-docker-sur-scaleway) déroulait
les six étapes du
[déploiement d'un conteneur dans le cloud](/drafts/deployer-conteneur-docker-dans-le-cloud)
chez un premier fournisseur. On refait exactement le même parcours chez AWS,
avec **ECS sur Fargate**.

Autant l'annoncer tout de suite : **c'est plus long**. Là où Scaleway demandait
deux commandes pour créer un service, AWS en demande un cluster, une définition
de tâche, un service, et deux rôles IAM avant même de commencer. Ce n'est pas de
la complexité gratuite — c'est ce que vous payez pour des briques que vous
pourrez recombiner. Mais mieux vaut le savoir avant d'ouvrir le terminal.

<br>

**Pourquoi ECS et pas App Runner ?** Parce que c'est ce que les équipes
exploitent réellement, et ce que vous rencontrerez dans un dépôt existant. App
Runner, l'équivalent direct de ce qu'on a fait chez Scaleway, ferme la fiche en
astuce bonus.

<br>

Ce qu'il vous faut : une image construite, un compte AWS, la CLI `aws`
configurée, et un VPC avec au moins un sous-réseau — celui par défaut fait très
bien l'affaire. Les exemples utilisent la région `eu-west-3` (Paris) et le
numéro de compte fictif `123456789012`.

---

## Étape 1 - Publier l'image sur un registry

Le registry maison s'appelle ECR, et son unité de base est le **dépôt** : un
dépôt par image, contrairement au namespace Scaleway qui les regroupe.

```bash
aws ecr create-repository \
  --repository-name mon-api \
  --region eu-west-3
```

<br>

L'authentification passe par un jeton temporaire, valable douze heures, qu'on
récupère et qu'on pousse directement dans `docker login` :

```bash
aws ecr get-login-password --region eu-west-3 \
  | docker login --username AWS --password-stdin \
    123456789012.dkr.ecr.eu-west-3.amazonaws.com
```

Le nom d'utilisateur est littéralement `AWS`, comme `nologin` chez Scaleway :
c'est la valeur attendue, pas un exemple à remplacer.

<br>

Puis l'étiquetage et le push, **avec un numéro de version, jamais `latest`** :

```bash
docker tag mon-api:1.4.0 \
  123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-api:1.4.0
docker push 123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-api:1.4.0
```

---

## Étape 2 - Autoriser le service à lire l'image

Voilà l'étape qui n'existait pas chez Scaleway. Ici, elle occupe une section
entière, et c'est le morceau qu'il faut vraiment comprendre : **ECS attend deux
rôles IAM distincts, qui ne servent pas au même moment.**

<br>

- **Le rôle d'exécution** (`executionRoleArn`) sert à ECS lui-même, **avant que
  votre code ne démarre**. C'est lui qui récupère l'image sur ECR, crée le flux
  de journaux et lit les secrets. Il est presque toujours identique d'un projet
  à l'autre ;
- **Le rôle de tâche** (`taskRoleArn`) sert à **votre application pendant
  qu'elle tourne**, pour appeler S3, DynamoDB, SQS. Celui-là vous appartient, et
  il n'a aucune raison de pouvoir lire quoi que ce soit sur ECR.

<br>

Confondre les deux est l'erreur classique. Le symptôme est très reconnaissable :
la tâche s'arrête avant tout démarrage avec un message de type
`CannotPullContainerError`, alors que votre application, elle, n'a jamais été
appelée.

<br>

Le rôle d'exécution, d'abord. Il a besoin d'une politique de confiance qui
autorise le service ECS à l'endosser :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ecs-tasks.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

<br>

```bash
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://ecs-tasks-trust.json

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

<br>

Cette politique gérée couvre la lecture d'ECR et l'écriture dans CloudWatch
Logs. **Elle ne couvre pas Secrets Manager** — on y revient à l'étape 4, c'est
précisément là que ça se voit.

<br>

Le rôle de tâche se crée avec la même politique de confiance, et vous lui
attachez ce dont votre application a réellement besoin. Si elle n'appelle aucune
API AWS, vous pouvez tout simplement ne pas en déclarer : le champ est
optionnel.

---

## Étape 3 - Créer le service à partir de l'image

Trois objets, dans cet ordre : un cluster, une définition de tâche, un service.

<br>

Le cluster d'abord. Sur Fargate, c'est un objet à peu près vide — il ne contient
aucune machine, il sert de regroupement logique :

```bash
aws ecs create-cluster --cluster-name nx-demo --region eu-west-3
```

<br>

La définition de tâche ensuite. C'est le cœur du dispositif, et l'équivalent du
`scw container container create` de la fiche Scaleway — sauf qu'ici, tout passe
par un fichier JSON :

```json
{
  "family": "mon-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "mon-api",
      "image": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-api:1.4.0",
      "essential": true,
      "portMappings": [{ "containerPort": 8080, "protocol": "tcp" }],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/mon-api",
          "awslogs-region": "eu-west-3",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

<br>

```bash
aws logs create-log-group --log-group-name /ecs/mon-api --region eu-west-3
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

<br>

Trois pièges dans ce fichier :

- **`cpu` et `memory` ne se combinent pas librement.** Fargate n'accepte que
  certains couples : `512` (un demi-vCPU) va avec 1 Go, 2 Go, 3 Go ou 4 Go, et
  rien d'autre. Une valeur hors liste est refusée à l'enregistrement ;
- **`networkMode` doit valoir `awsvpc`** sur Fargate. Il n'y a pas
  d'alternative, mais l'oubli donne un message peu parlant ;
- **le groupe de journaux doit exister avant** la première tâche, d'où le
  `create-log-group` ci-dessus. Sinon la tâche démarre, échoue à écrire, et
  s'arrête sans vous laisser de trace — ce qui est un comble.

<br>

Le service enfin. C'est lui qui maintient vos tâches en vie :

```bash
aws ecs create-service \
  --cluster nx-demo \
  --service-name mon-api \
  --task-definition mon-api \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration \
    'awsvpcConfiguration={subnets=[subnet-0abc123],securityGroups=[sg-0def456],assignPublicIp=ENABLED}'
```

<br>

`assignPublicIp=ENABLED` est indispensable si vos sous-réseaux n'ont pas de
passerelle NAT : sans adresse publique, la tâche ne peut même pas joindre ECR
pour récupérer son image. C'est la deuxième cause d'échec au démarrage, après
les rôles.

<br>

Et une différence de fond avec Scaleway : **vous n'avez pas d'URL à ce stade.**
Chaque tâche a sa propre adresse IP, qui change à chaque redéploiement. Pour une
adresse stable, il faut ajouter un répartiteur de charge applicatif — un ALB, un
groupe cible, un écouteur, et l'option `--load-balancer` sur le service. C'est
un sujet à part entière ; retenez surtout que **l'URL publique n'est pas
incluse**.

---

## Étape 4 - Déclarer les variables d'environnement

Le tri de la fiche de départ — configuration ordinaire d'un côté, secrets de
l'autre — devient deux tableaux dans la définition de conteneur :

```json
"environment": [
  { "name": "LOG_LEVEL", "value": "info" },
  { "name": "APP_ENV", "value": "production" }
],
"secrets": [
  {
    "name": "DATABASE_URL",
    "valueFrom": "arn:aws:secretsmanager:eu-west-3:123456789012:secret:prod/mon-api/database-url"
  }
]
```

<br>

`environment` porte des valeurs en clair, lisibles par quiconque peut décrire la
définition de tâche. `secrets` ne porte **que des références** : ECS résout
l'ARN au démarrage et injecte la valeur dans le conteneur, sans qu'elle
apparaisse jamais dans la définition.

<br>

Et c'est ici que la remarque de l'étape 2 se paye.
**`AmazonECSTaskExecutionRolePolicy` ne donne pas accès à Secrets Manager.** Il
faut ajouter au rôle d'exécution une politique en propre, limitée aux secrets
concernés :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": "arn:aws:secretsmanager:eu-west-3:123456789012:secret:prod/mon-api/*"
    }
  ]
}
```

Ajoutez `kms:Decrypt` si le secret est chiffré avec une clé qui vous appartient
plutôt qu'avec la clé par défaut. Et résistez au `Resource: "*"` : c'est le
genre de raccourci qui survit très longtemps.

<br>

Dernier point, valable partout : **changer une variable impose un
redéploiement**. Concrètement, ici, cela veut dire enregistrer une nouvelle
révision de la définition de tâche, puis mettre le service à jour.

---

## Étape 5 - Brancher un healthcheck

Le piège de cette étape est qu'il y en a **deux**, et qu'ils ne répondent pas à
la même question.

<br>

**Le healthcheck de la définition de tâche** demande « ce conteneur est-il
vivant ? ». Il tourne à l'intérieur du conteneur, donc la commande doit exister
dans votre image — `curl` n'y est pas toujours :

```json
"healthCheck": {
  "command": ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"],
  "interval": 10,
  "timeout": 5,
  "retries": 3,
  "startPeriod": 30
}
```

<br>

**Le healthcheck du groupe cible**, lui, demande « faut-il router du trafic vers
cette tâche ? ». Il n'existe que si vous avez mis un répartiteur de charge, il
appelle votre route depuis l'extérieur, et c'est celui qui décide réellement
d'un déploiement sans coupure.

<br>

`startPeriod` vaut la peine d'être réglé : c'est le délai de grâce avant que les
échecs commencent à compter. Une application qui met vingt secondes à ouvrir son
pool de connexions, avec un `startPeriod` à zéro, entre dans une boucle de
redémarrages parfaitement silencieuse.

<br>

Les qualités d'une bonne route de santé, elles, ne changent pas d'un fournisseur
à l'autre : rapide, honnête — si l'application ne sait pas fonctionner sans sa
base, elle doit vérifier que la base répond — et silencieuse dans les journaux.

---

## Étape 6 - Vérifier, puis borner la mise à l'échelle

D'abord le premier démarrage. Deux commandes qui vous diront presque tout :

```bash
aws ecs describe-services --cluster nx-demo --services mon-api
aws logs tail /ecs/mon-api --follow --region eu-west-3
```

Le champ `stoppedReason` de `describe-services` nomme la cause quand une tâche
ne tient pas. C'est là que les rôles de l'étape 2 et le port de l'étape 3 se
rappellent à vous.

<br>

Ensuite les bornes. Un service ECS ne les gère pas lui-même : il faut
l'enregistrer auprès d'un service dédié, Application Auto Scaling.

```bash
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/nx-demo/mon-api \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 1 \
  --max-capacity 5
```

<br>

Une politique de suivi de cible vient ensuite décider quand bouger entre ces
deux bornes — typiquement sur l'utilisation processeur moyenne. Mais **les
bornes seules sont déjà l'essentiel** : `max-capacity` est votre garde-fou de
facture, exactement comme le `max-scale` de Scaleway et comme l'alerte de budget
de [la fiche sur le cloud public](/fiches/comprendre-le-cloud-public).

<br>

Reste la différence qui compte vraiment, et il faut la dire franchement :
**`min-capacity` ne descend pas à zéro de façon utile ici.** Un service ECS
maintient les tâches que vous lui demandez, et Fargate facture tant qu'une tâche
tourne. Là où le conteneur Scaleway ne coûtait rien la nuit, celui-ci coûte le
prix d'une tâche allumée en permanence. Sur un environnement de test qui dort
vingt heures par jour, l'écart n'est pas anecdotique.

---

## Astuce bonus - Et App Runner ?

App Runner est le service qui fait, chez AWS, ce que Serverless Containers fait
chez Scaleway : vous donnez une image, il vous rend une URL HTTPS, il gère la
mise à l'échelle. Pas de cluster, pas de définition de tâche, pas de sous-réseau
à choisir.

```bash
aws apprunner create-service --cli-input-json file://apprunner.json
```

Le fichier décrit l'image, le port, les variables et la taille d'instance — les
mêmes informations que la définition de tâche, en beaucoup plus court. Il reste
un rôle IAM à fournir, celui qui autorise App Runner à lire votre dépôt ECR :
l'étape 2 ne disparaît jamais complètement chez AWS.

<br>

Alors pourquoi avoir fait ECS ? Parce qu'App Runner reste peu adopté, qu'il
couvre un cas plus étroit — une application web HTTP, sans tâche de fond ni
service annexe — et que c'est ECS que vous trouverez en arrivant sur un projet
existant. **Mon conseil : si votre besoin tient dans ce cas étroit, prenez App
Runner sans culpabiliser.** Vous ferez la migration vers ECS le jour où le
besoin la justifie, et votre image ne changera pas d'une ligne.

<hr>

Et voilà, votre image tourne chez AWS ! Pour résumer en une phrase : **poussez
l'image sur ECR, créez les deux rôles IAM, décrivez tout dans une définition de
tâche, puis laissez un service ECS la maintenir en vie sur Fargate**.

Ce qui frappe en sortant de
[la fiche Scaleway](/drafts/deployer-conteneur-docker-sur-scaleway), c'est que
les six étapes sont bien les mêmes — mais que leur poids change du tout au tout.
L'étape 2 ne demandait rien là-bas et occupe une section entière ici ; l'étape 6
offrait le zéro là-bas et ne l'offre pas ici. **C'est très exactement le genre
d'écart qu'on ne voit pas sur une page de tarifs**, et c'est pour ça que ces
deux fiches existent.

D'ici là, je vous invite :

- [à relire la fiche sur le déploiement dans le cloud](/drafts/deployer-conteneur-docker-dans-le-cloud)
  pour le raisonnement derrière les six étapes, indépendamment du fournisseur ;
- [à (re)commencer le cours sur les GitHub Actions](/cours/ci-cd-github-actions/)
  pour que le `docker push` de l'étape 1 parte d'un workflow et pas de votre
  machine.

## Ressources

- [Créer une tâche Fargate avec la CLI (AWS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_Fargate.html)
- [Le rôle d'exécution de tâche ECS (AWS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html)
- [Les paramètres d'une définition de tâche (AWS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
- [Le glossaire Cloud Native de la CNCF, en français](https://glossary.cncf.io/fr/)
