import React from 'react';
import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './screens/context/auth-context';
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from 'components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, MenuProps } from 'antd';
import { Navigate, Route, Routes } from 'react-router';
import { ProjectScreen } from 'screens/project';
import { resetRoute } from 'utils';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopover } from 'components/project-popover';
import { UserPopover } from 'components/user-popover';

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={'/'} element={<Navigate to={'/projects'} />} />
          <Route path={'/projects'} element={<ProjectListScreen />} />
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between>
      <HeaderLeft gap>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
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
    <Dropdown menu={{ items }}>
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
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
  display: flex;
  overflow: hidden;
`;
