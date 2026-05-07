<script lang="ts">
  import { ambianceFrequenciesFrame } from "$src/stores/ambiance";
  import type { AudioFrequenciesGroups } from "$src/utils/audio/frequencies";

  const {
    fillColor,
    fill,
    delimiters,
  }: {
    fillColor: string;
    fill: number | { frequency: AudioFrequenciesGroups };
    delimiters?:
      | boolean
      | number
      | {
          amount?: number;
          fill_rate?: number;
        };
  } = $props();

  const id = $props.id();
  const svg_id = `fill-bar-${id}`;
</script>

<svg
  version="1.1"
  viewBox="0 0 150 2"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <mask id="sizer-{svg_id}" maskUnits="userSpaceOnUse">
      <rect
        width="{typeof fill === 'number'
          ? fill * 100
          : $ambianceFrequenciesFrame.average(fill.frequency)}%"
        height="100%"
        fill={delimiters ? `url(#delimiter_gradient-${svg_id})` : "#fff"}
      />
    </mask>

    {#if delimiters}
      {@const fill_offset =
        (typeof delimiters === "object" && delimiters.fill_rate) || 0.85}
      {@const gradient_size_rate = (() => {
        const amount =
          typeof delimiters === "number"
            ? delimiters
            : typeof delimiters === "object" && delimiters.amount
              ? delimiters.amount
              : 10;

        const step_size = 1 / amount;
        const demi_step_size = step_size * fill_offset;

        // We shift by demi-step <amount> times
        return step_size - demi_step_size / (amount + fill_offset);
      })()}
      <linearGradient
        id="delimiter_gradient-{svg_id}"
        x1="0"
        x2="{gradient_size_rate * 100}%"
        y1="50%"
        y2="50%"
        gradientUnits="userSpaceOnUse"
        spreadMethod="repeat"
      >
        <stop style="stop-color:#fff" offset={fill_offset} />
        <stop style="stop-opacity:0" offset={fill_offset} />
        <stop style="stop-opacity:0" offset="0" />
      </linearGradient>
    {/if}
  </defs>
  <g>
    <rect
      width="100%"
      height="100%"
      mask="url(#sizer-{svg_id})"
      style="fill:{fillColor}"
    />
  </g>
</svg>
