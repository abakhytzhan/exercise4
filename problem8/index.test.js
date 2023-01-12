const { describe, expect, test, afterEach, jest } = require("@jest/globals");
const promisifiedSum = require("./index");

describe("problem8", () => {
  test("add values result", async () => {
    await expect(promisifiedSum(1, 2, 3, 4)).resolves.toEqual(10);
    await expect(promisifiedSum(2, 2, 2, 2, 2, 2, 2)).resolves.toEqual(14);
  });

  test("fail if no argument supplied", async () => {
    await expect(promisifiedSum()).rejects.toThrow("no arguments");
  });
});
