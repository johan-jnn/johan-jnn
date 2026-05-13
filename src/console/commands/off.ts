import { Os, OsCommand } from "../os.d";

export default new (class extends OsCommand {
  public invoker: string = "off";
  public description: string = "Turn off the os";

  public run(os: Os, invoker: string, ...args: string[]): number {
    os.stop();
    return 0;
  }
})();
