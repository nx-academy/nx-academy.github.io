export type Article = {
  frontmatter: {
    author: string;
    description: string;
    draft: boolean;
    imgAlt: string;
    imgSrc: string;
    publishedDate: string;
    title: string;
  };
  url: string;
};
