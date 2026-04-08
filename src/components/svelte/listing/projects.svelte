<script lang="ts">
  import type { ProjectOverview } from "$src/types/project";
  import Project from "../cards/project.svelte";

  const {
    projects,
  }: {
    projects: ProjectOverview[];
  } = $props();

  const categories = $derived(new Set(projects.map((p) => p.category)));
</script>

<div>
  <form method="dialog">
    {#each categories as category}
      <label for="cat-{category}">
        {category}
        <input type="radio" name="category" id="cat-{category}" />
      </label>
    {/each}
  </form>

  <ul class="grid grid-cols-4">
    {#each projects as project}
      <li class="aspect-9/10">
        <Project {...project} />
      </li>
    {/each}
  </ul>
</div>
