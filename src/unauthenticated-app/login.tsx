import React from 'react';
import { Form, Input } from 'antd';
import { useAuth } from '../screens/context/auth-context';
import { LongButton } from '.';
import { useAsync } from 'utils/use-async';

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? (
        <div>
          登录成功，用户名: {user?.name}
          token: {user.token}
        </div>
      ) : null}
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type="text" />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
