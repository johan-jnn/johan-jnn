<script lang="ts" module>
  import { ifSmoothed } from "$src/components/svelte/animations/scroll/smoother.svelte";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import type { Action } from "svelte/action";

  export interface gsapStickyParameters {
    onlyIfScrollSmoother?: boolean;
  }
  export const gsapSticky: Action<HTMLElement, gsapStickyParameters> = (
    node,
    data,
  ) => {
    $effect(() => {
      const { position, top, height } = getComputedStyle(node);
      if (position !== "sticky") {
        return;
      }

      /**
       * As we're using astro, it can have some astro-island elements that are here for debug purpose only.
       */
      const parent = node.closest(":not(astro-island):has(&)");
      if (!parent) {
        return;
      }

      const { paddingBottom } = getComputedStyle(parent);

      const createAnimation = () => {
        // To avoid weird inset, we reset the "absolute" position of this element
        node.style.inset = "0";
        node.style.removeProperty("position");

        const endShift = [top, height]
          .map((cssValue) => /\d+(?:\.\d+)?/.exec(cssValue)?.[0] ?? "0")
          .reduce((agg, num) => agg + parseFloat(num), 0);

        return ScrollTrigger.create({
          trigger: node,
          start: `top ${top}`,
          endTrigger: parent,
          end: `bottom-=${paddingBottom} ${endShift}px`,
          pin: true,
          pinSpacing: false,
          pinReparent: false,
        });
      };

      const stickyAnimation = data.onlyIfScrollSmoother
        ? ifSmoothed(createAnimation)
        : createAnimation();

      return () => {
        stickyAnimation?.kill();
      };
    });
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    element,
    children,
    class: className,
    id,
    onlyIfScrollSmoother,
  }: gsapStickyParameters & {
    element: string;
    children?: Snippet;
    class?: string;
    id?: string;
  } = $props();
</script>

<svelte:element
  this={element}
  class={className}
  {id}
  use:gsapSticky={{ onlyIfScrollSmoother }}
>
  {@render children?.()}
</svelte:element>
