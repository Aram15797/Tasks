import { test as base, expect } from "@playwright/test";

const storageState = "TestCasesWithPOM/storage/testDataState.json";

export const test = base.extend({});

test.use({ storageState });

export { expect };
