import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';
/**
 * 删除传入对象中 value 为 undefined、null 和 '' 的属性
 * @param object
 * @returns
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

/* custom hook(只能在组件或其他 hook 中使用) */
// 组件在加载时只执行一次初始化
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/* debounce --- 防抖 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout); // 每次在上一个 useEffect 处理完再执行
  }, [value, delay]);

  return debouncedValue;
};

// const debounce = (func, delay) => {
//   let timeout = null;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func(...param)
//     }, delay);
//   }
// }

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};
