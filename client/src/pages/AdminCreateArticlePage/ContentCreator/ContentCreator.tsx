import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Theme, createStyles, makeStyles, Typography, Box } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import pick from 'lodash.pick';
import isEqual from 'lodash.isequal';

import { CustomContainer } from '../../../components/CustomContainer';
import { Article } from '../../../graphql/types';
import { OutlinedTextField } from '../../../components/OutlinedTextField';

export const modules = {
    toolbar: [
        [{ header: 1 }, { header: 2 }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
};

export const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

export const ContentCreator = React.memo(
    function ContentCreator(props: { value: Article; onChange: (key: string, value: string) => void }) {
        const T_PREFIX = 'add-article.content-creator';
        const classes = useStyles();
        const { t } = useTranslation();

        return (
            <CustomContainer
                header={<Typography variant="h3">{t(`${T_PREFIX}.title`)}</Typography>}
                container={
                    <Box p={2}>
                        <ReactQuill
                            className={classes.workspace}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={props.value.contentHTML}
                            onChange={(value) => props.onChange('contentHTML', value)}
                        />
                        <Box mt={2}>
                            <OutlinedTextField
                                value={props.value.videoUrl}
                                label={t(`${T_PREFIX}.video-url`)}
                                onChange={(value) => props.onChange('videoUrl', value)}
                            />
                        </Box>
                    </Box>
                }
            />
        );
    },
    (prev, next) => {
        const toCompare = ['contentHTML'];

        return isEqual(pick(prev.value, toCompare), pick(next.value, toCompare));
    },
);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        workspace: {
            marginBottom: theme.spacing(2),
            '& .ql-container': {
                borderRadius: '0 0 4px 4px',
            },
            '& .ql-toolbar': {
                borderRadius: '4px 4px 0 0',
                background: theme.palette.background.default,
            },
        },
    }),
);
