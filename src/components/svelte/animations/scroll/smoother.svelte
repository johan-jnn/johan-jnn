<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import { gsap } from "gsap";
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount, type Snippet } from "svelte";

  let {
    children,
    vars,
    dom,
    scroller = $bindable(),
  }: {
    vars?: ScrollSmoother.Vars;
    children: Snippet;

    dom?: {
      wrapper?: {
        element?: string;
        class?: SvelteClassAttribute;
      };
      content?: {
        element?: string;
        class?: SvelteClassAttribute;
      };
    };

    scroller?: ScrollSmoother;
  } = $props();

  let wrapper: HTMLElement | undefined = $state();
  let content: HTMLElement | undefined = $state();

  onMount(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    vars ??= {};

    vars.wrapper = wrapper;
    vars.content = content;
    scroller = ScrollSmoother.create(vars);
  });
</script>

<svelte:element
  this={dom?.wrapper?.element ?? "div"}
  class={merge_classes(dom?.wrapper?.class)}
  bind:this={wrapper}
>
  <svelte:element
    this={dom?.content?.element ?? "div"}
    class={merge_classes(dom?.content?.class)}
    bind:this={content}
  >
    {@render children()}
  </svelte:element>
</svelte:element>
