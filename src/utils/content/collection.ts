import type { ModelableContent } from "./model";

export class ModelableContentCollection<
  Model extends object,
  ModelContent extends ModelableContent<Model> = ModelableContent<Model>,
  IndexableKeys extends keyof Model = {
    [K in keyof Model]: Model[K] extends string ? K : never;
  }[keyof Model],
> {
  private readonly map: Map<Model[keyof Model], ModelContent>;

  constructor(contents: ModelContent[], index_by: IndexableKeys) {
    this.map = new Map();

    for (const content of contents) {
      this.map.set(content.props[index_by], content);
    }
  }

  public get(index: Model[IndexableKeys]) {
    this.map.get(index);
  }
}
