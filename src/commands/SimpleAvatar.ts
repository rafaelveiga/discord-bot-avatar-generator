import BaseCommand from "../structs/BaseCommand";
import { Message, MessageAttachment, MessagePayload } from "discord.js";
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

    message.reply({
      files: [
        {
          // TODO: Improve how we reach the image location
          attachment: "./dist/avatars/generated/SimpleAvatar.png",
        },
      ],
    });
  }
}
