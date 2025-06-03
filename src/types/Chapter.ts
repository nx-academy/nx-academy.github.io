export type Chapter = {
  frontmatter: {
    id: number;
    chapterNumber: number;
    description: string;
    nextChapterLink?: string;
    previousChapterLink?: string;
    sectionNumber: number;
    sectionTitle: string;
    title: string;
  };
  url: string;
};
