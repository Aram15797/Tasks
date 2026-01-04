import { newUserSelectors } from "../selectors/newUser.selectors.js";
import type { UserFormData } from "../data/users.js";
import { BasePage } from "./BasePage.js";

export class RegistrationPage extends BasePage {
  async open() {
    await this.goto("webtables");
    await this.addUserButton.waitFor({ state: "visible", timeout: 10000 });
  }

  get addUserButton() {
    return this.page.locator(newUserSelectors.addUserButton);
  }

  get firstNameInput() {
    return this.page.locator(newUserSelectors.firstNameInput);
  }

  get lastNameInput() {
    return this.page.locator(newUserSelectors.lastNameInput);
  }

  get emailInput() {
    return this.page.locator(newUserSelectors.emailInput);
  }

  get ageInput() {
    return this.page.locator(newUserSelectors.ageInput);
  }

  get salaryInput() {
    return this.page.locator(newUserSelectors.salaryInput);
  }

  get departmentInput() {
    return this.page.locator(newUserSelectors.departmentInput);
  }

  get submitButton() {
    return this.page.locator(newUserSelectors.submitButton);
  }

  get searchInput() {
    return this.page.locator(newUserSelectors.searchInput);
  }

  get tableRows() {
    return this.page.locator(newUserSelectors.tableRow);
  }

  get tableCells() {
    return this.page.locator(newUserSelectors.tableCell);
  }

  userRow(email: string) {
    return this.tableRows.filter({ hasText: email });
  }

  async openAddUserModal() {
    await this.addUserButton.click();
    await this.firstNameInput.waitFor({ state: "visible", timeout: 5000 });
  }

  async fillRegistrationForm(userData: UserFormData) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.emailInput.fill(userData.email);
    await this.ageInput.fill(userData.age);
    await this.salaryInput.fill(userData.salary);
    await this.departmentInput.fill(userData.department);
  }

  async submitForm() {
    await this.submitButton.click();
    await this.firstNameInput.waitFor({ state: "detached", timeout: 5000 });
  }

  async getUserRowData(userEmail: string) {
    const row = this.userRow(userEmail);
    if (await row.count() === 0) return null;

    const cells = row.locator(newUserSelectors.tableCell);

    return {
      firstName: (await cells.nth(0).textContent()) ?? "",
      lastName: (await cells.nth(1).textContent()) ?? "",
      age: (await cells.nth(2).textContent()) ?? "",
      email: (await cells.nth(3).textContent()) ?? "",
      salary: (await cells.nth(4).textContent()) ?? "",
      department: (await cells.nth(5).textContent()) ?? "",
    };
  }

  async deleteUser(email: string) {
    const row = this.userRow(email);
    if (await row.count() === 0) return;
    await row.locator(newUserSelectors.deleteUserButton).click();
  }

  async editUser(email: string) {
    const row = this.userRow(email);
    if (await row.count() === 0) return;
    await row.locator(newUserSelectors.editUserButton).click();
    await this.firstNameInput.waitFor({ state: "visible", timeout: 5000 });
  }

  async updateUser(userData: UserFormData) {
    await this.fillRegistrationForm(userData);
    await this.submitForm();
  }

  async getUsersCount(): Promise<number> {
    return this.tableRows.count();
  }

  async searchUser(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }
}
