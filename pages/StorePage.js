const { log, assert } = require("console");
const MainNavigation = require("../utils/MainNavigation");
const Actions = require("../utils/actions");
const ProductPage = require("../pages/productPage");
const commonUtils = require("../utils/commonUtils");
const { expect } = require("@playwright/test");

class StorePage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
    this.productPage = new ProductPage(this.page);
    this.utils = new commonUtils(this.page);
  }
  static createStorePage(page) {
    return new StorePage(page);
  }

  async isMobileView() {
    const mainNav = new MainNavigation(this.page);
    return await mainNav.isSideNavPresent();
  }

  async filterByAvailabilityMobile() {
    // Click on Filter and sort option
    await this.actions.clickOnElementByText("Filter and sort");

    // Click on availability
    await this.actions.clickOnElementByRoleAndText("button", "Availability");

    // Click option (In stocks)
    await this.actions.clickOnSelector(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details.mobile-facets__details.js-filter.menu-opening > div > ul > li:nth-child(1) > label"
    );

    // navigate back
    await this.actions.clickOnSelector(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details.mobile-facets__details.js-filter.menu-opening > div > button"
    );
  }

  async outOfStockProducts() {
    await this.actions.clickOnElementByText("Availability");
    await this.actions.clickOnElementByText("In stock");
    await this.actions.clickOnElementByText("Out of stock");
    await this.page.keyboard.press("Escape");
  }

  async checkInStockAvailabilityDesktop() {
    await this.actions.clickOnElementByText("Availability");
    await this.actions.clickOnElementByText("In stock");
    await this.page.keyboard.press("Escape");
  }

  async sortByMobile() {
    await this.page.selectOption("#SortBy-mobile", "Price, low to high");
  }

  async applyFilters() {
    await this.actions.clickOnSelector(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > div.mobile-facets__footer > button"
    );
  }

  async sortByDesktop() {
    await this.page.selectOption("#SortBy", "Price, low to high");
    await this.utils.waitToLoad();
    await this.page.selectOption("#SortBy", "Price, high to low");
    await this.utils.waitToLoad();
    await this.page.selectOption("#SortBy", "Date, old to new");
    await this.utils.waitToLoad();
    await this.page.selectOption("#SortBy", "Alphabetically, Z-A");
    await this.utils.waitToLoad();
  }

  async selectFirstProduct() {
    await this.actions.clickOnSelector("#product-grid > li:nth-child(1) > div");
  }

  async checkForProductAvailability() {
    const addToCartButton = await this.utils.getByRoleAndName(
      "button",
      "Add to cart"
    );
    const isAddToCartEnabled = await this.utils.isElementEnabled(
      addToCartButton
    );
    expect(isAddToCartEnabled).toBeTruthy();

    const buyNowButton = await this.utils.getByRoleAndName(
      "button",
      "Buy it now"
    );
    const isBuyNowButtonEnabled = await this.utils.isElementEnabled(
      buyNowButton
    );
    expect(isBuyNowButtonEnabled).toBeTruthy();
  }

  async sortByPrice() {
    await this.actions.clickOnElementByText("Price");
    await this.actions.sendKeys("#Filter-Price-GTE", "0");
    await this.actions.sendKeys("#Filter-Price-LTE", "500");
    await this.actions.press("Escape");
  }
  async verifyProductsOutOfStock() {
    const soldOutButton = await this.utils.getByRoleAndName(
      "button",
      "Sold out"
    );
    const isSoldOutButtonEnabled = await this.utils.isElementEnabled(
      soldOutButton
    );
    expect(isSoldOutButtonEnabled).toBeFalsy();
  }

  async filterProducts() {
    const isMobile = await this.isMobileView();
    if (isMobile) {
      await this.filterByAvailabilityMobile();
      await this.sortByMobile();
      await this.applyFilters();
    } else {
      await this.checkInStockAvailabilityDesktop();
      await this.sortByDesktop();
      await this.sortByPrice();
    }
  }
  async checkInStockProducts() {
    await this.selectFirstProduct();
    await this.checkForProductAvailability();
  }
  async checkOutOfStockProducts() {
    await this.page.goBack();
    await this.outOfStockProducts();
    await this.selectFirstProduct();
    await this.verifyProductsOutOfStock();
  }
  async elements(i) {
    return `#FacetsWrapperDesktop > details:nth-child(5) > div li:nth-child(${i})`;
  }
  async filterBrands() {
    await this.page.goBack();
    await this.actions.clickOnElementByText("Brand");

    for (let i = 1; i <= 10; i++) {
      if (await this.utils.isElementEnabled(await this.elements(i))) {
        await this.actions.clickOnSelector(await this.elements(i));
      } else {
        log("Cant click on disabled option");
      }
    }

    await this.actions.press("Escape");
  }
}

module.exports = StorePage;

