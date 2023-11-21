const getCredentials = require('../data/config.json')
const Actions = require('../utils/actions')
class ContactPage {
    constructor(page) {
        this.page = page;
        this.actions = Actions.createActionInstance(this.page);
    }
    async fillDetails() {
        await this.actions.sendKeys('id=ContactForm-name', getCredentials.name);
        await this.actions.sendKeys('id=ContactForm-email', getCredentials.email);
        await this.actions.sendKeys('id=ContactForm-phone', getCredentials.phone);
    }
    async addComment() {
        let comment = "Hi there, this message is to test check";
        await this.actions.sendKeys('id=ContactForm-body', comment)
    }
    async sendComment() {
        await this.actions.clickOnElementByText('Send');
    }
    static createContactPage(page) {
        return new ContactPage(page);
    }
}
module.exports = ContactPage;
