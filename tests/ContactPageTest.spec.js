import { test, expect } from "@playwright/test";
const commonUtils = require("../utils/commonUtils");
const MainNavigation = require('../utils/MainNavigation');
const ContactPage = require('../pages/ContactPage');

test("Send message in Contact Page", async ({ page }) => {
  const utils = new commonUtils(page);
  const mainNav = new MainNavigation(page);
  const contactPage = new ContactPage(page);

  // await page.setViewportSize({ width: 800, height: 800 }); 
  await utils.navigateToHome();
  
  await mainNav.selectNav('contact');

  await expect(page).toHaveTitle(/Contact – ul-web-playground/);

  await contactPage.fillDetails();
  await contactPage.addComment();
  await contactPage.sendComment();

  await page.waitForTimeout(2000); 
});

// npx playwright test tests/ContactPageTest.spec.js --project=chromium --headed 