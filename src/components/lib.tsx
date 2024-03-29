import React from 'react';
import styled from '@emotion/styled';
import { Button, Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';

/**
 * 盒子内部元素水平垂直居中，元素之间的 margin-right 值由 gap 的值决定
 */
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => props.marginBottom + 'rem'};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? `${props.gap}rem`
        : props.gap === true
        ? '2rem'
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={'large'} />
  </FullPage>
);

const { Text } = Typography;

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography>
      <Text type={'danger'}>{error?.message}</Text>
    </Typography>
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return (
      <Typography>
        <Text type="danger">{error?.message}</Text>
      </Typography>
    );
  }

  return null;
};

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
