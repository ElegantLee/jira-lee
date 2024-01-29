import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from './use-optimistic-options';
import { useHttp } from './http';
import { cleanObject } from 'utils';
import { Project } from 'screens/project-list/list';
import { QueryKey, useMutation, useQuery } from 'react-query';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: cleanObject(param || {}) })
  );
};

/**
 * 修改 project 的 hook
 * @returns
 */
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    useEditConfig(queryKey)
  );
};

/**
 * 新增 project 的 hook
 * @returns
 */
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除 project 的 hook
 * @returns
 */
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
