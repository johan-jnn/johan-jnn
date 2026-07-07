<script lang="ts">
  import { ambianceFrequenciesFrame } from "$src/stores/ambiance";
  import { CLOCK_TIMINGS } from "$src/stores/clock";
  import gsap from "gsap";
  import { onDestroy, onMount } from "svelte";

  const {
    animation = false,
    levels = 7,
    gap = 0.25,
  }: {
    /**
     * `'sync'` -> Sync the animation speed with the current clock's speed
     * `number` -> Duration of the animation exprimed in seconds
     * `boolean` -> If `true`, use the default animation's duration. If `false`, do not animate
     */
    animation?: "sync" | number | boolean;
    levels?: number;
    /**
     * Must be in `[0; 1]`
     * Corresponding to the rate of the final bars' width that are displayed
     */
    gap?: number;
  } = $props();

  $effect(() => {
    console.assert(
      gap >= 0 && gap <= 1,
      `The gap parameter must be in the [0; 1] range (received : ${gap})`,
    );
  });

  const duration = $derived(
    animation &&
      (animation === "sync"
        ? $CLOCK_TIMINGS.s
        : typeof animation === "number"
          ? animation
          : 5),
  );

  let circleRef: SVGCircleElement | undefined = $state(),
    radarRef: SVGGElement | undefined = $state(),
    levelsRefs: SVGRectElement[] = $state([]);

  let tweens: (gsap.core.Tween | gsap.core.Timeline)[] = $state([]);

  onMount(() => {
    // Note: all the tweens' duration will be set in the $effect
    // hook bellow.

    tweens = [
      gsap.to([circleRef, radarRef], {
        rotate: (index) => 360 * (index * 2 - 1),
        repeat: -1,
        transformOrigin: "center center",
        ease: "none",
      }),
    ];

    if (animation !== "sync") {
      tweens.push(
        ...levelsRefs.map((level) => {
          const tm = gsap.timeline({
            yoyo: true,
            repeat: -1,
            defaults: {
              ease: "none",
              transformOrigin: "bottom center",
            },
          });
          const steps = Math.floor(Math.random() * 30 + 5);
          for (let i = 0; i < steps; i++) {
            tm.to(level, {
              scaleY: "random(0.1, 1.3)",
            });
          }
          return tm;
        }),
      );
    }
  });
  onDestroy(() => {
    tweens.splice(0).forEach((t) => t.kill());
  });
  $effect(() => {
    tweens.forEach((tween) => {
      if (duration === false) {
        tween.pause();
      } else {
        const proportionalTime = (duration * tween.time()) / tween.duration();
        tween.duration(duration).play(proportionalTime);
      }
    });
  });

  const barFills = $derived(
    animation === "sync"
      ? $ambianceFrequenciesFrame.averageBy(levels, undefined, false, {
          rate: 0.75,
          position: 0.5,
        })
      : new Array(levels).fill(null).map(() => Math.random() * 100),
  );

  const barsFullWidth = $derived(100 / barFills.length);
  const barsWidth = $derived(barsFullWidth * (1 - gap));
</script>

<svg
  version="1.1"
  viewBox="0 0 60 60"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="aspect-square size-full"
>
  <defs>
    <linearGradient id="swatch8">
      <stop offset="0" />
    </linearGradient>
    <linearGradient
      id="linearGradient8"
      x1="24.547"
      x2="35.438"
      y1="30"
      y2="30"
      gradientUnits="userSpaceOnUse"
      xlink:href="#swatch8"
    />
  </defs>
  <g>
    <g class="levels fill-white-700">
      <!-- All variables in this loop are written as pourcentages (expect for indexes) -->
      {#each barFills as fill, index}
        {@const x = barsFullWidth * index + (barsFullWidth * gap) / 2}
        {@const height = fill / 3}
        {@const y = 55 - height}

        <rect
          x="{x}%"
          y="{y}%"
          width="{barsWidth}%"
          height="{height}%"
          bind:this={levelsRefs[index]}
        />
      {/each}
    </g>
  </g>
  <g>
    <circle
      cx="29.998"
      cy="29.997"
      r="22.793"
      style="fill:none;stroke-dasharray:1.15, 1.2;stroke-width:.4"
      class="stroke-black dark:stroke-white"
      bind:this={circleRef}
    />
    <circle
      cx="30"
      cy="30"
      r="29.739"
      style="fill:none;stroke-width:.5219;"
      class="stroke-black dark:stroke-white"
    />
    <circle
      cx="30"
      cy="30"
      r="13.975"
      style="fill:none;stroke-width:1.7626"
      class="stroke-primary"
    />
  </g>
  <g bind:this={radarRef}>
    <g transform="matrix(1.1593 0 0 1.1593 -4.7777 -4.7788)">
      <circle
        cx="30"
        cy="30"
        r="1.2209"
        class="fill-black dark:fill-secondary"
      />
      <g
        transform="matrix(.71835 0 0 .71835 8.4474 8.4494)"
        style="fill-opacity:0;stroke-width:1.0324;stroke:url(#linearGradient8)"
      >
        <g
          transform="rotate(225 30.376 30.435)"
          style="fill-opacity:0;stroke-width:1.0324"
          class="stroke-black dark:stroke-white"
        >
          <path
            d="m31.06 27.171a3.1969 3.1969 0 0 1 3.1969 3.1969"
            style="fill-opacity:0;stroke-width:1.0324"
          />
          <path
            transform="rotate(180 30.955 30.472)"
            d="m31.06 27.171a3.1969 3.1969 0 0 1 3.1969 3.1969"
            style="fill-opacity:0;stroke-width:1.0324"
          />
        </g>
        <g
          transform="matrix(1.0429 1.0429 -1.0429 1.0429 29.488 -34.064)"
          style="fill-opacity:0;stroke-width:.69995"
          class="stroke-black dark:stroke-white"
        >
          <path
            transform="rotate(180 30.955 30.472)"
            d="m31.06 27.171a3.1969 3.1969 0 0 1 3.1969 3.1969"
            style="fill-opacity:0;stroke-width:.69995"
          />
          <path
            d="m31.06 27.171a3.1969 3.1969 0 0 1 3.1969 3.1969"
            style="fill-opacity:0;stroke-width:.69995"
          />
        </g>
      </g>
    </g>
  </g>
</svg>
