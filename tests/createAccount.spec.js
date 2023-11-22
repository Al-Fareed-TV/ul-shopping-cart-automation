const { test, expect } = require('@playwright/test')
const testData = JSON.parse(JSON.stringify(require('../data/data.json')));
const { CreateAccount } = require('../pages/CreateAccount/createAccount')
const { SecurePageForCreateAccount } = require('../pages/CreateAccount/secureCreateAccount')

test('should create an account', async ({ page }) => {

    const createAccount = CreateAccount.createInstance(page);
    const secureCreateAccountPage = SecurePageForCreateAccount.createInstance(page);

    await page.goto(testData.pageUrl)
    await expect(page).toHaveTitle(testData.Title)

    await createAccount.goToAccountPage()
    const getAlertTextForLoginPage = await secureCreateAccountPage.flashAlertForAccountDetailsPage.textContent()
    expect(await getAlertTextForLoginPage.includes(testData.expectedTextForLoginPage)).toBeTruthy()

    await createAccount.goToAddAccountDetailsPage()
    const getAlertTextForCreateAccountPage = await secureCreateAccountPage.flashAlertForAddAccountdetailsPage.textContent()
    expect(await getAlertTextForCreateAccountPage.includes(testData.expectedTextForCreateAccountPage)).toBeTruthy()

    await createAccount.addAccountDetails(testData.firstName, testData.lastName, testData.email, testData.password)
    const getAlertTextForCapchaPage = await secureCreateAccountPage.flashAlertForCapchaPage.textContent()
    expect(await getAlertTextForCapchaPage.includes(testData.expectedTextForCapchaPage)).toBeTruthy()
})
/**
 * npx playwright test tests/createAccount.spec.js
 */