import { defineCollection, z } from 'astro:content';

const vps = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        image: z.string().optional(),
        asn: z.string().regex(/^\d+$/, 'ASN must contain only numbers'),
        tableType: z.enum(['full', 'half']).default('full'),
        locations: z.array(z.string().regex(/^[^,]+, [A-Z]{2}$/, 'Must be in format "City, CC"')).default([]),
        services: z.array(z.string()).default([]),
        features: z.array(z.string()).default([]),
        rpkiStatus: z.enum(['yes', 'no']).optional(), // 'yes' = RPKI Filtering: Yes, 'no' = RPKI Filtering: No
        prefixUpdateStatus: z.enum(['automatic', 'manual']).optional(), // 'automatic' = filters updated automatically, 'manual' = filters updated manually
        loaRequired: z.enum(['yes', 'no']).optional(), // 'yes' = LOA required, 'no' = LOA not required
        notes: z.string().optional(),
        bgpFee: z.string(),
        pricing: z.string(),
        currency: z.enum(['USD', 'EUR', 'GBP', 'CHF', 'SEK', 'CZK']).default('USD'),
        url: z.string()
    })
});

export const collections = {
    'vps': vps
};