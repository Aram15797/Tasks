import { dynamicPropertiesSelectors } from "../selectors/dynamicProperties.selectors.js";
import { BasePage } from "./BasePage.js";

export class DynamicPropertiesPage extends BasePage {
  async open() {
    await this.goto("dynamic-properties");
  }

  get enableAfterButton() {
    return this.page.locator(dynamicPropertiesSelectors.enableAfterButton);
  }

  get colorChangeButton() {
    return this.page.locator(dynamicPropertiesSelectors.colorChangeButton);
  }

  get visibleAfterButton() {
    return this.page.locator(dynamicPropertiesSelectors.visibleAfterButton);
  }

  async waitForEnableAfterEnabled(timeout = 10000) {
    await this.enableAfterButton.waitFor({ state: "attached", timeout });
    await this.page.waitForFunction(
      selector => {
        const button = document.querySelector<HTMLButtonElement>(selector);
        return !!button && !button.disabled;
      },
      dynamicPropertiesSelectors.enableAfterButton,
      { timeout },
    );
  }

  async waitForVisibleAfterButton(timeout = 10000) {
    await this.visibleAfterButton.waitFor({ state: "visible", timeout });
  }

  async waitForColorChange(initialColor: string, timeout = 10000) {
    await this.colorChangeButton.waitFor({ state: "visible", timeout });
    await this.page.waitForFunction(
      ({ selector, color }) => {
        const button = document.querySelector<HTMLElement>(selector);
        if (!button) return false;
        return window.getComputedStyle(button).color !== color;
      },
      {
        selector: dynamicPropertiesSelectors.colorChangeButton,
        color: initialColor,
      },
      { timeout },
    );
  }

  async getColorChangeButtonColor(): Promise<string> {
    return this.colorChangeButton.evaluate(button => {
      return window.getComputedStyle(button).color;
    });
  }

  async isEnableAfterEnabled(): Promise<boolean> {
    return this.enableAfterButton.isEnabled({ timeout: 0 });
  }

  async isVisibleAfterVisible(): Promise<boolean> {
    return this.visibleAfterButton.isVisible({ timeout: 0 });
  }

  async clickEnableAfterButton() {
    await this.enableAfterButton.click();
  }

  async clickVisibleAfterButton() {
    await this.visibleAfterButton.click();
  }
}
