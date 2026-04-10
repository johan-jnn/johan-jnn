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
  style="--cursor-x:{cursor_positions[0] *
    100}%;--cursor-y:{cursor_positions[1] * 100}%"
  class={merge_classes(
    `
  relative
  p-8 overflow-hidden
  bg-white dark:bg-black
  bg-radial bg-position-[12%] bg-size-[40px_40px] from-black dark:from-white from-5% to-transparent to-0%

  before:content-[''] not-has-hover:content-none
  before:absolute before:top-(--cursor-y) before:left-(--cursor-x)
  before:aspect-square before:h-[50svw] before:-translate-1/2
  before:bg-radial before:from-white before:dark:from-black before:to-transparent before:to-50%
  before:bg-blend-substract before:opacity-80 not-hover:before:opacity-0 before:transition-opacity

  children:relative children:z-1
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
      (pageX - offsetLeft) / clientWidth,
      (pageY - offsetTop) / clientHeight,
    ];
  }}
>
  {@render children()}
</div>
