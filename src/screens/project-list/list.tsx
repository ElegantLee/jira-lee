import React from 'react';
import { User } from './search-panel';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// TODO: 把所有 id 换成 number 类型
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<any> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      loading={props.loading}
      pagination={false}
      rowKey={'id'}
      columns={[
        {
          title: '名称',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
          key: 'organization',
        },
        {
          title: '负责人',
          dataIndex: 'personId',
          key: 'personId',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            );
          },
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          key: 'created',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
