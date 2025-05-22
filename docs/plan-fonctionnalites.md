# Roadmap NX Academy – Mai à Décembre 2025

Cette feuille de route présente les fonctionnalités à venir sur NX, indépendamment du contenu éditorial.

---

## Fonctionnalités principales

| Priorité | Fonctionnalité                                    | État actuel       | Prochaine(s) étape(s)                                      | Mois cible          |
| -------- | ------------------------------------------------- | ----------------- | ---------------------------------------------------------- | ------------------- |
| 🔥       | Page de présentation de cours                     | À faire           | Créer un modèle (ex. Docker) avec chapitres, prérequis     | Juin                |
| 🔥       | Finalisation RAG pour auto-Récap                  | En cours          | Structurer prompt + boucle de validation IA                | Mai-juin            |
| 🔥       | Finalisation du système d’auto-génération de quiz | En cours          | Améliorer précision, enrichir prompts, mieux structurer PR | Juin-juillet        |
| 🔥       | Système d’exercices avec corrections              | En réflexion      | Sélectionner les sujets, créer première fiche via Gist     | Juillet             |
| 🔥       | Redesign de la page d’accueil                     | À faire           | Réflexion sur l’architecture, zonage, maquettes            | Septembre           |
| 🔥       | Système de news automatisé                        | Prototype partiel | Finaliser scraping + génération IA + PR auto               | Septembre / Octobre |

---

## Améliorations UX et structure

| Priorité | Fonctionnalité                               | État actuel | Prochaine(s) étape(s)                                 | Mois cible |
| -------- | -------------------------------------------- | ----------- | ----------------------------------------------------- | ---------- |
| 🟡       | Page “Roadmap NX” publique                   | À faire     | Créer une page statique avec liens changelog / recap  | Juillet    |
| 🟡       | Redesign fiches/articles avec tags + filtres | À faire     | Repenser layout, ajouter système de métadonnées       | Septembre  |
| 🟡       | Système de recherche sur le site             | À faire     | Choisir moteur (client-side / lunr.js / Algolia etc.) | Octobre    |

---

## Petits chantiers / améliorations ciblées

| Priorité | Fonctionnalité                                                           | État actuel | Prochaine(s) étape(s)                                   | Mois cible               |
| -------- | ------------------------------------------------------------------------ | ----------- | ------------------------------------------------------- | ------------------------ |
| 🧊       | Flux RSS                                                                 | **DONE**    | Générer à partir des articles + fiches techniques       | Mai                      |
| 🧊       | Ajouter le sticky Outline dans les pages de blog et de fiches techniques | **DONE**    | Créer un module pour le script déjà existant            | Mai                      |
| 🧊       | Mettre à jour le footer (icônes, liens des pages)                        | À faire     | Réfléxion sur les icôns et les liens à placer           | Mai                      |
| 🧊       | Mode clair basé sur les préférences système                              | À faire     | Ajouter détection `prefers-color-scheme`                | Juin                     |
| 🧊       | Page 404                                                                 | À faire     | Design et contenu à réaliser                            | Juin                     |
| 🧊       | Bouton “copier le code” sur les blocs                                    | À faire     | Ajouter via JavaScript + styles accessibles             | Août                     |
| 🧊       | Ajouter des animations douces (hover, entrée)                            | À faire     | Définir zones prioritaires + tester transitions CSS     | Septembre                |
| 🧊       | Nettoyage de code / refactor                                             | En continu  | Identifier les vieux composants, uniformiser les styles | Étapes mensuelles (fond) |

---

## Backlog / idées à explorer

Cette section regroupe les idées à fort potentiel mais non encore planifiées, à explorer selon le temps disponible, les retours utilisateurs ou les priorités stratégiques.

### Fonctionnalités principales à long terme

- **Espace “Projets guidés”** : parcours semi-guidés avec étapes, livrables ou défis pratiques, pour structurer des apprentissages complets.
- **Zone “NX pour formateurs”** : boîte à outils pédagogique pour exploiter les contenus NX en contexte éducatif (fiches imprimables, séquences, exports).

### Améliorations UX potentielles

- **Sauvegarde locale de fiches ou articles** : via `localStorage`, avec icône flottante sticky pour retrouver l’historique ou “lire plus tard”.
- **Système de gamification léger** : scoring basé sur les quiz et projets réalisés (profil ou classement local non connecté).

### Quick wins à prévoir

- **Favicon dynamique** : changement selon thème clair/sombre.
- **Amélioration des `meta.title` et SEO** : mieux structurer les balises par type de contenu (cours, fiches, articles).

---

### Details des fonctionnalites (à bouger ailleurs)

#### Workflow IA pour le recap

```
1. Discord (canal #le-recap)
   └─ Poste des liens vers les articles à synthétiser

2. Bot Python
   └─ Récupère les messages du mois concerné
   └─ Extrait uniquement les URLs des messages

3. Module d’extraction d’article
   └─ Pour chaque URL :
       ├─ Charge la page avec Selenium ou requests
       ├─ Nettoie le contenu (HTML -> texte)
       └─ Prépare une version simplifiée à synthétiser

4. Appel à ChatGPT (via API)
   └─ Envoie le texte nettoyé
   └─ Reçoit un résumé de 5 lignes (format fiche technique)

5. Génération du markdown
   └─ Formate la fiche dans un fichier `.md` avec un nom clair
   └─ Classe dans le dossier du mois concerné

6. Automatisation GitHub
   └─ Crée une branche
   └─ Push le fichier `.md`
   └─ Crée une Pull Request automatiquement
```
