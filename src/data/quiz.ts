type Question = {
  question: string;
  options: string[];
  answer: string;
};

type Quiz = Question[];

export const firstQuiz: Quiz = [
  {
    question: "Que signifie HTML ?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "Hyper Text Markup Leveler",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Que signifie CSS ?",
    options: [
      "Cascading Style Sheet",
      "Cover Style Suit",
      "Centralized Style Sheet",
      "Cheat Sheet Style",
    ],
    answer: "Cascading Style Sheet",
  },
];
