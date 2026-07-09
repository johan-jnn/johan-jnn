import { AudioFrequencies } from "$src/utils/audio/frequencies";
import { AudioPlayer } from "$src/utils/audio/player";
import { derived, writable } from "svelte/store";

export const AMBIANCE_LIBRAIRY = writable<string[]>([]);
export const AMBIANCE_PLAYER = writable<AudioPlayer | undefined>();

export const FREQUENCIES_CHECK_INTERVAL = writable(0);
export const FREQUENCIES_RANGE = writable<[number, number]>([20, 20e3]);

export const AMBIANCE_FREQUENCIES = derived(
  [AMBIANCE_PLAYER, FREQUENCIES_CHECK_INTERVAL, FREQUENCIES_RANGE],
  ([player, interval, range], set) => {
    if (!player) {
      return set(new AudioFrequencies());
    }

    const { analyser } = player;
    function analyse() {
      const {
        context: { sampleRate },
        frequencyBinCount,
      } = analyser.node;
      const hzRange = [0, sampleRate / 2];
      const hzRangeSize = hzRange[1] - hzRange[0];
      const frequenciesRange = range.map(
        (bound) => frequencyBinCount * (bound / hzRangeSize),
      );

      const frequencies = analyser.frequencies.slice(
        ...frequenciesRange,
      ) as AudioFrequencies;

      // Convert time domains from [0; 255] to [0; 100]
      frequencies.forEach((f, i) => {
        frequencies[i] = Math.max(0, (f / 255) * 100);
      });

      set(frequencies);
    }

    let timer: NodeJS.Timeout;
    function enable() {
      timer = setInterval(analyse, interval);
    }
    function disable() {
      clearInterval(timer);
    }

    analyser.audio.addEventListener("play", enable);
    analyser.audio.addEventListener("pause", disable);

    () => {};
  },
  new AudioFrequencies(),
);

export const DRAWABLE_AMBIANCE_FREQUENCIES = derived(
  AMBIANCE_FREQUENCIES,
  function (
    this: { frame?: number },
    frequencies: AudioFrequencies,
    set: Function,
  ) {
    if (
      !(
        "requestAnimationFrame" in globalThis &&
        "cancelAnimationFrame" in globalThis
      )
    ) {
      return set(frequencies);
    }

    if (typeof this.frame === "number") {
      cancelAnimationFrame(this.frame);
    }
    this.frame = requestAnimationFrame(() => set(frequencies));
  }.bind({}),
  new AudioFrequencies(),
);
