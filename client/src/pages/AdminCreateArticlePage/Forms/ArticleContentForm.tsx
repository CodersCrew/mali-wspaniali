import {
    createStyles,
    makeStyles,
    Chip,
    Checkbox,
    ListItemText,
    Theme,
    FormControl,
    Typography,
    Box,
    InputLabel,
    TextField,
    MenuItem,
    Select,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { useFormikContext, ErrorMessage, Field } from 'formik';

import { modules, formats, tags } from '../utils';
import { ArticleInput } from '../../../graphql/types';

export const ArticleContentForm = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const formik = useFormikContext<ArticleInput>();

    return (
        <div>
            <Typography variant="h3" className={classes.heading}>
                {t('admin-articles.article-content')}
            </Typography>
            <Box className={classes.box}>
                <Field name="contentHTML" helperText={t('admin-articles.mandatory')}>
                    {({ field }: any) => (
                        <ReactQuill
                            className={classes.workspace}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={field.value}
                            onChange={(e) => formik.setFieldValue('contentHTML', e)}
                        />
                    )}
                </Field>
                <ErrorMessage name="contentHTML">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
                <TextField
                    {...formik.getFieldProps('videoUrl')}
                    name="videoUrl"
                    className={classes.input}
                    variant="outlined"
                    label={t('admin-articles.video')}
                    fullWidth
                />
                <ErrorMessage name="videoUrl">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
                <FormControl className={classes.multiSelect}>
                    <InputLabel className={classes.tagsLabel}>{t('admin-articles.tags-field')}</InputLabel>
                    <Select
                        {...formik.getFieldProps('tags')}
                        variant="outlined"
                        label={t('admin-articles.tags-field')}
                        fullWidth
                        multiple
                        renderValue={(selected) => (
                            <>
                                {(selected as string[])?.map((data) => (
                                    <Chip label={data} key={data} color="primary" />
                                ))}
                            </>
                        )}
                    >
                        {tags?.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={formik.values?.tags?.indexOf(name) > -1} color="primary" />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <ErrorMessage name="tags">{(msg) => <div className={classes.error}>{msg}</div>}</ErrorMessage>
            </Box>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            padding: theme.spacing(2),
            borderBottom: 'solid 1px rgba(0, 0, 0, .3)',
        },
        error: { color: theme.palette.error.dark, marginBottom: theme.spacing(2) },
        box: {
            padding: theme.spacing(2),
        },
        tagsLabel: {
            marginLeft: theme.spacing(1.5),
            marginTop: -theme.spacing(0.7),
        },
        input: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        multiSelect: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        workspace: {
            marginBottom: theme.spacing(2),
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
