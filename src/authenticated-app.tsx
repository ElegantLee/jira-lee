import React from 'react';
import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './screens/context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, MenuProps } from 'antd';

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Button type="link" onClick={logout}>
          登出
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown menu={{ items }}>
            <Button type="link" onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
