import { checkBoxSelectors } from "../selectors/checkBox.selectors.js";
import { BasePage } from "./BasePage.js";

export class CheckBoxPage extends BasePage {
  async open() {
    await this.goto("checkbox");
  }

  get expandAllButton() {
    return this.page.locator(checkBoxSelectors.expandAllButton);
  }

  get homeCheckbox() {
    return this.page.locator(checkBoxSelectors.homeCheckbox);
  }

  get result() {
    return this.page.locator(checkBoxSelectors.result);
  }

  async openAndExpandTree() {
    await this.open();
    await this.expandAll();
  }

  async expandAll() {
    await this.expandAllButton.click();
  }

  async selectHome() {
    await this.homeCheckbox.click();
  }
}
