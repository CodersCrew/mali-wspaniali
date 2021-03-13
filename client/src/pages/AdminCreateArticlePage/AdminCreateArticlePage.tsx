import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Paper, Theme, Typography, Box, TextField, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { ButtonSecondary } from '../../components/Button';
import { createArticle } from '../../graphql/articleRepository';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { SelectList } from '../../components/SelectList';
import { modules, formats } from './utils';

export interface Option {
    value: string;
    label: string;
}

export default function CreateArticlePage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();

    const [article, setArticle] = useState({
        category: '',
        contentHTML: '',
        description: '',
        header: '',
        pictureUrl: '',
        readingTime: 0,
        redactor: {
            avatarUrl: '',
            firstName: '',
            lastName: '',
            profession: '',
            biography: '',
        },
        subtitle: '',
        tags: [],
        title: '',
        videoUrl: '',
    });

    const onChange = ({ target: { name, value } }: any) => {
        setArticle({ ...article, [name]: value });
    };

    const onChangeCategory = (value: string) => {
        setArticle({ ...article, category: value });
    };

    const onChangeContent = (value: string) => {
        setArticle({ ...article, contentHTML: value });
    };

    const onChangeAuthor = ({ target: { name, value } }: any) => {
        setArticle({ ...article, redactor: { ...article.redactor, [name]: value } });
    };

    const onCancel = () => {
        history.push(`/admin/articles/categories/all`);
    };

    const onSubmit = () => {
        createArticle(article)
            .then(() => {
                openSnackbar({ text: t('admin-articles.article-added'), severity: 'success' });
            })
            .catch((err) => {
                openSnackbar({ text: t(err), severity: 'error' });
            });
    };

    const articleCategories = [
        {
            value: 'food',
            label: t('admin-articles.category-food'),
        },
        {
            value: 'activity',
            label: t('admin-articles.category-activity'),
        },
        {
            value: 'emotions',
            label: t('admin-articles.category-emotions'),
        },
        {
            value: 'other',
            label: t('admin-articles.category-other'),
        },
    ];

    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);

    return (
        <PageContainer>
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h3" className={classes.heading}>
                    {t('admin-articles.article-information')}
                </Typography>
                <Box className={classes.box}>
                    <TextField
                        error={!!article.title && (article.title.length < 10 || article.title.length > 100)}
                        helperText={t('admin-articles.title-validation')}
                        name="title"
                        className={classes.input}
                        variant="outlined"
                        label={t('admin-articles.article-title')}
                        fullWidth
                        value={article.title}
                        onChange={(e) => onChange(e)}
                        size="small"
                    />
                    <SelectList
                        name="category"
                        className={classes.input}
                        items={articleCategories.map((option: Option) => {
                            return (
                                <MenuItem value={option.value} key={option.value}>
                                    <span>{option.label}</span>
                                </MenuItem>
                            );
                        })}
                        label={t('admin-articles.category')}
                        value={article.category}
                        onSelect={onChangeCategory}
                        size="small"
                    />
                    <TextField
                        name="pictureUrl"
                        className={classes.input}
                        variant="outlined"
                        label={t('admin-articles.picture')}
                        fullWidth
                        value={article.pictureUrl}
                        onChange={(e) => onChange(e)}
                        size="small"
                    />
                    <TextField
                        error={
                            !!article.description &&
                            (article.description.length < 30 || article.description.length > 300)
                        }
                        helperText={t('admin-articles.description-validation')}
                        name="description"
                        variant="outlined"
                        label={t('admin-articles.description')}
                        fullWidth
                        value={article.description}
                        onChange={(e) => onChange(e)}
                        size="small"
                        multiline
                        rows={3}
                    />
                </Box>
            </Paper>
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h3" className={classes.heading}>
                    {t('admin-articles.article-content')}
                </Typography>
                <Box className={classes.box}>
                    <ReactQuill
                        className={classes.workspace}
                        value={article.contentHTML}
                        onChange={onChangeContent}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder={t('admin-articles.article-content')}
                    />
                    <TextField
                        name="videoUrl"
                        className={classes.input}
                        variant="outlined"
                        label={t('admin-articles.video')}
                        fullWidth
                        value={article.videoUrl}
                        onChange={(e) => onChange(e)}
                        size="small"
                    />
                </Box>
            </Paper>
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h3" className={classes.heading}>
                    {t('admin-articles.author-information')}
                </Typography>
                <Box className={classes.box}>
                    <Box className={classes.inputsWrapper}>
                        <TextField
                            name="firstName"
                            className={classes.input}
                            variant="outlined"
                            label={t('admin-articles.author-first-name')}
                            fullWidth
                            value={article.redactor.firstName}
                            onChange={(e) => onChangeAuthor(e)}
                            size="small"
                        />
                        <TextField
                            name="lastName"
                            className={classes.input}
                            variant="outlined"
                            label={t('admin-articles.author-last-name')}
                            fullWidth
                            value={article.redactor.lastName}
                            onChange={(e) => onChangeAuthor(e)}
                            size="small"
                        />
                    </Box>
                    <TextField
                        name="profession"
                        className={classes.input}
                        variant="outlined"
                        label={t('admin-articles.author-profession')}
                        fullWidth
                        value={article.redactor.profession}
                        onChange={(e) => onChangeAuthor(e)}
                        size="small"
                    />
                    <TextField
                        name="avatarUrl"
                        className={classes.input}
                        variant="outlined"
                        label={t('admin-articles.avatar')}
                        fullWidth
                        value={article.redactor.avatarUrl}
                        onChange={(e) => onChangeAuthor(e)}
                        size="small"
                    />
                    <TextField
                        name="biography"
                        variant="outlined"
                        label={t('admin-articles.author-biography')}
                        fullWidth
                        value={article.redactor.biography}
                        onChange={(e) => onChangeAuthor(e)}
                        size="small"
                        multiline
                        rows={3}
                    />
                </Box>
            </Paper>
            <Box className={classes.buttonsWrapper}>
                <ButtonSecondary className={classes.cancel} onClick={onCancel}>
                    {t('admin-articles.cancel')}
                </ButtonSecondary>
                <ButtonSecondary variant="contained" onClick={onSubmit}>
                    {t('admin-articles.publish')}
                </ButtonSecondary>
            </Box>
        </PageContainer>
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
        box: {
            padding: theme.spacing(2),
        },
        input: {
            marginBottom: theme.spacing(2),
        },
        inputsWrapper: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '16px',

            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr 1fr',
                gridGap: '0',
            },
        },
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        cancel: {
            marginRight: theme.spacing(2),
        },
        workspace: {
            marginBottom: theme.spacing(2),
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
