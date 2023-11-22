const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const CatalogPage = require("../pages/CatalogPage");
const ProductPage = require("../pages/productPage");
const CartPage = require("../pages/cartPage");
const commonUtils = require("../utils/commonUtils");
const PaymentPage = require("../pages/PaymentPage");
const MainNavigation = require("../utils/MainNavigation");


test("Adding product to cart",async ({ page })=> {
  test.setTimeout(60000);
  const catalogPage = CatalogPage.createCatalogPage(page);
  const productPage = ProductPage.createProductPage(page);
  const cartPage = CartPage.createCartPage(page);
  const paymentPage = PaymentPage.createPaymentPage(page);
  const utils = commonUtils.createUtils(page);
  const login = LoginPage.createLoginPage(page);

  await utils.navigateToHome();
  await login.loginUser();
  let pageTitle = await utils.getPageTitle();
  if (pageTitle === "Challenge – ul-web-playground") {
    await page.waitForTimeout(20000);
  }
  
  await utils.navigateToHome();
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

  pageTitle = await utils.getPageTitle();
  if (pageTitle === "Checkout - ul-web-playground") {
    await paymentPage.optCOD();
    await paymentPage.completeOrder();
  }
});
/*

npx playwright test tests/AddProductToCart.spec.js --project=chromium --headed

*/
