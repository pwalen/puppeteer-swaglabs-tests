import { Builder } from '../../Builder';

export class InventoryPage {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  async getInventoryPageURL(): Promise<string> {
    const url = await this.builder.getPageURL();
    return url;
  }

  async isInventoryListVisible(selector: string): Promise<boolean> {
    const inventoryList = await this.builder.isElementVisible(selector);
    return inventoryList;
  }
}
