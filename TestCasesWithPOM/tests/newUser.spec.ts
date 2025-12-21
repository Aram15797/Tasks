import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/NewUserPage.js";

test.describe("Registration Form Tests", () => {

  test("Users management: Add new user to table", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const testUser = {
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@example.com",
      age: "28",
      salary: "75000",
      department: "Engineering"
    };

    await registrationPage.goto("webtables");

    if (await registrationPage.isUserVisible(testUser.email)) {
      await registrationPage.deleteUser(testUser.email);
    }

    await registrationPage.openAddUserModal();
    await registrationPage.fillRegistrationForm(testUser);
    await registrationPage.submitForm();

    const userData = await registrationPage.getUserRowData(testUser.email);
    expect(userData).not.toBeNull();
    expect(userData?.firstName).toBe(testUser.firstName);
    expect(userData?.lastName).toBe(testUser.lastName);
    expect(userData?.email).toBe(testUser.email);
    expect(userData?.age).toBe(testUser.age);
    expect(userData?.department).toBe(testUser.department);
  });

  test("Users management: Edit existing user", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto("webtables");

    const testUser = {
      firstName: "Sarah",
      lastName: "Connor",
      email: "sarah.connor@example.com",
      age: "35",
      salary: "65000",
      department: "Security"
    };

    if (!(await registrationPage.isUserVisible(testUser.email))) {
      await registrationPage.openAddUserModal();
      await registrationPage.fillRegistrationForm(testUser);
      await registrationPage.submitForm();
    }

    await registrationPage.editUser(testUser.email);
    await page.fill('#firstName', 'Sarah Updated');
    await page.fill('#age', '36');
    await page.fill('#department', 'IT Security');
    await page.click('#submit');

    const updatedUser = await registrationPage.getUserRowData(testUser.email);
    expect(updatedUser?.firstName).toBe('Sarah Updated');
    expect(updatedUser?.age).toBe('36');
    expect(updatedUser?.department).toBe('IT Security');
  });

  test("Users management: Delete user from table", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto("webtables");

    const testUser = {
      firstName: "Mark",
      lastName: "Temporary",
      email: "mark.temp@example.com",
      age: "25",
      salary: "45000",
      department: "Temporary"
    };

    if (!(await registrationPage.isUserVisible(testUser.email))) {
      await registrationPage.openAddUserModal();
      await registrationPage.fillRegistrationForm(testUser);
      await registrationPage.submitForm();
    }

    expect(await registrationPage.isUserVisible(testUser.email)).toBe(true);

    await registrationPage.deleteUser(testUser.email);

    expect(await registrationPage.isUserVisible(testUser.email)).toBe(false);
  });

  test("Users management: Search for user", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto("webtables");

    const users = [
      { firstName: "John", lastName: "Doe", email: "john.doe@test.com", age: "30", salary: "50000", department: "QA" },
      { firstName: "Jane", lastName: "Smith", email: "jane.smith@test.com", age: "28", salary: "55000", department: "Dev" }
    ];

    for (const user of users) {
      if (!(await registrationPage.isUserVisible(user.email))) {
        await registrationPage.openAddUserModal();
        await registrationPage.fillRegistrationForm(user);
        await registrationPage.submitForm();
      }
    }

    await registrationPage.searchUser("Doe");
    expect(await registrationPage.isUserVisible("john.doe@test.com")).toBe(true);
    expect(await registrationPage.isUserVisible("jane.smith@test.com")).toBe(false);

    await registrationPage.searchUser("");
    expect(await registrationPage.isUserVisible("john.doe@test.com")).toBe(true);
    expect(await registrationPage.isUserVisible("jane.smith@test.com")).toBe(true);
  });

});
