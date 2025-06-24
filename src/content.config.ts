import { defineCollection, z } from "astro:content";

const vps = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    asn: z.string(),
    tableType: z.enum(["full", "half"]).default("full"),
    locations: z.array(z.string()).default([]), // Now just an array of country codes
    services: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    rpkiStatus: z.enum(["valid", "invalid"]).optional(),
    prefixUpdateStatus: z.enum(["positive", "negative"]).optional(),
    bgpFee: z.string(),
    pricing: z.string(),
    currency: z.enum(["USD", "EUR", "GBP"]).default("USD"),
    url: z.string(),
  }),
});

export const collections = {
  vps: vps,
};
