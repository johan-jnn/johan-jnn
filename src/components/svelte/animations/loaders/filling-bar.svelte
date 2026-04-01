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
  viewBox="0 0 100 5"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    {#if delimiters}
      {@const delimiters_offset =
        typeof delimiters === "boolean" ? 10 : delimiters}
      <mask id="delimiters" maskUnits="userSpaceOnUse">
        <rect width="100" height="10" style="fill:url(#delimiter_gradient)" />
      </mask>
      <linearGradient
        id="delimiter_gradient"
        x1="0"
        x2={delimiters_offset}
        y1="5.7315"
        y2="5.7315"
        gradientUnits="userSpaceOnUse"
        spreadMethod="repeat"
      >
        <stop style="stop-opacity:0" offset="0" />
        <stop style="stop-opacity:0" offset=".5" />
        <stop style="stop-color:#fff" offset=".5" />
      </linearGradient>
    {/if}
  </defs>
  <g>
    <rect
      transform="scale({fill} .5)"
      width="100"
      height="10"
      mask={delimiters ? "url(#delimiters)" : null}
      style="fill:{fillColor}"
    />
  </g>
</svg>
