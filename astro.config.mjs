import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Base URL is environment-specific:
//   - GitHub Pages: BASE_URL=/loler-inspections-site/
//   - Cloudflare / production: BASE_URL=/
//   - Local dev: defaults to /loler-inspections-site/ unless overridden
const base = process.env.BASE_URL || '/loler-inspections-site/';
const siteUrl = base === '/'
  ? 'https://loler-inspections.com'
  : `https://loler-inspections.com${base.replace(/\/$/, '')}`;

export default defineConfig({
  output: 'static',
  base,
  site: siteUrl,
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filenameBase: 'sitemap',
    }),
  ],
});
