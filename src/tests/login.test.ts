import { step } from 'mocha-steps';
import { expect } from 'chai';

import { Builder } from '../Builder';
import { LoginPage } from '../pages/public/LoginPage';
import { InventoryPage } from '../pages/secure/InventoryPage';

describe('Login path - incorrect credentials', function () {
  this.timeout(30000);

  let builder: Builder;
  let loginPage: LoginPage;

  before(async () => {
    builder = await Builder.build();
    loginPage = new LoginPage(builder);
  });

  after(async () => {
    await builder.close();
  });

  step('Should open the home page', async () => {
    await loginPage.open();
  });

  step('Should have correct title', async () => {
    const title = await loginPage.getPageTitle();
    expect(title).to.contain('Swag Labs');
  });

  step('Should enter and submmit incorrect credentials', async () => {
    await loginPage.login('wrong_username', 'wrong_password');
  });

  step('Should have correct error message', async () => {
    const errorMessage = await loginPage.getErrorText('[data-test="error"]');
    expect(errorMessage).to.contain('Username and password do not match');
  });
});

describe('Login path - correct credentials', function () {
  this.timeout(30000);

  let builder: Builder;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  before(async () => {
    builder = await Builder.build();
    loginPage = new LoginPage(builder);
    inventoryPage = new InventoryPage(builder);
  });

  after(async () => {
    await builder.close();
  });

  step('Should open the Home page', async () => {
    await loginPage.open();
  });

  step('Should page have correct title', async () => {
    const title = await loginPage.getPageTitle();
    expect(title).to.contain('Swag Labs');
  });

  step('Should enter and submmit correct credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  step('Should open the Inventory page', async () => {
    const url = await inventoryPage.getInventoryPageURL();
    expect(url).is.equal('https://www.saucedemo.com/inventory.html');
  });

  step('Should contain inventory list', async () => {
    const inventoryList = await inventoryPage.isInventoryListVisible(
      '[data-test="inventory-list"]'
    );
    expect(inventoryList).to.be.true;
  });
});
