const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const CatalogPage = require("../pages/CatalogPage");
const ProductPage = require("../pages/productPage");
const CartPage = require("../pages/cartPage");
const commonUtils = require("../utils/commonUtils");
const PaymentPage = require("../pages/PaymentPage");

test("Adding product to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const paymentPage = new PaymentPage();

  const utils = new commonUtils(page);

  await utils.navigateTo("https://web-playground.ultralesson.com/");
  await loginPage.login();

  await utils.navigateTo("https://web-playground.ultralesson.com/");
  await expect(page).toHaveTitle(/ul-web-playground/);

  await catalogPage.searchProduct("Jeans");
  await catalogPage.selectProduct();
  await expect(page).toHaveTitle(/Belted Jeans – ul-web-playground/);

  await productPage.addQty();
  await productPage.addToCart();
  await productPage.waitForCountElementPresent();

  await cartPage.viewCart();
  const nameOfItemInCart = await cartPage.getNameOfItemInCart();
  expect(nameOfItemInCart).toContain("Belted Jeans");
  const numberOfItemsInCart = await cartPage.getNumberOfItemsInCart();
  expect(numberOfItemsInCart).toBe("2");
  await cartPage.checkout();

  const pageTitle = await utils.getPageTitle();
  if (pageTitle === "Checkout - ul-web-playground") {
    await paymentPage.optCOD();
    await paymentPage.completeOrder();
  }
  await page.waitForTimeout(2000);
});
// npx playwright test tests/AddProductToCart.spec.js --project=chromium --headed
