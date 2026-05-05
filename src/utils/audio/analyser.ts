interface AudioAnalyserOptions {
  /**
   * @range [32; 2048]
   * @default 32
   */
  size?: number;
  decibels?: {
    /**
     * @default 0
     */
    min?: number;
    /**
     * @default 1
     */
    max?: number;
  };
  /**
   * @range [0; 1]
   * @default 1
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
    this.meter.fftSize = options?.size ?? 32;
    this.meter.maxDecibels = options?.decibels?.max ?? 1;
    this.meter.minDecibels = options?.decibels?.min ?? 0;
    this.meter.smoothingTimeConstant = options?.smoothing ?? 1;

    const source = context.createMediaElementSource(audio);
    source.connect(this.meter);
    source.connect(context.destination);
  }
}
