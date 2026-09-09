import { parseWebStream, type IAudioMetadata } from "music-metadata";
import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";
import { AudioAnalyser } from "./analyser";

export class AudioPlayer {
  private audio_analyser: AudioAnalyser | undefined = undefined;
  private audio_metadata: IAudioMetadata | undefined = undefined;
  private depends_on_playstate: () => void = () => void 0;
  private depends_on_volume: () => void = () => void 0;
  private depends_on_time: () => void = () => void 0;

  /**
   * We allow the change of the player's audio only trough its `src` setter
   */
  public readonly audio: Omit<HTMLAudioElement, "src"> & {
    readonly src: string;
  };

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
    this.setupSubscribeDependencies();
  }
  private setupSubscribeDependencies() {
    this.depends_on_playstate = createSubscriber((update) => {
      const off_onplay = on(this.audio, "play", update);
      const off_onpause = on(this.audio, "pause", update);

      return () => {
        off_onplay();
        off_onpause();
      };
    });
    this.depends_on_volume = createSubscriber((update) => {
      const off = on(this.audio, "volumechange", update);

      return () => {
        off();
      };
    });
    this.depends_on_time = createSubscriber((update) => {
      const off = on(this.audio, "timeupdate", update);

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
    audio.volume = this.audio.volume;

    //@ts-ignore
    this.audio = audio;
    this.audio_analyser = undefined;
    this.audio_metadata = undefined;
    this.setupSubscribeDependencies();
  }
  /**
   * A wrapper for the `audio.src` property
   */
  get src(): string {
    return this.audio.src;
  }

  get active() {
    this.depends_on_playstate();
    return !this.audio.paused;
  }

  get volume() {
    this.depends_on_volume();
    return this.audio.volume;
  }
  set volume(target: number) {
    this.audio.volume = target;
  }

  get time() {
    this.depends_on_time();

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

    const audio = await fetch(this.audio.src);
    const length = audio.headers.get("Content-Length");
    const type = audio.headers.get("Content-Type");

    return (this.audio_metadata = await parseWebStream(audio.body!, {
      mimeType: type ?? undefined,
      size: length ? parseInt(length) : undefined,
    }));
  }
}
