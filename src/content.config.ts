import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/changelog" }),
  schema: z.object({
    month: z.string(), // "Avril"
    year: z.number(), // 2026
    order: z.number(), // 1..12, pour le tri (les noms FR ne trient pas chronologiquement)
    tasks: z.array(
      z.object({
        kind: z.enum(["done", "in-progress", "fix"]),
        content: z.string(), // HTML conservé tel quel
      }),
    ),
  }),
});

export const collections = { changelog };
