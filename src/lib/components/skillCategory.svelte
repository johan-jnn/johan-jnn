<script lang="ts">
  import type { IconifyIcon } from "@iconify/svelte";
  import Icon from "@iconify/svelte";
  import { gsap } from "gsap";
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  const {
    category,
    stacks,
    revealChildren,
    children,
  }: {
    category: {
      name: string;
      color?: string;
    };
    revealChildren: boolean;
    stacks: (string | IconifyIcon)[];
    children?: Snippet;
  } = $props();

  const validBackgrounds = ["bg-primary", "bg-secondary", "bg-tercary"];
</script>

<div
  class="rounded-3xl p-6 pt-4 gap-4 grid grid-rows-[auto_1fr] size-full {validBackgrounds[
    Math.floor(Math.random() * validBackgrounds.length)
  ]}"
>
  <h3 class="text-center font-heading font-semibold text-2xl text-white">
    {category.name}
  </h3>
  <div class="rounded-xl border-white border-1 p-4">
    {#if revealChildren && children}
      <div transition:fade>
        {@render children()}
      </div>
    {:else}
      <ul class="flex flex-wrap gap-2" transition:fade>
        {#each stacks as icon}
          <li
            title={icon.toString().split(":").at(-1)}
            class="p-3 bg-white rounded-full"
            onpointerenter={({ currentTarget }) => {
              gsap.fromTo(
                currentTarget,
                {
                  rotate: "0deg",
                },
                {
                  duration: 1,
                  ease: "back.inOut",
                  rotate: "360deg",
                }
              );
            }}
          >
            <Icon {icon} height={24} />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
