<script module lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import { gsapSmoothScroll } from "$svelte/actions/gsap-smoothScroll.svelte";
  import type { Snippet } from "svelte";
  import type {
    HTMLAttributeAnchorTarget,
    MouseEventHandler,
  } from "svelte/elements";

  export type ButtonLevelType = "primary" | "secondary" | "neutral";
  export enum ButtonLevel {
    Primary = "primary",
    Secondary = "secondary",

    Neutral = "neutral",
  }

  export interface ButtonAsLink {
    url: string;
    target?: HTMLAttributeAnchorTarget;
  }
  export interface ButtonAsButton {
    type: HTMLButtonElement["type"];
    onclick?: MouseEventHandler<HTMLButtonElement>;
  }

  export interface ButtonProps {
    stylingClass?: SvelteClassAttribute;
    boxingClass?: SvelteClassAttribute;

    action: ButtonAsButton | ButtonAsLink;

    level: ButtonLevelType | ButtonLevel;
    children: Snippet;
  }
</script>

<script lang="ts">
  const { children, level, stylingClass, boxingClass, action }: ButtonProps =
    $props();
</script>

{#snippet button()}
  <div
    class={merge_classes(
      [
        "border-2 text-center border-black dark:border-white px-4 py-2 uppercase font-bold font-heading",
        "neo-shadow neo-shadow-black dark:neo-shadow-white neo-shadow--push",
        "hover:neo-shadow-0 transition-[box-shadow_translate] before:transition-[top_left] after:transition-[top_left]",
      ],
      {
        "bg-primary text-black/90": level === ButtonLevel.Primary,
        "bg-secondary text-black": level === ButtonLevel.Secondary,
        "bg-white text-black dark:bg-black dark:text-white":
          level === ButtonLevel.Neutral,
      },
      stylingClass,
    )}
  >
    {@render children()}
  </div>
{/snippet}

{#if "url" in action}
  {@const { url, target } = action}

  <a
    href={url}
    target={target ?? "_self"}
    class={boxingClass}
    use:gsapSmoothScroll={{ onlyIfScrollSmoothed: true }}
  >
    {@render button()}
  </a>
{:else}
  {@const { type, onclick } = action}

  <button
    {type}
    {onclick}
    class={merge_classes("cursor-pointer", stylingClass)}
  >
    {@render button()}
  </button>
{/if}
