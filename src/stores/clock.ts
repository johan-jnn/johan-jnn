import { derived, writable } from "svelte/store";

const CLOCK_UNIT = 1e3; // Ghz
export const INITIAL_CLOCK_SPEED = 100;

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

let PREVIOUS_CLOCK_SPEED = INITIAL_CLOCK_SPEED;
/**
 * The website's clock speed in mHz
 */
export const CLOCK_SPEED = writable(INITIAL_CLOCK_SPEED);
/**
 * The clock's delta shift if it has changed
 */
export const CLOCK_DELTA = derived(CLOCK_SPEED, (speed) => {
  const delta = speed - PREVIOUS_CLOCK_SPEED;
  PREVIOUS_CLOCK_SPEED = speed;
  return delta;
});

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
