import fs, { type PathLike } from "node:fs";
import path from "node:path";
import { MarkdownBased } from "./mdBased";

export class Model {
  public static loadSync<Type extends Model>(
    this: new (attributes?: object) => Type,
    filePath: PathLike,
  ): Type {
    const raw = fs.readFileSync(filePath, "utf-8");
    const ext = path.extname(filePath.toString());

    const model = new this();

    switch (ext.slice(1)) {
      case "json": {
        Object.assign(model, JSON.parse(raw));
        break;
      }
      case "md": {
        if (!(this instanceof MarkdownBased)) {
          throw new Error(
            `Cannot parse markdown files without specify the model (${this}) to be markdown-based.`,
          );
        }
        break;
      }
      default:
        throw new Error(`Cannot parse model (${this}) from .${ext} files.`);
    }
    return model;
  }

  constructor(attributes?: object) {
    Object.assign(this, attributes);
  }
}
