import { test, expect } from "@playwright/test";
import { BookStorePage } from "../pages/BookStorePage.js";

test.describe("Book Store Tests", () => {
  test("Book Store: Add book to collection", async ({ page }) => {
    const bookStore = new BookStorePage(page);
    const testBook = "Git Pocket Guide";
    
    await bookStore.goto("books");
    await bookStore.login("testuser", "Test123!");
    await bookStore.searchBook(testBook);
    await bookStore.openBookDetails(testBook);
    await bookStore.addBookToCollection();
    
    await bookStore.goToProfile();
    await expect(page.locator(`.rt-tbody .rt-tr-group:has-text("${testBook}")`)).toBeVisible();
  });

  test("Book Store: Remove book from collection", async ({ page }) => {
    const bookStore = new BookStorePage(page);
    const testBook = "Learning JavaScript Design Patterns";
    
    await bookStore.goto("books");
    await bookStore.login("testuser", "Test123!");
    await bookStore.searchBook(testBook);
    await bookStore.openBookDetails(testBook);
    await bookStore.addBookToCollection();
    
    await bookStore.goToProfile();
    const booksBefore = await bookStore.getBooksCount();
    
    await bookStore.deleteBookFromCollection(testBook);
    
    const booksAfter = await bookStore.getBooksCount();
    expect(booksAfter).toBeLessThan(booksBefore);
    await expect(page.locator(`.rt-tbody .rt-tr-group:has-text("${testBook}")`)).not.toBeVisible();
  });
});
