<script lang="ts">
  import Heading from "./tag.svelte";

  const {
    parts,
    h,
  }: {
    parts: string[];
    h?: number;
  } = $props();
</script>

<Heading {h}>
  <span
    class="text-[10svw] max-sm:text-center sm:text-[6svw]/25 tracking-tighter font-heading uppercase font-bold"
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
  </span>
</Heading>
