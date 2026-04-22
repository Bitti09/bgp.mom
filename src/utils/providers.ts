import { getCollection } from "astro:content";

/**
 * Fetches and sorts providers from the content collection.
 * @param filter Optional filter function
 */
export async function getSortedProviders(filter?: (entry: any) => boolean) {
  const entries = await getCollection("vps");
  const filtered = filter ? entries.filter(filter) : entries;
  return [...filtered].sort((a, b) =>
    a.data.title.localeCompare(b.data.title)
  );
}
