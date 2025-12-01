import { test, expect } from "@playwright/test";
import { WebTablesPage } from "../pages/WebTablesPage.js";

test("WebTables: add user", async ({ page }) => {
  const wt = new WebTablesPage(page);

  await wt.goto("webtables");
  await wt.addUser();

  await expect(page.locator(".rt-tbody")).toContainText("John");
  await expect(page.locator(".rt-tbody")).toContainText("Doe");
});
