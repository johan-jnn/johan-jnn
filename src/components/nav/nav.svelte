<script module lang="ts">
  export interface NavigationItem {
    label: string;
    url: string | URL;
    target?: HTMLAttributeAnchorTarget;
  }
  export function getDefaultNavItems(): NavigationItem[] {
    return [
      {
        label: "Projets",
        url: "/portfolio",
      },
      {
        label: "Blog",
        url: "/blog",
      },
      {
        label: "Me contacter",
        url: "/contact",
      },
    ];
  }
</script>

<script lang="ts">
  import type { HTMLAttributeAnchorTarget } from "svelte/elements";

  const {
    items = getDefaultNavItems(),
  }: {
    /**
     * The items of the navbar.
     * Set this to `undefined` to retreive the default navigation items.
     */
    items?: NavigationItem[];
  } = $props();
</script>

<nav>
  <ul class="flex items-center justify-center gap-2">
    {#each items as item (item.url)}
      <li>
        <a target={item.target} href={item.url.toString()}>{item.label}</a>
      </li>
    {/each}
  </ul>
</nav>
