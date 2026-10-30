import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL ?? 'https://mitce.run';

export default defineConfig({
  output: 'static',
  site,
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
