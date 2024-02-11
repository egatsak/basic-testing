import axios from 'axios';
import { throttledGetDataFromApi } from './index';

// TODO resolve issue with clearing mocks!

let mockedAxios: jest.Mocked<typeof axios>;

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();

    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts1';

    const axiosCreateMock = jest.spyOn(mockedAxios, 'create');

    const mockedGet = jest
      .spyOn(mockedAxios.Axios.prototype, 'get')
      .mockResolvedValueOnce('foo');

    await throttledGetDataFromApi(relativePath);

    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL,
    });

    axiosCreateMock.mockClear();
    mockedGet.mockClear();
    mockedGet.mockReset();
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const relativePath = '/posts12345';

    const mockedGet = jest
      .spyOn(mockedAxios.Axios.prototype, 'get')
      .mockResolvedValueOnce('baz');

    await throttledGetDataFromApi(relativePath);

    expect(mockedGet).toHaveBeenLastCalledWith(relativePath);

    mockedGet.mockClear();
  });

  test('should return response data', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const relativePath = Math.random().toFixed(8);

    interface Item {
      id: number;
      name: string;
    }

    const mockedResolvedValue: Record<'data', Item[]> = {
      data: [
        {
          id: 1,
          name: 'wow',
        },
        {
          id: 2,
          name: 'baz',
        },
      ],
    };

    jest
      .spyOn(mockedAxios.Axios.prototype, 'get')
      .mockResolvedValueOnce(mockedResolvedValue);

    const expectedResponseItem = {
      id: expect.any(Number),
      name: expect.any(String),
    };

    const responseData = await throttledGetDataFromApi(relativePath);

    expect(responseData).toContainEqual(
      expect.objectContaining<typeof expectedResponseItem>(
        expectedResponseItem,
      ),
    );
  });
});
