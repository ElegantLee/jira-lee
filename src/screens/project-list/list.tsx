import React from 'react';
import { User } from './search-panel';
import { Dropdown, Table, TableProps } from 'antd';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { projectListActions } from './project-list.slice';
import { useAppDispatch } from 'store/hooks';

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<any> {
  users: User[];
  refresh?: () => void;
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const dispatch = useAppDispatch();
  return (
    <Table
      loading={props.loading}
      pagination={false}
      rowKey={'id'}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          key: 'pin',
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={(pin) => {
                  mutate({ id: project.id, pin }).then(props.refresh);
                }}
              />
            );
          },
        },
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
        {
          render(value, project) {
            const items: MenuProps['items'] = [
              {
                key: 'edit',
                label: (
                  <ButtonNoPadding
                    type={'link'}
                    onClick={() =>
                      dispatch(projectListActions.openProjectModal())
                    }
                  >
                    编辑
                  </ButtonNoPadding>
                ),
              },
            ];
            return (
              <Dropdown menu={{ items }}>
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
