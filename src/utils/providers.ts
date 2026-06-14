import { getCollection } from "astro:content";
import type { BGPProvider } from "./types";

/**
 * Collection name for BGP providers.
 */
const COLLECTION_NAME = "vps";

/**
 * Fetches all providers from the content collection.
 * @returns Array of provider entries
 */
export async function getProviders() {
  return await getCollection(COLLECTION_NAME);
}

/**
 * Fetches and sorts providers from the content collection alphabetically by title.
 * @param filter - Optional filter function to apply before sorting
 * @returns Sorted array of provider entries
 */
export async function getSortedProviders(
  filter?: (entry: { data: BGPProvider }) => boolean
) {
  const entries = await getProviders();
  const filtered = filter ? entries.filter(filter) : entries;

  return [...filtered].sort((a, b) =>
    a.data.title.localeCompare(b.data.title)
  );
}
