<script lang="ts">
  import type { Snippet } from "svelte";
  import SplittedHeading from "../headings/splitted.svelte";

  const {
    title,
    suptitle,
    subtitle,
    children,
    h = 1,
  }: {
    title: string | string[];
    suptitle?: string;
    subtitle?: string;
    children?: Snippet;

    h?: number;
  } = $props();
</script>

{#snippet extraTitle(content: string)}
  <p
    class="font-heading uppercase tracking-wider text-primary dark:text-secondary max-sm:text-center"
  >
    {content}
  </p>
{/snippet}

<div
  class="h-full justify-center py-20 px-8 relative flex flex-col gap-2 max-md:pb-25"
>
  {#if suptitle}
    {@render extraTitle(suptitle)}
  {/if}

  <SplittedHeading
    parts={title instanceof Array ? title : [title]}
    {h}
    class="max-md:text-[9svw]!"
  />

  {#if subtitle}
    {@render extraTitle(subtitle)}
  {/if}

  {#if children}
    <div
      class="
        absolute right-0 bottom-0 pl-10 pr-12 py-4 text-primary dark:text-secondary
        bg-white-900/5 dark:bg-black-100/10 border-l-4 border-primary dark:border-secondary
        uppercase font-heading text-sm

        empty:hidden
      "
    >
      {@render children()}
    </div>
  {/if}
</div>
