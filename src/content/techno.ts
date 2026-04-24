import { Collection } from "$src/utils/content/collection";
import { Model } from "$src/utils/content/model";
import { ContentPaths } from "$src/utils/content/path";

export class Techno extends Model {
  declare id: string;

  declare name: string;
  declare description: string;
  declare icon: string;

  declare color?: string;
  declare used_since?: Date;
  declare website?: string;
}

export const Technos = Collection.load(
  Techno,
  ContentPaths.root("technos/*.json"),
  "id",
);
