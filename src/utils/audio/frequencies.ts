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

  sliceBy<
    P extends number | undefined = undefined,
    R = P extends number ? Uint8Array<ArrayBuffer> : Uint8Array<ArrayBuffer>[],
  >(
    channels: number,
    pick: P = undefined as P,
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
      `Invalid range parameters : they must be in [0; 1] (received : rate=${rate} & position=${position})`,
    );

    channels = Math.min(channels, this.length);

    if (typeof pick === "number") {
      const index = Math.min(pick, channels);
      const full_size = Math.floor((this.length * 0.85) / channels);
      const final_size = Math.floor(full_size * rate || 1);

      const start = Math.floor(
        full_size * index + (full_size - final_size) * position,
      );
      const end = start + final_size;
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
