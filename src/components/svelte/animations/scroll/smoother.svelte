<script lang="ts" module>
  export function ifSmoothed(then: (smoother: ScrollSmoother) => any) {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      then(smoother);
    }
  }
</script>

<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import { gsap } from "gsap";
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount, type Snippet } from "svelte";

  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

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

  $effect(() => {
    vars ??= {};

    scroller = ScrollSmoother.create({
      ...vars,
      wrapper,
      content,
    });

    return () => {
      scroller?.kill();
    };
  });

  onMount(() => {
    // --- Smooth anchors
    const scrollAnchors = document.querySelectorAll("a[href^='#']");
    const fakeSmoothScrollHandler = (e: Event) => {
      const { currentTarget } = e;
      if (!(currentTarget instanceof HTMLAnchorElement)) return;

      e.preventDefault();
      scroller?.scrollTo(currentTarget.getAttribute("href"), true, "top 8%");
    };

    scrollAnchors.forEach((anchor) =>
      anchor.addEventListener("click", fakeSmoothScrollHandler),
    );

    // --- Faking sticky elements
    /**
     * As I use tailwindcss, I can find sticky elements by their classnames
     */
    Array.from(document.querySelectorAll('[class*="sticky"]')).forEach(
      (node) => {
        if (getComputedStyle(node).position !== "sticky") {
          return;
        }

        ScrollTrigger.create({
          trigger: node,
          start: "top top",
          end: "bottom bottom",
          endTrigger: node.parentElement,
          pin: true,
          pinSpacing: false,
        });
      },
    );

    return () => {
      scrollAnchors.forEach((anchor) =>
        anchor.removeEventListener("click", fakeSmoothScrollHandler),
      );

      scroller?.kill();
    };
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
