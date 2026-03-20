<script lang="ts">
  import { onMount } from "svelte";

  const {
    begin = 0,
  }: {
    begin?: number;
  } = $props();

  let counter = $state(0);
  onMount(() => {
    if (typeof begin === "number") {
      counter = begin;
    }
  });
</script>

<svelte:head>
  <meta name="test" content="Hello les gars" />
</svelte:head>

<div>{counter}</div>

<button type="button" onclick={() => counter++}>Increment</button>
