<script lang="ts">
  import type { MarkdownHeading } from "astro";

  const {
    headings,
  }: {
    headings: MarkdownHeading[];
  } = $props();
</script>

<nav>
  <ul>
    {#each headings as { depth, slug, text }}
      <li class="pl-[--spacing(var(--level))]" style="--level:{depth}">
        <a href="#{slug}">{text}</a>
      </li>
    {/each}
  </ul>
</nav>
