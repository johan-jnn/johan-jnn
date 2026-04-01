import { derived, writable } from "svelte/store";

/**
 * The website's clock speed in mHz
 */
export const CLOCK_SPEED = writable(80);
/**
 * How fast animations should go
 */
export const CLOCK_SPEED_INTERVAL = derived(CLOCK_SPEED, (hz) => {
  const s = (1 / hz) * 1e3;
  return {
    ms: s * 1e3,
    s,
    min: s / 60,
  };
});
