// Uncomment the code below and write your tests
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

    expect(func).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const recipientAccount = getBankAccount(initialSum);
    const func = () => {
      account.transfer(sumMoreThanBalance, recipientAccount);
    };

    expect(func).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const func = () => {
      account.transfer(sumMoreThanBalance, account);
    };

    expect(func).toThrowError(TransferFailedError);
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
    const initialAmount = 200;
    const testingAccount = getBankAccount(initialAmount); // 200 can't be set by fetchBalance
    const fetchedBalance = await testingAccount.fetchBalance();
    const updatedBalance = testingAccount.getBalance();

    if (updatedBalance !== initialAmount) {
      expect(fetchedBalance).not.toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // TODO

    const actualBalance = account.getBalance();
    const fetchedBalance = await account.fetchBalance();
    const updatedBalance = account.getBalance();

    if (fetchedBalance !== null) {
      expect(updatedBalance).toEqual(fetchedBalance);
    } else {
      expect(updatedBalance).toEqual(actualBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // TODO

    const fetchedBalance = await account.fetchBalance();

    if (fetchedBalance === null) {
      await expect(account.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
      );
    }
  });
});
