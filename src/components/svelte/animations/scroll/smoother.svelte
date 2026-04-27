<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount, type Snippet } from "svelte";

  const {
    children,
    vars,
    dom,
  }: {
    vars?: ScrollSmoother.Vars;
    children: Snippet;

    dom?: {
      wrapper?: string;
      content?: string;
    };
  } = $props();

  let wrapper: HTMLElement | undefined = $state();
  let content: HTMLElement | undefined = $state();

  onMount(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    const smoother = vars ?? {};

    smoother.wrapper = wrapper;
    smoother.content = content;
    ScrollSmoother.create(smoother);
  });
</script>

<svelte:element this={dom?.wrapper ?? "div"} bind:this={wrapper}>
  <svelte:element this={dom?.content ?? "div"} bind:this={content}>
    {@render children()}
  </svelte:element>
</svelte:element>
