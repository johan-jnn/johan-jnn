export abstract class Os {
  public abstract readonly version: string;
  public abstract readonly name: string;
  public abstract readonly presentation: string;
  public abstract readonly commands: OsCommand[];
  public abstract readonly files: string[];
  public abstract boot(): any;
}

export abstract class OsCommand {
  public abstract readonly invoker: string;
  public abstract readonly description: string;
  public readonly alias: string[] = [];
  public readonly man?(os: Os): number;
  public abstract run(os: Os, invoker: string, ...args: string[]): number;
}
