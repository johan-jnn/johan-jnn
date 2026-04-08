<script lang="ts" module>
  export interface RangeProps {
    bounds?: [number, number];
    steps?: number;
    value: number;

    name?: string;
    id?: string;
  }
</script>

<script lang="ts">
  import FillingBar from "../../animations/loaders/filling-bar.svelte";

  let {
    bounds = [0, 100],
    value = $bindable(0),
    steps = 1,
    name,
    id,
  }: RangeProps = $props();

  const rate = $derived((value - bounds[0]) / (bounds[1] - bounds[0]));
</script>

<span
  style="--rate:{rate}"
  class={[
    "[--background:transparent] [--borders:var(--color-white-800)]",
    "dark:[--borders:var(--color-black-200)]",

    "bg-(--background) relative inline-flex border-10 border-(--background)",
    "outline-2 outline-(--borders)",

    "neo-shadow neo-shadow-black dark:neo-shadow-white neo-shadow--push has-active:neo-shadow-0 not-hover:neo-shadow-0",
    "transition-[shadow_transform]",

    "after:content-[''] after:h-full after:aspect-square after:bg-primary after:absolute after:top-1/2 after:-translate-y-1/2",
    "after:left-[calc(100%*var(--rate))] after:-translate-x-[calc(100%*var(--rate))] after:select-none",
  ]}
>
  <span class="absolute top-1/2 -translate-1/2 left-1/2 w-9/10 flex">
    <FillingBar fill={rate} fillColor="var(--borders)" />
  </span>
  <span class="absolute top-1/2 -translate-1/2 left-1/2 w-9/10 flex">
    <FillingBar
      fill={1}
      fillColor="var(--borders)"
      delimiters={{
        amount: 10,
        fill_rate: 0.1,
      }}
    />
  </span>

  <input
    type="range"
    {name}
    {id}
    step={steps}
    min={bounds[0]}
    max={bounds[1]}
    bind:value
    class="opacity-0 z-1 cursor-col-resize"
  />
</span>
