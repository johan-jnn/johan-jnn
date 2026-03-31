<script module lang="ts">
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
    class?: string;

    action: ButtonAsButton | ButtonAsLink;

    level: ButtonLevelType | ButtonLevel;
    children: Snippet;
  }
</script>

<script lang="ts">
  const {
    children,
    level,
    class: additionnalClasses,
    action,
  }: ButtonProps = $props();
</script>

{#snippet button()}
  <div
    class={{
      "border-2 border-black dark:border-white px-4 py-2 uppercase font-bold font-heading": true,
      "neo-shadow neo-shadow-black dark:neo-shadow-white neo-shadow--push": true,
      "hover:neo-shadow-0 transition-[box-shadow_translate] before:transition-[top_left] after:transition-[top_left]": true,

      [additionnalClasses ?? ""]: true,
      "bg-primary text-black/90": level === ButtonLevel.Primary,
      "bg-secondary text-black": level === ButtonLevel.Secondary,
      "bg-white text-black": level === ButtonLevel.Neutral,
    }}
  >
    {@render children()}
  </div>
{/snippet}

<svelte:head>
  <meta name="test" content="fesse" />
</svelte:head>

{#if "url" in action}
  {@const { url, target } = action}

  <a href={url} target={target ?? "_self"}>
    {@render button()}
  </a>
{:else}
  {@const { type, onclick } = action}

  <button {type} {onclick} class="cursor-pointer">
    {@render button()}
  </button>
{/if}
