<script lang="ts">
  import { gsap } from "gsap";
  import {
    Draggable,
    InertiaPlugin,
    ScrollSmoother,
    ScrollTrigger,
    TextPlugin,
  } from "gsap/all";

  import "$lib/theme/app.css";
  import { onMount } from "svelte";

  let { children } = $props();

  gsap.registerPlugin(
    ScrollSmoother,
    ScrollTrigger,
    TextPlugin,
    Draggable,
    InertiaPlugin
  );

  let scroll_content = $state<HTMLDivElement>();
  let scroll_wrapper = $state<HTMLDivElement>();

  onMount(() => {
    // ScrollSmoother.create({
    //   wrapper: scroll_wrapper,
    //   content: scroll_content,
    // });
  });
</script>

<svelte:head>
  <link rel="icon" href="/api/logo" />
</svelte:head>

<div bind:this={scroll_wrapper}>
  <div bind:this={scroll_content}>
    {@render children()}
  </div>
</div>
