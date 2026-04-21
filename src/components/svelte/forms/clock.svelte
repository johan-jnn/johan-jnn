<script lang="ts">
  import { CLOCK_SPEED } from "$src/stores/clock";
  import Range from "./inputs/range.svelte";

  const id = $props.id();
</script>

<form method="dialog" class="relative">
  <label
    for="range-{id}"
    class="block sm:absolute sm:top-2 sm:left-0 sm:-translate-full sm:-rotate-30"
  >
    <p class="text-sm sm:text-xs max-sm:after:content-[':']">
      Modifies la cadence du portfolio
    </p>
    <img
      class="h-18 absolute top-full left-1/2 -translate-x-1/2 -rotate-12 max-sm:hidden"
      src="/ui/arrow.svg"
      alt="Flêche"
    />
  </label>

  <div class="max-sm:my-2">
    <Range
      bounds={[20, 300]}
      bind:value={$CLOCK_SPEED}
      steps={10}
      id="range-{id}"
    />
  </div>

  <p
    class="font-bold italic text-sm text-black-300 dark:text-white-700 text-right"
  >
    {$CLOCK_SPEED}Ghz
  </p>
</form>
