const Actions = require("../utils/actions");

class CartPage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
  }

  async viewCart() {
    await this.actions.clickOnSelector('#cart-icon-bubble > svg');
  }

  async getNameOfItemInCart() {
    const selector = "#CartItem-1 > td.cart-item__details > a";
    const timeout = 10000;
    let nameOfItem =  await this.page.waitForSelector(selector, { timeout });
    const text = await  nameOfItem.textContent();
    return text;
  }

  async getNumberOfItemsInCart() {
    const inputElement = await this.page.$("#Quantity-1");

    const inputValue = await inputElement.inputValue();
    return inputValue;
  }
  async checkout() {
    await this.actions.clickOnElementById('checkout')
  }
  static createCartPage(page){
   return new CartPage(page);
  }
}

module.exports = CartPage;
