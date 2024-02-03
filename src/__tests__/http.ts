import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { http } from 'utils/http';

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// jest
// 执行所有的测试之前，先执行一下回调函数
beforeAll(() => server.listen());

// 每一个测试跑完后都重置 mock 路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后关闭 mock 路由
afterAll(() => server.close());

test('http方法发送异步请求', async () => {
  const endpoint = 'test-endpoint';
  const mockResult = { mockValue: 'mock' };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

test('http请求会在 header 里带上 token', async () => {
  const token = 'FAKE_TOKEN';
  const endpoint = 'test-endpoint';
  const mockResult = { mockValue: 'mock' };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`);
});
