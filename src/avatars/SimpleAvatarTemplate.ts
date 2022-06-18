import BaseAvatar from "../structs/BaseAvatar";

export default class SimpleAvatarTemplate extends BaseAvatar {
  constructor(public avatarData: SimpleAvatarTemplateData) {
    super("SimpleAvatar", avatarData);
  }

  async compile() {
    await this.generateAvatarHtml(this.avatarData);
    await this.renderImage();
  }
}

export interface SimpleAvatarTemplateData {
  username: string;
}
