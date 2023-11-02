const Actions = require("../utils/actions")
class PaymentPage{
    constructor(page){
        this.page = page;
        this.actions = new Actions(this.page)
    }
    async optCOD(){
        await this.actions.clickOnElementByText("Cash on Delivery (COD)")
    }
    async completeOrder(){
        await this.actions.clickOnElementByText("Complete order")
    }
}
module.exports = PaymentPage;