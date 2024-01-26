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

const { Text } = Typography;

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Contariner>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
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
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Contariner>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Contariner = styled.div`
  padding: 3.2rem;
`;
