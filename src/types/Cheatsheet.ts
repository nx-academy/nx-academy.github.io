export type Cheatsheet = {
  frontmatter: {
    author: string;
    description: string;
    draft: boolean;
    imgAlt: string;
    imgSrc: string;
    kind?: string;
    level: string;
    publishedDate: string;
    title: string;
    faq?: { question: string; answer: string }[];
    howTo?: { name?: string; steps: { name: string; text: string }[] };
  };
  url: string;
};
