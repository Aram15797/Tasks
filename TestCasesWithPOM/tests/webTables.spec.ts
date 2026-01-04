import { test, expect } from "../fixtures/baseTest.js";
import { WebTablesPage } from "../pages/WebTablesPage.js";
import { getUserData } from "../utils/storageData.js";

test("WebTables: add user", async ({ page }) => {
  const wt = new WebTablesPage(page);

  await wt.open();
  const user = await getUserData(page, "webTablesDefault");

  if ((await wt.userRow(user.email).count()) > 0) {
    await wt.deleteUser(user.email);
  }

  await wt.addUser(user);

  const createdUserRow = wt.userRow(user.email);
  await expect(createdUserRow).toHaveText(new RegExp(`${user.firstName}.*${user.lastName}`, "s"));
});
