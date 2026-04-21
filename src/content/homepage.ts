import type { Homepage } from "$src/types/pages/home";
import { ModelableContent } from "$src/utils/content/model";
import { getContentPath } from "$src/utils/content/path";

export class HomepageModel extends ModelableContent<Homepage> {}

export const HOMEPAGE: HomepageModel = HomepageModel.loadFromFile(
  getContentPath("pages/home.json"),
);
