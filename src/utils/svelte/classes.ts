import type { ClassValue } from "svelte/elements";

export type SvelteClassAttribute = ClassValue;

export function sanitize_class(
  className: SvelteClassAttribute,
): SvelteClassAttribute {
  if (className instanceof Array) {
    return className.map((classChild) =>
      sanitize_class(classChild as SvelteClassAttribute),
    );
  } else if (typeof className === "string") {
    return className.trim().replaceAll(/\s{2,}/g, " ");
  } else {
    for (const key in className) {
      className[key] = sanitize_class(className[key]);
    }

    return className;
  }
}

export function merge_classes(
  ...classes: (SvelteClassAttribute | undefined | null)[]
): SvelteClassAttribute {
  const dictionnary: SvelteClassAttribute = {};

  for (const className of classes) {
    if (!className) continue;
    const sanitized = sanitize_class(className);

    if (sanitized instanceof Array) {
      dictionnary[sanitized.join(" ")] = true;
    } else if (typeof sanitized === "string") {
      dictionnary[sanitized] = true;
    } else {
      Object.assign(dictionnary, sanitized);
    }
  }

  return dictionnary;
}
