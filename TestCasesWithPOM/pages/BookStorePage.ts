import { bookStoreSelectors } from "../selectors/bookStore.selectors.js";
import { BasePage } from "./BasePage.js";

type Credentials = {
  username: string;
  password: string;
};

export class BookStorePage extends BasePage {
  async open() {
    await this.goto("books");
  }

  get loginButton() {
    return this.page.locator(bookStoreSelectors.loginButton);
  }

  get usernameInput() {
    return this.page.locator(bookStoreSelectors.usernameInput);
  }

  get passwordInput() {
    return this.page.locator(bookStoreSelectors.passwordInput);
  }

  get loginSubmitButton() {
    return this.page.locator(bookStoreSelectors.loginSubmit);
  }

  get searchInput() {
    return this.page.locator(bookStoreSelectors.searchInput);
  }

  get addToCollectionButton() {
    return this.page.locator(bookStoreSelectors.addToCollectionButton);
  }

  get profileMenu() {
    return this.page.locator(bookStoreSelectors.profileMenu);
  }

  get confirmDeleteButton() {
    return this.page.locator(bookStoreSelectors.confirmDeleteButton);
  }

  get bookRows() {
    return this.page.locator(bookStoreSelectors.bookRows);
  }

  bookLink(title: string) {
    return this.page.locator(bookStoreSelectors.bookLink(title));
  }

  bookRow(title: string) {
    return this.page.locator(bookStoreSelectors.bookRow(title));
  }

  async login(credentials: Credentials) {
    await this.loginButton.click();
    await this.usernameInput.waitFor({ state: "visible", timeout: 5000 });
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginSubmitButton.click();
  }

  async searchBook(bookTitle: string) {
    await this.searchInput.fill(bookTitle);
  }

  async openBookDetails(bookTitle: string) {
    await this.bookLink(bookTitle).click();
  }

  async addBookToCollection() {
    await this.page.once("dialog", dialog => dialog.accept());
    await this.addToCollectionButton.click();
  }

  async goToProfile() {
    await this.profileMenu.click();
  }

  async deleteBookFromCollection(bookTitle: string) {
    const row = this.bookRow(bookTitle);
    if (await row.count() === 0) return;
    await this.page.once("dialog", dialog => dialog.accept());
    await row.locator(bookStoreSelectors.deleteBookButton).click();
    await this.confirmDeleteButton.click();
  }

  async isBookInProfile(bookTitle: string) {
    const row = this.bookRow(bookTitle);
    if ((await row.count()) === 0) return false;
    return row.first().isVisible({ timeout: 0 });
  }

  async getBooksCount(): Promise<number> {
    return this.bookRows.count();
  }
}
