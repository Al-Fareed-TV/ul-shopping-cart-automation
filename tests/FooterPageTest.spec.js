import { test, expect } from "@playwright/test";
const Footer = require("../layouts/Footer");
const commonUtils = require("../utils/commonUtils");
test("Test footer elements", async ({ page }) => {
  const footer = Footer.createFooterInstance(page);
  const utils = commonUtils.createUtils(page);

  await utils.navigateToHome();

  const isFooterPresent = await footer.isFooterPresent();
  expect(isFooterPresent).toBeTruthy();

  const isQuikLinkTextPresent = await footer.isQuickLinksPresent(
    "#shopify-section-footer > footer > div.footer__content-top.page-width > div.footer__blocks-wrapper.grid.grid--1-col.grid--2-col.grid--4-col-tablet > div.footer-block.grid__item.footer-block--menu > h2"
  );
  expect(isQuikLinkTextPresent).toBeTruthy();

  const isSearchLinkPresent = await footer.isSearchLinkPresent();
  expect(isSearchLinkPresent).toBeTruthy();

  const isSearchLinkClickable = await footer.isSearchLinkClickable();
  expect(isSearchLinkClickable).toBeTruthy();

  await footer.changeCountryRegion();

  await footer.subscribeToPage();
  const isSubscribed = await footer.confirmSubscription();
  isSubscribed !== null? expect(isSubscribed).toBeTruthy() : expect(isSubscribed).toBeFalsy();
});
// npx playwright test tests/FooterPageTest.spec.js
