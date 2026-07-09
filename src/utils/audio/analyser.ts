import { AudioFrequencies } from "./frequencies";

export interface AudioAnalyserOptions {
  /**
   * @range [32; 2048]
   * @default 2048
   */
  size?: number;
  decibels?: {
    min: number;
    max: number;
  };
  /**
   * @range [0; 1]
   * @default 0.8
   */
  smoothing?: number;
}

export class AudioAnalyser {
  readonly node: AnalyserNode;

  constructor(
    readonly audio: HTMLAudioElement,
    options?: AudioAnalyserOptions,
  ) {
    // Device's context
    const context = new AudioContext();
    // Analyser's context
    this.node = context.createAnalyser();

    // Create a controllable audio source from the given audio
    const source = context.createMediaElementSource(audio);

    // Pipe this source to the analyser and then to the device's output
    source.connect(this.node);
    source.connect(context.destination);

    if (options) {
      this.options = options;
    }
  }

  set options(options: AudioAnalyserOptions) {
    this.node.fftSize = options.size ?? this.node.fftSize;
    this.node.smoothingTimeConstant =
      options.smoothing ?? this.node.smoothingTimeConstant;

    if (options.decibels) {
      this.node.minDecibels = options.decibels.min;
      this.node.maxDecibels = options.decibels.max;
    }
  }

  get frequencies() {
    return AudioFrequencies.fromNode(this.node);
  }
}
