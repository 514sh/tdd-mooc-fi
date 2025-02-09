import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

/**
 * The issue with Untestable-4 is that, PasswordService is highly coupled to PostgresUserDao
 * It is better to make PostgresUserDao a dependency to PasswordService, so that, we can isolate
 * the testing to each unit.
 */

describe("Test DAO", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService(PostgresUserDao.getInstance());
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});
