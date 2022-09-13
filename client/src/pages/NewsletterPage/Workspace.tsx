import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, FormControl, FormHelperText } from '@material-ui/core';

import { modules, formats } from './workspaceConfig';
import { Theme } from '@app/theme';

interface Props {
    value: string;
    error?: string;
    onChange: (name: string, value: string) => void;
}

export const Workspace = ({ value, error, onChange }: Props) => {
    const { t } = useTranslation();
    const [isTouched, setIsTouched] = useState(false);
    const classes = useStyles();

    return (
        <FormControl error={!!error} hiddenLabel={!!error} fullWidth>
            <ReactQuill
                className={classes.workspace}
                value={value}
                onChange={(content) => onChange('message', content)}
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder={t('newsletter.placeholder')}
                onFocus={() => setIsTouched(true)}
            />
            {!!error && isTouched && (
                <FormHelperText classes={{ root: classes.errorMessage }}>{t(error)}</FormHelperText>
            )}
        </FormControl>
    );
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        workspace: {
            '& .ql-container': {
                minHeight: 170,
                borderRadius: '0 0 4px 4px',
            },
            '& .ql-container.ql-snow': {
                display: 'flex',
            },
            '& .ql-toolbar': {
                borderRadius: '4px 4px 0 0',
                background: theme.palette.background.default,
            },
            '& .ql-editor': {
                height: 'unset',
                flex: 1,
            },
        },
        errorMessage: {
            margin: '3px 14px 0',
        },
    }),
);
