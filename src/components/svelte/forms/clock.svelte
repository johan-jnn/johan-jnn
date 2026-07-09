<script lang="ts">
  import { CLOCK_CPS, CLOCK_CPS_LIMITS } from "$src/stores/clock";
  import Arrow from "../vectors/arrow.svelte";
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

    <Arrow
      class="h-18 absolute top-full left-1/2 -translate-x-1/2 -rotate-12 max-sm:hidden"
    />
  </label>

  <div class="max-sm:my-2">
    <Range
      bounds={CLOCK_CPS_LIMITS}
      bind:value={$CLOCK_CPS}
      steps={10}
      id="range-{id}"
    />
  </div>

  <p
    class="font-bold italic text-sm text-black-300 dark:text-white-700 text-right"
  >
    {$CLOCK_CPS}Hz
  </p>
</form>
