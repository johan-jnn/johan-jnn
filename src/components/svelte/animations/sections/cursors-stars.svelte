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
  style="--cursor-x:{cursor_positions[0]}px;--cursor-y:{cursor_positions[1]}px;"
  class={merge_classes(
    `
    relative [--cursor-size:--spacing(200)] [--background-size:40px]

    before:content-[''] before:absolute before:left-0 before:top-0 before:size-full before:-z-1
    before:bg-radial before:bg-size-[var(--cursor-size)_var(--cursor-size)] before:from-white dark:before:from-black before:to-transparent before:to-50% before:bg-no-repeat
    before:bg-position-[calc(var(--cursor-x)-var(--cursor-size)/2)_calc(var(--cursor-y)-var(--cursor-size)/2)]
    before:opacity-60 not-hover:before:opacity-0 before:transition-opacity

    bg-radial bg-position-[12%] bg-size-[var(--background-size)_var(--background-size)] bg-fixed
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

<!-- <div
  style="--cursor-x:{cursor_positions[0]}px;--cursor-y:{cursor_positions[1]}px;"
  class={merge_classes(
    `
    relative [--cursor-size:--spacing(200)] [--background-size:40px]

    before:content-[''] before:absolute before:left-0 before:top-0 before:size-full before:-z-1
    before:bg-white dark:before:bg-black
    before:bg-radial before:bg-position-[12%] before:bg-size-[var(--background-size)_var(--background-size)] before:bg-fixed
    before:from-black-400 before:dark:from-secondary before:from-5% before:to-transparent before:to-0%

    bg-radial bg-size-[var(--cursor-size)_var(--cursor-size)] from-white/80 dark:from-black/80 to-black to-50% bg-no-repeat
    bg-position-[calc(var(--cursor-x)-var(--cursor-size)/2)_calc(var(--cursor-y)-var(--cursor-size)/2)]
    bg-blend-difference z-2

    not-hover:from-transparent transition-colors
  `,
    className,
  )}
  role="region"
  onmousemove={({ currentTarget: { offsetTop, offsetLeft }, pageX, pageY }) => {
    cursor_positions = [pageX - offsetLeft, pageY - offsetTop];
  }}
>
  {@render children()}
</div> -->
