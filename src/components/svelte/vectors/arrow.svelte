<script lang="ts">
  import { type SvelteClassAttribute } from "$src/utils/svelte/classes";

  const {
    colors = {
      dark: "var(--color-white)",
      light: "var(--color-black)",
    },
    class: className,
  }: {
    colors?: {
      dark: string;
      light: string;
    };
    class?: SvelteClassAttribute;
  } = $props();
</script>

<svg
  width="200"
  height="200"
  version="1.1"
  viewBox="0 0 53 53"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
>
  <defs>
    <marker
      id="ArrowWide"
      style="overflow:visible"
      markerHeight="1"
      markerWidth="1"
      orient="auto-start-reverse"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 1 1"
    >
      <path
        transform="rotate(180 .12 0)"
        d="m3-3-3 3 3 3"
        style="fill:none;stroke:context-stroke"
      />
    </marker>
  </defs>
  <path
    d="m6.6 6.6s1.2 40 40 40"
    class="dark:stroke-(--dark-color) light:stroke-(--light-color)"
    style={[
      `--dark-color:${colors.dark};--light-color:${colors.light}`,
      "fill:none;marker-end:url(#ArrowWide);stroke-dasharray:3.92400002;stroke-linecap:square;stroke-miterlimit:0;stroke-width:.98",
    ].join(";")}
  />
</svg>
