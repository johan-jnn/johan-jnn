<script lang="ts" module>
  import type { ProjectOverview } from "$src/utils/content/types/projectOverview";

  export interface ProjectCardProps extends ProjectOverview {
    name_h?: number;
  }
</script>

<script lang="ts">
  import Heading from "../headings/tag.svelte";

  const {
    name,
    category,
    cover,
    description,
    tags,
    slug,
    name_h = 3,
  }: ProjectCardProps = $props();
</script>

<a href="/portfolio/{slug}" aria-label={name} title="Voir la page du projet">
  <article
    class={[
      "group border-4 border-black dark:border-white",
      "font-heading uppercase",
      "grid grid-rows-[55%_auto_1fr] h-full",

      "neo-shadow neo-shadow--push neo-shadow-black dark:neo-shadow-white transition-[translate_shadow]",
      "not-hover:neo-shadow-0",
    ]}
  >
    <header class="relative h-full w-full">
      <p
        class={[
          "absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black px-4 py-1 text-sm z-1",
        ]}
        aria-label="Project's category"
      >
        {category.title}
      </p>

      <img
        src={cover}
        alt="Preview cover of {name}"
        class="object-cover object-center absolute size-full top-0 left-0 not-group-hover:grayscale-100 transition-[filter]"
      />
    </header>
    <hr class="border-2 m-0" />
    <main
      class="p-4 h-full flex flex-col justify-between bg-white dark:bg-black"
    >
      <header class="flex items-center justify-between gap-2">
        <Heading h={name_h}>
          <span aria-label="Project's name" class="text-2xl">{name}</span>
        </Heading>

        <svg
          viewBox="-1 0 14 13"
          fill="none"
          class={[
            "h-4 aspect-square transition-[opacity_translate]",
            "not-group-hover:-translate-x-2 not-group-hover:translate-y-2 not-group-hover:opacity-0",
          ]}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 13L0 11.6L9.6 2H1V0H13V12H11V3.4L1.4 13Z"
            class="fill-primary"
          />
        </svg>
      </header>
      <main class="font-sans normal-case grow">
        <p>{description}</p>
      </main>
      <footer>
        <ul
          aria-label="Project's tags"
          class="flex flex-wrap items-center gap-2 text-xs"
        >
          {#each tags as tag}
            <li
              class={[
                "border-2 border-black px-2 py-1 bg-black-100 dark:bg-white-900",
              ]}
            >
              {tag}
            </li>
          {/each}
        </ul>
      </footer>
    </main>
  </article>
</a>
