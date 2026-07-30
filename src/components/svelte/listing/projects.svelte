<script lang="ts">
  import type { ProjectOverview } from "$src/utils/content/types/projectOverview";
  import { gsapSticky } from "$svelte/actions/gsap-sticky.svelte";
  import CursorsStars from "../animations/sections/cursors-stars.svelte";
  import Project from "../cards/project.svelte";
  import Toggler from "../forms/inputs/toggler.svelte";

  const {
    projects,
  }: {
    projects: ProjectOverview[];
  } = $props();

  let selected_category: string | null = $state(null);
  let selected_tags: string[] = $state([]);

  const displayed_projects = $derived(
    projects.filter((project) => {
      if (selected_category && selected_category !== project.category.id)
        return false;
      if (
        selected_tags.length &&
        !selected_tags.find((tag) => project.tags.includes(tag))
      )
        return false;

      return true;
    }),
  );

  $effect(() => {
    /**
     * If no projects is shown, it means either that :
     *  1. There is no projects (in this case we do nothing)
     *  2. The tags are too restrictive, and so we need to remove some of them
     */
    if (displayed_projects.length || !projects.length) return;

    const projects_in_category = selected_category
      ? projects.filter((p) => p.category.id === selected_category)
      : projects;
    selected_tags = selected_tags.filter((tag) => {
      projects_in_category.find((p) => p.tags.includes(tag));
    });
  });

  const allowed_categories = $derived(new Set(projects.map((p) => p.category)));
  const allowed_tags = $derived(
    new Set(displayed_projects.flatMap((p) => p.tags)),
  );
</script>

<CursorsStars class="grid md:grid-cols-[auto_1fr] gap-8 p-8">
  <form
    method="dialog"
    class="
      px-8 overflow-visible bg-white dark:bg-black
      py-2 md:sticky top-25 h-fit grid gap-4 content-start
    "
    use:gsapSticky={{ onlyIfScrollSmoother: true }}
  >
    <section class="grid gap-2">
      <p class="uppercase font-heading font-bold">Catégories</p>
      <div class="grid sm:grid-cols-2 gap-4 text-sm">
        {#each allowed_categories as category (category.id)}
          <Toggler
            name="p-category"
            id="cat-{category.id}"
            value={category.id}
            type="resetable-radio"
            bind:group={selected_category}
          >
            {category.title}
          </Toggler>
        {/each}
      </div>
    </section>

    <section class="grid gap-2 max-md:hidden">
      <p class="uppercase fond-heading font-bold">Tags</p>
      <div class="grid sm:grid-cols-2 gap-4 text-sm">
        {#each allowed_tags as tag (tag)}
          <Toggler
            name={tag}
            id="tag-{tag}"
            value={tag}
            type="checkbox"
            bind:group={selected_tags}
          >
            {tag}
          </Toggler>
        {/each}
      </div>
    </section>
  </form>

  <ul
    class="
      grid sm:grid-cols-2 xl:grid-cols-2 gap-4
      "
  >
    {#each displayed_projects as project}
      <li class="aspect-8/10">
        <Project {...project} name_h={2} />
      </li>
    {/each}
  </ul>
</CursorsStars>
