class CreateAccount {
    constructor(page) {
        this.page = page;
    }

    static createInstance(page) {
        return new CreateAccount(page);
    }

    get accountButton() {
        return this.page.locator('.small-hide svg');
    }

    get createAccountButton() {
        return this.page.getByRole('link', { name: 'Create account' });
    }

    get firstNameField() {
        return this.page.getByPlaceholder('First Name');
    }

    get lastNameField() {
        return this.page.getByPlaceholder('Last Name');
    }

    get emailField() {
        return this.page.locator('[name="customer[email]"]');
    }

    get passwordField() {
        return this.page.getByPlaceholder('Password');
    }

    get createButton() {
        return this.page.getByRole('button', { name: 'Create' });
    }

    async goToAccountPage() {
        await this.accountButton.click();
    }

    async goToAddAccountDetailsPage() {
        await this.createAccountButton.click();
    }

    async addAccountDetails(firstName, lastName, email, password) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.createButton.click();
    }
}

module.exports = { CreateAccount };
