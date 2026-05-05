<script lang="ts" module>
  import { ifSmoothed } from "$src/components/svelte/animations/scroll/smoother.svelte";
  import type { Snippet } from "@astrojs/svelte/svelte-shims.d.ts";
  import type { ScrollSmoother } from "gsap/ScrollSmoother";
  import type { Action } from "svelte/action";
  import type { HTMLAttributeAnchorTarget } from "svelte/elements";

  export interface gsapSmoothScrollParameters {
    onlyIfScrollSmoothed?: boolean;
    scroller?: ScrollSmoother;
  }
  /**
   * Setup a smooth scrollTo using gsap
   */
  export const gsapSmoothScroll: Action<
    HTMLAnchorElement,
    gsapSmoothScrollParameters
  > = (node, data) => {
    if (!(data.onlyIfScrollSmoothed || data.scroller)) {
      throw new Error(
        "If the action is not related to smoothed scroll, you must give a scroller.",
      );
    }

    const fakeSmoothScrollHandler = (e: Event) => {
      const { currentTarget } = e;
      if (!(currentTarget instanceof HTMLAnchorElement)) return;

      const scroll = (scroller: ScrollSmoother) => {
        e.preventDefault();
        scroller.scrollTo(currentTarget.getAttribute("href"), true, "top 8%");
      };

      if (data.scroller) scroll(data.scroller);
      else if (data.onlyIfScrollSmoothed) ifSmoothed(scroll);
    };

    $effect(() => {
      const href = node.getAttribute("href")?.trimStart();
      if (!(href?.startsWith("#") && ["", "_self"].includes(node.target))) {
        return;
      }

      node.addEventListener("click", fakeSmoothScrollHandler);

      return () => {
        node.removeEventListener("click", fakeSmoothScrollHandler);
      };
    });
  };
</script>

<script lang="ts">
  const {
    href,
    children,
    onlyIfScrollSmoothed,
    scroller,
    target,
  }: gsapSmoothScrollParameters & {
    href: string;
    target?: HTMLAttributeAnchorTarget;
    children?: Snippet;
  } = $props();
</script>

<a {href} {target} use:gsapSmoothScroll={{ scroller, onlyIfScrollSmoothed }}>
  {@render children?.()}
</a>
