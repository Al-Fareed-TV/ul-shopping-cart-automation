const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const CatalogPage = require("../pages/CatalogPage");
const ProductPage = require("../pages/productPage");
const CartPage = require("../pages/cartPage");
const commonUtils = require("../utils/commonUtils");
const PaymentPage = require("../pages/PaymentPage");
const { log } = require("console");

test("Adding product to cart", async ({ page }) => {
  test.setTimeout(120000);
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const paymentPage = new PaymentPage(page);

  const utils = new commonUtils(page);

  await utils.navigateToHome();
  await loginPage.login();

  let pageTitle = await utils.getPageTitle();
  if (pageTitle === "Challenge – ul-web-playground") {
    await page.waitForTimeout(2000);
  }

  await utils.navigateToHome();
  await expect(page).toHaveTitle(/ul-web-playground/);

  await catalogPage.searchProduct("Jeans");
  await catalogPage.selectProduct();
  await expect(page).toHaveTitle(/Belted Jeans – ul-web-playground/);

  // let isImageAvail = await productPage.isImageAvailable();
  // expect(isImageAvail).toBeTruthy();
  // log("Is Image Available ", isImageAvail)
  
  // let isAddToCartButtonClickable = await productPage.isAddToCartButtonClickable();
  // expect(isAddToCartButtonClickable).toBeTruthy();
  // log('isAddToCartButtonClickable : ',isAddToCartButtonClickable)
  
  // let isBuyNoButtonClickable = await productPage.isBuyNowButtonClickable();
  // expect(isBuyNoButtonClickable).toBeTruthy();
  // log('isBuyNoButtonClickable : ',isBuyNoButtonClickable)

  await productPage.addQty();
  await productPage.addToCart();
  await productPage.waitForCountElementPresent();
  
  await cartPage.viewCart();
  // await page.waitForTimeout(1000);
  const nameOfItemInCart = await cartPage.getNameOfItemInCart();
  expect(nameOfItemInCart).toContain("Belted Jeans");
  const numberOfItemsInCart = await cartPage.getNumberOfItemsInCart();
  expect(numberOfItemsInCart).toBe("2");
  await cartPage.checkout();

  pageTitle = await utils.getPageTitle();
  if (pageTitle === "Checkout - ul-web-playground") {
    await paymentPage.optCOD();
    await paymentPage.completeOrder();
  }
  await page.waitForTimeout(2000);
  test.setTimeout(60000);

} );
// npx playwright test tests/AddProductToCart.spec.js --project=chromium --headed
