const { log } = require("console");
const MainNavigation = require("../utils/MainNavigation");

class StorePage {
  constructor(page) {
    this.page = page;
  }
  async isMobileView() {
    const mainNav = new MainNavigation(this.page);
    return await mainNav.isSideNavPresent();
  }

  async checkAvailability() {
    await this.page.click(
      "#FacetsWrapperDesktop > details:nth-child(2) > summary > div > span"
    );
    await this.page.click(
      "#FacetsWrapperDesktop > details:nth-child(2) > div > ul > li:nth-child(1) > label"
    );
  }

  async sortBy() {
    if (await this.isMobileView()) {
      await this.page.selectOption("#SortBy-mobile", "Price, low to high");
    } else {
      await this.page.selectOption("#SortBy", "Price, low to high");
    }
  }

  async filterByAvailability() {
    //click on Filter and sort option
    await this.page.click(
      "#main-collection-filters > div > menu-drawer > details > summary > span.mobile-facets__open "
    );

    //click on avaialability
    await this.page.click(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details:nth-child(1) > summary > div"
    );

    //click on option in stocks
    await this.page.click(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details.mobile-facets__details.js-filter.menu-opening > div > ul > li:nth-child(1) > label"
    );

    //back button
    await this.page.click(
      "#FacetFiltersFormMobile > div > div.mobile-facets__main > details.mobile-facets__details.js-filter.menu-opening > div > button"
    );
  }
  async filterProducts() {
    if (await this.isMobileView()) {
      log("Mobile View = ", await this.isMobileView());
      await this.filterByAvailability();
      await this.sortBy();
      await this.page.click(
        "#FacetFiltersFormMobile > div > div.mobile-facets__main > div.mobile-facets__footer > button"
      );
    } else {
      log("Mobile View = ", await this.isMobileView());
      await this.checkAvailability();
      await this.sortBy();
    }
  }
}
module.exports = StorePage;
