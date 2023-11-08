const { log } = require("console");
const MainNavigation = require("../utils/MainNavigation");
const Actions = require("../utils/actions");

class StorePage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
  }

  async isMobileView() {
    const mainNav = new MainNavigation(this.page);
    return await mainNav.isSideNavPresent();
  }

  async filterByAvailabilityMobile() {
    // Click on Filter and sort option
    await this.actions.clickOnElementByText("Filter and sort");

    // Click on availability
    await this.actions.clickOnSelector(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details:nth-child(1) > summary > div"
    );
    // await this.actions.clickOnElementByText("Availability");

    // Click option (In stocks)
    await this.actions.clickOnSelector(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details.mobile-facets__details.js-filter.menu-opening > div > ul > li:nth-child(1) > label"
    );

    // navigate back
    await this.actions.clickOnSelector(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details.mobile-facets__details.js-filter.menu-opening > div > button"
    );
  }

  async checkAvailabilityDesktop() {
    await this.actions.clickOnElementByText("Availability");
    await this.actions.clickOnSelector(
      "#FacetsWrapperDesktop > details:nth-child(2) > div > ul > li:nth-child(1) > label"
    );
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
  }
  async sortByPrice() {}

  async filterProducts() {
    const isMobile = await this.isMobileView();
    if (isMobile) {
      await this.filterByAvailabilityMobile();
      await this.sortByMobile();
      await this.applyFilters();
    } else {
      await this.checkAvailabilityDesktop();
      await this.sortByDesktop();
    }
  }
}

module.exports = StorePage;
