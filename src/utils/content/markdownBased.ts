interface Markdownable {
  MARKDOWN_KEY: string;
}

export function MarkdownBased<Super extends new (...args: any[]) => any>(
  sup: Super,
): Super {
  return class extends sup implements Markdownable {
    public static readonly MARKDOWN_KEY: string = "body";
  };
}
export function isMarkdownable<Super extends new (...args: any[]) => any>(
  object: Super,
): object is Super & Markdownable {
  return "MARKDOWN_KEY" in object;
}
