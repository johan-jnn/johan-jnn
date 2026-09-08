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
  /**
   * The min/max Hz range to analyse
   *
   * Note that this option is connected to the audio's sample rate.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData
   */
  range?:
    | {
        min: number;
        max: number;
      }
    | "all";
}

export class AudioAnalyser {
  readonly node: AnalyserNode;
  private frequenciesBounds: [number, number] = [0, 0];

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
    this.removeAnalysingRange();

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

    if (options.range === "all") {
      this.removeAnalysingRange();
    } else if (options.range) {
      this.updateAnalysingRange(options.range.min, options.range.max);
    }
  }

  get frequencies() {
    return AudioFrequencies.fromNode(this.node).slice(
      ...this.frequenciesBounds,
    );
  }

  private updateAnalysingRange(minFrequency: number, maxFrequency: number) {
    const maxAnalysableFrequency = this.node.context.sampleRate / 2;

    if (
      minFrequency < 0 ||
      maxFrequency > maxAnalysableFrequency ||
      minFrequency > maxFrequency
    ) {
      console.error(
        `Cannot modify the frequencies analysing's range. Please indicate a min/max value 0 and ${maxAnalysableFrequency}.`,
      );
      return;
    }

    const { frequencyBinCount } = this.node;

    this.frequenciesBounds = [
      Math.floor((minFrequency / maxAnalysableFrequency) * frequencyBinCount),
      Math.floor((maxFrequency / maxAnalysableFrequency) * frequencyBinCount),
    ];
  }
  private removeAnalysingRange() {
    this.updateAnalysingRange(0, this.node.context.sampleRate / 2);
  }
}
