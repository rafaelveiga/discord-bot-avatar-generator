import ejs from "ejs";
import { writeFileSync } from "fs";
import { join } from "path";
import puppeteer from "puppeteer";

export default class BaseAvatar {
  constructor(public avatarSlug: string, public avatarData: any) {
    this.avatarSlug = avatarSlug;
    this.avatarData = avatarData;
  }

  generateAvatarHtml(avatarData): Promise<void> {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        `./dist/avatars/ejs/${this.avatarSlug}.ejs`,
        avatarData,
        {},
        (err, str) => {
          if (err) reject(err);

          writeFileSync(`./dist/avatars/compiled/${this.avatarSlug}.html`, str);

          resolve();
        }
      );
    });
  }

  async renderImage() {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      //ignoreDefaultArgs: ['--disable-extensions'],
      defaultViewport: {
        width: 400,
        height: 400,
      },
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--font-render-hinting=none",
      ],
    });
    const page = await browser.newPage();
    await page.goto(
      join("file://", __dirname, `../avatars/compiled/${this.avatarSlug}.html`),
      {
        waitUntil: "networkidle0",
      }
    );

    await page.evaluate("document.fonts.ready");
    await page.screenshot({
      path: `./dist/avatars/generated/${this.avatarSlug}.png`,
    });

    await browser.close();
  }
}
