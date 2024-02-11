// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.useFakeTimers({ legacyFakeTimers: true });

    const cb = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.useFakeTimers();

    const cb = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    const cb = jest.fn();
    const timeout = 1000;

    doStuffByInterval(cb, timeout);

    expect(setInterval).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.useFakeTimers();

    const cb = jest.fn();
    const timeout = 1000;

    doStuffByInterval(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout * 4);

    expect(cb).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const pathToFile = '123.txt';
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.fn().mockImplementation(readFileAsynchronously);
    const pathToFile = '12345.txt';

    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(
        new Promise((resolve) =>
          resolve(Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])),
        ),
      );
    jest.fn().mockImplementation(readFileAsynchronously);

    const pathToFile = '123456.txt';
    expect(await readFileAsynchronously(pathToFile)).toBe(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]).toString(),
    );
  });
});
