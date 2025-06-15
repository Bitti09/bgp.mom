// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const vps = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/vps" }),
  schema: z.object({
    name: z.string(),
    rpki: z.boolean().optional(),
    prefixUpdateStatus:z.boolean().optional(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { vps };
