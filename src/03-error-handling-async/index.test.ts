// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const testValue = 'bar';
const testMessage = 'Fuuuuu----';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(testValue);
    expect(result).toEqual(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const func = () => {
      throwError(testMessage);
    };
    expect(func).toThrow(testMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const func = () => {
      throwError();
    };
    expect(func).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const func = () => {
      throwCustomError();
    };
    expect(func).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
