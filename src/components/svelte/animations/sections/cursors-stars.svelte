<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount, type Snippet } from "svelte";
  import { ifSmoothed } from "../scroll/smoother.svelte";

  const {
    children,
    class: className,
  }: {
    children: Snippet;
    class?: SvelteClassAttribute;
  } = $props();

  let cursor_positions = $state([0, 0]);
  let wrapper: HTMLDivElement | undefined = $state();

  onMount(() => {
    ifSmoothed(() => {
      gsap.registerPlugin(ScrollTrigger);

      wrapper &&
        gsap.to(wrapper, {
          "--bg-y-shift": window.innerHeight + wrapper.scrollHeight + "px",
          ease: "none",
          scrollTrigger: {
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
            trigger: wrapper,
          },
        });
    });
  });
</script>

<div
  style="--cursor-x:{cursor_positions[0]}px;--cursor-y:{cursor_positions[1]}px;--bg-y-shift:0;"
  bind:this={wrapper}
  class={merge_classes(
    `
    relative [--cursor-size:--spacing(200)] [--background-size:40px]

    before:content-[''] before:absolute before:left-0 before:top-0 before:size-full before:-z-1
    before:bg-radial before:bg-size-[var(--cursor-size)_var(--cursor-size)] before:from-white dark:before:from-black before:to-transparent before:to-50% before:bg-no-repeat
    before:bg-position-[calc(var(--cursor-x)-var(--cursor-size)/2)_calc(var(--cursor-y)-var(--cursor-size)/2)]
    before:opacity-60 not-hover:before:opacity-0 before:transition-opacity

    bg-radial bg-position-[12%_var(--bg-y-shift)] bg-size-[var(--background-size)_var(--background-size)] bg-fixed
    from-black-400 dark:from-secondary from-5% to-transparent to-0% z-1
  `,
    className,
  )}
  role="region"
  onmousemove={({ currentTarget: { offsetTop, offsetLeft }, pageX, pageY }) => {
    cursor_positions = [pageX - offsetLeft, pageY - offsetTop];
  }}
>
  {@render children()}
</div>
