<script lang="ts">
  import { gsap } from "gsap";
  import {
    Draggable,
    InertiaPlugin,
    ScrollSmoother,
    ScrollTrigger,
    TextPlugin,
  } from "gsap/all";

  import Navbar from "$lib/components/navbar.svelte";
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
    ScrollSmoother.create({
      wrapper: scroll_wrapper,
      content: scroll_content,
      onUpdate(self) {
        if (!self.scrollTrigger) return;

        document.body.setAttribute(
          "data-scroll-dir",
          self.scrollTrigger.direction.toString()
        );
        document.body.setAttribute(
          "data-scroll-progress",
          self.scrollTrigger.progress.toString()
        );
        document.body.setAttribute(
          "data-scroll",
          self.scrollTrigger.progress * scroll_content!.clientHeight + "px"
        );
      },
    });
  });
</script>

<svelte:head>
  <link rel="icon" href="/api/logo" />
</svelte:head>

<Navbar
  navitems={{
    "My Skills": {
      url: "#stacks",
    },
  }}
/>

<div bind:this={scroll_wrapper}>
  <div bind:this={scroll_content}>
    {@render children()}
  </div>
</div>
