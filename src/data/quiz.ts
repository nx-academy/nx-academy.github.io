type Question = {
  answer: string;
  explaination: string;
  options: string[];
  question: string;
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
    explaination: "La fonction CSS `clamp()` permet de définir une valeur en fonction de trois paramètres : une valeur minimale, une valeur idéale et une valeur maximale. Elle assure ainsi que la valeur finale reste toujours entre la valeur minimale et la valeur maximale en visant la valeur idéale quand c'est possible."
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
    explaination: "Sachez que les cas d'utilisation ne se résument pas uniquement à la gestion de la taille des polices. Vous pouvez aussi le faire sur les marges intérieures et/ou extérieures mais aussi sur les largeurs des éléments. On va maintenant s'intéresser à quelques exemples pratiques."
  },
  {
    question: "Est-ce que le JavaScript et le Java sont le même language ?",
    options: ["Oui", "Non"],
    answer: "Non",
    explaination: "Le problème principal de ce code, en dehors de son côté verbeux, est qu'il n'est pas totalement responsive. En effet, en-dessous de 90 rem (1440 pixels), la police reste à 40 pixels. C'est ok pour les téléphones portables, mais ça peut être un problème pour les ordinateurs portables et les tablettes. C'est là que la fonction `clamp` rentre en jeu."
  },
];
