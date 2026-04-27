import { type DataEntryMap } from "astro:content";

export type EntryData<EntryKey extends keyof DataEntryMap> =
  DataEntryMap[EntryKey][string]["data"];
