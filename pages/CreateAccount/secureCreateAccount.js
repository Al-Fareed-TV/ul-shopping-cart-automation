class SecurePageForCreateAccount{
    constructor(page) {
        this.page = page;
    }
    static createInstance(page){
        return new SecurePageForCreateAccount(page)
    }
    get flashAlertForAccountDetailsPage(){
        return this.page.locator('#login')
    }
    get flashAlertForAddAccountdetailsPage(){
        return this.page.locator('.customer.register h1')
    }
    get flashAlertForCapchaPage(){
        return this.page.locator('.shopify-challenge__message')
    }
}

module.exports = { SecurePageForCreateAccount };