export class AudioPlayer {
  constructor(readonly audio: HTMLAudioElement) {}

  get active() {
    return !this.audio.paused;
  }
}
