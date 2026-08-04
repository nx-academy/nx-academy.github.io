# Cluster « Cloud public »

> Cadrage éditorial (pré-rédaction). Objectif : ouvrir une thématique cloud en
> reprenant la recette qui marche déjà pour Docker et qu'on applique au CI/CD.

## Le constat

- **Docker = le modèle** : 6 fiches publiées (`serie: docker`) qui se citent en
  chaîne, plus un cours. Maillage interne solide → bon référencement.
- **CI/CD = en cours** : le cluster est cadré dans
  [`cluster-cicd-github-actions.md`](./cluster-cicd-github-actions.md), la
  fiche-pont `deployer-image-docker-github-actions` relie déjà les deux
  thématiques.
- **Cloud = zéro contenu**. Aucun contenu ne couvre le vocabulaire de base
  (IaaS/PaaS/SaaS, régions, facturation à l'usage), alors que c'est la suite
  logique de la chaîne : on sait construire une image, on sait la pousser depuis
  GitHub Actions, on ne sait pas encore _où_ elle atterrit.

Le [calendrier éditorial](./calendrier-editorial.md) prévoit par ailleurs un
cours **« Mettez vos applications en production »** encore à faire. Ce cluster
lui sert de terrain préparé : quand le cours sortira, six contenus pointeront
déjà vers lui.

## Le cluster (6 contenus)

Convention : une fiche = un `.md` plat dans `src/pages/fiches/<slug>.md`, front
matter `layout`, `title`, `description`, `imgAlt`, `imgSrc`, `author`,
`kind: Fiche technique`, **`serie: cloud`**, `level`, `publishedDate`
(MM/DD/YYYY), plus un bloc `faq`. Un article = un `.md` dans
`src/pages/articles/<slug>.md`, `kind: Articles`, `format: reflexion`,
**`serie: cloud`**, `draft`, `tags`.

Le champ `serie: cloud` est **indispensable** pour apparaître dans le rayon
Cloud public de `/fiches/` (`src/data/series.ts`) et alimenter le bloc « À lire
ensuite » (`src/utils/relatedContent/`, poids `serie` = +3, `tag` partagé = +1).

| #   | Type    | Slug                                      | Titre                                                       | level         | Rôle                        |
| --- | ------- | ----------------------------------------- | ----------------------------------------------------------- | ------------- | --------------------------- |
| 1   | Fiche   | `comprendre-le-cloud-public`              | Qu'est-ce que le cloud public ?                             | Débutant      | **Pilier** / porte d'entrée |
| 2   | Fiche   | `difference-cloud-public-prive-hybride`   | Cloud public, privé, hybride : quelles différences ?        | Débutant      | Comparatif (fort volume)    |
| 3   | Fiche   | `iaas-paas-saas`                          | IaaS, PaaS, SaaS : quelles différences et comment choisir ? | Intermédiaire | Requête exact-match         |
| 4   | Fiche   | `deployer-conteneur-docker-dans-le-cloud` | Comment déployer un conteneur Docker dans le cloud ?        | Intermédiaire | **Pont Docker ↔ CI/CD**    |
| 5   | Article | `le-cloud-est-il-vraiment-moins-cher`     | Le cloud public coûte-t-il vraiment moins cher ?            | —             | Réflexion / coûts           |
| 6   | Article | `cloud-souverain`                         | Cloud souverain : de quoi parle-t-on vraiment ?             | —             | Réflexion / souveraineté    |

### Détail des angles

1. **`comprendre-le-cloud-public`** — Le pilier, celui vers qui tout pointe.
   Définition (mutualisation, libre-service, élasticité, facturation à l'usage),
   les cinq caractéristiques du NIST expliquées sans jargon, ce que ça change
   concrètement pour un dev (plus de serveur à commander, une API à la place),
   le vocabulaire de base (région, zone de disponibilité, instance, stockage
   objet) et les limites (coûts variables, dépendance au fournisseur). Miroir
   structurel de `presentation-registry-docker`.

2. **`difference-cloud-public-prive-hybride`** — Le comparatif d'entrée, calqué
   sur `difference-docker-compose-swarm`. Tableau des différences (propriété du
   matériel, mutualisation, coût capex/opex, conformité, élasticité), puis une
   section « lequel choisir selon ton contexte » (jeune produit / données
   sensibles / existant on-premise). Y intégrer le multicloud, régulièrement
   confondu avec l'hybride.

3. **`iaas-paas-saas`** — Le modèle en couches. La métaphore de la pizza (louée,
   livrée, au restaurant) pour poser l'intuition, puis un tableau « qui gère
   quoi » ligne par ligne : matériel, réseau, OS, runtime, application, données.
   Section décision : ce qu'on gagne et ce qu'on perd en montant d'une couche.
   Le CaaS et le serverless mentionnés en ouverture, vers un contenu futur.

4. **`deployer-conteneur-docker-dans-le-cloud`** — **La fiche-pont**, celle qui
   porte le maillage. On reprend l'image construite dans le cours Docker et
   poussée sur un registry par GitHub Actions, et on la fait tourner sur un
   service managé de conteneurs. Bloc `howTo` en étapes numérotées (comme
   `prendre-en-main-pico-8`), variables d'environnement, port exposé,
   healthcheck, coût à l'usage. Elle cite `presentation-registry-docker`,
   `deployer-image-docker-github-actions` et les deux cours.

5. **`le-cloud-est-il-vraiment-moins-cher`** — Premier article de réflexion. Le
   paiement à l'usage vu du terrain : ce qui coûte vraiment (frais de sortie de
   données, stockage oublié, instances sur-dimensionnées), pourquoi la facture
   surprend, ce que l'auto-hébergement cache comme coûts en face (astreinte,
   amortissement, remplacement), et le mouvement de repatriement. Registre
   carnet, pas de conclusion tranchée.

6. **`cloud-souverain`** — Second article de réflexion. Démêler ce que le mot
   recouvre : souveraineté juridique (Cloud Act, RGPD, extraterritorialité) ≠
   souveraineté technique (qui opère, qui peut auditer) ≠ label (SecNumCloud).
   Le paysage français et européen, les offres « de confiance » et leurs zones
   grises, ce que ça implique concrètement au moment de choisir où déployer. Il
   s'appuie sur la fiche public/privé/hybride pour le vocabulaire et fait la
   paire avec l'article coûts : les deux vraies questions qu'on se pose avant de
   signer.

## Maillage interne (le cœur de la valeur SEO)

Reproduire ce que fait Docker : chaque contenu cite explicitement 1–2 voisins du
cluster, **en dur dans le corps Markdown**, en plus du scoring automatique.
Chaîne narrative :

```
                    comprendre-le-cloud-public (pilier)
                       │        │            │
   ┌───────────────────┘        │            └──────────────────┐
   ▼                            ▼                               ▼
difference-cloud-*-hybride   iaas-paas-saas          le-cloud-est-il-moins-cher
   │      │                     │                               ▲
   │      └──► cloud-souverain ─┼───────────────────────────────┤
   │                            │      (les deux articles se citent)
   └────────────┬───────────────┘                               │
                ▼                                               │
   deployer-conteneur-docker-dans-le-cloud ─────────────────────┘
                │
                ├─► /fiches/presentation-registry-docker         (cluster Docker)
                ├─► /fiches/deployer-image-docker-github-actions (cluster CI/CD)
                └─► /cours/docker-et-docker-compose/ + /cours/ci-cd-github-actions/
```

Rétro-liens à poser depuis l'existant, aujourd'hui sans aucune porte vers le
cloud :

- `src/pages/fiches/deployer-image-docker-github-actions.md` → la fiche-pont
  (suite logique : l'image est poussée, reste à la faire tourner) ;
- `src/pages/fiches/decouvrir-docker-swarm.md` → la fiche-pont (l'alternative
  managée à l'orchestration maison).

Tags partagés, pour faire jouer le scoring inter-clusters : `Cloud` sur les six
contenus, plus `Docker` / `CI/CD` / `DevOps` / `Souveraineté` selon le contenu.
Douze fiches sur dix-huit n'ont aujourd'hui aucun tag — les compléter est ce qui
fera remonter le cloud dans leur bloc « À lire ensuite » (voir
[`dette-editoriale.md`](./dette-editoriale.md)).

## Points d'attention repérés

- Deux chantiers préalables sont détaillés dans
  [`dette-editoriale.md`](./dette-editoriale.md) : quatre liens internes cassés
  vers des fiches CI/CD restées en brouillon (404 en production), et l'absence
  de `tags` sur 12 des 18 fiches publiées, qui bride le moteur de
  recommandations. Hors périmètre de ce cluster, mais le cluster cloud s'appuie
  précisément sur ces deux mécaniques.
- Le rayon Cloud public n'apparaîtra sur `/fiches/` qu'à partir de la première
  fiche publiée : ajouter la clé `cloud` en amont ne crée pas de rayon vide.

## Fichiers concernés (au moment de la rédaction)

- **Créés** : 4 fiches `src/pages/fiches/<slug>.md` et 2 articles
  `src/pages/articles/<slug>.md`.
- **Édité** : `src/data/series.ts` (clé `cloud`, faite en amont).
- **Édités** : `src/pages/fiches/deployer-image-docker-github-actions.md` et
  `src/pages/fiches/decouvrir-docker-swarm.md` (rétro-liens), `tags` des fiches
  Docker.
- **Images** : une par contenu, source `raw/cheatsheets/<slug>.png` ou
  `raw/articles/<slug>.png` → générée en `.webp` via `npm run optimize-images`,
  référencée `imgSrc: /images/cheatsheets/<slug>.webp` (ou `/images/articles/`).
- **Calendrier** : mettre à jour `docs/calendrier-editorial.md`.
- **Changelog** : proposer une entrée dans
  `src/content/changelog/<AAAA-MM>.yaml` à chaque publication.
- **Optionnel** : quiz `public/quiz/<slug>.json` et entrées dans
  `src/data/quiz.ts` avec un nouveau `topic: "Cloud"`.

## Vérification (au moment de la rédaction)

- `npm run build` (= `astro check && astro build`) passe sans erreur.
- Chaque nouvelle fiche apparaît dans le rayon **Cloud public** de `/fiches/`.
- Le bloc « À lire ensuite » de chaque contenu affiche bien ses voisins cloud.
- Liens internes en dur valides (pas de 404 vers un slug resté en draft).
- `npm run prettier:check` passe.
- Ton NX (tutoiement, « on »), exemples testables, typo française.

## Séquençage suggéré

1. `comprendre-le-cloud-public` — le pilier d'abord, tout pointe vers lui.
2. `difference-cloud-public-prive-hybride` — la porte d'entrée SEO.
3. `iaas-paas-saas`.
4. `deployer-conteneur-docker-dans-le-cloud` — le pont, une fois les bases
   posées.
5. `le-cloud-est-il-vraiment-moins-cher` — la question du coût.
6. `cloud-souverain` — la question du « où et chez qui ».

Puis pose du maillage croisé, rétro-liens depuis Docker et CI/CD, et mise à jour
du calendrier.
