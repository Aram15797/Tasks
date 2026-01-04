import { radioButtonSelectors } from "../selectors/radioButton.selectors.js";
import { BasePage } from "./BasePage.js";

export class RadioButtonPage extends BasePage {
  async open() {
    await this.goto("radio-button");
  }

  get yesOption() {
    return this.page.locator(radioButtonSelectors.yesOption);
  }

  get resultText() {
    return this.page.locator(radioButtonSelectors.resultText);
  }

  async selectYes() {
    await this.yesOption.click();
  }
}
