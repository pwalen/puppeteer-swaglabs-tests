import puppeteer, { Browser, Page } from 'puppeteer';

export class Builder {
  private browser!: Browser;
  public page!: Page;

  // Create browser and page
  static async build() {
    const builder = new Builder();
    builder.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    builder.page = await builder.browser.newPage();
    return builder;
  }
  // Close browser
  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async waitAndType(selector: string, text: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }

  async waitAndClick(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async goToURL(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.waitForSelector(selector);
    return await this.page.evaluate((el) => (el ? el.textContent : ''), text);
  }

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    return title;
  }
}
