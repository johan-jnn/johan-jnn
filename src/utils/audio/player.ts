import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
import { AudioAnalyser } from "./analyser";

export class AudioPlayer {
  private cached_analyser: AudioAnalyser | undefined = undefined;
  private audio_refresh: () => void;
  private volume_refresh: () => void;
  private time_refresh: () => void;

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

    this.time_refresh = createSubscriber((update) => {
      const off = on(audio, "timeupdate", update);

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

  get time() {
    this.time_refresh();

    return {
      seconds: this.audio.currentTime,
      total: this.audio.duration,
      rate: this.audio.currentTime / this.audio.duration,
    };
  }

  get analyser(): AudioAnalyser {
    return (
      this.cached_analyser ??
      (this.cached_analyser = new AudioAnalyser(this.audio))
    );
  }
}
