import { test, expect } from "../fixtures/baseTest.js";
import { CheckBoxPage } from "../pages/CheckBoxPage.js";

test("CheckBox: check Home", async ({ page }) => {
  const cb = new CheckBoxPage(page);

  await test.step("Step 1: Open checkbox page and expand tree", async () => {
    await cb.openAndExpandTree();
  });

  await test.step("Step 2: Select Home checkbox", async () => {
    await cb.selectHome();
  });

  await test.step("Step 3: Verify Home selected", async () => {
    await expect(cb.result).toHaveText(/home/);
  });
});
