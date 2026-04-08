<script lang="ts">
  import type { Snippet } from "svelte";
  import SplittedHeading from "../headings/splitted.svelte";

  const {
    title,
    subtitle,
    children,
  }: {
    title: string | string[];
    subtitle?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="h-full py-20 px-8 relative flex flex-col-reverse gap-2">
  <SplittedHeading parts={title instanceof Array ? title : [title]} h={1} />

  {#if subtitle}
    <p
      class="font-heading uppercase tracking-wider text-primary dark:text-secondary"
    >
      {subtitle}
    </p>
  {/if}

  {#if children}
    <div
      class="
        absolute right-0 bottom-0 pl-10 pr-12 py-4 text-primary dark:text-secondary
        bg-white-900/5 dark:bg-black-100/10 border-l-4 border-primary dark:border-secondary
        uppercase font-heading text-sm
      "
    >
      {@render children()}
    </div>
  {/if}
</div>
