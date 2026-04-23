import { Model } from "$src/utils/content/model";
import { ContentPaths } from "$src/utils/content/path";
import { Technos } from "../techno";

export class HomepageModel extends Model {
  public hero!: {
    localistation: string;
    titles: { lines: string[] }[];
    description: string;
    ctas: { label: string; url: string; target?: string }[];
  };

  public sections!: {
    technos: {
      section: {
        title: string;
        subtitle?: string;
        important: boolean;
      };
      technos: string[];
    };
    projects: {
      section: {
        title: string;
        important: boolean;
        subtitle?: string;
      };
    };
  };

  get promoted_technos() {
    return Technos.filter((pk) => this.sections.technos.technos.includes(pk));
  }
}

export const Homepage: HomepageModel = HomepageModel.loadSync(
  ContentPaths.pages("home.json"),
);
