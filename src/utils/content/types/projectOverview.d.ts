import type { EntryData } from "../entry";

export type ProjectOverview = Omit<
  EntryData<"projects">["overview"],
  "category"
> & {
  category: EntryData<"project-categories">;
};
