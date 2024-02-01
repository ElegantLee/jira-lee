import React, { useState } from 'react';
import { useKanbansQueryKey, useProjectIdInUrl } from './util';
import { useAddKanban } from 'utils/kanban';
import { Container } from './kanban-column';
import { Input } from 'antd';

export const CreateKanban = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName('');
  };

  return (
    <Container>
      <Input
        size={'large'}
        placeholder={'新建看板名称'}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
