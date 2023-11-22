const Actions = require("../utils/actions");
const fs = require('fs');
const yaml = require('js-yaml');
const MainNavigation = require("../utils/MainNavigation");
const data = yaml.load(fs.readFileSync('/Users/testvagrant/Documents/PlayWright-Automation/selectors/cartPageSelectors.yaml', 'utf8'));
class CartPage {
  constructor(page) {
    this.page = page;
    this.actions = Actions.createActionInstance(this.page);
  }

  async viewCart() {
    await this.actions.clickOnSelector((data['viewCart']));
  }

  async getNameOfItemInCart() {
    const selector = data['itemNameInCart'];
    const timeout = 10000;
    let nameOfItem = await this.page.waitForSelector(selector, { timeout });
    const text = await nameOfItem.textContent();
    return text;
  }

  async getNumberOfItemsInCart() {
    const inputElement = await this.page.$(data['numberOfItemsInCart']);

    const inputValue = await inputElement.inputValue();
    return inputValue;
  }
  async checkout() {
    await this.actions.clickOnElementById('checkout')
  }

  static createCartPage(page) {
    return new CartPage(page);
  }
}

module.exports = CartPage;
