import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from './use-optimistic-options';
import { useHttp } from './http';
import { cleanObject } from 'utils';
import { Project } from 'types/project';
import { QueryKey, useMutation, useQuery } from 'react-query';

/**
 * 请求 projects 数据
 * @param param
 * @returns
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(['projects', cleanObject(param)], () =>
    client('projects', { data: param })
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

/**
 * 通过 id 查询 project
 * @param id
 * @returns
 */
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
