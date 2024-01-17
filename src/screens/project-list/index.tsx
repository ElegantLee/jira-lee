import React from 'react';
import { SearchPanel } from './search-panel';
import { List, Project } from './list';
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
import { useAsync } from 'utils/use-async';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { Helmet } from 'react-helmet';

const { Text } = Typography;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });

  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle('项目列表', false);

  return (
    <Contariner>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography>
          <Text type="danger">{error.message}</Text>
        </Typography>
      ) : null}
      <List
        loading={isLoading}
        dataSource={list || undefined}
        users={users || []}
      />
    </Contariner>
  );
};

const Contariner = styled.div`
  padding: 3.2rem;
`;
