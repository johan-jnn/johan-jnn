<script lang="ts">
  import SkillCategory from "$lib/components/skillCategory.svelte";
  import { SkillCategories } from "$lib/data/skills";
  import { onMount, type ComponentProps } from "svelte";

  let puzzleContainer: HTMLUListElement;

  onMount(async () => {
    const { Sortable, Plugins } = await import("@shopify/draggable");

    const sortable = new Sortable(puzzleContainer, {
      draggable: "[data-item]",
      sortAnimation: {
        duration: 200,
        easingFunction: "ease-out",
      },
      swapAnimation: {
        duration: 100,
        easingFunction: "ease-in-out",
        horizontal: true,
      },
      plugins: [Plugins.SwapAnimation, Plugins.SortAnimation],
    });
  });
</script>

<section
  class="h-screen grid grid-rows-[auto_1fr] p-8 gap-4 relative grid-flow-col"
  id="stacks"
>
  <h2 class="font-heading font-semibold text-center text-[4vw]">
    What do I do ?
  </h2>
  <div class="border-black border-2 rounded-4xl p-4 grow">
    <ul
      class="grid grid-cols-4 gap-x-4 gap-y-8 content-start h-full"
      bind:this={puzzleContainer}
    >
      {#each SkillCategories as props}
        <li data-item class="aspect-[3/2]">
          <svelte:component this={SkillCategory} {...props}></svelte:component>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  section {
    :global(.draggable-mirror) {
      opacity: 0;
    }
    :global(.draggable-container--is-dragging) {
      cursor: move;
      z-index: 1;
    }
  }
</style>
