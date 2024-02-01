import React, { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useTaskModal, useTasksQueryKey } from './util';
import { useDeleteTask, useEditTask } from 'utils/task';
import { Button, Form, Input, Modal } from 'antd';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancle = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const confirmDeleteTask = (id: number) => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗？',
      onOk() {
        deleteTask({ id: id });
        close();
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);

  return (
    <Modal
      okText={'确认'}
      cancelText={'取消'}
      confirmLoading={editLoading}
      title={'编辑任务'}
      open={!!editingTaskId}
      onCancel={onCancle}
      onOk={onOk}
      forceRender
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <Form.Item
          label={'任务名'}
          name={'name'}
          rules={[{ required: true, message: '请输入任务名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'经办人'} name={'processorId'}>
          <UserSelect defaultOptionName={'经办人'} />
        </Form.Item>
        <Form.Item label={'类型'} name={'typeId'}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={() => confirmDeleteTask(Number(editingTaskId))}
          style={{ fontSize: '1.3rem' }}
          size={'small'}
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};
