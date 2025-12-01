import { BasePage } from "./BasePage.js";

export class CheckBoxPage extends BasePage {
  expandAllBtn = 'button[aria-label="Expand all"]';
  homeCheckbox = 'label[for="tree-node-home"] span.rct-checkbox';

  async expandAll() {
    await this.page.click(this.expandAllBtn);
  }

  async clickHome() {
    await this.page.click(this.homeCheckbox);
  }
}
