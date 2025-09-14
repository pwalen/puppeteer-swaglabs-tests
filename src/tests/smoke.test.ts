import { expect } from 'chai';
import { Builder } from '../Builder';

describe('Smoke: Swag Labs loads', function () {
  this.timeout(30000);

  let builder: Builder;

  before(async () => {
    builder = await Builder.build();
  });

  after(async () => {
    await builder.close();
  });

  it('should open the homepage and have correct title', async () => {
    await builder.page.goto('https://www.saucedemo.com/');
    const title = await builder.page.title();
    expect(title).to.contain('Swag Labs');
  });
});
