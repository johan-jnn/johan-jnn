<script lang="ts">
  import SkillCategory from "$lib/components/skillCategory.svelte";
  import { SkillCategories } from "$lib/data/skills";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  let puzzleContainer: HTMLUListElement;

  const validBackgrounds = ["bg-primary", "bg-secondary", "bg-tercary"];
  const displayedCategories = SkillCategories.map((props, index) => ({
    ...props,
    category: {
      ...props.category,
      color:
        props.category.color ??
        validBackgrounds[Math.floor(Math.random() * validBackgrounds.length)],
    },
    original_index: index,
    wellPlaced: false,
  })).sort(() => Math.random() - 0.5);

  onMount(async () => {
    const { Sortable, Plugins } = await import("@shopify/draggable");

    gsap.from(puzzleContainer.children, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      scrollTrigger: {
        trigger: puzzleContainer,
        start: "top center",
      },
    });

    const sortable = new Sortable(puzzleContainer, {
      draggable: "[data-item]",
      sortAnimation: {
        duration: 200,
        easingFunction: "ease-in-out",
      },
      swapAnimation: {
        duration: 200,
        easingFunction: "ease-in-out",
        horizontal: true,
      },
      plugins: [Plugins.SwapAnimation, Plugins.SortAnimation],
    });

    sortable.on("sortable:stop", () => {
      const children =
        sortable.getDraggableElementsForContainer(puzzleContainer);

      displayedCategories.forEach((category, i) => {
        const { original_index } = category;

        displayedCategories[i].wellPlaced =
          SkillCategories[original_index].category.name ===
          children[original_index].children[0].id;
      });

      const reveal = !displayedCategories.find((cat) => !cat.wellPlaced);
      displayedCategories.forEach(
        (category) => (category.revealChildren = reveal)
      );
      if (reveal) sortable.destroy();
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
  <div class="border-black border-2 rounded-4xl p-4 groqw">
    <ul
      class="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-8 content-start h-full"
      bind:this={puzzleContainer}
    >
      {#each displayedCategories as props (props.category.name)}
        <li data-item class=" min-md:max-lg:aspect-[2/3] cursor-grab">
          <SkillCategory {...props} />
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
      cursor: grabbing;
    }
    :global(.draggable-source--is-dragging) {
      cursor: grabbing !important;
      z-index: 1;
    }
  }
</style>
