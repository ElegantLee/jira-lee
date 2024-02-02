import React from 'react';
import { Divider, List, Popover, Typography } from 'antd';
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
import { useProjectModal } from 'screens/project-list/util';

export const ProjectPopover = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: projects, refetch } = useProjects();
  const { open } = useProjectModal();
  const pinnedProjects = projects?.filter((p) => p.pin);
  const { Text } = Typography;
  const content = (
    <Container>
      <Typography>
        <Text type={'secondary'}>收藏项目</Text>
      </Typography>
      <List>
        {pinnedProjects?.map((p) => (
          <List.Item key={p.id}>
            <List.Item.Meta title={p.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type={'link'} onClick={open}>
        创建项目
      </ButtonNoPadding>
    </Container>
  );
  return (
    <Popover
      onOpenChange={() => refetch()}
      placement={'bottom'}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 30rem;
`;
