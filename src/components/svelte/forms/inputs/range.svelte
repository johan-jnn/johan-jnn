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
  let {
    bounds = [0, 100],
    value = $bindable(0),
    steps = 1,
    name,
    id,
  }: RangeProps = $props();
</script>

<span
  style="--rate:{(value - bounds[0]) / (bounds[1] - bounds[0])}"
  class={[
    "bg-black-400 dark:bg-white-600 relative inline-flex border-6 border-black-400 dark:border-white-600",
    "outline-4 outline-black dark:outline-white",

    "after:content-[''] after:h-full after:aspect-square after:bg-primary after:absolute after:top-1/2 after:-translate-y-1/2",
    "after:left-[calc(100%*var(--rate))] after:-translate-x-[calc(100%*var(--rate))] after:select-none",

    "before:content-[''] before:h-1/20 before:w-full",
    "before:bg-linear-90 before:from-white before:from-20% before:to-20% before:to-transparent before:bg-size-[calc(100%/10)] before:bg-repeat-x",
    "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2",
  ]}
>
  <input
    type="range"
    {name}
    {id}
    step={steps}
    min={bounds[0]}
    max={bounds[1]}
    bind:value
    class="opacity-0 z-1"
  />
</span>
