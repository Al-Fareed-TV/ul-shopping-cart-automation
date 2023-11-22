import { test, expect } from "@playwright/test";
const commonUtils = require("../utils/commonUtils");
const MainNavigation = require("../utils/MainNavigation");
const LoginPage = require("../pages/loginPage");

test("User LogIn", async ({ page }) => {
  const login = LoginPage.createLoginPage(page);
  const utils = commonUtils.createUtils(page);
  await utils.navigateToHome();
  await login.loginUser();
});
//npx playwright  test tests/LoginPageTest.spec.js
