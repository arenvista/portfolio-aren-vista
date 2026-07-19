import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string().optional(),
      id: z.union([z.string(), z.number()]).optional(),
      aliases: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
    })
    .passthrough(),
});

export const collections = { blog, notes };
