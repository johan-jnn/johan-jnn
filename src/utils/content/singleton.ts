import { getEntry, type DataEntryMap } from "astro:content";

export function getSingleton<
  C extends keyof DataEntryMap,
  E extends keyof DataEntryMap[C] | (string & {}) | undefined,
>(singleton: C, id?: E) {
  return getEntry(singleton, id ?? singleton);
}
