import { BasePage } from "./BasePage.js";

export class WebTablesPage extends BasePage {
  addBtn = '#addNewRecordButton';
  firstName = '#firstName';
  lastName = '#lastName';
  email = '#userEmail';
  age = '#age';
  salary = '#salary';
  department = '#department';
  submitBtn = '#submit';

  async addUser() {
    await this.page.click(this.addBtn);
    await this.page.fill(this.firstName, "John");
    await this.page.fill(this.lastName, "Doe");
    await this.page.fill(this.email, "john@doe.com");
    await this.page.fill(this.age, "30");
    await this.page.fill(this.salary, "5000");
    await this.page.fill(this.department, "QA");
    await this.page.click(this.submitBtn);
  }
}
