import { default as path } from "node:path";

export class ContentPaths {
  // static #root = path.join(import.meta.dirname, "../../data/content");
  static #root = path.join("./src/data/content");

  static root(...append: string[]) {
    return path.join(ContentPaths.#root, ...append);
  }
  static pages(...append: string[]) {
    return this.root("pages", ...append);
  }
}
