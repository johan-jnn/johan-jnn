<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import type { Snippet } from "svelte";

  const {
    children,
    class: className,
  }: {
    children: Snippet;

    class?: SvelteClassAttribute;
  } = $props();
</script>

<div
  class={merge_classes(
    [
      "mx-auto",
      "prose dark:prose-invert prose-img:mx-auto",
      "pr1ose-h2:font-heading prose-h2:uppercase",
      "prose-img:w-full prose-img:max-h-[75svh] prose-img:mx-auto prose-img:rounded-md prose-img:object-contain",
      "prose-video:w-full prose-video:max-h-[75svh] prose-img:mx-auto prose-video:rounded-md prose-video:object-contain",
    ],
    className,
  )}
>
  {@render children()}
</div>
