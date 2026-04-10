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

<CursorsStars class="grid grid-cols-[auto_1fr] gap-8 p-8">
  <form
    method="dialog"
    class="
      px-8 overflow-visible bg-white
      pb-2 sticky top-20 h-fit
    "
  >
    <section class="grid gap-2">
      <p>Trier par catégorie:</p>
      <div class="grid grid-cols-2 gap-4 text-sm">
        {#each categories as name}
          <label
            for="cat-{name}"
            class="
          px-5 py-1 bg-black-400 dark:bg-white-600
          border-black dark:border-white font-bold
          border-2 has-checked:bg-primary-200 has-checked:text-black-400
  
          text-white dark:text-black font-heading uppercase
          cursor-pointer

          neo-shadow neo-shadow--push neo-shadow-black has-checked:neo-shadow-0
          transition-[shadow_transform_background] w-full text-center
        "
          >
            {name}
            <input
              bind:group={selected_categories}
              type="checkbox"
              name="category"
              value={name}
              id="cat-{name}"
              class="hidden"
            />
          </label>
        {/each}
      </div>
    </section>
  </form>

  <ul
    class="
      grid grid-cols-4 gap-4
      "
  >
    {#each projects as project}
      {#if !selected_categories.length || selected_categories.includes(project.category)}
        <li class="aspect-7.5/10">
          <Project {...project} name_h={2} />
        </li>
      {/if}
    {/each}
  </ul>
</CursorsStars>
