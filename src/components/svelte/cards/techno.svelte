<script lang="ts" module>
  import { type Techno } from "$content/techno";
  import type { Attributes } from "$src/utils/types/class/properties";
  export interface TechnoCardProps extends Attributes<Techno> {
    color: string;
    children?: Snippet;
  }
</script>

<script lang="ts">
  import "devicon/devicon.min.css";
  import moment from "moment";
  import type { Snippet } from "svelte";

  const {
    name,
    color,
    icon,
    children,
    description,
    used_since,
    website,
  }: TechnoCardProps = $props();
</script>

<article
  class="border-3 group border-black dark:border-white neo-shadow-black dark:neo-shadow-white neo-shadow p-4 font-heading uppercase font-bold min-w-[20svw]"
  style="--theme:{color}"
>
  <!-- after:content-[''] after:top-50/100 after:-translate-y-50/100 after:absolute after:right-0 after:h-80/100 after:aspect-square after:rounded-full after:bg-(--theme) -->
  <header class="flex items-center justify-between relative gap-8">
    <h3 class="text-2xl text-black-400 dark:text-white-600">
      {name}
    </h3>

    <i
      aria-label="Logo/icon of {name}"
      class={{
        "relative bg-(--theme) text-xl flex p-1 h-full aspect-square text-transparent bg-clip-text": true,
        "after:content-[''] after:transition-opacity after:duration-400 after:ease-in-out after:absolute after:top-0 after:left-0 after:rounded-full after:size-full after:bg-inherit group-hover:after:opacity-0": true,
        // Icon
        [`devicon-${icon}`]: true,
      }}
    >
    </i>
  </header>
  <main>
    <p
      class="font-sans normal-case italic text-black-300 dark:text-white-700 text-sm mb-8"
    >
      {description}
    </p>
    {#if children}
      <div>
        {@render children()}
      </div>
    {/if}
  </main>
  <footer class="text-xs mt-4 flex items-center justify-between">
    <p>Depuis {moment(used_since).locale("fr").fromNow(true)}</p>

    {#if website}
      <a
        class="font-sans text-xs lowercase italic font-normal link not-hover:text-black-400 dark:not-hover:text-white-600"
        href={website}
        target="_blank"
      >
        Site officiel
      </a>
    {/if}
  </footer>
</article>
