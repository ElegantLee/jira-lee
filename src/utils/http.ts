import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from '../screens/context/auth-context';
import { useCallback } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}

/**
 * 根据传入的 config，包装请求的参数，使用 fetch 发出请求
 * @param endpoint 需要请求的内容
 * @param param1 请求所需的额外参数
 * @returns
 */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios 可以直接在的返回状态码不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: '请重新登录' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data); // 主动抛出异常，fetch 不会根据返回的状态码自动抛出异常，除非网络连接中断或连接失败
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // utility type: 使用泛型传入一个其他类型，然后utility type对这个类型进行某种操作
  // 这里的 typeof 是 TS 静态环境下运行的
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
