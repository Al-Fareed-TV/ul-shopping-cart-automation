const { log } = require("console");
const { retries } = require("../playwright.config");

class commonUtils {
  constructor(page) {
    this.page = page;
  }
  static createUtils(page) {
    return new commonUtils(page);
  }
  async navigateTo(url) {
    await this.page.goto(url);
  }
  async getPageTitle() {
    await this.waitToLoad();
    const pageTitle = await this.page.title();
    return pageTitle;
  }

  async navigateToHome() {
    await this.page.goto("https://web-playground.ultralesson.com/", {
      fullScreen: true,
    });
  }
  async isElementVisibleBySelector(selector) {
    const elementHandle = await this.page.isVisible(selector);
    if (elementHandle) return true;
    return false;
  }
  async isElementVisible(element){
    return await element.isVisible();
  }

  async isElementClickable(selector) {
    try {
      await this.page.click(selector);
      return true;
    } catch (error) {
      return false;
    }
  }
  async isElementEnabled(element) {
    return await element.isEnabled();
  }

  async getByRoleAndName(role, text) {
    return await this.page.getByRole(role, { name: text });
  }

  async isElementPresent(selector) {
    const element = await this.page.$(selector);
    return element !== null ? element : false;
  }
  async waitToLoad() {
    await this.page.waitForTimeout(1500);
  }

  async getText(selector) {
    const text = await this.page.$eval(
      selector,
      (element) => element.textContent
    );
    return text;
  }

  async isHeaderAndFooterPresent() {
    const isHeaderPresent = await this.isElementPresent(
      ".header header--middle-left page-width header--has-menu"
    );
    const isFooterPresent = await this.isElementPresent(
      ".footer__content-top page-width"
    );
    return isHeaderPresent && isFooterPresent;
  }
}
module.exports = commonUtils;
