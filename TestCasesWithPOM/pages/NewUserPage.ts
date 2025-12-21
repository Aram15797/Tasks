import { BasePage } from "./BasePage.js";

export class RegistrationPage extends BasePage {
  addUserBtn = '#addNewRecordButton';

  firstNameInput = '#firstName';
  lastNameInput = '#lastName';
  emailInput = '#userEmail';
  ageInput = '#age';
  salaryInput = '#salary';
  departmentInput = '#department';
  submitBtn = '#submit';

  resultRows = '.rt-tr-group';

  async goto(path: string) {
    await this.page.goto(`https://demoqa.com/${path}`);
    await this.page.waitForSelector(this.addUserBtn, { state: 'visible', timeout: 10000 });
  }

  async openAddUserModal() {
    await this.page.click(this.addUserBtn);
    await this.page.waitForSelector(this.firstNameInput, { state: 'visible', timeout: 5000 });
  }

  async fillRegistrationForm(userData: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
  }) {
    await this.page.fill(this.firstNameInput, userData.firstName);
    await this.page.fill(this.lastNameInput, userData.lastName);
    await this.page.fill(this.emailInput, userData.email);
    await this.page.fill(this.ageInput, userData.age);
    await this.page.fill(this.salaryInput, userData.salary);
    await this.page.fill(this.departmentInput, userData.department);
  }

  async submitForm() {
    await this.page.click(this.submitBtn);
    await this.page.waitForSelector(this.firstNameInput, { state: 'detached', timeout: 5000 });
  }

  async getUserRowData(userEmail: string) {
    const emailCell = this.page.locator(`.rt-td:has-text("${userEmail}")`);
    if (await emailCell.count() === 0) return null;

    const row = emailCell.locator('xpath=ancestor::div[contains(@class, "rt-tr-group")]');
    const cells = row.locator('.rt-td');

    return {
      firstName: await cells.nth(0).textContent() || '',
      lastName: await cells.nth(1).textContent() || '',
      age: await cells.nth(2).textContent() || '',
      email: await cells.nth(3).textContent() || '',
      salary: await cells.nth(4).textContent() || '',
      department: await cells.nth(5).textContent() || ''
    };
  }

  async deleteUser(email: string) {
    const deleteBtn = this.page.locator(`.rt-td:has-text("${email}")`)
      .locator('xpath=following-sibling::div[contains(@class, "rt-td")]//span[@title="Delete"]');
    await deleteBtn.waitFor({ state: 'visible', timeout: 5000 });
    await deleteBtn.click();
  }

  async editUser(email: string) {
    const editBtn = this.page.locator(`.rt-td:has-text("${email}")`)
      .locator('xpath=following-sibling::div[contains(@class, "rt-td")]//span[@title="Edit"]');
    await editBtn.waitFor({ state: 'visible', timeout: 5000 });
    await editBtn.click();
    await this.page.waitForSelector(this.firstNameInput, { state: 'visible', timeout: 5000 });
  }

  async getUsersCount(): Promise<number> {
    return await this.page.locator(this.resultRows).count();
  }

  async searchUser(searchTerm: string) {
    await this.page.fill('#searchBox', searchTerm);
  }

  async isUserVisible(email: string): Promise<boolean> {
    const userRow = this.page.locator(`.rt-td:has-text("${email}")`);
    return await userRow.isVisible();
  }
}
