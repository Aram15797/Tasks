import { BasePage } from "./BasePage.js";

export class ButtonsPage extends BasePage {
  doubleClickBtn = '#doubleClickBtn';
  doubleClickMsg = '#doubleClickMessage';

  async doubleClick() {
    await this.page.dblclick(this.doubleClickBtn);
  }
}
