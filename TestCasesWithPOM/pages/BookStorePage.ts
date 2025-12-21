import { BasePage } from "./BasePage.js";

export class BookStorePage extends BasePage {
  loginBtn = '#login';
  searchBox = '#searchBox';
  bookLink = (bookTitle: string) => `a:has-text("${bookTitle}")`;
  addToCollectionBtn = 'text=Add To Your Collection';
  profileMenu = 'text=Profile';
  deleteBookBtn = (bookTitle: string) => 
    `//div[text()="${bookTitle}"]/ancestor::div[contains(@class,"rt-tr-group")]//span[@title="Delete"]`;
  confirmDeleteBtn = '#closeSmallModal-ok';
  booksInProfile = '.rt-tbody .rt-tr-group';

  async goto(path: string) {
    await this.page.goto(`https://demoqa.com/${path}`);
  }

  async login(username: string, password: string) {
    await this.page.click(this.loginBtn);
    await this.page.fill('#userName', username);
    await this.page.fill('#password', password);
    await this.page.click('#login');
  }

  async searchBook(bookTitle: string) {
    await this.page.fill(this.searchBox, bookTitle);
  }

  async openBookDetails(bookTitle: string) {
    await this.page.click(this.bookLink(bookTitle));
  }

  async addBookToCollection() {
    await this.page.once('dialog', dialog => dialog.accept());
    await this.page.click(this.addToCollectionBtn);
  }

  async goToProfile() {
    await this.page.click(this.profileMenu);
  }

  async deleteBookFromCollection(bookTitle: string) {
    await this.page.once('dialog', dialog => dialog.accept());
    await this.page.click(this.deleteBookBtn(bookTitle));
    await this.page.click(this.confirmDeleteBtn);
  }

  async getBooksCount(): Promise<number> {
    return await this.page.locator(this.booksInProfile).count();
  }
}
