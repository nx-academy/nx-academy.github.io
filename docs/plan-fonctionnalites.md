# Plan d’évolution de NX Academy

Ce document suit les fonctionnalités en cours de développement et leur état d’avancement.

---

## Avril 2025

### ✅ Fonctionnalités planifiées

| Priorité | Fonctionnalité                                      | État actuel             | Prochaine étape                                           |
|----------|------------------------------------------------------|--------------------------|------------------------------------------------------------|
| 🟢 1     | Page changelog                                       | **DONE**                  | Créer `/changelog`, format journal, à alimenter chaque mois |
| 🟡 2     | Popin “Reprendre là où vous vous êtes arrêté”        | À faire                  | Design + intégration localStorage                          |
| 🟢 3     | Quiz du mois                                         | Fonctionnelle            | Finaliser le système RAG, publier un quiz chaque mois      |
| 🟢 4     | Fiche technique mensuelle (“Fiche du vendredi”)     | En place                 | Rédiger un batch de 4 fiches Docker                        |
| 🟡 5     | Bloc “En cours de rédaction”                         | À faire                  | Design + emplacement à définir                             |
| 🧪 6     | Récap mensuel (veille IA automatisée)                | En réflexion             | Structurer le prompt IA + tester une première génération   |

---

### 🎓 Cours en ligne

- 🔧 En cours : **Docker et Docker Compose**
  - Intégration des vidéos
  - Génération des quiz et exercices chapitre par chapitre (via RAG)
  - Un peu de travail front à finaliser

- 📦 À venir : **CI/CD avec GitHub Actions**
  - À intégrer une fois le cours Docker terminé

---

### Details des fonctionnalites

#### Workflow IA pour le recap

1. Discord (canal #le-recap)
   └─ Tu postes les liens vers les articles à synthétiser

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

