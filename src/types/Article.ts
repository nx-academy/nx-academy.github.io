export type Article = {
  frontmatter: {
    author: string;
    description: string;
    draft: boolean;
    format?: "recap" | "reflexion" | "bilan";
    imgAlt: string;
    imgSrc: string;
    kind?: string;
    publishedDate: string;
    title: string;
    tags?: string[];
    faq?: { question: string; answer: string }[];
  };
  url: string;
};
