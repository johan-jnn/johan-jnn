<script module lang="ts">
  import type { HTMLAttributeAnchorTarget } from "svelte/elements";

  export interface NavigationItem {
    label: string;
    url: string | URL;
    target?: HTMLAttributeAnchorTarget;
    selected?: boolean;
  }
</script>

<script lang="ts">
  const { target, url, label, selected }: NavigationItem = $props();
</script>

<a
  class={{
    "px-2 py-1 uppercase font-bold": true,
    "border-primary-700 dark:border-secondary-600 border-b-3 text-primary-700 dark:text-secondary-600":
      selected,
    "border-transparent hover:border-primary-600 dark:hover:border-secondary-700 border-b-2 transition-[border-color]":
      !selected,
  }}
  {target}
  href={url.toString()}
>
  <span>
    {label}
  </span>
</a>
