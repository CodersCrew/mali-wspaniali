import React, { ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import { modules, formats } from './workspaceConfig';
import { Theme } from '../../theme';

interface Props {
    message: string;
    handleChange: (e: ChangeEvent<any>) => void;
}

export const Workspace = ({ message, handleChange }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <ReactQuill
            className={classes.workspace}
            value={message}
            onChange={content => console.log(content)}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder={t('newsletter.placeholder')}
        />
    );
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        workspace: {
            borderRadius: '4',
            '& .ql-container': {
                minHeight: 170,
                borderRadius: '0 0 4px 4px',
            },
            '& .ql-toolbar': {
                borderRadius: '4px 4px 0 0',
                background: theme.palette.background.default,
            },
        },
    }),
);
