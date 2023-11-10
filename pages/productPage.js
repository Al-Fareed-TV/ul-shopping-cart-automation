const { log } = require("console");
const Actions = require("../utils/actions");
const utils = require("../utils/commonUtils");
class ProductPage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
    this.utils = new utils(this.page);
  }
  static createProductPage(page) {
    return new ProductPage(page);
  }

  async isImageAvailable() {
    try {
      await this.utils.isElementVisible(
        "#shopify-section-template--15328405717213__main > section > div > div.grid__item.product__media-wrapper > slider-component > ul > li > modal-opener > div"
      );
      log('Image is avaialble');
      return true;
    } catch (error) {
      log("Image is not avaiable ");
      return false;
    }
  }

  async isAddToCartButtonClickable() {
    try {
      await this.utils.isElementClickable(
        "product-form__submit button button--full-width button--secondary"
      );
      log('add to cart button is clickable');
      return true;
    } catch (error) {
      log("Add to cart button is not clickable ");
      return false;
    }
  }

  async isBuyNowButtonClickable() {
    try {
       await this.utils.isElementClickable(
        "shopify-payment-button__button shopify-payment-button__button--unbranded"
      );
      log('Buy Now button is clickable.')
      return true;
    } catch (error) {
      log("Buy Now Button is not clickable..");
      return false;
    }
  }

  async addQty() {
    try {
      if (
        this.isImageAvailable() &&
        this.isAddToCartButtonClickable() &&
        this.isBuyNowButtonClickable()
      )
        this.actions.sendKeys("#Quantity-template--15328405717213__main", "2");
    } catch (error) {
      log("Failed to add Quatitiy");
    }
  }

  async addToCart() {
    this.actions.clickOnElementByText("Add to cart");
  }
  async waitForCountElementPresent() {
    await this.page.waitForSelector("#cart-icon-bubble > div");
  }
}

module.exports = ProductPage;
