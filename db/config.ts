import { defineDb, defineTable, column } from "astro:db";

const NewsFeed = defineTable({
  columns: {
    id: column.number({
      primaryKey: true,
      autoIncrement: true,
    }),
    content: column.text(),
    published: column.date(),
    slug: column.text(),
    title: column.text(),
    url: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    NewsFeed,
  },
});
