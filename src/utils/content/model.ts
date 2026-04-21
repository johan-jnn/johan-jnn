import fs, { type PathLike } from "node:fs";
import path from "node:path";

export class ModelableContent<Model extends object> {
  public static loadFromFile<Model extends object>(
    file: PathLike,
  ): ModelableContent<Model> {
    if (!fs.existsSync(file)) {
      throw new Error(`File at ${file} does not exists.`);
    }

    const { ext } = path.parse(file.toString());
    switch (ext) {
      case ".json":
      case "json": {
        return new this(JSON.parse(fs.readFileSync(file, "utf-8")));
      }
      default:
        throw new Error(`Format ${ext} is not modelable.`);
    }
  }

  constructor(protected readonly model: Model) {}
  public get props() {
    return Object.freeze(this.model);
  }
}
