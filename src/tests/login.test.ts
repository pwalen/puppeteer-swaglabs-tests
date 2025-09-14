import { step } from 'mocha-steps';
import { expect } from 'chai';

import { LoginPage } from '../pages/public/LoginPage';
import { Builder } from '../Builder';

describe('Login path - incorrect credentials', function () {
  this.timeout(30000);

  let builder: Builder;
  let loginpage: LoginPage;

  before(async () => {
    builder = await Builder.build();
    loginpage = new LoginPage(builder);
  });

  after(async () => {
    await builder.close();
  });

  step('Should open the home page', async () => {
    await loginpage.open();
  });

  step('Should have correct title', async () => {
    const title = await loginpage.getPageTitle();
    expect(title).to.contain('Swag Labs');
  });

  step('Should enter and submmit incorrect credentials', async () => {
    await loginpage.login('wrong_username', 'wrong_password');
  });

  step('Should have correct error message', async () => {
    const errorMessage = await loginpage.getErrorText('[data-test="error"]');
    expect(errorMessage).to.contain('Username and password do not match');
  });
});
