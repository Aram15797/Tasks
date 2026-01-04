import { buttonsSelectors } from "../selectors/buttons.selectors.js";
import { BasePage } from "./BasePage.js";

export class ButtonsPage extends BasePage {
  async open() {
    await this.goto("buttons");
  }

  get doubleClickButton() {
    return this.page.locator(buttonsSelectors.doubleClickButton);
  }

  get doubleClickMessage() {
    return this.page.locator(buttonsSelectors.doubleClickMessage);
  }

  async doubleClick() {
    await this.doubleClickButton.dblclick();
  }
}
