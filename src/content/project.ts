import type Techno from "$src/components/svelte/cards/techno.svelte";
import { Collection } from "$src/utils/content/collection";
import type { MarkdownBased } from "$src/utils/content/mdBased";
import { Model } from "$src/utils/content/model";
import { ContentPaths } from "$src/utils/content/path";

export class ProjectOverview extends Model {
  public id!: string;

  public name!: string;
  public description!: string;
  public category!: string;
  public tags!: string[];
  public stack!: Techno[];
  public cover!: string;
  public slug!: string;

  public date?: Date;
}

export class Project extends ProjectOverview implements MarkdownBased {
  public presentation!: {
    title?: string; // If undefined -> take the project's name
    subtitle?: string; // If undefined -> take the project's description
  };

  public body!: string;

  public gallery?: string[];
  public related_projects?: ProjectOverview[];
}

export const Projects = Collection.load(
  Project,
  ContentPaths.root("projects"),
  "id",
);
