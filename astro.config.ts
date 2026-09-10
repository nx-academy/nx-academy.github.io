// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nx.academy",
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith("/drafts"),
      changefreq: "weekly",
      priority: 0.7,
      serialize(item) {
        const { pathname } = new URL(item.url);

        if (pathname === "/") {
          item.priority = 1.0;
        } else if (pathname.startsWith("/cours")) {
          item.priority = 0.9;
        } else if (pathname === "/mentions-legales/") {
          item.priority = 0.3;
        }

        return item;
      },
    }),
  ],
});
