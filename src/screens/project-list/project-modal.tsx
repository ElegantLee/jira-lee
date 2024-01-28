import React from 'react';
import { Button, Drawer } from 'antd';
import {
  projectListActions,
  selectProjectModalOpen,
} from './project-list.slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const ProjectModal = () => {
  const dispatch = useAppDispatch();
  const projectModalOpen = useAppSelector(selectProjectModalOpen);
  return (
    <Drawer
      open={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
