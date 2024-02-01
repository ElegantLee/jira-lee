import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from './util';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';
import { SearchPanel } from './search-panel';
import { ScreenContainer } from 'components/lib';
import { useTasks } from 'utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
import { TaskModal } from './task-modal';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');

  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
