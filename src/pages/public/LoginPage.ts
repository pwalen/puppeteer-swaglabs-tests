import { Builder } from '../../Builder';
import { LOGIN_LOCATORS as L } from '../locators';
import { URLS } from '../urls';

export class LoginPage {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  async open(): Promise<void> {
    await this.builder.goToURL(URLS.URL_LOGIN_PAGE);
  }

  async getPageTitle(): Promise<string> {
    const title = await this.builder.getPageTitle();
    return title;
  }

  async login(username: string, password: string): Promise<void> {
    await this.builder.waitAndType(L.USERNAME, username);
    await this.builder.waitAndType(L.PASSWORD, password);
    await this.builder.waitAndClick(L.SUBMIT);
  }
  async getErrorText(): Promise<string> {
    const errorText = await this.builder.getText(L.ERROR);
    return errorText;
  }
}
