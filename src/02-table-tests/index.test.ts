// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: 1 - 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 2 * 2 },
  { a: 3, b: 1 / 2, action: Action.Divide, expected: 3 / (1 / 2) },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 ** 2 },
  { a: 2, b: 2, action: undefined, expected: null },
  { a: 3, b: 'bar', action: Action.Add, expected: null },
];

describe('simpleCalculator table test', () => {
  test.each(testCases)(
    'calculates (%s) correctly',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );
});
