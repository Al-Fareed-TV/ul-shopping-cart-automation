const Actions = require("../utils/actions")
class CatalogPage {
  constructor(page) {
    this.page = page;
    this.actions = Actions.createActionInstance(this.page);
  }

  async searchProduct(productName) {
    await this.actions.clickOnElementByRoleAndText("button","Search");
    await this.actions.sendKeysByPlaceholder("Search", productName)
  }

  async selectProduct() {
    await this.actions.clickOnSelector('li.predictive-search__list-item:first-child')
  }
  static createCatalogPage(page) {
    return new CatalogPage(page);
  }
}

module.exports = CatalogPage;
