// import { useEmotionCss } from '@ant-design/use-emotion-css';
import { css } from '@emotion/css';
import React from 'react';
import { Form, Input } from 'antd';
import { Project } from 'types/project';
import { UserSelect } from 'components/user-select';

interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form
      className={css({
        marginBottom: '2rem',
      })}
      layout={'inline'}
    >
      <Form.Item>
        <Input
          placeholder={'项目名'}
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
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
