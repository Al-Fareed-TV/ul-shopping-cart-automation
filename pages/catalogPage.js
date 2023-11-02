const Actions = require("../utils/actions")
class CatalogPage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
  }

  async searchProduct(productName) {
    await this.actions.clickOnSelector("#shopify-section-header > sticky-header > header > div > details-modal > details > summary > span > svg.modal__toggle-open.icon.icon-search");
    await this.actions.sendKeys("id=Search-In-Modal", productName)
  }

  async selectProduct() {
    await this.actions.clickOnSelector('li.predictive-search__list-item:first-child')
  }
}

module.exports = CatalogPage;
