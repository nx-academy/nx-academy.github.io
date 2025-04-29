// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://nx.academy",
  integrations: [react(), 
    sitemap({
      filter: (page) => !page.startsWith("/drafts"),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }
  )]
});
