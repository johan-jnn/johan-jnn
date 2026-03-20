<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    title = "Johan JANIN",
    nav,
    children,
  }: {
    title?: string;
    nav: Snippet;
    children?: Snippet;
  } = $props();
  $inspect(children);
</script>

<header
  class="neo-shadow fixed top-0 left-0 w-full px-4 py-2 z-50 bg-white dark:bg-black grid {children
    ? 'grid-cols-3'
    : 'grid-cols-2'}"
>
  <p class="font-heading uppercase">{title}</p>

  {@render nav()}

  {#if children}
    {@render children()}
  {/if}
</header>
