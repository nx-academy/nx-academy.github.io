import type { Question } from "../../types/Question"

export function suffleQuestions(questions: Question[]): Question[] {
    const shuffled = questions.slice()

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled
}
