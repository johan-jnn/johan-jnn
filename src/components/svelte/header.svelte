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
  class={[
    "neo-shadow neo-shadow-black dark:neo-shadow-white",
    "border-b-2 border-black dark:border-white bg-white dark:bg-black",
    "sm:sticky top-0 left-0 w-full px-8 py-4 z-50",
    "grid items-center grid-cols-2",
    "sm:has-[:nth-child(3)]:grid-cols-[1fr_auto_1fr]",
  ]}
>
  <a href="/" class="font-heading uppercase w-fit text-2xl">{title}</a>

  <div
    class={{
      "max-sm:fixed bottom-0 left-0 z-50 max-sm:w-full max-sm:bg-white max-sm:py-6 max-sm:transition-[transform_shadow]": true,
      "max-sm:before:content-[''] before:absolute before:top-0 before:left-0 before:h-1 before:-translate-y-full": true,
      "before:w-[calc(var(--scroll)*100%)] before:bg-primary": true,
      "max-sm:translate-y-full": scrollDirection === 1,
      "max-sm:shadow-[0_5px_20px_rgba(0,0,0,0.15)]": scrollDirection !== 1,
    }}
  >
    {@render nav()}
  </div>

  {#if children}
    {@render children()}
  {/if}
</header>
