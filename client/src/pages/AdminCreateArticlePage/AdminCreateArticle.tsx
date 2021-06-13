import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory, useLocation } from 'react-router-dom';
import {
    createStyles,
    makeStyles,
    Paper,
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
import { useFormik, Field, FormikProvider, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as Yup from 'yup';

import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { ButtonSecondary } from '../../components/Button';
import { articleCategories, modules, formats, initialValues, tags, redactorData } from './utils';
import { openConfirmCreateArticleModal } from './AdminCreateArticleModal';

type Option = {
    value: string;
    label: string;
};

export default function CreateArticlePage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { state }: any = useLocation();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required(t('admin-articles.validation-label.title.require'))
            .min(10, t('admin-articles.validation-label.title.min'))
            .max(100, t('admin-articles.validation-label.title.max')),
        pictureUrl: Yup.string()
            .required(t('admin-articles.validation-label.picture-url.require'))
            .url(t('admin-articles.validation-label.picture-url.url')),
        description: Yup.string()
            .required(t('admin-articles.validation-label.description.require'))
            .min(30, t('admin-articles.validation-label.description.min'))
            .max(300, t('admin-articles.validation-label.description.max')),
        contentHTML: Yup.string().required(t('admin-articles.validation-label.article-content.require')),
        redactor: Yup.object({
            firstName: Yup.string().required(t('admin-articles.validation-label.redactor.firstName.require')),
            lastName: Yup.string().required(t('admin-articles.validation-label.redactor.lastName.require')),
            profession: Yup.string().required(t('admin-articles.validation-label.redactor.profession.require')),
        }),
    });

    const onCancel = () => {
        history.push('/admin/articles/categories/all');
    };

    const handleSubmit = (values: any) => {
        openConfirmCreateArticleModal(values);
    };

    const formik = useFormik({
        initialValues: state?.article ?? initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);

    const onPreview = () => {
        history.push('/admin/articles/create/preview', { article: formik.values, isPreview: true });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
                <PageContainer>
                    <Paper elevation={1} className={classes.paper}>
                        <Typography variant="h3" className={classes.heading}>
                            {t('admin-articles.article-information')}
                        </Typography>
                        <Box className={classes.box}>
                            <TextField
                                {...formik.getFieldProps('title')}
                                className={classes.input}
                                variant="outlined"
                                label="Tytuł artykułu"
                                fullWidth
                                multiline
                            />
                            <ErrorMessage name="title">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="category">{t('admin-articles.category')}</InputLabel>
                                <Select {...formik.getFieldProps('category')} autoWidth className={classes.input}>
                                    {articleCategories().map((option: Option) => {
                                        return (
                                            <MenuItem value={option.value} key={option.value}>
                                                <span>{option.label}</span>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <ErrorMessage name="category">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
                            <TextField
                                {...formik.getFieldProps('pictureUrl')}
                                name="pictureUrl"
                                className={classes.input}
                                variant="outlined"
                                label="Adres Url"
                                fullWidth
                                multiline
                            />
                            <ErrorMessage name="pictureUrl">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
                            <TextField
                                {...formik.getFieldProps('description')}
                                name="description"
                                variant="outlined"
                                label={t('admin-articles.description')}
                                fullWidth
                                multiline
                                className={classes.input}
                            />
                            <ErrorMessage name="description">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
                        </Box>
                    </Paper>
                    <Paper elevation={1} className={classes.paper}>
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
                            <ErrorMessage name="contentHTML">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
                            <TextField
                                {...formik.getFieldProps('videoUrl')}
                                name="videoUrl"
                                className={classes.input}
                                variant="outlined"
                                label={t('admin-articles.video')}
                                fullWidth
                            />
                            <ErrorMessage name="videoUrl">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
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
                                    {tags.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={formik.values.tags.indexOf(name) > -1} color="primary" />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <ErrorMessage name="tags">
                                {(msg) => <div className={classes.error}>{msg}</div>}
                            </ErrorMessage>
                        </Box>
                    </Paper>
                    <Paper elevation={1} className={classes.paper}>
                        <Typography variant="h3" className={classes.heading}>
                            {t('admin-articles.author-information')}
                        </Typography>
                        <Box className={classes.box}>
                            {redactorData.map(({ data, label }) => (
                                <div key={`redactor.${data}`}>
                                    <TextField
                                        key={data}
                                        {...formik.getFieldProps(`redactor.${data}`)}
                                        className={classes.input}
                                        variant="outlined"
                                        label={t(`admin-articles.${label}`)}
                                        fullWidth
                                    />
                                    <ErrorMessage name={`redactor.${data}`}>
                                        {(msg) => <div className={classes.error}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                            ))}
                        </Box>
                    </Paper>
                    <Box className={classes.buttonsWrapper} mb={3}>
                        <ButtonSecondary onClick={onPreview} startIcon={<VisibilityIcon />}>
                            Preview
                        </ButtonSecondary>

                        <Box>
                            <ButtonSecondary className={classes.cancel} onClick={onCancel}>
                                {t('admin-articles.cancel')}
                            </ButtonSecondary>
                            <ButtonSecondary variant="contained" type="submit">
                                {t('admin-articles.publish')}
                            </ButtonSecondary>
                        </Box>
                    </Box>
                </PageContainer>
            </FormikProvider>
        </form>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: theme.spacing(2),
        },
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
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cancel: {
            marginRight: theme.spacing(2),
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
