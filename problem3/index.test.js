const { describe, expect, test, afterEach, jest } = require("@jest/globals");
const callFuncInInterval = require("./index");

afterEach(() => {
  jest.useRealTimers();
});

describe("problem3", () => {
  test("calls callback 10 times", () => {
    jest.useFakeTimers();
    const mock = jest.fn();

    callFuncInInterval(mock);

    expect(mock).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(10);
  });
  test("calls callback with period of number sec and param of number", () => {
    jest.useFakeTimers();
    const mock = jest.fn();

    callFuncInInterval(mock);

    for (let i = 1; i <= 10; i++) {
      jest.advanceTimersByTime(i * 1000);
      expect(mock).toHaveBeenLastCalledWith(i);
    }
  });
});
