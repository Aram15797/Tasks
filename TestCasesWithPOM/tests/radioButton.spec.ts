import { test as base, expect } from "../fixtures/baseTest.js";
import { RadioButtonPage } from "../pages/RadioButtonPage.js";

type Fixtures = {
  radioButtonPage: RadioButtonPage;
};

const test = base.extend<Fixtures>({
  radioButtonPage: async ({ page }, use) => {
    const radioButtonPage = new RadioButtonPage(page);
    await use(radioButtonPage);
  },
});

test("RadioButton: select Yes", async ({ radioButtonPage }) => {
  await test.step("Step 1: Open radio button page", async () => {
    await radioButtonPage.open();
  });

  await test.step("Step 2: Select Yes option", async () => {
    await radioButtonPage.selectYes();
  });

  await test.step("Step 3: Verify Yes is selected", async () => {
    await expect(radioButtonPage.resultText).toHaveText("Yes");
  });
});
