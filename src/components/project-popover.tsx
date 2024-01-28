import React from 'react';
import { Divider, List, Popover, Typography } from 'antd';
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
import { projectListActions } from 'screens/project-list/project-list.slice';
import { useAppDispatch } from 'store/hooks';

export const ProjectPopover = () => {
  const dispatch = useAppDispatch();
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((p) => p.pin);
  const { Text } = Typography;
  const content = (
    <Container>
      <Typography>
        <Text type={'secondary'}>收藏项目</Text>
      </Typography>
      <List>
        {pinnedProjects?.map((p) => (
          <List.Item>
            <List.Item.Meta title={p.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type={'link'}
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        创建项目
      </ButtonNoPadding>
    </Container>
  );
  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 30rem;
`;
