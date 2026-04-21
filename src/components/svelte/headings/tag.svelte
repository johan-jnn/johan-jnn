<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  export interface HeadingProps {
    children: Snippet;
    class?: ClassValue | null;
    h?: number;
  }
</script>

<script lang="ts">
  const { h = 2, children, class: className }: HeadingProps = $props();
  const tag = $derived(`h${h}`);
</script>

<svelte:element this={tag} class={className}>
  {@render children()}
</svelte:element>
