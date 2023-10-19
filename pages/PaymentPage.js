class PaymentPage{
    constructor(page){
        this.page = page;
    }
    async optCOD(){
        await this.page.click('#basic-paymentOnDelivery');
    }
    async completeOrder(){
        await this.page.click('#pay-button-container > div > div > button');
    }
}
module.exports = PaymentPage;