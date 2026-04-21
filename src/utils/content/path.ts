import path_utils from "node:path";

export function getContentPath(path: string) {
  return path_utils.join(import.meta.dirname, "../../data/content", path);
}
