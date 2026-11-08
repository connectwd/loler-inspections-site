import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  base: '/',
  site: 'https://loler-inspections.com/',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filenameBase: 'sitemap',
    }),
  ],
});
