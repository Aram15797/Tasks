import { textBoxSelectors } from "../selectors/textBox.selectors.js";
import { BasePage } from "./BasePage.js";

type TextBoxFormData = {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
};

export class TextBoxPage extends BasePage {
  async open() {
    await this.goto("text-box");
  }

  get fullNameInput() {
    return this.page.locator(textBoxSelectors.fullNameInput);
  }

  get emailInput() {
    return this.page.locator(textBoxSelectors.emailInput);
  }

  get currentAddressInput() {
    return this.page.locator(textBoxSelectors.currentAddressInput);
  }

  get permanentAddressInput() {
    return this.page.locator(textBoxSelectors.permanentAddressInput);
  }

  get submitButton() {
    return this.page.locator(textBoxSelectors.submitButton);
  }

  get nameOutput() {
    return this.page.locator(textBoxSelectors.nameOutput);
  }

  get emailOutput() {
    return this.page.locator(textBoxSelectors.emailOutput);
  }

  async fillForm(formData: TextBoxFormData) {
    await this.fullNameInput.fill(formData.fullName);
    await this.emailInput.fill(formData.email);
    await this.currentAddressInput.fill(formData.currentAddress);
    await this.permanentAddressInput.fill(formData.permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }
}
