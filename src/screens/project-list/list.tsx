import React from 'react';
import { User } from 'types/user';
import { Dropdown, Modal, Table, TableProps } from 'antd';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useDeleteProject, useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal, useProjectQueryKey } from './util';
import { Project } from 'types/project';

interface ListProps extends TableProps<any> {
  users: User[];
  refresh?: () => void;
}

export const List = React.memo(({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
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
                  mutate({ id: project.id, pin });
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
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
});

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定要删除这个项目吗?',
      content: '点击确定后项目将会被删除',
      okText: '确定',
      onOk() {
        deleteProject({ id });
      },
    });
  };

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: (
        <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>
          编辑
        </ButtonNoPadding>
      ),
    },
    {
      key: 'delete',
      label: (
        <ButtonNoPadding
          type={'link'}
          onClick={() => confirmDeleteProject(project.id)}
        >
          删除
        </ButtonNoPadding>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  );
};
