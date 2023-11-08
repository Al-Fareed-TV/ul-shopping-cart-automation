const { test, expect } = require("@playwright/test");
const commonUtils = require("../utils/commonUtils");
const MainNavigation = require("../utils/MainNavigation");
const StorePage = require("../pages/StorePage");

test("Select a product", async ({ page }) => {
  const utils = new commonUtils(page);
  const mainNav = new MainNavigation(page);
  const storePage = new StorePage(page);

  await utils.navigateToHome();

  await mainNav.selectNav("store");

  await storePage.filterProducts();

  await page.waitForTimeout(2500);
  
});
// npx playwright test tests/StorePageTest.spec.js --project=chromium --headed 