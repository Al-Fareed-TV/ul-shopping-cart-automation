const Actions = require("../utils/actions")
class PaymentPage {
    constructor(page) {
        this.page = page;
        this.actions = Actions.createActionInstance(this.page)
    }
    async optCOD() {
        await this.actions.clickOnElementByText("Cash on Delivery (COD)")
    }
    async completeOrder() {
        await this.actions.clickOnElementByText("Complete order")
    }
    static createPaymentPage(page) {
        return new PaymentPage(page);
    }
}
module.exports = PaymentPage;