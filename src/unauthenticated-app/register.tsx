import React from 'react';
import { useAuth } from '../screens/context/auth-context';
import { Form, Input } from 'antd';
import { LongButton } from '.';
import { useAsync } from 'utils/use-async';

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    cpassword: string;
    username: string;
    password: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码是否相同'));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
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
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'确认密码'} type={'password'} id={'cpassword'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
