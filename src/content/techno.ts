import { Collection } from "$src/utils/content/collection";
import { Model } from "$src/utils/content/model";
import { ContentPaths } from "$src/utils/content/path";

export class Techno extends Model {
  public id!: string;

  public _name!: string;
  public description!: string;
  public icon!: string;

  public color?: string;
  public used_since?: Date;
  public website?: string;

  get name() {
    return this._name;
  }
}

export const Technos = Collection.load(
  Techno,
  ContentPaths.root("technos"),
  "id",
);
