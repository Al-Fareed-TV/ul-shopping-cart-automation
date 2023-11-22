const { test, expect } = require('@playwright/test')
const testData = require('../data/data.json');
const { homePage } = require('../pages/HomePage/homePage')
const { securePageForHomePage } = require('../pages/HomePage/securePageForHomePage')
const { StorePage } = require('../pages/StorePage/storePage')
const { SecurePageForStorePage } = require('../pages/StorePage/securePageForStorePage')



test.beforeEach('Should go to store page', async ({ page }) => {
    const HomePage = homePage.createInstance(page)
    const SecurePageForHomePage = securePageForHomePage.createInstance(page)

    await page.goto(testData.pageUrl)
    await expect(page).toHaveTitle(testData.Title)

    await HomePage.goToStorePage()
    const getTextForHomePageToStorePage = await SecurePageForHomePage.flashAlertForHomePage.textContent();
    expect(await getTextForHomePageToStorePage.includes(testData.expectedTextForStorePage)).toBeTruthy()
})
test('should filter price based on brand', async ({ page }) => {

    const storePage = StorePage.createInstance(page)
    const securePageForStorePage = SecurePageForStorePage.createInstance(page, testData)

    await storePage.filterProductAccordingToBrand(testData.brandName)
    await securePageForStorePage.isFilteredAccordingToBrandNameOrNot(testData.brandName)
});

test('should filter product according to price range', async ({ page }) => {

    const storePage = StorePage.createInstance(page)
    const securePageForStorePage = SecurePageForStorePage.createInstance(page, testData)

    await storePage.addPriceRange(testData.priceFrom, testData.priceTo)
    await securePageForStorePage.isFilteredAccordingToPriceRangeOrNot()

});

test('should filter product according to product types', async ({ page }) => {
    const storePage = StorePage.createInstance(page)
    const securePageForStorePage = SecurePageForStorePage.createInstance(page, testData)

    await storePage.filterProductAccordingToProductType(testData.productTypes)
    await securePageForStorePage.isFilteredAccordingToProductTypeOrNot(testData.productTypes)

});

test('should filter product according to product size', async ({ page }) => {

    const storePage = StorePage.createInstance(page)
    const securePageForStorePage = SecurePageForStorePage.createInstance(page, testData)

    await storePage.filterProductAccordingToSize(testData.size)
    await securePageForStorePage.isFilteredAccordingToSizeOrNot(testData.size)

})
