import { test, expect } from "@playwright/test";
import { RadioButtonPage } from "../pages/RadioButtonPage.js";

test("RadioButton: select Yes", async ({ page }) => {
  const rb = new RadioButtonPage(page);

  await rb.goto("radio-button");
  await rb.selectYes();

  await expect(page.locator(".text-success")).toHaveText("Yes");
});
