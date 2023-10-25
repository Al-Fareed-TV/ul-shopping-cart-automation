class PaymentPage{
    constructor(page){
        this.page = page;
    }
    async optCOD(){
        await page.waitForTimeout(2000);
        await this.page.click('id=basic-paymentOnDelivery');
    }
    async completeOrder(){
        await this.page.click('#pay-button-container > div > div > button');
    }
}
module.exports = PaymentPage;