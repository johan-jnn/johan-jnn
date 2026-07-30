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
    /**
     * As we're using astro, it can have some astro-island elements that are here for debug purpose only.
     */
    const parent = node.closest(":not(astro-island):has(&)");
    if (!parent) {
      return;
    }

    const animation = ScrollTrigger.create({
      pin: true,
      pinSpacing: false,
      pinReparent: false,

      trigger: node,
      endTrigger: parent,

      start: () => `top ${getComputedStyle(node).top}`,
      end: () => {
        const { paddingBottom } = getComputedStyle(parent);
        const { top, height } = getComputedStyle(node);

        const pinnedBottom = [top, height]
          .map((cssValue) => /\d+(?:[.,]\d+)?/.exec(cssValue)?.[0] ?? "0")
          .reduce((agg, num) => agg + parseFloat(num), 0);

        return `bottom-=${paddingBottom} ${pinnedBottom}px`;
      },
      onRefresh(self) {
        /**
         * Idk why but gsap adds extra inset (top) on the spacer element
         * and this shifts animation down.
         */
        if ("spacer" in self && self.spacer instanceof HTMLElement) {
          self.spacer.style.top = "0px";
        }
      },
    });

    function autoToggleAnimation(refresh = false) {
      node.style.removeProperty("position");

      if (
        (data.onlyIfScrollSmoother && !isSmoothed()) ||
        getComputedStyle(node).position !== "sticky"
      ) {
        animation.disable();
      } else {
        animation.enable();
      }

      if (refresh) {
        animation.refresh();
      }
    }

    autoToggleAnimation();

    // If the parent's height changes, then we need to reload the animation to recalculate everything
    const initialParentScroll = parent.scrollHeight;
    const observer = new ResizeObserver((changes) => {
      if (initialParentScroll !== changes[0].target.scrollHeight) {
        autoToggleAnimation(true);
      }
    });
    observer.observe(parent);

    return {
      destroy() {
        animation.kill();
        observer.disconnect();
      },
      update() {
        autoToggleAnimation(true);
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
