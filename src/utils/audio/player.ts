import { AudioAnalyser, type AudioAnalyserOptions } from "./analyser";

export class AudioPlayer {
  private analyser: AudioAnalyser | undefined = undefined;

  constructor(readonly audio: HTMLAudioElement) {}

  get active() {
    return !this.audio.paused;
  }

  getAnalyser(options?: AudioAnalyserOptions) {
    if (this.analyser) {
      if (options) {
        this.analyser.options = options;
      }
      return this.analyser;
    }

    return (this.analyser = new AudioAnalyser(this.audio, options));
  }
}
