import { test, expect } from "../fixtures/baseTest.js";
import { DynamicPropertiesPage } from "../pages/DynamicPropertiesPage.js";
import { getDynamicPropertiesData } from "../utils/storageData.js";

test.describe("Dynamic Properties Tests", () => {
  test("Dynamic Properties: Button becomes enabled after 5 seconds", async ({ page }) => {
    const dynamicPage = new DynamicPropertiesPage(page);
    
    await test.step("Step 1: Open page", async () => {
      await dynamicPage.open();
    });

    await test.step("Step 2: Wait for enable state change", async () => {
      await expect(dynamicPage.enableAfterButton).toBeDisabled();
      await dynamicPage.waitForEnableAfterEnabled();
      await expect(dynamicPage.enableAfterButton).toBeEnabled();
    });

    await test.step("Step 3: Click enabled button", async () => {
      await dynamicPage.clickEnableAfterButton();
    });
  });

  test("Dynamic Properties: Button appears after 5 seconds", async ({ page }) => {
    const dynamicPage = new DynamicPropertiesPage(page);
    
    await test.step("Step 1: Open page", async () => {
      await dynamicPage.open();
    });

    await test.step("Step 2: Wait for button visibility", async () => {
      await expect(dynamicPage.visibleAfterButton).toBeHidden();
      await dynamicPage.waitForVisibleAfterButton();
      await expect(dynamicPage.visibleAfterButton).toBeVisible();
    });

    await test.step("Step 3: Click visible button", async () => {
      await dynamicPage.clickVisibleAfterButton();
    });
  });

  test("Dynamic Properties: Button changes color", async ({ page }) => {
    const dynamicPage = new DynamicPropertiesPage(page);
    
    await test.step("Step 1: Open page", async () => {
      await dynamicPage.open();
    });

    await test.step("Step 2: Wait for color change", async () => {
      const initialColor = await dynamicPage.getColorChangeButtonColor();
      await dynamicPage.waitForColorChange(initialColor);
    });

    await test.step("Step 3: Verify final color", async () => {
      const dynamicPropertiesData = await getDynamicPropertiesData(page);
      await expect(dynamicPage.colorChangeButton).toHaveCSS("color", dynamicPropertiesData.finalTextColor);
    });
  });
});
