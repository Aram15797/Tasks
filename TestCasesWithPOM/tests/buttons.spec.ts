import { test, expect } from "../fixtures/baseTest.js";
import { ButtonsPage } from "../pages/ButtonsPage.js";
import { getButtonsTexts } from "../utils/storageData.js";

test("Buttons: double click", async ({ page }) => {
  const btn = new ButtonsPage(page);

  await btn.open();
  const buttonsTexts = await getButtonsTexts(page);

  await btn.doubleClick();

  await expect(btn.doubleClickMessage).toHaveText(buttonsTexts.doubleClickMessage);
});
