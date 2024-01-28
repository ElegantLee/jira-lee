import 'wdyr';
import React from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { Button, Row, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';
import { projectListActions } from './project-list.slice';
import { useAppDispatch } from 'store/hooks';

const { Text } = Typography;

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const dispatch = useAppDispatch();

  return (
    <Contariner>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography>
          <Text type="danger">{error.message}</Text>
        </Typography>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || undefined}
        users={users || []}
      />
    </Contariner>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Contariner = styled.div`
  padding: 3.2rem;
`;
