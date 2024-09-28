import { expect, describe, it } from "vitest";
import balanceTime from "../modules/balanceTime";

describe.each([
  {
    input: {
      hours: 0,
      minutes: 0,
      seconds: 10,
    },
    output: {
      hours: 0,
      minutes: 0,
      seconds: 10,
    },
  },
  {
    input: {
      hours: 100,
      minutes: 100,
      seconds: 100,
    },
    output: {
      hours: 101,
      minutes: 41,
      seconds: 40,
    },
  },
])("timeBalancer function test", ({ input, output }) => {
  it(`Expect if input is ${JSON.stringify(input)} then result will be equals to ${JSON.stringify(output)}`, () => {
    expect(balanceTime(input)).toEqual(output);
  });
});

describe('Throwing Error if argument didn’t contain "minuets" or "seconds" keys', () => {
  it("Should throw an Error if no required keys were found in object", () => {
    expect(() => balanceTime({ hours: 0, minutes: 10 })).toThrow();
  });
});
