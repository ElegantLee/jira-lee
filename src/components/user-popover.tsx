import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { List, Popover, Typography } from 'antd';
import { useUsers } from 'utils/user';
const { Text } = Typography;

export const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const content = useMemo(
    () => (
      <Container>
        <Typography>
          <Text type={'secondary'}>组员列表</Text>
        </Typography>
        <List>
          {users?.map((user) => (
            <List.Item key={user.id}>
              <List.Item.Meta title={user.name} />
            </List.Item>
          ))}
        </List>
      </Container>
    ),
    [users]
  );
  return (
    <Popover
      onOpenChange={() => refetch()}
      placement={'bottom'}
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 30rem;
`;
