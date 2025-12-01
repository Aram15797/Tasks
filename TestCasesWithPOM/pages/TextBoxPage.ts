import { BasePage } from "./BasePage.js";

export class TextBoxPage extends BasePage {
  fullName = '#userName';
  email = '#userEmail';
  currentAddress = '#currentAddress';
  permanentAddress = '#permanentAddress';
  submitBtn = '#submit';

  async fillForm(name: string, email: string) {
    await this.page.fill(this.fullName, name);
    await this.page.fill(this.email, email);
    await this.page.fill(this.currentAddress, "Some address");
    await this.page.fill(this.permanentAddress, "Another address");
  }

  async submit() {
    await this.page.click(this.submitBtn);
  }
}
