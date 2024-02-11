// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Add });
    expect(result).toBe(3 + 4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Subtract });
    expect(result).toBe(4 - 3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply });
    expect(result).toBe(3 * 4);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 4, action: Action.Divide });
    expect(result).toBe(8 / 4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(2 ** 3);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 3, b: 2, action: 'bar' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'bar',
      b: 'baz',
      action: Action.Multiply,
    });
    expect(result).toBe(null);
  });
});
