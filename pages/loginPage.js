const getCredentials = require("../data/config.json");
const MainNavigation = require("../utils/MainNavigation");
const Actions = require("../utils/actions")

class LoginPage {
  constructor(page) {
    this.page = page;
    this.actions = Actions.createActionInstance(this.page);
    this.mainNav = MainNavigation.createMainNav(this.page);
  }

  async login() {
    await this.mainNav.selectNav("login");

    await this.actions.typeKeys("#CustomerEmail", getCredentials.email);
    await this.actions.typeKeys("#CustomerPassword", getCredentials.password);

    await this.actions.clickOnElementByText("Sign in")
  }

  async isLoggedIn() {
    const pageTitle = await this.page.title();
    return pageTitle;
  }
  static createLoginPage(page) {
    return new LoginPage(page);
  }
}

module.exports = LoginPage;
