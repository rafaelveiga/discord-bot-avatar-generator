import BaseCommand from "../structs/BaseCommand";
import { Message } from "discord.js";

export default class SimpleAvatar extends BaseCommand {
  public name: string = "SimpleAvatar";
  public description: string = "Sends a simple avatar image.";

  public isValid(message: string): boolean {
    return /^!avatar simple\b/g.test(message);
  }

  execute(message: Message): void {
    message.channel.send(`pong`);
  }
}
