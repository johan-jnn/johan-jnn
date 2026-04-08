<script lang="ts">
  import { CSSAnimationDurationSmoother } from "$src/actions/css/animationDurationSmoother";

  const {
    animation,
  }: {
    animation?:
      | {
          /**
           * If the value is a number, it represents milliseconds
           */
          speed?: number | string;
        }
      | false;
  } = $props();

  const animation_speed = $derived(
    animation && animation?.speed
      ? typeof animation.speed === "number"
        ? `${animation.speed}ms`
        : animation.speed
      : null,
  );
</script>

<svg
  version="1.1"
  viewBox="0 0 60 60"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  style={animation_speed && `--animation-speed:${animation_speed};`}
  class={{
    animated: animation !== false,
  }}
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
  <g transform="translate(-.28795 2.7766)">
    <g class="levels fill-white-700">
      <rect
        x="26.762"
        y="27.178"
        width="6.4765"
        height="2.8222"
        use:CSSAnimationDurationSmoother
      />
      <rect
        x="18.762"
        y="22.167"
        width="6.4765"
        height="7.8327"
        use:CSSAnimationDurationSmoother
      />
      <rect
        x="10.762"
        y="26.084"
        width="6.4765"
        height="3.9163"
        use:CSSAnimationDurationSmoother
      />
      <rect
        x="2.7617"
        y="24.356"
        width="6.4765"
        height="5.6445"
        use:CSSAnimationDurationSmoother
      />
      <rect
        x="34.762"
        y="26.084"
        width="6.4765"
        height="3.9163"
        use:CSSAnimationDurationSmoother
      />
      <rect
        x="42.762"
        y="26.084"
        width="6.4765"
        height="3.9163"
        use:CSSAnimationDurationSmoother
      />
      <rect
        x="50.762"
        y="28.371"
        width="6.4765"
        height="1.6287"
        use:CSSAnimationDurationSmoother
      />
    </g>
  </g>
  <g>
    <circle
      cx="29.998"
      cy="29.997"
      r="22.793"
      style="fill:none;stroke-dasharray:1.15, 1.2;stroke-width:.4"
      class="dashed-circle stroke-black dark:stroke-white"
      use:CSSAnimationDurationSmoother
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
  <g class="radar" use:CSSAnimationDurationSmoother>
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

<style lang="scss">
  @use "sass:math";
  @use "sass:list";

  $duration: var(--animation-speed, 10s);
  $level-steps: (0.35, 0.2, 0.75, 0.7, 1.5, 0.25, 0.5);
  $level-amount: list.length($level-steps);
  $level-randomness: 8;
  $level-rate-modifier-bounds: (0.45, 1.5);
  $level-speed: calc($duration / 6);

  @keyframes rotate {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
  @keyframes level-animation {
    0% {
      scale: 1 1;
    }
    100% {
      scale: 1 1;
    }

    @for $i from 1 to $level-amount {
      $rate: list.nth($level-steps, $i);
      $pourcent: calc(100% / $level-amount * $i);

      #{$pourcent} {
        scale: 1 calc(var(--rate-modifier, 1) * $rate);
      }
    }
  }

  svg {
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;

    &.animated {
      .radar {
        animation: rotate calc($duration / 2) infinite linear;
        transform-origin: center;
      }
      .dashed-circle {
        animation: rotate reverse $duration infinite linear;
        transform-origin: center;
      }
      .levels {
        > * {
          animation: level-animation $level-speed infinite linear;
          transform-origin: center bottom;
          transform-box: fill-box;

          @for $n from 0 to $level-randomness {
            &:nth-child(#{$level-randomness}n + #{$n}) {
              --rate-modifier: #{math.random() *
                (
                  list.nth($level-rate-modifier-bounds, 2) - list.nth(
                      $level-rate-modifier-bounds,
                      1
                    )
                ) +
                list.nth($level-rate-modifier-bounds, 1)};
              animation-delay: calc(-1 * $level-speed * math.random());
            }
          }
        }
      }
    }
  }
</style>
