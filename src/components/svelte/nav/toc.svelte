<script lang="ts">
  import { ifSmoother } from "$src/utils/gsap/scrollSmoother";
  import type { MarkdownHeading } from "astro";
  import { onMount } from "svelte";

  const {
    headings,
  }: {
    headings: MarkdownHeading[];
  } = $props();

  onMount(() => {
    ifSmoother((smoother) => {});
  });
</script>

<nav>
  <ul>
    {#each headings as { depth, slug, text }}
      <li class="pl-[--spacing(var(--level))]" style="--level:{depth}">
        <a
          href="#{slug}"
          onclick={(e) => {
            ifSmoother((smoother) => {
              e.preventDefault();
              smoother.scrollTo(`#${slug}`, true, "top 120rem");
            });
          }}>{text}</a
        >
      </li>
    {/each}
  </ul>
</nav>
