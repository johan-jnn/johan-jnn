import { Os, OsCommand } from "../os.d";

export default new (class extends OsCommand {
  public invoker: string = "help";
  public alias: string[] = ["man"];
  public description: string = "Get help about the os or some commands";

  public run(os: Os, invoker: string, ...args: string[]): number {
    const help_on_commands = args
      .map((find) => {
        return (
          os.commands.find(
            (command) =>
              command.invoker === find || command.alias.includes(find),
          ) ?? console.warn(`Command ${find} not present.`)
        );
      })
      .filter((c): c is OsCommand => !!c);

    if (!help_on_commands.length) {
      if (invoker === this.invoker) {
        console.log(os.presentation);
      }

      console.log("Available commands :");
      console.log(
        os.commands
          .map((command) => `${command.invoker}: ${command.description}`)
          .join("\n"),
      );
      console.log("Commands usage:");
      console.log("- <command>");
      console.log("- <command> ('arg1', 'arg2', ...)");
      console.log("Exemple: `help ('clear')`");

      return 0;
    }

    for (const command of help_on_commands) {
      console.log(`--- ${command.invoker} ---`);
      console.log(`Alias: ${command.alias.join(", ")}`);
      console.log(`> ${command.description}`);
      if (command.man) {
        console.log("Details: ");
        command.man(os);
      }
    }
    return 0;
  }
})();
