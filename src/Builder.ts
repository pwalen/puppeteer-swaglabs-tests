import puppeteer, { Browser, Page } from 'puppeteer';

export class Builder {
  private browser!: Browser;
  public page!: Page;

  // Create browser and page
  static async build() {
    const builder = new Builder();
    builder.browser = await puppeteer.launch({
      headless: 'new',
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
}
