<script lang="ts">
  import { merge_classes } from "$src/utils/svelte/classes";
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

  let scrollY = $state(0);
  let innerHeight = $state(0);
  let offsetHeight = $state(0);

  let previousScrollY = 0;

  const scrollDirection = $derived.by(() => {
    const direction = Math.sign(scrollY - previousScrollY);
    previousScrollY = scrollY;
    return direction;
  });

  const scrollRate = $derived(scrollY / (offsetHeight - innerHeight));
</script>

<svelte:window bind:scrollY bind:innerHeight />
<svelte:body bind:offsetHeight />

<header
  style="--scroll:{scrollRate}"
  class={merge_classes(
    [
      "fixed bottom-0 left-0 w-full py-6 px-4 z-50",
      "grid items-center grid-cols-2",

      "neo-shadow neo-shadow-black dark:neo-shadow-white",
      "sm:border-b-2 border-black dark:border-white bg-white dark:bg-black",
      "sm:top-0 sm:bottom-auto sm:px-8 sm:py-4",
      "sm:has-[:nth-child(3)]:grid-cols-[1fr_auto_1fr]",

      "before:absolute before:top-0 before:left-0 before:h-1 before:-translate-y-full",
      "before:w-[calc(var(--scroll)*100%)] before:bg-primary dark:before:bg-secondary",

      "max-sm:before:content-['']",
      "max-sm:neo-shadow-0 max-sm:transition-[transform_shadow]",
      "max-sm:children:nth-[n+3]:hidden!",
    ],
    {
      "max-sm:translate-y-full": scrollDirection === 1,
      "max-sm:shadow-[0_5px_20px_rgba(0,0,0,0.15)]": scrollDirection !== 1,
    },
  )}
>
  <a href="/" class="font-heading uppercase w-fit text-2xl">{title}</a>

  <div>
    {@render nav()}
  </div>

  {#if children}
    {@render children()}
  {/if}
</header>
