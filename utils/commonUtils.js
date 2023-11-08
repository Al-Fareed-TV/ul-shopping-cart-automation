class commonUtils {
  constructor(page) {
    this.page = page;
  }
  async navigateTo(url) {
    await this.page.goto(url, { fullScreen: true });
  }
  async getPageTitle() {
    return await this.page.title();
  }
  async navigateToHome() {
    await this.page.goto("https://web-playground.ultralesson.com/", {
      fullScreen: true,
    });
  }
  async isElementVisible(selector) {
    const elementHandle = await this.page.isVisible(selector);
    if (elementHandle) {
      console.log("Element found..!");
      return true;
    } else {
      console.log("Element not found..!");
      return false;
    }
  }
  async isElementClickable(selector){
    try {
      await this.page.click(selector);
      return true;
    } catch (error) {
      return false;
    }
  }

  async isElementPresent(selector) {
    const element = await this.page.$(selector);
    return element !== null ? element : false;
  }

  async getText(selector){
    const text = await this.page.$eval(selector, element => element.textContent);
    return text;
  }

  async isHeaderAndFooterPresent(){
    const isHeaderPresent = await this.isElementPresent('.header header--middle-left page-width header--has-menu');
    const isFooterPresent = await this.isElementPresent('.footer__content-top page-width');
    return isHeaderPresent && isFooterPresent;
  }
}
module.exports = commonUtils;
