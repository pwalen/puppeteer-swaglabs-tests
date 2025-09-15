import { Builder } from '../../Builder';
import { INVENTORY_LOCATORS as I } from '../locators';

export class InventoryPage {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  async getInventoryPageURL(): Promise<string> {
    const url = await this.builder.getPageURL();
    return url;
  }

  async isInventoryListVisible(): Promise<boolean> {
    const inventoryList = await this.builder.isElementVisible(I.LIST);
    return inventoryList;
  }
}
