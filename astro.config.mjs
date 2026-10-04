import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://lapse.startfrom.co',
  devToolbar: { enabled: false },
  // Keep the copy's punctuation exactly as written.
  markdown: { smartypants: false },
});
