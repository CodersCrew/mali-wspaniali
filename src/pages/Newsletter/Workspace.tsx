import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import { modules, formats } from './workspaceConfig';
import { WorkspaceProps, Message } from './types';

export const WorkSpace = (props: WorkspaceProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleChange = (value: Message) => {
        props.setFields(prevFields => ({
            ...prevFields,
            message: {
                ...prevFields.message,
                value: value,
            },
        }));
    };

    return (
        <ReactQuill
            className={classes.workspace}
            value={props.message}
            onChange={handleChange}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder={t('newsletter.placeholder')}
        />
    );
};
const useStyles = makeStyles(() =>
    createStyles({
        workspace: {
            padding: '0 30px',
            '& .ql-container': {
                minHeight: 170,
            },
        },
    }),
);
