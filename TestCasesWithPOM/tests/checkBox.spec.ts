import { test, expect } from "@playwright/test";
import { CheckBoxPage } from "../pages/CheckBoxPage.js";

test("CheckBox: check Home", async ({ page }) => {
  const cb = new CheckBoxPage(page);

  await cb.goto("checkbox");
  await cb.expandAll();
  await cb.clickHome();

  await expect(page.locator("#result")).toContainText("home");
});
