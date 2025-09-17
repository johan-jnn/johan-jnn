<script lang="ts">
  import type { IconifyIcon } from "@iconify/svelte";
  import Icon from "@iconify/svelte";
  import { gsap } from "gsap";
  import { type Component, type Snippet } from "svelte";
  import { fade } from "svelte/transition";

  const {
    category,
    stacks,
    revealChildren,
    children,
    wellPlaced,
  }: {
    category: {
      name: string;
      color?: string;
    };
    revealChildren: boolean;
    wellPlaced: boolean;
    stacks: (string | IconifyIcon)[];
    children?: Snippet | { component: Component };
  } = $props();

  const validBackgrounds = ["bg-primary", "bg-secondary", "bg-tercary"];
</script>

<div
  class="rounded-3xl p-6 pt-4 gap-4 grid grid-rows-[auto_1fr] size-full group {category.color ??
    validBackgrounds[
      Math.floor(Math.random() * validBackgrounds.length)
    ]} {wellPlaced
    ? 'bg-[url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGhmYzdoaGJ5ODR0d3FvaWQ3c25wZ3lkcnFsdzRkM2d2NmM5bHN5MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/57Y7JIqvH9okJCJYjp/giphy.gif)]'
    : ''} bg-center bg-cover"
  id={category.name}
>
  <h3
    class="text-center font-heading font-semibold text-2xl group-hover:underline decoration-wavy text-white"
  >
    {category.name}
  </h3>
  <div class="rounded-xl border-white border-1 p-4 backdrop-blur-sm">
    {#if revealChildren && children}
      <div transition:fade>
        {#if "component" in children}
          {@const C = children.component}
          <C />
        {:else}
          {@render children()}
        {/if}
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
            <Icon {icon} height="clamp(12px, 1.5vw, 24px)" />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
