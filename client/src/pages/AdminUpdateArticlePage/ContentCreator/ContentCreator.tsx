import { observer } from 'mobx-react-lite';
import 'react-quill/dist/quill.snow.css';
import { Theme, createStyles, makeStyles, Typography, Box } from '@material-ui/core';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../../components/CustomContainer';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { articleStore } from '../ArticleCreator/ArticleCreatorStore';

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
    clipboard: {
        matchVisual: false,
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

export const ContentCreator = observer(function ContentCreator() {
    const T_PREFIX = 'add-article.content-creator';
    const classes = useStyles();
    const { t } = useTranslation();
    const { article, update } = articleStore;

    if (!article) return null;

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
                        value={article.contentHTML}
                        onChange={(value) => update('contentHTML', value)}
                    />
                    <Box mt={2}>
                        <OutlinedTextField
                            value={article.videoUrl}
                            label={t(`${T_PREFIX}.video-url`)}
                            onChange={(value) => update('videoUrl', value)}
                        />
                    </Box>
                </Box>
            }
        />
    );
});

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
