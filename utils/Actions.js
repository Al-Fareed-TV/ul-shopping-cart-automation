class Actions {
  constructor(page) {
    this.page = page;
  }
  static createActionInstance(page) {
    return new Actions(page);
  }

  async clickOnSelector(selector) {
    await this.page.click(selector);
  }

  async clickOnElementByRoleAndText(role, text) {
    await this.page.getByRole(role, { name: text }).click();
  }

  async clickOnElement(element) {
    await element.click();
  }

  async clickOnElementById(id) {
    await this.page.click(`id=${id}`);
  }

  async clickOnElementByText(text) {
    await this.page.getByText(text).click();
  }

  async sendKeys(selector, keys) {
    await this.page.fill(selector, keys);
  }

  async typeKeys(locator, keys) {
    await this.page.locator(locator).pressSequentially(keys, { delay: 150 });
  }

  async press(key) {
    await this.page.keyboard.press(key);
  }

  async pressByPlaceholder(placeholder, key) {
    await this.page.getByPlaceholder(placeholder).press(key);
  }

  async sendKeysByPlaceholder(placeholder, keys) {
    await this.page.getByPlaceholder(placeholder).fill(keys);
  }

  async clickOnElementWhichHasText(locator, text) {
    await this.page.locator(locator).getByText(text).click();
  }
}

module.exports = Actions;