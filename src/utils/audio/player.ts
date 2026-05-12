import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
import type { Unsubscriber } from "svelte/store";
import { AudioAnalyser } from "./analyser";

export class AudioPlayer {
  private cached_analyser: AudioAnalyser | undefined = undefined;
  private audio_refresh: Unsubscriber;
  private volume_refresh: Unsubscriber;

  constructor(readonly audio: HTMLAudioElement) {
    this.audio_refresh = createSubscriber((update) => {
      const off_onplay = on(audio, "play", update);
      const off_onpause = on(audio, "pause", update);

      return () => {
        off_onpause();
        off_onplay();
      };
    });

    this.volume_refresh = createSubscriber((update) => {
      const off = on(audio, "volumechange", update);

      return () => {
        off();
      };
    });
  }

  get active() {
    this.audio_refresh();
    return !this.audio.paused;
  }

  get volume() {
    this.volume_refresh();
    return this.audio.volume;
  }
  set volume(target: number) {
    this.audio.volume = target;
  }

  get analyser(): AudioAnalyser {
    return (
      this.cached_analyser ??
      (this.cached_analyser = new AudioAnalyser(this.audio))
    );
  }
}
