<script lang="ts">
  import type { Snippet } from "@astrojs/svelte/svelte-shims.d.ts";

  const {
    title,
    subtitle,
    important = false,
    children,
    h = 2,
  }: {
    title: string;
    subtitle?: string;
    important?: boolean;

    h?: number;

    children: Snippet;
  } = $props();
</script>

<hr />

<section class="px-8">
  <header
    class="mt-8 mb-4 flex items-center justify-between font-bold font-heading uppercase"
  >
    {@html `<h${h}>`}
    <span
      class={{
        "text-4xl": true,
        "text-black-400 dark:text-white-600": !important,
        "border-l-primary border-l-8 pl-4": important,
      }}>{title}</span
    >
    {@html `</h${h}>`}

    {#if subtitle}
      <p class="text-xs text-primary-700 dark:text-primary">{subtitle}</p>
    {/if}
  </header>
  <main>
    {@render children()}
  </main>
</section>
