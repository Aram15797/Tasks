import { BasePage } from "./BasePage.js";

export class DynamicPropertiesPage extends BasePage {
  enableAfterBtn = '#enableAfter';
  colorChangeBtn = '#colorChange';
  visibleAfterBtn = '#visibleAfter';
  willEnable5Seconds = '#enableAfter';
  
  async waitForButtonToBeEnabled() {
    await this.page.waitForSelector('#enableAfter:not([disabled])', { timeout: 10000 });
  }

  async waitForButtonToBeVisible() {
    await this.page.waitForSelector('#visibleAfter', { timeout: 10000 });
  }

  async getButtonColor(): Promise<string> {
    return await this.page.locator(this.colorChangeBtn).evaluate(el => {
      return window.getComputedStyle(el).color;
    });
  }

  async isButtonEnabled(): Promise<boolean> {
    return await this.page.locator(this.willEnable5Seconds).isEnabled();
  }
}