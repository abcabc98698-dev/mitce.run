import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = process.env.SITE_URL ?? 'https://mitce.run';

export default defineConfig({
  output: 'static',
  site,
  integrations: [
    sitemap({ filter: (page) => !/\/404\/?$/.test(page) }),
    {
      name: 'sitemap-alias-generator',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const distDir = fileURLToPath(dir);
          const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
          const sitemapTarget = path.join(distDir, 'sitemap.xml');
          if (fs.existsSync(sitemapIndex)) {
            fs.copyFileSync(sitemapIndex, sitemapTarget);
          }
        },
      },
    },
  ],
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
