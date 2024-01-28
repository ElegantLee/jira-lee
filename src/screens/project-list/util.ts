import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';

/**
 * 提取项目列表搜索参数的自定义 hook
 * @returns
 */
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};
