import * as discord from "discord.js";

export default class Bot {
  private client: discord.Client;
  public botId: string = null;

  public start(): void {
    this.client = new discord.Client({
      intents: discord.Intents.FLAGS.GUILD_MESSAGES,
    });

    this.client.once("ready", () => {
      this.botId = this.client.user.id;
      console.log("> ------------------");
      console.log("> Bot ready!");
      console.log("> ------------------");
    });

    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
