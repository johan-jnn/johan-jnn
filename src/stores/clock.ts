import { derived, get, writable } from "svelte/store";

export const DEFAULT_CLOCK_CPS = 100; // Hz
export const CLOCK_CPS = writable(DEFAULT_CLOCK_CPS);
export const CLOCK_CPS_LIMITS = [20, 260] as [number, number];

/**
 * The difference between the last clock's cps and the current one
 */
export const CLOCK_DELTA = derived(
  CLOCK_CPS,
  function (this: { previous: number }, speed: number) {
    const delta = speed - this.previous;
    this.previous = speed;
    return delta;
  }.bind({ previous: get(CLOCK_CPS) }),
);

export function CLOCK_TIMER(cycles_unit: number, coefficent = 1.25) {
  return derived(CLOCK_CPS, (cps) => {
    const s = cycles_unit / cps / coefficent;

    return {
      s,
      ms: s * 1e3,
      min: s / 60,
    };
  });
}
