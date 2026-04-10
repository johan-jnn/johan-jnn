<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import Heading from "./tag.svelte";

  const {
    parts,
    h,
    class: className,
  }: {
    parts: string[];
    h?: number;
    class?: SvelteClassAttribute;
    unstyled?: boolean;
  } = $props();
</script>

<Heading
  {h}
  class={merge_classes(
    "text-[10svw] max-sm:text-center sm:text-[6svw]/25 tracking-tighter font-heading uppercase font-bold",
    className,
  )}
>
  {#each parts as part, index}
    <span
      class={{
        block: true,
        "text-primary dark:text-secondary tracking-tight": index % 2,
      }}
    >
      {part}
    </span>
  {/each}
</Heading>
