import React, { Dispatch, SetStateAction } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import { modules, formats } from './workspaceConfig';
import { Theme } from '../../theme';
import { NewsletterState } from './types';

type WorkspaceProps = {
    message: string;
    setFields: Dispatch<SetStateAction<NewsletterState>>;
};

export const WorkSpace = ({ message, setFields }: WorkspaceProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleChange = (value: string) => {
        setFields(prevFields => ({
            ...prevFields,
            message: {
                ...prevFields.message,
                value,
            },
        }));
    };

    return (
        <ReactQuill
            className={classes.workspace}
            value={message}
            onChange={handleChange}
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
