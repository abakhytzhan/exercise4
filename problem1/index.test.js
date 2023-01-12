const { describe, expect, test, afterEach, jest } = require("@jest/globals");
const callbackExec = require("./index");

afterEach(() => {
  jest.useRealTimers();
});

describe("problem1", () => {
  test("calls callback once", () => {
    jest.useFakeTimers();
    const mock = jest.fn();

    callbackExec(mock);

    expect(mock).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });
  test("calls callback after 2s", () => {
    jest.useFakeTimers();
    const mock = jest.fn();

    callbackExec(mock);
    jest.advanceTimersByTime(2000);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
