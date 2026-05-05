import { AudioAnalyser } from "$src/utils/audio/analyser";
import type { AudioPlayer } from "$src/utils/audio/player";
import { derived, writable } from "svelte/store";

export const ambiancePlayer = writable<undefined | AudioPlayer>();
export const ambianceAnalyser = derived(ambiancePlayer, (player) => {
  if (!player) return;
  return new AudioAnalyser(player.audio);
});

/**
 * The interval time between 2 frequencies check (in miliseconds)
 */
export const frequenciesUpdateInterval = writable(0);

export const ambianceFrequencies = derived(
  [ambianceAnalyser, frequenciesUpdateInterval],
  ([analyser, interval], set) => {
    if (!analyser) return;
    const frequencies = new Float32Array(analyser.meter.frequencyBinCount);
    let timeout: NodeJS.Timeout;

    function start() {
      timeout = setInterval(() => {
        if (!analyser) return;

        analyser.meter.getFloatTimeDomainData(frequencies);
        set(Array.from(frequencies));
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
  [] as number[],
);
