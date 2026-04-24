import type Techno from "$src/components/svelte/cards/techno.svelte";
import { Collection } from "$src/utils/content/collection";
import { MarkdownBased } from "$src/utils/content/markdownBased";
import { Model } from "$src/utils/content/model";
import { ContentPaths } from "$src/utils/content/path";

export class ProjectCategory extends Model {
  public id!: string;
  public title!: string;
  public description?: string;
}

export const ProjectCategories = Collection.load(
  ProjectCategory,
  ContentPaths.root("projects/categories/*.json"),
  "id",
);

export class ProjectOverview extends Model {
  declare id: string;

  declare name: string;
  declare description: string;
  declare category: ProjectCategory;
  declare tags: string[];
  declare stack: Techno[];
  declare cover: string;
  declare slug: string;

  declare date?: Date;

  public loaded(): void {
    if ("overview" in this) {
      Object.assign(this, this.overview);
      delete this.overview;
    }
    if (typeof this.category === "string") {
      this.category = ProjectCategories.findOrFail(this.category);
    }
  }
  public fetch(): Project {
    return Projects.findOrFail(this.id);
  }
}

export const ProjectsInfo = Collection.load(
  ProjectOverview,
  ContentPaths.root("projects/list/*.md"),
  "id",
);

export class Project extends MarkdownBased(ProjectOverview) {
  declare presentation: {
    title?: string; // If undefined -> take the project's name
    subtitle?: string; // If undefined -> take the project's description
  };

  declare body: string;

  declare gallery?: string[];
  declare related_projects?: ProjectOverview[];
}

export const Projects = Collection.load(
  Project,
  ContentPaths.root("projects/list/*.md"),
  "id",
);
