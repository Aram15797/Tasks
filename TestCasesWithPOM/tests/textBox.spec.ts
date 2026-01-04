import { test, expect } from "../fixtures/baseTest.js";
import { TextBoxPage } from "../pages/TextBoxPage.js";
import { getTextBoxData } from "../utils/storageData.js";

test("TextBox: fill form", async ({ page }) => {
  const textBox = new TextBoxPage(page);

  await textBox.open();
  const textBoxData = await getTextBoxData(page);

  await textBox.fillForm(textBoxData);
  await textBox.submit();

  await expect(textBox.nameOutput).toHaveText(new RegExp(textBoxData.fullName));
  await expect(textBox.emailOutput).toHaveText(new RegExp(textBoxData.email));
});
