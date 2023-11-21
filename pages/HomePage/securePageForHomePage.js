class securePageForHomePage {
    constructor(page) {
        this.page = page;
    }
    static createInstance(page) {
        return new securePageForHomePage(page);
    }
    get flashAlertForHomePage() {
        return this.page.locator('.collection-hero__title')
    }
}
module.exports = { securePageForHomePage }