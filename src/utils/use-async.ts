import { error } from 'console';
import { useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...initialState,
    ...defaultInitialState,
  });
  const config = { ...initialConfig, defaultConfig };
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型参数');
    }
    setState({ ...state, stat: 'loading' });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        // 如果传入的 promise 出错，这里的 catch 就将 error 捕获掉了，外部捕获不到 error。
        // 所以这里添加一个配置项以根据传入的参数判断是否主动抛出异常
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  };
};
