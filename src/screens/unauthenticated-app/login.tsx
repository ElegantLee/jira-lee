import React from 'react';
import { Button, Form, Input } from 'antd';
import { useAuth } from '../context/auth-context';

export const LoginScreen = () => {
  const { login, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
        label={'用户名'}
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type="text" />
      </Form.Item>
      <Form.Item
        label={'密码'}
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type={'password'} />
      </Form.Item>
      <Form.Item>
        <Button type={'primary'} htmlType={'submit'}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
