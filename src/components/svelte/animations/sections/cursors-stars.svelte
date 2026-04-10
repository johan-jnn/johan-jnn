<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import type { Snippet } from "svelte";

  const {
    children,
    class: className,
  }: {
    children: Snippet;
    class?: SvelteClassAttribute;
  } = $props();

  let cursor_positions = $state([0, 0]);
</script>

<div
  style="--cursor-x:{cursor_positions[0]}px;--cursor-y:{cursor_positions[1]}px;--cursor-size:calc(var(--spacing) * 120)"
  class={merge_classes(
    `
    relative

    before:content-[''] before:absolute before:left-0 before:top-0 before:size-full before:-z-1
    before:bg-white dark:before:bg-black
    before:bg-radial before:bg-position-[12%] before:bg-size-[40px_40px]  before:bg-fixed
    before:from-black-400 before:dark:from-secondary before:from-5% before:to-transparent before:to-0%

    bg-radial bg-size-[var(--cursor-size)_var(--cursor-size)] from-white/80 dark:from-black/80 to-transparent to-50% bg-no-repeat
    bg-position-[calc(var(--cursor-x)-var(--cursor-size)/2)_calc(var(--cursor-y)-var(--cursor-size)/2)]
    bg-blend-difference

    not-hover:from-transparent transition-colors
  `,
    className,
  )}
  role="region"
  onmousemove={({
    currentTarget: { offsetTop, clientHeight, offsetLeft, clientWidth },
    pageX,
    pageY,
  }) => {
    cursor_positions = [
      pageX - offsetLeft, // / clientWidth,
      pageY - offsetTop, // / clientHeight,
    ];
  }}
>
  {@render children()}
</div>
