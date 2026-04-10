import type { ClassValue } from "svelte/elements";

export type SvelteClassAttribute = ClassValue;

export function merge_classes(
  ...classes: (SvelteClassAttribute | undefined | null)[]
): SvelteClassAttribute {
  const dictionnary: SvelteClassAttribute = {};

  for (const className of classes) {
    if (!className) continue;

    if (className instanceof Array) {
      dictionnary[className.join(" ")] = true;
    } else if (typeof className === "string") {
      dictionnary[className] = true;
    } else {
      Object.assign(dictionnary, className);
    }
  }

  return dictionnary;
}
