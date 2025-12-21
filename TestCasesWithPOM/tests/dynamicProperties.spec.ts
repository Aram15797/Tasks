import { test, expect } from "@playwright/test";
import { DynamicPropertiesPage } from "../pages/DynamicPropertiesPage.js";

test.describe("Dynamic Properties Tests", () => {
  test("Dynamic Properties: Button becomes enabled after 5 seconds", async ({ page }) => {
    const dynamicPage = new DynamicPropertiesPage(page);
    
    await dynamicPage.goto("dynamic-properties");
    
    const isInitiallyEnabled = await dynamicPage.isButtonEnabled();
    expect(isInitiallyEnabled).toBe(false);
    
    await dynamicPage.waitForButtonToBeEnabled();
    
    const isEnabledAfterWait = await dynamicPage.isButtonEnabled();
    expect(isEnabledAfterWait).toBe(true);
    
    await page.click('#enableAfter');
  });

  test("Dynamic Properties: Button appears after 5 seconds", async ({ page }) => {
    const dynamicPage = new DynamicPropertiesPage(page);
    
    await dynamicPage.goto("dynamic-properties");
    
    const isInitiallyVisible = await page.locator('#visibleAfter').isVisible();
    expect(isInitiallyVisible).toBe(false);
    
    await dynamicPage.waitForButtonToBeVisible();
    
    const isVisibleAfterWait = await page.locator('#visibleAfter').isVisible();
    expect(isVisibleAfterWait).toBe(true);
    
    await page.click('#visibleAfter');
  });

  test("Dynamic Properties: Button changes color", async ({ page }) => {
    const dynamicPage = new DynamicPropertiesPage(page);
    
    await dynamicPage.goto("dynamic-properties");
    
    const initialColor = await dynamicPage.getButtonColor();
    
    await page.waitForFunction(() => {
      const btn = document.querySelector('#colorChange');
      if (!btn) return false;
      const color = window.getComputedStyle(btn).color;
      return color !== 'rgb(255, 255, 255)'; 
    }, { timeout: 10000 });
    
    const finalColor = await dynamicPage.getButtonColor();
    
    expect(finalColor).not.toBe(initialColor);
  });
});