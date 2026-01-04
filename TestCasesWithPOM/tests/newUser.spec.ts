import { test, expect } from "../fixtures/baseTest.js";
import { RegistrationPage } from "../pages/NewUserPage.js";
import type { UserFormData } from "../data/users.js";
import { getUserData } from "../utils/storageData.js";


test("Users management: Add new user to table", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();

  const testUser = await getUserData(page, "alexJohnson");

  if ((await registrationPage.userRow(testUser.email).count()) > 0) {
    await registrationPage.deleteUser(testUser.email);
  }

  await registrationPage.openAddUserModal();
  await registrationPage.fillRegistrationForm(testUser);
  await registrationPage.submitForm();

  const createdUserRow = registrationPage.userRow(testUser.email);
  await expect(createdUserRow).toHaveText(new RegExp(testUser.firstName));
  await expect(createdUserRow).toHaveText(new RegExp(testUser.lastName));
  await expect(createdUserRow).toHaveText(new RegExp(testUser.email));
  await expect(createdUserRow).toHaveText(new RegExp(testUser.age));
  await expect(createdUserRow).toHaveText(new RegExp(testUser.department));
});

test("Users management: Edit existing user", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();

  const testUser = await getUserData(page, "sarahConnor");
  const updatedUser = await getUserData(page, "sarahConnorUpdated");

  if ((await registrationPage.userRow(testUser.email).count()) === 0) {
    await registrationPage.openAddUserModal();
    await registrationPage.fillRegistrationForm(testUser);
    await registrationPage.submitForm();
  }

  await registrationPage.editUser(testUser.email);
  await registrationPage.updateUser(updatedUser);

  const updatedUserRow = registrationPage.userRow(testUser.email);
  await expect(updatedUserRow).toHaveText(new RegExp(updatedUser.firstName));
  await expect(updatedUserRow).toHaveText(new RegExp(updatedUser.age));
  await expect(updatedUserRow).toHaveText(new RegExp(updatedUser.department));
});

test("Users management: Delete user from table", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();

  const testUser = await getUserData(page, "markTemporary");

  if ((await registrationPage.userRow(testUser.email).count()) === 0) {
    await registrationPage.openAddUserModal();
    await registrationPage.fillRegistrationForm(testUser);
    await registrationPage.submitForm();
  }

  await expect(registrationPage.userRow(testUser.email)).toBeVisible();

  await registrationPage.deleteUser(testUser.email);

  await expect(registrationPage.userRow(testUser.email)).toHaveCount(0);
});

test("Users management: Search for user", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();

  const users: [UserFormData, UserFormData] = [
    await getUserData(page, "johnDoe"),
    await getUserData(page, "janeSmith"),
  ];

  for (const user of users) {
    if ((await registrationPage.userRow(user.email).count()) === 0) {
      await registrationPage.openAddUserModal();
      await registrationPage.fillRegistrationForm(user);
      await registrationPage.submitForm();
    }
  }

  await registrationPage.searchUser("Doe");
  const [johnDoe, janeSmith] = users;
  await expect(registrationPage.userRow(johnDoe.email)).toBeVisible();
  await expect(registrationPage.userRow(janeSmith.email)).toHaveCount(0);

  await registrationPage.searchUser("");
  await expect(registrationPage.userRow(johnDoe.email)).toBeVisible();
  await expect(registrationPage.userRow(janeSmith.email)).toBeVisible();
});
