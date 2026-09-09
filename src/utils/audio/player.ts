import { parseWebStream, type IAudioMetadata } from "music-metadata";
import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
import { AudioAnalyser } from "./analyser";

export class AudioPlayer {
  private audio_analyser: AudioAnalyser | undefined = undefined;
  private audio_metadata: IAudioMetadata | undefined = undefined;
  private update_audio: () => void;
  private update_volume: () => void;
  private update_time: () => void;
  /**
   * We allow the change of the player's audio only trough its `src` setter
   */
  public readonly audio: Omit<HTMLAudioElement, "src"> & {
    readonly src: string;
  };

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;

    this.update_audio = createSubscriber((update) => {
      const off_onplay = on(audio, "play", update);
      const off_onpause = on(audio, "pause", update);
      // const off_onloadstarts = on(audio, "loadstart", update);

      return () => {
        off_onpause();
        off_onplay();
        // off_onloadstarts();
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

  /**
   * Change the audio's source/element.
   * This resets the cached analyser.
   */
  set src(audio: string | HTMLAudioElement) {
    if (typeof audio === "string") {
      audio = new Audio(audio);
    }
    this.audio.pause();

    //@ts-ignore
    this.audio = audio;
    this.audio_analyser = undefined;
    this.audio_metadata = undefined;
    this.update_audio();
  }
  /**
   * A wrapper for the `audio.src` property
   */
  get src(): string {
    return this.audio.src;
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

  async metadata() {
    if (this.audio_metadata) return this.audio_metadata;

    const audio = await fetch(this.src);
    const length = audio.headers.get("Content-Length");
    const type = audio.headers.get("Content-Type");

    return (this.audio_metadata = await parseWebStream(audio.body!, {
      mimeType: type ?? undefined,
      size: length ? parseInt(length) : undefined,
    }));
  }
}
