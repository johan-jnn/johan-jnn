<script lang="ts">
  import { ambiancePlayer } from "$src/stores/ambiance";
  import type { EntryData } from "$src/utils/content/entry";
  import Button from "$svelte/button.svelte";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import Music from "../animations/spinners/music.svelte";
  import { start } from "../audio/ambiance.svelte";
  import ClockForm from "../forms/clock.svelte";
  import SplittedHeading from "../headings/splitted.svelte";

  const { titles, ctas, description, localisation }: EntryData<"home">["hero"] =
    $props();

  let heading = $derived(titles[0].lines);

  onMount(() => {
    heading = titles[Math.floor(Math.random() * titles.length)].lines;
  });
</script>

<div
  class="h-full grid sm:grid-cols-[60%_1fr] gap-y-8 items-center px-8 md:px-12 py-18"
>
  <section class="grid tracking-wider gap-12">
    <p
      class="uppercase font-heading text-primary-700 dark:text-secondary-600 text-xs"
      data-location
    >
      {localisation}
    </p>

    <SplittedHeading parts={heading} h={1} />

    <p class="sm:max-w-[40svw] text-black-400">
      {description}
    </p>

    <div class="flex items-center gap-4 max-sm:justify-center">
      {#each ctas as cta, index}
        <Button
          level={index ? "neutral" : "primary"}
          action={cta}
          stylingClass="py-4 px-5"
        >
          {cta.label}
        </Button>
      {/each}
    </div>
  </section>
  <section class="w-full sm:h-full relative">
    {#if $ambiancePlayer}
      <div
        class="absolute flex sm:flex-col align-middle justify-center gap-12 items-center size-full"
        transition:fade
      >
        <div class="h-[10vh] sm:h-90">
          <Music animation={{ sync: true }} />
        </div>

        <ClockForm />
      </div>
    {:else}
      <div
        class="absolute size-full grid content-center max-sm:hidden not-has-hover:animate-pulse"
        transition:scale
      >
        <Button
          level="neutral"
          boxingClass="w-fit mx-auto"
          action={{
            type: "button",
            onclick: () => {
              start();
            },
          }}
        >
          Ajouter un fond sonore
        </Button>
      </div>
    {/if}
  </section>
</div>

<style>
  [data-location] {
    --bar-size: calc(var(--spacing) * 18);
    --bar-mr: calc(var(--spacing) * 6);

    padding-left: calc(var(--bar-size) + var(--bar-mr));
    position: relative;
    &::before {
      content: "";
      position: absolute;

      top: 50%;
      left: 0;
      width: var(--bar-size);
      height: 0.35em;

      translate: 0 -50%;

      background-color: currentColor;
      border-radius: calc(infinity * 1px);
    }
  }
</style>
