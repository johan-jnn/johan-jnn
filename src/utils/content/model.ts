import MarkdownIt from "markdown-it";
import markdownItYamlPlugin, {
  type Options as YamlPluginOptions,
} from "markdown-it-meta-yaml";
import fs, { type PathLike } from "node:fs";
import path from "node:path";
import { isMarkdownable } from "./markdownBased";

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
        const render = isMarkdownable(this);
        const parser = new MarkdownIt().use(markdownItYamlPlugin, {
          cb(yamlJSON) {
            Object.assign(model, yamlJSON);
          },
        } satisfies YamlPluginOptions);

        if (render) {
          Object.assign(model, {
            [this.MARKDOWN_KEY]: parser.render(raw),
          });
        } else {
          parser.parse(raw, {});
        }
        break;
      }
      default:
        throw new Error(`Cannot parse model (${this}) from .${ext} files.`);
    }

    model.loaded();
    return model;
  }
  public loaded() {}

  constructor(attributes?: object) {
    Object.assign(this, attributes);
  }
}
