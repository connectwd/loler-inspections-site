import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const equipment = defineCollection({
  type: 'content_layer',
  loader: glob({ base: 'src/content/equipment', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().describe('Unique page title, used in <title> and H1'),
    description: z.string().describe('Unique meta description for search results'),
    intro: z.string().describe('Short introduction shown on the directory and guide page'),
    category: z.string().describe('Equipment category, shown as the page eyebrow'),
    order: z.number().optional().describe('Display order in the equipment directory'),
  }),
});

export const collections = {
  equipment,
};
