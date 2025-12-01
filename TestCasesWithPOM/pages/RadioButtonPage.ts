import { BasePage } from "./BasePage.js";

export class RadioButtonPage extends BasePage {
  yesRadio = 'label[for="yesRadio"]';

  async selectYes() {
    await this.page.click(this.yesRadio);
  }
}
