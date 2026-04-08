<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface HeadingProps {
    children: Snippet;
    h?: number;
  }
</script>

<script lang="ts">
  const { h = 2, children }: HeadingProps = $props();
</script>

{@html `<h${h}>`}
{@render children()}
{@html `</h${h}>`}
