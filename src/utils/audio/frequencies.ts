export enum AudioFrequenciesGroups {
  Low,
  Medium,
  High,
}

export class AudioFrequencies extends Float32Array {
  average(group: AudioFrequenciesGroups) {
    if (typeof group === "string")
      group = AudioFrequenciesGroups[group] as unknown as number;

    const channels = Object.values(AudioFrequenciesGroups).filter(
      (v) => typeof v === "number",
    ).length;

    return this.averageBy(channels, group);
  }
  averageBy<
    P extends number | undefined,
    R = P extends number ? number : number[],
  >(channels: number, pick: P = undefined as P): R {
    channels = Math.min(channels, this.length);

    if (typeof pick === "number") {
      const index = Math.min(pick, channels);
      const size = Math.floor(this.length / channels);

      const frequencies = this.slice(size * index, size * (index + 1));
      return (frequencies.reduce((a, b) => a + b, 0) / size) as R;
    } else {
      return new Array(channels)
        .fill(null)
        .map((_, index) => this.averageBy(channels, index)) as R;
    }
  }
}
