<script lang="ts">
  import { CLOCK_SPEED } from "$src/stores/clock";
  import Range from "./inputs/range.svelte";

  const id = $props.id();
</script>

<form method="dialog" class="relative text-right">
  <label for="range-{id}" class="absolute top-2 left-0 -translate-full -rotate-30">
    <p class="text-xs">Modifies la cadence du portfolio</p>
    <img
      class="h-18 absolute top-full left-1/2 -translate-x-1/2 -rotate-12"
      src="/ui/arrow.svg"
      alt="Flêche"
    />
  </label>

  <div>
    <Range bounds={[20, 300]} bind:value={$CLOCK_SPEED} steps={10} id="range-{id}" />
  </div>

  <p class="font-bold italic text-sm text-black-300 dark:text-white-700">
    {$CLOCK_SPEED}Ghz
  </p>
</form>
