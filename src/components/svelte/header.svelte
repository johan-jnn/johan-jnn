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
  class={[
    "neo-shadow neo-shadow-black dark:neo-shadow-white",
    "border-b-2 border-black dark:border-white bg-white dark:bg-black",
    "fixed top-0 left-0 w-full px-8 py-4 z-50",
    "grid items-center grid-cols-[1fr_auto_1fr]",
  ]}
>
  <a href="/" class="font-heading uppercase w-fit text-2xl">{title}</a>

  {@render nav()}

  {#if children}
    {@render children()}
  {/if}
</header>
