import BaseCommand from "../structs/BaseCommand";
import { Message } from "discord.js";
import SimpleAvatarTemplate from "../avatars/SimpleAvatarTemplate";

export default class SimpleAvatar extends BaseCommand {
  public name: string = "SimpleAvatar";
  public description: string = "Sends a simple avatar image.";

  public isValid(message: string): boolean {
    return /^!avatar simple\b/g.test(message);
  }

  async execute(message: Message): Promise<void> {
    console.log(message.author);
    const avatar = new SimpleAvatarTemplate({
      username: message.author.username,
    });

    await avatar.compile();

    message.author.username;
    message.channel.send(`pong`);
  }
}
