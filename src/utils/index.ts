import { useEffect, useRef, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';
/**
 * 删除传入对象中 value 为 undefined、null 和 '' 的属性
 * @param object
 * @returns
 */
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) return {};
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
/**
 * 组件在加载时只执行一次初始化
 * @param callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * debounce --- 防抖
 * @param value
 * @param delay
 * @returns
 */
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

/**
 * 改变页面标题
 * @param title 页面标题
 * @param keepOnUnmount 是否在组件卸载时保持标题不变
 */
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时：旧 title
  // 页面加载后：新 title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件挂载的状态
 * @returns
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
