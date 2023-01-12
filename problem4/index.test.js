const { describe, expect, test, afterEach, jest } = require("@jest/globals");
const wait = require("./index");

afterEach(() => {
  jest.useRealTimers();
});

describe("problem4", () => {
  test("wait is async function", async () => {
    await expect(wait(100)).resolves.toBeUndefined();
  });
  test.each([{ timeout: 100 }, { timeout: 500 }, { timeout: 1000 }])(
    "wait needs to sleep for amount of $timeout ms",
    ({ timeout }) => {
      jest.useFakeTimers();

      const waitPromise = wait(timeout);

      expect(jest.getTimerCount()).toBe(1);

      jest.advanceTimersByTime(timeout);

      expect(jest.getTimerCount()).toBe(0);
    }
  );
});
