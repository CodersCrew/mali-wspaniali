import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

import ArticleBox from '../../components/ArticleBox/ArticleBox';
import { openConfirmCreateArticleModal } from './AdminCreateArticleModal';
import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';
import { mandatoryObject } from './utils';
import { activePage } from '../../apollo_client';

const AdminCreateArticlePagePreview = () => {
    const { state } = useLocation<any>();
    const history = useHistory();
    const className = useStyles();
    const { t } = useTranslation();

    const article = { ...state.article };
    const obligatoryArticleFieldTest = mandatoryObject(state.article);

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        activePage(['admin-menu.articles-create-preview.title']);
    }, []);

    const articleWithValidation = { ...article, isValid: isValid(obligatoryArticleFieldTest) };

    function isValid(item: any) {
        const currentValue: Array<boolean> = [];

        Object?.keys(item?.values)?.forEach((key) => {
            if (item?.values[key] === '') currentValue.push(false);
        });

        return !currentValue.includes(false);
    }

    const onClickNextButtonTitle = () =>
        isValid(obligatoryArticleFieldTest) ? openConfirmCreateArticleModal(articleWithValidation) : setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        history.push('/admin/articles/create', {
            article: state.article.values,
            isPreview: false,
        });
    };

    return (
        <>
            <TwoActionsModal
                lowerButtonOnClick={handleClose}
                upperButtonOnClick={onSubmit}
                lowerButtonText="Wróć"
                upperButtonText="Uzupełnij dane"
                isOpen={open}
                onClose={handleClose}
            >
                <Typography variant="h4" color="textPrimary" className={className.title}>
                    {t('admin-articles.modal-preview.content')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {t('admin-articles.add-article-modal.body-text-is-not-valid')}
                </Typography>
            </TwoActionsModal>
            <ArticleBox
                article={article}
                nextButtonTitle={t('admin-articles.publish')}
                previousButtonTitle={t('admin-articles.back')}
                isPreview
                onClickNextButtonTitle={onClickNextButtonTitle}
                onClickPreviousButtonTitle={onSubmit}
            />
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            marginTop: theme.spacing(2),
        },
        title: {
            marginBottom: theme.spacing(3),
        },
    }),
);

export default AdminCreateArticlePagePreview;
