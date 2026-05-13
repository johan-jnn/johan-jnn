<script lang="ts" module>
  import { isSmoothed } from "$src/components/svelte/animations/scroll/smoother.svelte";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import type { Action } from "svelte/action";

  export interface gsapStickyParameters {
    onlyIfScrollSmoother?: boolean;
  }
  export const gsapSticky: Action<HTMLElement, gsapStickyParameters> = (
    node,
    data,
  ) => {
    let animation: ScrollTrigger | undefined;
    /**
     * As we're using astro, it can have some astro-island elements that are here for debug purpose only.
     */
    const parent = node.closest(":not(astro-island):has(&)");
    if (!parent) {
      return;
    }

    function reloadAnimation() {
      animation?.kill();
      if (data.onlyIfScrollSmoother && !isSmoothed()) {
        return;
      }

      const { position, top, height } = getComputedStyle(node);
      if (position !== "sticky") {
        return;
      }

      const { paddingBottom } = getComputedStyle(parent!);
      const pinnedBottom = [top, height]
        .map((cssValue) => /\d+(?:[.,]\d+)?/.exec(cssValue)?.[0] ?? "0")
        .reduce((agg, num) => agg + parseFloat(num), 0);

      // To avoid weird inset, we reset the "absolute" position of this element
      node.style.inset = "0";
      node.style.removeProperty("position");
      animation = ScrollTrigger.create({
        pin: true,
        pinSpacing: false,
        pinReparent: false,

        trigger: node,
        endTrigger: parent,
        start: `top ${top}`,
        end: `bottom-=${paddingBottom} ${pinnedBottom}px`,
        onKill() {
          // We remove the fake-inset added by gsap to properly find the `top` value
          node.style.removeProperty("inset");
        },
      });
    }

    reloadAnimation();

    // If the parent's height changes, then we need to reload the animation to recalculate everything
    const initialParentScroll = parent.scrollHeight;
    const observer = new ResizeObserver((changes) => {
      if (initialParentScroll !== changes[0].target.scrollHeight) {
        reloadAnimation();
      }
    });
    observer.observe(parent);

    return {
      destroy() {
        animation?.kill();
        observer.disconnect();
      },
      update() {
        reloadAnimation();
      },
    };
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
