<script module lang="ts">
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
    ];
  }
</script>

<script lang="ts">
  import type { NavigationItem } from "./nav-item.svelte";
  import NavItem from "./nav-item.svelte";

  const {
    items = getDefaultNavItems(),
    currentUrl,
  }: {
    /**
     * The items of the navbar.
     * Set this to `undefined` to retreive the default navigation items.
     */
    items?: NavigationItem[];
    currentUrl?: URL;
  } = $props();
</script>

<nav>
  <ul class="flex items-center justify-center gap-2">
    {#each items as item (item.url)}
      <li>
        <NavItem
          {...item}
          selected={item.selected ??
            (currentUrl
              ? new URL(item.url, currentUrl).toString() ===
                currentUrl?.toString()
              : undefined)}
        />
      </li>
    {/each}
  </ul>
</nav>
