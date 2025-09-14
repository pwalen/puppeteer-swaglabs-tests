import { Builder } from '../../Builder';

export class LoginPage {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  async open(): Promise<void> {
    await this.builder.goToURL('https://www.saucedemo.com/');
  }

  async getPageTitle(): Promise<string> {
    const title = await this.builder.getPageTitle();
    return title;
  }

  async login(username: string, password: string): Promise<void> {
    await this.builder.waitAndType('#user-name', username);
    await this.builder.waitAndType('#password', password);
    await this.builder.waitAndClick('#login-button');
  }
  async getErrorText(selector: string): Promise<string> {
    const errorText = await this.builder.getText(selector);
    return errorText;
  }
}
