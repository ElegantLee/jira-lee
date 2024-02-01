import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { Task } from 'types/task';
import { useDeleteConfig, useEditConfig } from './use-optimistic-options';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: cleanObject(param || {}) })
  );
};

/**
 * 通过 id 获取 task
 * @param id
 * @returns
 */
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    useEditConfig(queryKey)
  );
};

/**
 * 删除 project 的 hook
 * @returns
 */
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};
