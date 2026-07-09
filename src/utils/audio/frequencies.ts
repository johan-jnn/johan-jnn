enum AudioFrequenciesGroups {
  Low,
  Medium,
  High,
}

export class AudioFrequencies extends Uint8Array {
  public static GROUPS = AudioFrequenciesGroups;
  public static GROUPS_SIZE = Object.values(AudioFrequenciesGroups).filter(
    (v) => typeof v === "number",
  ).length;

  public static fromNode(analyser: AnalyserNode): AudioFrequencies {
    const frequencies = new AudioFrequencies(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencies);
    return frequencies;
  }

  sliceBy<
    P extends number | undefined = undefined,
    R = P extends number ? Uint8Array<ArrayBuffer> : Uint8Array<ArrayBuffer>[],
  >(
    channels: number,
    pick: P = undefined as P,
    /**
     * Subselection of the range for each channels
     */
    range: {
      rate: number;
      position: number;
    } = {
      rate: 1,
      position: 0.5,
    },
  ): R {
    const { rate, position } = range;
    console.assert(
      rate >= 0 && rate <= 1 && position >= 0 && position <= 1,
      `Invalid range arguments. They must be in [0; 1] (received : rate=${rate} & position=${position})`,
    );

    if (!this.length) {
      return [] as R;
    }

    console.assert(
      channels > 0 && channels < this.length,
      `Invalid channels argument. It must be in ]0; ${this.length}[ (received : ${channels})`,
    );
    console.assert(
      typeof pick !== "number" || (pick >= 0 && pick <= channels),
      `Invalid pick argument. It must be in [0; ${channels}] (received : ${pick})`,
    );

    if (typeof pick === "number") {
      const channel_size = Math.floor(this.length / channels);
      const range_size = Math.floor(channel_size * (rate || 1));

      const start = Math.floor(
        channel_size * pick + (channel_size - range_size) * position,
      );
      const end = start + channel_size;
      return this.slice(start, end) as R;
    } else {
      return new Array(channels)
        .fill(null)
        .map((_, index) => this.sliceBy(channels, index, range)) as R;
    }
  }

  averageBy<
    P extends number | undefined = undefined,
    R = P extends number ? number : number[],
  >(
    channels: number,
    pick: P = undefined as P,
    strict: boolean = false,
    /**
     * Subselection of the range for each channels
     */
    range: {
      rate: number;
      position: number;
    } = {
      rate: 1,
      position: 0.5,
    },
  ): R {
    if (typeof pick === "number") {
      let slice = this.sliceBy(channels, pick, range);
      if (strict) {
        slice = slice.filter(Boolean);
      }

      if (!slice.length) return 0 as R;

      return (slice.reduce((a, b) => a + b, 0) / slice.length) as R;
    } else {
      return new Array(channels)
        .fill(null)
        .map((_, index) => this.averageBy(channels, index, strict, range)) as R;
    }
  }

  maxBy<
    P extends number | undefined = undefined,
    R = P extends number ? number : number[],
  >(
    channels: number,
    pick: P = undefined as P,
    /**
     * Subselection of the range for each channels
     */
    range: {
      rate: number;
      position: number;
    } = {
      rate: 1,
      position: 0.5,
    },
  ): R {
    if (typeof pick === "number") {
      return Math.max(...this.sliceBy(channels, pick, range)) as R;
    } else {
      return new Array(channels)
        .fill(null)
        .map((_, index) => this.maxBy(channels, index, range)) as R;
    }
  }
}
