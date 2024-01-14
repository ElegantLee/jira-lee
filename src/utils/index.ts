import { useEffect, useState } from "react";
import { person } from "../try-use-array";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
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
  }, []);
};

/* debounce --- 防抖 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
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

export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const newArr = [...value];
    newArr.splice(index, 1);
    setValue(newArr);
  };

  const add = (item: T) => {
    setValue([...value, item]);
  };
  return { value, clear, removeIndex, add };
};
