import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Supported currency codes for provider pricing.
 */
const CURRENCIES = ["USD", "EUR", "GBP", "CHF", "SEK", "CZK"] as const;

/**
 * Schema for BGP provider data.
 */
const schema = z.object({
  title: z.string(),
  image: z.string().optional(),
  asn: z.string().regex(/^\d+$/, "ASN must contain only numbers"),
  tableType: z.enum(["full", "half"]).default("full"),
  locations: z
    .array(
      z.string().regex(/^[^,]+, [A-Z]{2}$/, 'Must be in format "City, CC"'),
    )
    .default([]),
  services: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  rpkiStatus: z.enum(["yes", "no"]).optional(),
  prefixUpdateStatus: z.enum(["automatic", "manual"]).optional(),
  loaRequired: z.enum(["yes", "no"]).optional(),
  notes: z.string().optional(),
  bgpFee: z.string(),
  pricing: z.string(),
  currency: z.enum(CURRENCIES).default("USD"),
  url: z.string(),
});

const vps = defineCollection({
  loader: glob({ pattern: "**/[!_]*.json", base: "./data" }),
  schema,
});

export const collections = {
  vps,
};
