---
layout: ../../layouts/CheatSheetsLayout.astro

title: "Comment gérer les secrets dans GitHub Actions ?"
description:
  "Tokens, mots de passe, clés SSH : découvrez comment stocker et utiliser des
  secrets dans GitHub Actions sans jamais les écrire en clair. Secrets de dépôt,
  d'organisation, environnements protégés, OIDC et pièges à éviter."

imgAlt:
  Un coffre-fort rempli de clés posé sur un tapis roulant d'usine, pixel art
imgSrc: /images/cheatsheets/gerer-secrets-github-actions.webp

author: Thomas
kind: Fiche technique
serie: cicd
level: Intermédiaire
publishedDate: 07/07/2026
---

Dès qu'un workflow fait quelque chose d'un peu sérieux (déployer une image,
publier un package, envoyer un message sur Slack…), il a besoin d'un secret :
un token, un mot de passe, une clé SSH.

Et là, la pire chose à faire, c'est de l'écrire en clair dans votre fichier
`.yml`. Non seulement il serait visible par toute personne ayant accès au dépôt,
mais en plus il resterait gravé à jamais dans l'historique Git.

Dans cette fiche, on va voir **comment gérer proprement vos secrets dans GitHub
Actions** : où les stocker, comment les utiliser, et les quelques pièges qui
piègent tout le monde au début. C'est le prolongement naturel de la fiche sur
[le déploiement d'une image Docker](/fiches/deployer-image-docker-github-actions),
où on s'en servait déjà sans trop les expliquer.

## C'est quoi un secret GitHub Actions ?

Un secret, c'est une **variable chiffrée** que vous stockez dans GitHub et que
vos workflows peuvent lire au moment de leur exécution, sans jamais l'exposer.

<br>

GitHub propose plusieurs niveaux de secrets :

- **Secrets de dépôt** (_repository secrets_) → disponibles pour tous les
  workflows d'un dépôt. C'est le cas le plus courant.
- **Secrets d'organisation** → partagés entre plusieurs dépôts d'une même
  organisation. Pratique pour ne pas dupliquer un même token partout.
- **Secrets d'environnement** → rattachés à un environnement précis (`staging`,
  `production`…), avec des règles de protection en prime. On y revient plus bas.

<br>

Dans tous les cas, une fois enregistré, **un secret ne peut plus être relu** dans
l'interface. Vous pouvez le remplacer, pas le consulter. C'est voulu.

## Comment créer et utiliser un secret

La création se fait dans l'interface GitHub, pas dans le code :

**`Settings` → `Secrets and variables` → `Actions` → `New repository secret`.**

Vous donnez un nom (par convention en majuscules, ex. `DOCKERHUB_TOKEN`) et une
valeur. C'est tout.

<br>

Ensuite, dans votre workflow, vous y accédez via le contexte `secrets` :

```yml
steps:
  - name: Déploiement
    run: ./deploy.sh
    env:
      API_TOKEN: ${{ secrets.API_TOKEN }}
```

<br>

Ou directement dans les paramètres d'une action, comme on le faisait pour se
connecter à Docker Hub :

```yml
- name: Connexion à Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

<br>

Bon à savoir : il existe un secret que vous n'avez **pas besoin de créer**, le
`GITHUB_TOKEN`. GitHub le génère automatiquement pour chaque workflow, avec des
permissions limitées au dépôt courant. Parfait, par exemple, pour se connecter à
GHCR sans configurer quoi que ce soit.

## Les environnements et leurs protections

C'est là que ça devient intéressant pour les vrais déploiements.

Un **environnement** GitHub (dans `Settings` → `Environments`) vous permet de
regrouper des secrets **et** d'ajouter des règles de protection autour d'eux.

<br>

Concrètement, vous pouvez exiger :

- une **validation manuelle** avant qu'un déploiement en `production` ne parte
  (un humain doit cliquer sur « approuver ») ;
- une **restriction de branches** (seule `main` peut déployer en prod) ;
- un **délai** d'attente avant exécution.

<br>

Côté workflow, on rattache un job à un environnement comme ceci :

```yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: ./deploy.sh
        env:
          SSH_KEY: ${{ secrets.SSH_KEY }}
```

<br>

Ici, `secrets.SSH_KEY` sera résolu avec la valeur définie **dans l'environnement
`production`**, et le job ne partira que si les règles de protection sont
respectées. C'est le bon réflexe pour ne pas déployer en prod par accident.

## Bonus - OIDC : le déploiement sans secret

Un cran plus loin, il existe une approche moderne pour éviter carrément de
stocker des secrets longue durée : **OIDC** (_OpenID Connect_).

<br>

L'idée : au lieu de garder un token AWS/GCP/Azure permanent dans vos secrets,
GitHub Actions demande un **jeton temporaire** au cloud provider, valable le
temps du workflow seulement. Rien à stocker, rien à faire tourner (_rotate_),
rien à fuiter.

<br>

C'est un sujet à part entière, mais gardez le nom en tête : dès que vous déployez
sérieusement sur un cloud, **OIDC est la bonne pratique** vers laquelle tendre.

## Les pièges à éviter

Quelques classiques dans lesquels tout le monde tombe une fois :

- **Les secrets sont masqués dans les logs**, mais seulement s'ils correspondent
  exactement à la valeur enregistrée. Si vous encodez un secret (base64, JSON…)
  avant de l'afficher, le masquage ne fonctionne plus. Ne loguez jamais un
  secret, même « pour débugger ».
- **Les secrets ne sont pas disponibles pour les pull requests venant d'un
  fork.** C'est une protection : sans ça, n'importe qui pourrait ouvrir une PR
  pour voler vos secrets. Prévoyez vos workflows en conséquence.
- **Ne réutilisez pas un secret personnel** comme token de service. Créez des
  tokens dédiés, avec le minimum de permissions nécessaires.
- **Un secret n'est pas une variable de config.** Pour les valeurs non
  sensibles (un nom de région, un flag…), utilisez plutôt les _variables_ (à
  côté des secrets dans l'interface), qui, elles, restent lisibles.

<hr>

Et voilà, vos secrets n'ont plus de secret pour vous ! Pour résumer : **on ne
met jamais rien de sensible en clair, on stocke tout dans les secrets GitHub, et
on protège les déploiements critiques avec des environnements.**

D'ici là, je vous invite :

- à mettre tout ça en pratique avec la fiche
  [Comment déployer une image Docker depuis GitHub Actions ?](/fiches/deployer-image-docker-github-actions) ;
- à (re)découvrir
  [le cours sur les pipelines CI/CD avec les GitHub Actions](/cours/ci-cd-github-actions/).

## Ressources

- [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Managing environments for deployment](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment)
- [About security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
</content>
