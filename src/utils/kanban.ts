import { Kanban } from 'types/kanban';
import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from './use-optimistic-options';
import { Task } from 'types/task';

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param || {}) })
  );
};

/**
 * 新增 kanban 的 hook
 * @returns
 */
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除 kanban- 的 hook
 * @returns
 */
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};

/**
 * 新增 task 的 hook
 * @returns
 */
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number; // 要重新排序的 item
  referenceId: number; // 目标 item
  type: 'before' | 'after'; // 放在目标 item 的前还是后
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) =>
      client('kanbans/reorder', {
        data: params,
        method: 'POST',
      }),
    useReorderKanbanConfig(queryKey)
  );
};
