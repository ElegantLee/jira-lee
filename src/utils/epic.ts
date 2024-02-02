import { Epic } from 'types/epic';
import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useAddConfig, useDeleteConfig } from './use-optimistic-options';

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(['epics', param], () =>
    client('epics', { data: cleanObject(param || {}) })
  );
};

/**
 * 新增 epic 的 hook
 * @returns
 */
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除 epic 的 hook
 * @returns
 */
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};
