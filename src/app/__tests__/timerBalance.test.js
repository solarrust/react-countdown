import { expect, describe, it } from 'vitest';
import timeBalancer from '../modules/timeBalancer';

describe.each([
  {
    input: {
      hours: 0,
      minutes: 0,
      seconds: 10
    },
    output: {
      hours: 0,
      minutes: 0,
      seconds: 10
    }
  },
  {
    input: {
      hours: 0,
      minutes: 0,
      seconds: 100
    },
    output: {
      hours: 0,
      minutes: 1,
      seconds: 40
    }
  },
  {
    input: {
      hours: 0,
      minutes: 100,
      seconds: 10
    },
    output: {
      hours: 1,
      minutes: 40,
      seconds: 10
    }
  },
  {
    input: {
      hours: 100,
      minutes: 10,
      seconds: 10
    },
    output: {
      hours: 100,
      minutes: 10,
      seconds: 10
    }
  },
  {
    input: {
      hours: 100,
      minutes: 100,
      seconds: 100
    },
    output: {
      hours: 101,
      minutes: 41,
      seconds: 40
    }
  }
])('timeBalancer function test', ({ input, output }) => {
  it(`Expect if input is ${(JSON.stringify(input))} then result will be equals to ${(JSON.stringify(output))}`, () => {
    expect(timeBalancer(input)).toEqual(output)
  })
})

describe('Throwing Error if argument didn’t contain "minuets" or "seconds" keys', () => {
  it("Should throw en Error if no required keys were found in object", () => {
    expect(() => timeBalancer({ hours: 0, minutes: 10 })).toThrow()
  })
})