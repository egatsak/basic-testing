import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts1';

    // Mock axios.create to return an object with a get method
    const axiosCreateMock = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Joe Doe',
        },
        {
          id: 2,
          name: 'Jane Doe',
        },
      ],
    });
    // Expect axios.create to be called with the provided baseURL
    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL,
    });

    // Expect axios.get to be called with the correct URL
    // expect(axiosCreateMock.get).toHaveBeenCalledWith(relativePath);
  });
});
