import { test, expect } from "@playwright/test";
import { TextBoxPage } from "../pages/TextBoxPage.js";

test("TextBox: fill form", async ({ page }) => {
  const textBox = new TextBoxPage(page);

  await textBox.goto("text-box");
  await textBox.fillForm("Aram", "aram@example.com");
  await textBox.submit();

  await expect(page.locator("#name")).toContainText("Aram");
  await expect(page.locator("#email")).toContainText("aram@example.com");
});
