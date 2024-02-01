import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useKanbansQueryKey, useTaskModal, useTaskSearchParams } from './util';
import { useTaskType } from 'utils/task-type';
import { ReactComponent as TaskIcon } from 'assets/task.svg';
import { ReactComponent as BugIcon } from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card, Dropdown, MenuProps, Modal } from 'antd';
import { CreateTask } from './create-task';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { ButtonNoPadding, Row } from 'components/lib';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskType();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }

  return name === 'task' ? <TaskIcon /> : <BugIcon />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container {...props} ref={ref}>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        <Drop
          type={'ROW'}
          direction={'vertical'}
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: '5px' }}>
            {tasks?.map((task, index) => (
              <Drag key={task.id} index={index} draggableId={'task' + task.id}>
                {/* HTML自带的元素可以直接接受 ref，如果是 ReactNode 则需要用 forwordRef 包裹转发 ref */}
                <div>
                  <TaskCard key={task.id} task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
  const confirmDeleteKanban = (id: number) => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        deleteKanban({ id: id });
      },
    });
  };

  const items: MenuProps['items'] = [
    // {
    //   key: 'edit',
    //   label: (
    //     <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>
    //       编辑
    //     </ButtonNoPadding>
    //   ),
    // },
    {
      key: 'delete',
      label: (
        <ButtonNoPadding
          type={'link'}
          onClick={() => confirmDeleteKanban(kanban.id)}
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

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7 rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
