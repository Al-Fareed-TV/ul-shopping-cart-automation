const getCredentials = require("../data/config.json");
const MainNavigation = require("../utils/MainNavigation");
const Actions = require("../utils/actions")

class LoginPage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(this.page);
    this.mainNav = new MainNavigation(this.page);
  }

  async login() {
    await this.mainNav.selectNav("login");
    
    await this.actions.sendKeys("#CustomerEmail", getCredentials.email)
    await this.actions.sendKeys("#CustomerPassword", getCredentials.password);

    await this.actions.clickOnElementByText("Sign in")
    await this.page.waitForTimeout(2000);
  }

  async isLoggedIn() {
    const pageTitle = await page.title();
    return pageTitle;
  }
  static createLoginPage(page) {
    return new LoginPage(page);
  }
}

module.exports = LoginPage;
