import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/loler-inspections-site/',
  devToolbar: {
    enabled: false,
  },
});
