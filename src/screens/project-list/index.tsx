import 'wdyr';
import React from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import { Button, Row } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ErrorBox, ScreenContainer } from 'components/lib';

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <ScreenContainer>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : null}
      <List
        loading={isLoading}
        dataSource={list || undefined}
        users={users || []}
      />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;
