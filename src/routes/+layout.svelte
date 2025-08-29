<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollSmoother, ScrollTrigger } from "gsap/all";

  import { onMount } from "svelte";
  import "../app.css";

  let { children } = $props();

  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

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
