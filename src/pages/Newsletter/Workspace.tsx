import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { modules, formats } from './workspaceConfig';
import { WorkspaceProps, Message } from './types';

export const WorkSpace = (props: WorkspaceProps) => {
  const { t } = useTranslation();

  const handleChange = (value: Message) => {
    props.setMessage(value);
  };

  return (
    <ReactQuill
      value={props.message}
      onChange={handleChange}
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder={t('newsletter.placeholder')}
    />
  );
};
