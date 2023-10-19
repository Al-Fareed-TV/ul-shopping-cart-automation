class commonUtils {
  constructor(page) {
    this.page = page;
  }
  async navigateTo(url) {
    await this.page.goto(url, { fullScreen: true });
  }
  async getPageTitle(){
    return await this.page.title();
  }
  async isElementPresent(selector) {
    const elementHandle = await this.page.isVisible(selector);
    if (elementHandle) {
        console.log("Element found..!");
        return true;
    } else {
        console.log("Element not found..!");
      return false;
    }
  }
}
module.exports = commonUtils;
