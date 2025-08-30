<script lang="ts">
  import SkillCategory from "$lib/components/skillCategory.svelte";
  import { onMount } from "svelte";

  let puzzleContainer: HTMLUListElement;

  onMount(async () => {
    const { Sortable, Plugins } = await import("@shopify/draggable");

    for (const element of puzzleContainer.children) {
      if (!(element instanceof HTMLElement)) continue;

      const { width, height } = element.getBoundingClientRect();
      element.style.setProperty("max-width", width + "px");
      element.style.setProperty("max-height", height + "px");
    }

    const sortable = new Sortable(puzzleContainer, {
      draggable: "li.size-full",
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
  });
</script>

<section class="h-screen grid grid-rows-[auto_1fr] p-8 gap-4 relative" id="stacks">
  <h2 class="font-heading font-semibold text-center text-[4vw]">
    What do I do ?
  </h2>
  <div class="border-black border-2 rounded-4xl p-4 grow">
    <ul
      class="grid grid-cols-4 gap-4 grid-rows-2 h-full"
      bind:this={puzzleContainer}
    >
      <li class="size-full">
        <SkillCategory
          category={{
            name: "Front-End",
          }}
          revealChildren={false}
          stacks={[
            "devicon:html5",
            "devicon:css3",
            "devicon:tailwindcss",
            "devicon:sass",
            "devicon:typescript",
          ]}
        />
      </li>
      <li class="size-full">
        <SkillCategory
          category={{
            name: "Back-End",
          }}
          revealChildren={false}
          stacks={["devicon:nodejs-wordmark", "devicon:laravel"]}
        />
      </li>
      <li class="size-full">
        <SkillCategory
          category={{
            name: "Databases",
          }}
          revealChildren={false}
          stacks={["devicon:mysql", "devicon:postgresql"]}
        />
      </li>
      <li class="size-full">
        <SkillCategory
          category={{
            name: "Deployment & CI/CD",
          }}
          revealChildren={false}
          stacks={["devicon:docker", "devicon:githubactions", "devicon:git"]}
        />
      </li>
    </ul>
  </div>
</section>
