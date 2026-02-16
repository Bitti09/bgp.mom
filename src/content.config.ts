import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const vps = defineCollection({
  loader: glob({ pattern: "**/[!_]*.json", base: "./data" }),
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    asn: z.string().regex(/^\d+$/, "ASN must contain only numbers"),
    tableType: z.enum(["full", "half"]).prefault("full"),
    locations: z
      .array(
        z.string().regex(/^[^,]+, [A-Z]{2}$/, 'Must be in format "City, CC"'),
      )
      .prefault([]),
    services: z.array(z.string()).prefault([]),
    features: z.array(z.string()).prefault([]),
    rpkiStatus: z.enum(["yes", "no"]).optional(), // 'yes' = RPKI Filtering: Yes, 'no' = RPKI Filtering: No
    prefixUpdateStatus: z.enum(["automatic", "manual"]).optional(), // 'automatic' = filters updated automatically, 'manual' = filters updated manually
    loaRequired: z.enum(["yes", "no"]).optional(), // 'yes' = LOA required, 'no' = LOA not required
    notes: z.string().optional(),
    bgpFee: z.string(),
    pricing: z.string(),
    currency: z
      .enum(["USD", "EUR", "GBP", "CHF", "SEK", "CZK"])
      .prefault("USD"),
    url: z.string(),
  }),
});

export const collections = {
  vps: vps,
};
