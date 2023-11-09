const { log } = require("console");
const commonUtils = require("../utils/commonUtils");
const Actions = require("../utils/actions");
class Footer {
  constructor(page) {
    this.page = page;
    this.utils = new commonUtils(page);
    this.actions = new Actions(page);
  }
  async isFooterPresent() {
    return await this.utils.isElementPresent(
      "#shopify-section-footer > footer"
    );
  }

  async isQuickLinksPresent(selector) {
    return (await this.utils.getText(selector)) !== null ? true : false;
  }

  async isSearchLinkPresent() {
    return await this.utils.isElementPresent(
      "#shopify-section-footer > footer > div.footer__content-top.page-width > div.footer__blocks-wrapper.grid.grid--1-col.grid--2-col.grid--4-col-tablet > div.footer-block.grid__item.footer-block--menu > ul > li > a"
    );
  }
  async isSearchLinkClickable() {
    return await this.utils.isElementClickable(
      "#shopify-section-footer > footer > div.footer__content-top.page-width > div.footer__blocks-wrapper.grid.grid--1-col.grid--2-col.grid--4-col-tablet > div.footer-block.grid__item.footer-block--menu > ul > li > a"
    );
  }
  async subscribeToPage() {
    await this.actions.sendKeysByPlaceholder("Email", "roshan@testvagrant.com");
    const navigationPromise = this.page.waitForNavigation();
    await this.actions.pressByPlaceholder("Email","Enter");
    await navigationPromise;
  }
  async confirmSubscription() {
    if ((await this.page.title()) === "Challenge – ul-web-playground") {
      log("page title - ", await this.page.title());
      return null;
    }
    log("page title - +", await this.page.title());
    return true;
  }

  async changeCountryRegion() {
    const ulElement = await this.page.$("id=FooterCountryList");

    if (ulElement) {
      for (let i = 1; i <= 5 ; i++) {
        await this.actions.clickOnSelector("#FooterCountryForm > div > div > button");
        
        await this.page.waitForTimeout(1000);
        
        await this.actions.clickOnSelector(`#FooterCountryList > li:nth-child(${i})`);
        
        await this.page.waitForLoadState("load");
      }
    } else {
      console.log("UL element not found.");
    }
  }
}
module.exports = Footer;
