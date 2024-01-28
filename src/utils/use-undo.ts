import { useCallback, useReducer, useState } from 'react';

/**
 * past, present 和 future 三个状态分别定义时，与之关联的 undo、redo、set 和 reset 在使用 useCallback 包裹时需要重复添加依赖项。
 * 由于三个状态是相关联的，所以可以将三个状态合并为一个状态以简化代码。
 * @param initialPresent
 * @returns
 */

interface State<T> {
  past: T[];
  present: T;
  future: T[];
}

enum ACTION {
  UNDO,
  REDO,
  SET,
  RESET,
}

const undoReducer = <T>(
  state: State<T>,
  action: { newPresent?: T; type: ACTION }
) => {
  const { past, present, future } = state;
  const { newPresent } = action;
  switch (action.type) {
    case ACTION.UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case ACTION.REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case ACTION.SET: {
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: present,
        future: [],
      };
    }
    case ACTION.RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: ACTION.UNDO }), []);

  const redo = useCallback(() => dispatch({ type: ACTION.REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: ACTION.SET }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: ACTION.RESET }),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
