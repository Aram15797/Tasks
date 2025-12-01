import { test, expect } from "@playwright/test";
import { ButtonsPage } from "../pages/ButtonsPage.js";

test("Buttons: double click", async ({ page }) => {
  const btn = new ButtonsPage(page);

  await btn.goto("buttons");
  await btn.doubleClick();

  await expect(page.locator(btn.doubleClickMsg)).toHaveText(
    "You have done a double click"
  );
});
