class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  async searchProduct(productName) {
    await this.page.locator(
      "#shopify-section-header > sticky-header > header > div > details-modal > details > summary > span > svg.modal__toggle-open.icon.icon-search"
    ).click();
    await this.page.type("id=Search-In-Modal", productName);
  }

  async selectProduct() {
    await this.page.click("#predictive-search-option-1 > a");
  }
}

module.exports = CatalogPage;
