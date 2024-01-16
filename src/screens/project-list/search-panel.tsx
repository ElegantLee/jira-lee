// import { useEmotionCss } from '@ant-design/use-emotion-css';
import { css } from '@emotion/css';
import React from 'react';
import { Form, Input, Select } from 'antd';
// import {useState} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  // const formStyle = useEmotionCss((token: ) => {
  //   return {
  //     marginBottom: '2rem',
  //   };
  // });
  return (
    <Form
      className={css({
        marginBottom: '2rem',
      })}
      layout={'inline'}
    >
      <Form.Item>
        <Input
          placeholder={'用户名'}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
