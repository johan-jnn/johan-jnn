<script lang="ts">
  import type { Snippet } from "svelte";
  import type {
    HTMLAttributeAnchorTarget,
    HTMLButtonAttributes,
  } from "svelte/elements";

  const {
    type,
    theme = "primary",
    style = "primary",
    children,
  }: {
    type:
      | {
          link: {
            url: string;
            target?: HTMLAttributeAnchorTarget;
          };
        }
      | {
          button: {
            type?: HTMLButtonAttributes["type"];
          };
        };
    theme?: "primary" | "secondary" | "tercary";
    style?: "primary" | "secondary";
    children: Snippet;
  } = $props();

  const css_theme =
    theme === "primary"
      ? "theme-primary"
      : theme === "secondary"
        ? "theme-secondary"
        : "theme-tercary";
</script>

{#if "link" in type}
  {@const { url, target } = type.link}
  <a href={url} target={target ?? "_self"} class="btn-like {css_theme} {style}">
    {@render children()}
  </a>
{:else}
  {@const { type: btnType } = type.button}
  <button type={btnType ?? "button"} class="btn-like {css_theme} {style}">
    {@render children()}
  </button>
{/if}
