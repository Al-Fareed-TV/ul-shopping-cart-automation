class homePage {
    constructor(page) {
        this.page = page;
    }
    get viewBtnForStore() {
        return this.page.locator('[href="/collections/all"] span')
    }
    static createInstance(page) {
        return new homePage(page);
    }
    async goToStorePage() {
        await this.viewBtnForStore.click()
    }
}
module.exports = { homePage }