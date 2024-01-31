import { Kanban } from 'types/kanban';
import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useAddConfig, useDeleteConfig } from './use-optimistic-options';
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
