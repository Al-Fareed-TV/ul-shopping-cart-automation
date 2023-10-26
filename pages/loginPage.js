const getCredentials = require("../data/config.json");
const MainNavigation = require("../utils/MainNavigation");
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login() {
    const mainNav = new MainNavigation(this.page);
    mainNav.selectNav("login");
    await this.page.type("#CustomerEmail", getCredentials.email);
    await this.page.type("#CustomerPassword", getCredentials.password);

    await this.page.click("#customer_login > button");
    await this.page.waitForTimeout(2000);
  }

  async isLoggedIn() {
    const pageTitle = await page.title();
    return pageTitle;
  }
}

module.exports = LoginPage;
