import styled from '@emotion/styled';
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useAddEpic } from 'utils/epic';
import { useEpicsQueryKey } from './util';
import { useForm } from 'antd/es/form/Form';
import { ErrorBox } from 'components/lib';
import { useProjectIdInUrl } from 'screens/kanban/util';

export const CreateEpic = (
  props: Pick<DrawerProps, 'open'> & { onClose: () => void }
) => {
  const {
    mutateAsync: addEpic,
    isLoading,
    error,
  } = useAddEpic(useEpicsQueryKey());
  const projectId = useProjectIdInUrl();
  const [form] = useForm();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form]);
  return (
    <Drawer
      open={props.open}
      forceRender
      destroyOnClose
      width={'100%'}
      onClose={props.onClose}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={'vertical'}
              style={{ width: '40rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label={'名称'}
                name={'name'}
                rules={[{ required: true, message: '请输入人任务组名称' }]}
              >
                <Input placeholder={'请输入任务组名称'} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  type={'primary'}
                  htmlType={'submit'}
                  loading={isLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
