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
  readonly meter: AnalyserNode;
  constructor(
    readonly audio: HTMLAudioElement,
    options?: AudioAnalyserOptions,
  ) {
    const context = new AudioContext();
    this.meter = context.createAnalyser();
    if (options) {
      this.options = options;
    }

    const source = context.createMediaElementSource(audio);
    source.connect(this.meter);
    source.connect(context.destination);
  }

  set options(options: AudioAnalyserOptions) {
    this.meter.fftSize = options.size ?? 2048;
    if (options.decibels) {
      this.meter.maxDecibels = options.decibels.max;
      this.meter.minDecibels = options.decibels.min;
    }
    this.meter.smoothingTimeConstant = options.smoothing ?? 0.8;
  }
}
