<script lang="ts">
  import H from "$svelte/heading.svelte";
  import type { Snippet } from "svelte";

  const {
    title,
    subtitle,
    important = false,
    children,
    id,
    h = 2,
  }: {
    title: string;
    subtitle?: string;
    important?: boolean;

    id?: string;

    h?: number;

    children: Snippet;
  } = $props();
</script>

<hr />

<section {id} class="px-8">
  <header
    class="my-8 flex items-center justify-between font-bold font-heading uppercase"
  >
    <H {h}>
      <span
        class={{
          "text-4xl": true,
          "text-black-400 dark:text-white-600": !important,
          "border-l-primary border-l-8 pl-4": important,
        }}>{title}</span
      >
    </H>

    {#if subtitle}
      <p class="text-xs text-primary-700 dark:text-primary">{subtitle}</p>
    {/if}
  </header>
  <main>
    {@render children()}
  </main>
</section>
