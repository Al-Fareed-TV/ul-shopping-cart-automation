class Actions {
  constructor(page) {
    this.page = page;
  }

  async clickOnSelector(selector) {
    await this.page.click(selector);
  }
  async clickOnElementById(id) {
    await this.page.click(`id=${id}`);
  }

  async clickOnElementByText(text) {
    await this.page.click(`text=${text}`);
  }
  async sendKeys(selector, keys) {
    await this.page.fill(selector, keys);
  }
  async press(key){
    await this.page.keyboard.press(key);
  }
  async pressByPlaceholder(placeholder,key){
    await this.page.getByPlaceholder("Email").press("Enter");
    await this.page.getByPlaceholder(placeholder).press(key);
  }
  async sendKeysByPlaceholder(placeholder, keys) {
    await this.page.getByPlaceholder(placeholder).fill(keys);
  }
}

module.exports = Actions;
