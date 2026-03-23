<script module lang="ts">
  import type { HTMLAttributeAnchorTarget } from "svelte/elements";

  export interface NavigationItem {
    label: string;
    url: string | URL;
    target?: HTMLAttributeAnchorTarget;
    selected?: boolean;
  }
</script>

<script>
  const { target, url, label, selected }: NavigationItem = $props();
</script>

<a
  class={{
    "px-2 text-sm uppercase": true,
    "border-primary border-b-3 text-primary brightness-70": selected,
  }}
  {target}
  href={url.toString()}
>
  <span>
    {label}
  </span>
</a>
