import { defineDb, defineTable, column, NOW } from "astro:db";

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

const NowNoteFeed = defineTable({
  columns: {
    id: column.number({
      primaryKey: true,
      autoIncrement: true,
    }),
    content: column.text(),
    published: column.date(),
  },
});

const RecapLink = defineTable({
  columns: {
    id: column.number({
      primaryKey: true,
      autoIncrement: true,
    }),
    addedAt: column.date({ default: NOW }),
    description: column.text(),
    url: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    NewsFeed,
    NowNoteFeed,
    RecapLink,
  },
});
