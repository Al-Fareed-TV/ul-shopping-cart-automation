const { test, expect } = require("@playwright/test");
const commonUtils = require("../utils/commonUtils");
const MainNavigation = require("../utils/MainNavigation");
const StorePage = require("../pages/StorePage");

test("Select a product", async ({ page }) => {
  test.setTimeout(120000);
  const utils = commonUtils.createUtils(page);
  const mainNav = MainNavigation.createMainNav(page);
  const storePage = StorePage.createStorePage(page);

  await utils.navigateToHome();

  await mainNav.selectNav("store");

  await storePage.filterProducts();

  await storePage.checkInStockProducts();
  await storePage.checkOutOfStockProducts();

  await storePage.verifyProductsOutOfStock();
  await storePage.filterBrands();

  await page.waitForTimeout(2000);
  
});
// npx playwright test tests/StorePageTest.spec.js --project=chromium --headed 