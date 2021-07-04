import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { createArticle } from '../../graphql/articleRepository';
import { ActionDialog, openDialog } from '../../utils/openDialog';
import { ArticleInput } from '../../graphql/types';

interface ArticleInputWithValidation extends ArticleInput {
    isValid: boolean;
}

export const ConfirmCreateArticleModal = (
    articles: ArticleInputWithValidation & ActionDialog<{ create: Partial<ArticleInputWithValidation> }>,
) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const onSubmit = () => {
        createArticle(articles)
            .then(() => {
                openSnackbar({ text: 'sucess', severity: 'success' });
                articles.onClose();
            })
            .catch((err) => {
                openSnackbar({ text: err, severity: 'error' });
                articles.onClose();
            });
    };

    return (
        <TwoActionsModal
            lowerButtonOnClick={articles.onClose}
            upperButtonOnClick={() => onSubmit()}
            lowerButtonText="Anuluj"
            upperButtonText={articles.isValid ? 'Opublikuj' : 'Uzupełnij dane'}
            isOpen
            onClose={articles.onClose}
        >
            <Typography variant="h4">
                {articles.isValid
                    ? t('admin-articles.add-article-modal.title-is-valid')
                    : t('admin-articles.add-article-modal.title-is-not-valid')}
            </Typography>

            <Typography variant="body1" color="textSecondary" className={classes.description}>
                {articles.isValid
                    ? t('admin-articles.add-article-modal.body-text-is-valid')
                    : t('admin-articles.add-article-modal.body-text-is-not-valid')}
            </Typography>
        </TwoActionsModal>
    );
};

export const openConfirmCreateArticleModal = (props: ArticleInputWithValidation) => {
    return openDialog<ArticleInputWithValidation, { create: Partial<ArticleInputWithValidation> }>(
        ConfirmCreateArticleModal,
        props,
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
