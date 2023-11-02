const Actions = require("../utils/actions")
class ProductPage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
  }
  
  async addQty() {
    this.actions.sendKeys("#Quantity-template--15328405717213__main", "2")
  }
  
  async addToCart() {
    this.actions.clickOnElementByText("Add to cart");
  }
  async waitForCountElementPresent() {
    await this.page.waitForSelector("#cart-icon-bubble > div", {
      state: "attached",
    });
  }
}

module.exports = ProductPage;
