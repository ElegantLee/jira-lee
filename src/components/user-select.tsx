import React from 'react';
import { useUsers } from 'utils/user';
import { IdSelect } from './id-select';

/**
 * 用户选择器组件
 * @param props
 * @returns
 */
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
