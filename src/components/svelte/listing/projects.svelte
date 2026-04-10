<script lang="ts">
  import type { ProjectOverview } from "$src/types/project";
  import CursorsStars from "../animations/sections/cursors-stars.svelte";
  import Project from "../cards/project.svelte";

  const {
    projects,
  }: {
    projects: ProjectOverview[];
  } = $props();

  const categories = $derived(new Set(projects.map((p) => p.category)));

  let selected_categories: string[] = $state([]);
</script>

<CursorsStars>
  <form method="dialog">
    {#each categories as name}
      <label for="cat-{name}">
        {name}
        <input
          bind:group={selected_categories}
          type="checkbox"
          name="category"
          value={name}
          id="cat-{name}"
        />
      </label>
    {/each}
  </form>

  <ul
    class="
    grid grid-cols-4 gap-4
    "
  >
    {#each projects as project}
      {#if !selected_categories.length || selected_categories.includes(project.category)}
        <li class="aspect-9/10">
          <Project {...project} />
        </li>
      {/if}
    {/each}
  </ul>
</CursorsStars>
