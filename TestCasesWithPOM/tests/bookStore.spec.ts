import { test, expect } from "../fixtures/baseTest.js";
import { BookStorePage } from "../pages/BookStorePage.js";
import { getBookStoreCredentials, getBookTitles } from "../utils/storageData.js";

test.describe("Book Store Tests", () => {
  test("Book Store: Add book to collection", async ({ page }) => {
    const bookStore = new BookStorePage(page);
    
    await bookStore.open();
    const bookStoreCredentials = await getBookStoreCredentials(page);
    const bookTitles = await getBookTitles(page);
    const testBook = bookTitles.gitPocketGuide;

    await bookStore.login(bookStoreCredentials);
    await bookStore.searchBook(testBook);
    await bookStore.openBookDetails(testBook);
    await bookStore.addBookToCollection();
    
    await bookStore.goToProfile();
    await expect(bookStore.bookRow(testBook)).toBeVisible();
  });

  test("Book Store: Remove book from collection", async ({ page }) => {
    const bookStore = new BookStorePage(page);
    
    await bookStore.open();
    const bookStoreCredentials = await getBookStoreCredentials(page);
    const bookTitles = await getBookTitles(page);
    const testBook = bookTitles.jsDesignPatterns;

    await bookStore.login(bookStoreCredentials);
    await bookStore.searchBook(testBook);
    await bookStore.openBookDetails(testBook);
    await bookStore.addBookToCollection();
    
    await bookStore.goToProfile();
    const booksBefore = await bookStore.getBooksCount();
    
    await bookStore.deleteBookFromCollection(testBook);
    
    await expect(bookStore.bookRows).toHaveCount(booksBefore - 1);
    await expect(bookStore.bookRow(testBook)).toHaveCount(0);
  });
});
