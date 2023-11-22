const { utils } = require("wd");
const commonUtils = require("./commonUtils");
const Actions = require("../utils/actions");

class MainNavigation {
  constructor(page) {
    this.page = page;
    this.utils = commonUtils.createUtils(this.page);
    this.actions = Actions.createActionInstance(this.page);
    this.menuElement = null;
  }
  static createMainNav(page) {
    return new MainNavigation(page);
  }

  async isSideNavPresent() {
    if (!this.menuElement) {
      this.menuElement = await this.page.getByLabel("Menu");
    }
    return this.utils.isElementVisible(this.menuElement);
  }
  async isMobileView(){
    return this.isSideNavPresent();
  }
  async clickOnMenuButton() {
    if(this.menuElement)
    await this.actions.clickOnElement(this.menuElement);
  }

  async goToHomePage() {
    if (this.isMobileView()) await this.clickOnMenuButton();
    await this.actions.clickOnElementByRoleAndText("link", "Home");
  }
  async goToContactPage() {
    if (await this.isMobileView()) {
      console.log("await this.isSideNavPresent()",await this.isSideNavPresent());
      await this.clickOnMenuButton();
    }
    await this.actions.clickOnElementByRoleAndText("link", "Contact");
  }
  async goToStorePage() {
    if (this.isMobileView()) await this.clickOnMenuButton();
    await this.actions.clickOnElementByRoleAndText("link", "Store");
  }
  async goToLoginPage() {
    if (this.isSideNavPresent()) await this.clickOnMenuButton();
    // await this.actions.clickOnElementByRoleAndText("link", "Log in");
    await this.actions.clickOnSelector("#shopify-section-header > sticky-header > header > div > a.header__icon.header__icon--account.link.focus-inset.small-hide > svg > path");

  }
  async goToCartPage() {
    await this.actions.clickOnElementByRoleAndText("link", "Cart");
  }
}
module.exports = MainNavigation;
