import { derived, writable } from "svelte/store";

const CLOCK_UNIT = 1e3; // Ghz
export const INITIAL_CLOCK_SPEED = 100;
export const CLOCK_BOUDARIES = [20, 200] as [number, number];

function HzToSeconds(hz: number) {
  return (1 / hz) * CLOCK_UNIT;
}
function SecondsToTimings(s: number) {
  return {
    ms: s * 1e3,
    s,
    min: s / 60,
  };
}

/**
 * The website's clock speed in mHz
 */
export const CLOCK_SPEED = writable(INITIAL_CLOCK_SPEED);
/**
 * The clock's delta shift if it has changed
 */
export const CLOCK_DELTA = derived(
  CLOCK_SPEED,
  function (this: { previous: number }, speed: number) {
    const delta = speed - this.previous;
    this.previous = speed;
    return delta;
  }.bind({ previous: INITIAL_CLOCK_SPEED }),
);

export const CLOCK_TIMINGS = derived(CLOCK_SPEED, (hz) =>
  SecondsToTimings(HzToSeconds(hz)),
);
export const CLOCK_DELTA_TIMINGS = derived(CLOCK_DELTA, (hz) =>
  SecondsToTimings(HzToSeconds(hz)),
);

export const CLOCK_RATE = derived(
  CLOCK_SPEED,
  (hz) => hz / INITIAL_CLOCK_SPEED,
);
export const CLOCK_DELTA_RATE = derived(
  CLOCK_DELTA,
  (hz) => hz / INITIAL_CLOCK_SPEED,
);
