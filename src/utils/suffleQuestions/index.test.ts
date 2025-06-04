import { it, expect, describe } from "vitest"

import type { Question } from "../../types/Question"
import { suffleQuestions } from "./index"

const QUESTIONS: Question[] = [
    {
      "question": "Qu'est-ce qu'un conteneur Docker ?",
      "options": [
        "Une machine virtuelle légère",
        "Un environnement d’exécution isolé",
        "Un type de base de données",
        "Un service d'hébergement cloud"
      ],
      "answer": "Un environnement d’exécution isolé",
      "explanation": "Un conteneur Docker est un environnement isolé permettant d’exécuter une application avec ses dépendances."
    },
    {
      "question": "Quelle commande permet de construire une image Docker à partir d’un Dockerfile ?",
      "options": [
        "docker build",
        "docker run",
        "docker compose up",
        "docker init"
      ],
      "answer": "docker build",
      "explanation": "La commande `docker build` permet de créer une image Docker à partir d’un Dockerfile."
    },
    {
      "question": "Quel fichier est utilisé par Docker Compose ?",
      "options": [
        "docker-compose.yaml",
        "Dockerfile",
        "compose.json",
        "docker-config.yml"
      ],
      "answer": "docker-compose.yaml",
      "explanation": "Docker Compose utilise le fichier `docker-compose.yaml` pour définir et exécuter des services multi-conteneurs."
    },
    {
      "question": "Quelle commande permet de lister les conteneurs actifs ?",
      "options": [
        "docker ls",
        "docker ps",
        "docker list",
        "docker show"
      ],
      "answer": "docker ps",
      "explanation": "La commande `docker ps` affiche la liste des conteneurs en cours d’exécution."
    },
    {
      "question": "Quelle directive est utilisée pour copier des fichiers dans une image Docker ?",
      "options": [
        "COPY",
        "CLONE",
        "ADD",
        "PASTE"
      ],
      "answer": "COPY",
      "explanation": "La directive `COPY` dans un Dockerfile permet de copier des fichiers depuis l’hôte vers l’image Docker."
    }
]

describe("suffleQuestions Unit Test Suites", () => {
    it("should return something", () => {
        expect(suffleQuestions([])).toBeDefined()
    })

    it("should return the same length and number", () => {
        const array = suffleQuestions(QUESTIONS)

        expect(array).toHaveLength(5)
        expect(array).toContain(1)
        expect(array).toContain(2)
        expect(array).toContain(3)
        expect(array).toContain(4)
        expect(array).toContain(5)
    })

    it("should return the array in a different order", () => {
        const array = suffleQuestions(QUESTIONS)
        expect(array).not.toEqual(QUESTIONS)
    })
})
