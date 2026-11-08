import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  base: '/loler-inspections-site/',
  site: 'https://loler-inspections.com/loler-inspections-site/',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filenameBase: 'sitemap',
    }),
  ],
});
