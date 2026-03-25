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
</script>

<header
  class="neo-shadow neo-shadow-black fixed top-0 left-0 w-full px-8 py-4 z-50 border-black border-b-2 bg-white dark:bg-black grid {children
    ? 'grid-cols-[1fr_auto_1fr]'
    : 'grid-cols-2'}"
>
  <p class="font-heading uppercase">{title}</p>

  {@render nav()}

  {#if children}
    {@render children()}
  {/if}
</header>
