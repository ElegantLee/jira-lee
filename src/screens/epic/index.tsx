import { Row, ScreenContainer } from 'components/lib';
import React, { useState } from 'react';
import { useEpicSearchParams, useEpicsQueryKey, useProjectInUrl } from './util';
import { useDeleteEpic, useEpics } from 'utils/epic';
import { Button, List, Modal } from 'antd';
import dayjs from 'dayjs';
import { useTasks } from 'utils/task';
import { Link } from 'react-router-dom';
import { Epic } from 'types/epic';
import { CreateEpic } from './create-epic';

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutateAsync: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [createEpicOpen, setCreateEpicOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between>
        <h1>{currentProject?.name}</h1>
        <Button onClick={() => setCreateEpicOpen(true)} type={'link'}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: 'scroll' }}
        dataSource={epics}
        itemLayout={'vertical'}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button type={'link'} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        open={createEpicOpen}
        onClose={() => setCreateEpicOpen(false)}
      ></CreateEpic>
    </ScreenContainer>
  );
};
