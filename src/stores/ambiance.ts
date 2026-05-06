import { AudioAnalyser } from "$src/utils/audio/analyser";
import { AudioFrequencies } from "$src/utils/audio/frequencies";
import type { AudioPlayer } from "$src/utils/audio/player";
import { derived, writable } from "svelte/store";

export const ambiancePlayer = writable<undefined | AudioPlayer>();
export const ambianceAnalyser = derived(ambiancePlayer, (player) => {
  if (!player) return;
  return new AudioAnalyser(player.audio, {
    smoothing: 0,
  });
});

/**
 * The interval time between 2 frequencies check (in miliseconds)
 */
export const frequenciesUpdateInterval = writable(0);

export const ambianceFrequencies = derived(
  [ambianceAnalyser, frequenciesUpdateInterval],
  ([analyser, interval], set) => {
    if (!analyser) return;
    const frequencies = new AudioFrequencies(analyser.meter.frequencyBinCount);
    let timeout: NodeJS.Timeout;

    function start() {
      timeout = setInterval(() => {
        if (!analyser) return;

        analyser.meter.getFloatTimeDomainData(frequencies);
        // Convert time domains from [-1.0; 1.0] to [0.0; 1.0]
        frequencies.forEach((f, i) => {
          frequencies[i] = (f + 1) / 2;
        });
        set(frequencies);
      }, interval);
    }
    function pause() {
      clearInterval(timeout);
    }

    analyser.audio.addEventListener("play", start);
    analyser.audio.addEventListener("pause", pause);

    return () => {
      clearInterval(timeout);
    };
  },
  new AudioFrequencies(),
);

let nextFrame: number | undefined = undefined;
export const ambianceFrequenciesFrame = derived(
  ambianceFrequencies,
  (frequencies, set) => {
    if (
      !(
        "requestAnimationFrame" in globalThis &&
        "cancelAnimationFrame" in globalThis
      )
    ) {
      set(frequencies);
      return;
    }

    if (typeof nextFrame === "number") {
      cancelAnimationFrame(nextFrame);
    }
    nextFrame = requestAnimationFrame(() => set(frequencies));
  },
  new AudioFrequencies(),
);
