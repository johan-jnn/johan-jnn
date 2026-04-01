<script lang="ts">
  const {
    fillColor,
    fill,
    delimiters,
  }: {
    fillColor: string;
    fill: number;
    delimiters?: boolean | number;
  } = $props();
</script>

<svg
  version="1.1"
  viewBox="0 0 150 5"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <mask id="sizer" maskUnits="userSpaceOnUse">
      <rect
        width="{100 * fill}%"
        height="100%"
        fill={delimiters ? "url(#delimiter_gradient)" : "#fff"}
      />
    </mask>

    {#if delimiters}
      {@const gradient_size_rate = (() => {
        const amount = typeof delimiters === "number" ? delimiters : 10;

        const step_size = 1 / amount;
        const demi_step_size = step_size / 2;

        // We shift by demi-step <amount> times
        return step_size - demi_step_size / (amount + 1 / 2);
      })()}
      <linearGradient
        id="delimiter_gradient"
        x1="0"
        x2="{gradient_size_rate * 100}%"
        y1="50%"
        y2="50%"
        gradientUnits="userSpaceOnUse"
        spreadMethod="repeat"
      >
        <stop style="stop-color:#fff" offset=".5" />
        <stop style="stop-opacity:0" offset=".5" />
        <stop style="stop-opacity:0" offset="0" />
      </linearGradient>
    {/if}
  </defs>
  <g>
    <rect
      transform="scale(1 .5)"
      width="100%"
      height="100%"
      mask="url(#sizer)"
      style="fill:{fillColor}"
    />
  </g>
</svg>
