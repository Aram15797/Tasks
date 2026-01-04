import type { Page } from "@playwright/test";
import type { UserDataMap, UserFormData } from "../data/users.js";
import type { TextBoxData } from "../data/textBox.js";
import type { BookStoreCredentials, BookTitles } from "../data/bookStore.js";
import type { DynamicPropertiesData } from "../data/dynamicProperties.js";
import type { ButtonsTexts } from "../texts/buttons.texts.js";

async function getStoredJSON<T>(page: Page, key: string): Promise<T> {
  const raw = await page.evaluate(storageKey => localStorage.getItem(storageKey), key);
  if (!raw) {
    throw new Error(`No storage value found for key: ${key}`);
  }
  return JSON.parse(raw) as T;
}

export async function getUserData(page: Page, id: keyof UserDataMap): Promise<UserFormData> {
  const users = await getStoredJSON<UserDataMap>(page, "users");
  const user = users[id];
  if (!user) {
    throw new Error(`No user found in storage for id: ${String(id)}`);
  }
  return user;
}

export async function getTextBoxData(page: Page): Promise<TextBoxData> {
  return getStoredJSON<TextBoxData>(page, "textBoxData");
}

export async function getBookStoreCredentials(page: Page): Promise<BookStoreCredentials> {
  return getStoredJSON<BookStoreCredentials>(page, "bookStoreCredentials");
}

export async function getBookTitles(page: Page): Promise<BookTitles> {
  return getStoredJSON<BookTitles>(page, "bookTitles");
}

export async function getDynamicPropertiesData(page: Page): Promise<DynamicPropertiesData> {
  return getStoredJSON<DynamicPropertiesData>(page, "dynamicPropertiesData");
}

export async function getButtonsTexts(page: Page): Promise<ButtonsTexts> {
  return getStoredJSON<ButtonsTexts>(page, "buttonsTexts");
}
