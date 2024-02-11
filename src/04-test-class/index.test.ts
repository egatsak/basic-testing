import lodash from 'lodash';

import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  const initialSum = 100;
  const sumMoreThanBalance = 200;
  const validSum = 50;

  beforeEach(() => {
    account = getBankAccount(initialSum);
  });

  test('should create account with initial balance', () => {
    expect(account instanceof BankAccount).toBe(true);
    expect(account.getBalance()).toEqual(initialSum);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const func = () => {
      account.withdraw(sumMoreThanBalance);
    };

    expect(func).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const recipientAccount = getBankAccount(initialSum);
    const func = () => {
      account.transfer(sumMoreThanBalance, recipientAccount);
    };

    expect(func).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const func = () => {
      account.transfer(sumMoreThanBalance, account);
    };

    expect(func).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(validSum);
    expect(account.getBalance()).toEqual(initialSum + validSum);
  });

  test('should withdraw money', () => {
    account.withdraw(validSum);
    expect(account.getBalance()).toEqual(initialSum - validSum);
  });

  test('should transfer money', () => {
    const recipientAccount = getBankAccount(initialSum);
    const currentFromBalance = account.getBalance();

    account.transfer(validSum, recipientAccount);

    expect(account.getBalance()).toEqual(currentFromBalance - validSum);
    expect(recipientAccount.getBalance()).toEqual(initialSum + validSum);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 10;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
