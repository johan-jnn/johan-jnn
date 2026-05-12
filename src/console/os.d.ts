export abstract class Os {
  public abstract readonly version: string;
  public abstract readonly name: string;
  public abstract readonly presentation: string;
  public abstract readonly commands: OsCommand[];
  public abstract readonly files: string[];
  protected status: "active" | "inactive" | "paused" = "inactive";
  public abstract boot(): any;
  public abstract stop(): any;

  get working() {
    return this.status === "active";
  }
}

export abstract class OsCommand {
  public abstract readonly invoker: string;
  public abstract readonly description: string;
  public readonly alias: string[] = [];
  public readonly man(os: Os): number {
    console.log(this.description);
    return 0;
  };
  public abstract run(os: Os, invoker: string, ...args: string[]): number;
}
