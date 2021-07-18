import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme, Paper } from '@material-ui/core';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { openConfirmCreateArticleModal } from './AdminCreateArticleModal';
import { ArticleInformationForm } from './Forms/ArticleInformationForm';
import { ArticleContentForm } from './Forms/ArticleContentForm';
import { Navigation } from './Navigation';
import { ArticleAuthorInformationForm } from './Forms/ArticleAuthorInformationForm';
import { initialValues } from './utils';
import { ArticleState } from './types';

type formArticleType = typeof ArticleContentForm | typeof ArticleAuthorInformationForm | typeof ArticleInformationForm;

const forms = [ArticleInformationForm, ArticleContentForm, ArticleAuthorInformationForm];

const ArticleForm = (props: formArticleType) => {
    const ArticleSelectedForm = props;

    return <ArticleSelectedForm />;
};

export default function CreateArticlePage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { state } = useLocation<ArticleState>();

    const validationSchema = Yup.object().shape({
        category: Yup.string().required(t('admin-articles.validation-label.title.require')),
        title: Yup.string()
            .required(t('admin-articles.validation-label.title.require'))
            .min(10, t('admin-articles.validation-label.title.min'))
            .max(100, t('admin-articles.validation-label.title.max')),
        pictureUrl: Yup.string().required(t('admin-articles.validation-label.picture-url.require')),
        description: Yup.string()
            .required(t('admin-articles.validation-label.description.require'))
            .min(30, t('admin-articles.validation-label.description.min'))
            .max(300, t('admin-articles.validation-label.description.max')),
        contentHTML: Yup.string().required(t('admin-articles.validation-label.article-content.require')),
        redactor: Yup.object({
            firstName: Yup.string().required(t('admin-articles.validation-label.redactor.firstName.require')),
            profession: Yup.string().required(t('admin-articles.validation-label.redactor.profession.require')),
            biography: Yup.string().required(t('admin-articles.validation-label.redactor.biography.require')),
            lastName: Yup.string().required(t('admin-articles.validation-label.redactor.lastName.require')),
        }),
    });

    const handleSubmit = (values: any) => {
        openConfirmCreateArticleModal(values);
    };

    const formik = useFormik({
        initialValues: state?.article ?? initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
                <PageContainer>
                    {forms.map((component: formArticleType, index: number) => {
                        return (
                            <Paper elevation={1} className={classes.paper} key={index}>
                                {ArticleForm(component)}
                            </Paper>
                        );
                    })}
                    <Navigation />
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
        error: { color: theme.palette.error.dark, marginBottom: theme.spacing(2) },
        box: {
            padding: theme.spacing(2),
        },
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cancel: {
            marginRight: theme.spacing(2),
        },
    }),
);
