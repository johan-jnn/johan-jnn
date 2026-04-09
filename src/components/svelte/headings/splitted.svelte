<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import Heading from "./tag.svelte";

  const {
    parts,
    h,
    class: className,
  }: {
    parts: string[];
    h?: number;
    class?: ClassValue;
    unstyled?: boolean;
  } = $props();

  const class_object = $derived(
    className instanceof Array
      ? { [className.join(" ")]: true }
      : typeof className === "string"
        ? { [className]: true }
        : className,
  );
</script>

<Heading
  {h}
  class={{
    "text-[10svw] max-sm:text-center sm:text-[6svw]/25 tracking-tighter font-heading uppercase font-bold": true,
    ...class_object,
  }}
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
