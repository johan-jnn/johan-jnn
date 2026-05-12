import { AudioFrequencies } from "$src/utils/audio/frequencies";
import type { AudioPlayer } from "$src/utils/audio/player";
import { derived, writable } from "svelte/store";

export const ambianceUrls = writable<string[]>([]);
export const ambiancePlayer = writable<undefined | AudioPlayer>();
export const ambianceAnalyser = derived(ambiancePlayer, (player) => {
  if (!player) return;
  const { analyser } = player;
  analyser.options = {
    smoothing: 0.8,
    size: 2048,
  };
  return analyser;
});

/**
 * The interval time between 2 frequencies check (in miliseconds)
 */
export const frequenciesUpdateInterval = writable(0);
/**
 * The range of the ambiance frequencies
 * @default [20, 20e3] (Humain earable)
 */
export const frequenciesHzRange = writable([20, 20e3]);

export const ambianceFrequencies = derived(
  [ambianceAnalyser, frequenciesUpdateInterval, frequenciesHzRange],
  ([analyser, interval, targetHzRange], set) => {
    if (!analyser) {
      set(new AudioFrequencies());
      return;
    }

    const baseHzRange = [0, analyser.meter.context.sampleRate / 2];
    const rangeStartIndex =
      analyser.meter.frequencyBinCount *
      (targetHzRange[0] / (baseHzRange[1] - baseHzRange[0]));
    const rangeEndIndex =
      analyser.meter.frequencyBinCount *
      (targetHzRange[1] / (baseHzRange[1] - baseHzRange[0]));

    let timeout: NodeJS.Timeout;
    const rawFrequencies = new AudioFrequencies(
      analyser.meter.frequencyBinCount,
    );
    function start() {
      timeout = setInterval(() => {
        if (!analyser) return;

        analyser.meter.getByteFrequencyData(rawFrequencies);

        const frequencies = rawFrequencies.slice(
          rangeStartIndex,
          rangeEndIndex,
        ) as AudioFrequencies;

        // Convert time domains from [0; 255] to [0; 100]
        frequencies.forEach((f, i) => {
          frequencies[i] = Math.max(0, (f / 255) * 100);
        });

        set(frequencies);
      }, interval);
    }
    function pause() {
      clearInterval(timeout);
    }

    analyser.audio.addEventListener("play", start);
    analyser.audio.addEventListener("pause", pause);
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
