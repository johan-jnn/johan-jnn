import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
import { AudioAnalyser } from "./analyser";

export class AudioPlayer {
  private audio_analyser: AudioAnalyser | undefined = undefined;
  private update_audio: () => void;
  private update_volume: () => void;
  private update_time: () => void;

  constructor(readonly audio: HTMLAudioElement) {
    this.update_audio = createSubscriber((update) => {
      const off_onplay = on(audio, "play", update);
      const off_onpause = on(audio, "pause", update);

      return () => {
        off_onpause();
        off_onplay();
      };
    });

    this.update_volume = createSubscriber((update) => {
      const off = on(audio, "volumechange", update);

      return () => {
        off();
      };
    });

    this.update_time = createSubscriber((update) => {
      const off = on(audio, "timeupdate", update);

      return () => {
        off();
      };
    });
  }

  get active() {
    this.update_audio();
    return !this.audio.paused;
  }

  get volume() {
    this.update_volume();
    return this.audio.volume;
  }
  set volume(target: number) {
    this.audio.volume = target;
  }

  get time() {
    this.update_time();

    return {
      seconds: this.audio.currentTime,
      total: this.audio.duration,
      rate: this.audio.currentTime / this.audio.duration,
    };
  }

  get analyser(): AudioAnalyser {
    return (
      this.audio_analyser ??
      (this.audio_analyser = new AudioAnalyser(this.audio))
    );
  }
}
