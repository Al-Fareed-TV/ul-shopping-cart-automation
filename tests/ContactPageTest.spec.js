import { test, expect } from "@playwright/test";

const commonUtils = require("../utils/commonUtils");
const MainNavigation = require('../utils/MainNavigation');
const ContactPage = require('../pages/ContactPage');

test("Send message in Contact Page", async ({ page }) => {
  const utils = commonUtils.createUtils(page);
  const mainNav = MainNavigation.createMainNav(page);
  const contactPage = ContactPage.createContactPage(page);

  await utils.navigateToHome();
  await mainNav.goToContactPage();

  await expect(page).toHaveTitle(/Contact – ul-web-playground/);

  await contactPage.fillDetails();
  await contactPage.addComment();
  await contactPage.sendComment();

  await page.waitForTimeout(2000);
});

// npx playwright test tests/ContactPageTest.spec.js --project=chromium --headed 