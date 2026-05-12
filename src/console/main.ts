import { Os, OsCommand } from "./os.d";

export const WebsiteOs = new (class extends Os {
  public name: string = "JohanJANIN-OS";
  public version: string = "0.0.1";
  public presentation: string = "A small os running in the browser's console";
  public files: string[] = [];
  public commands: OsCommand[] = [];

  boot() {
    console.time(this.name);
    console.info(`Initializing OS: ${this.name}@${this.version}`);

    console.info(`Loading OS' commands...`);
    const commands: Record<string, { default: OsCommand }> = import.meta.glob(
      "./*.ts",
      {
        base: "./commands",
        eager: true,
      },
    );

    console.info(`Registering ${Object.keys(commands).length} commands...`);
    for (const source in commands) {
      const { default: command } = commands[source];

      if (!(command instanceof OsCommand)) {
        console.error(`Unable to load command from ${source}.`);
        continue;
      }

      const os = this;
      [command.invoker, ...command.alias].forEach((invoker) => {
        if (invoker in window) {
          console.error(
            `Cannot register command (or alias) '${invoker}' (from ${source}) because it has already been defined.`,
          );
          return;
        }

        Object.defineProperty(window, invoker, {
          get() {
            let command_args: string[] = [];

            // We use setTimeout to take the last version of command_args
            setTimeout(() => {
              console.group(`$: ${invoker} ${command_args.join(" ")}`);
              command.run(os, invoker, ...command_args);
              console.groupEnd();
            });

            const _ = {
              [invoker]: (...args: string[]) => {
                command_args = args.map((v) => v.toString());
                return _[invoker];
              },
            };
            Object.assign(_[invoker], { command });

            return _[invoker];
          },
          configurable: false,
        });
      });

      this.commands.push(command);

      console.info(
        `Command ${command.invoker} (and ${command.alias.length} alias) fully registered.`,
      );
    }
    console.info("All commands has been registered.");

    console.info("OS fully loaded.");
  }
})();
