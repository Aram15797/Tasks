import type { UserFormData } from "../data/users.js";
import { RegistrationPage } from "./NewUserPage.js";

export class WebTablesPage extends RegistrationPage {
  async addUser(userData: UserFormData) {
    await this.openAddUserModal();
    await this.fillRegistrationForm(userData);
    await this.submitForm();
  }
}
