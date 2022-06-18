import * as discord from "discord.js";
import commands from "./commands";

export default class Bot {
  private client: discord.Client;

  public start(): void {
    this.client = new discord.Client({
      intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    });

    this.client.once("ready", () => {
      console.log("> Bot ready!");
    });

    this.client.on("messageCreate", (message: discord.Message) => {
      commands.forEach((CommandClass) => {
        const commandInstance = new CommandClass();

        if (commandInstance.isValid(message.content)) {
          commandInstance.execute(message);
        }
      });
    });

    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
