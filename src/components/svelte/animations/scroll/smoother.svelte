<script lang="ts" module>
  export function isSmoothed(): boolean {
    return !!ScrollSmoother.get()?.smooth();
  }
  /**
   * Execute a function if the page use ScrollSmoother
   * @param then The function to execute. If ScrollSmoother if used, the return of `ifSmoothed` is the return of this given function
   */
  export function ifSmoothed<T = any>(
    then: (smoother: ScrollSmoother) => T,
  ): T | undefined {
    const smoother = ScrollSmoother.get();
    if (smoother?.smooth()) {
      return then(smoother);
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

  onMount(() => {
    scroller = ScrollSmoother.create({
      ...(vars ?? {}),
      wrapper,
      content,
    });

    return () => {
      scroller?.kill();
      scroller = undefined;
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
