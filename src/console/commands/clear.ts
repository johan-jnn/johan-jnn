import { Os, OsCommand } from "../os.d";

export default new (class extends OsCommand {
  public invoker: string = "clear";
  public alias: string[] = ["cls"];
  public description: string = "Clear the console screen";

  public run(os: Os, invoker: string, ...args: string[]): number {
    console.clear();
    return 0;
  }
})();
