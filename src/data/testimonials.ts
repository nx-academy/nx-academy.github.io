type Testimonial = {
  content: string;
  job: string;
  name: string;
  picture: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    content:
      "Novice avec Docker, j'ai pu rapidement appréhender les concepts clés grâce à NX. Avec sa pédagogie, ses explications claires et exercices, mes connaissances sur cet outil ont pu être approfondies. Je suis désormais parfaitement à l'aise avec Docker.",
    job: "Développeur JavaScript / Python",
    name: "Calcagno Loïc",
    picture: "loic-profile-picture.webp",
  },
  {
    content:
      "Ce qu'il y a de dingue avec les cours de NX, c'est que chaque notion arrive au bon moment et à un sens. Ce cours sur Docker est une réelle réussite et vous permet, quel que soit votre niveau, de mieux comprendre et utiliser Docker.",
    job: "Développeur web full stack",
    name: "Yacine Lahjaily",
    picture: "thomas.png",
  },
  {
    content:
      "This journey has been a rewarding dive into the principles of user experience, from user-centered design to interaction. Every step deepened my appreciation for creating designs that not only look good but also feel right for users.",
    job: "Développeur front-end",
    name: "Alicia Milano",
    picture: "thomas.png",
  },
];
