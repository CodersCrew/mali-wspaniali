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
    props: any & ActionDialog<{ create: Partial<ArticleInputWithValidation> }>,
) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const onSubmit = () => {
        createArticle(props.values)
            .then(() => {
                openSnackbar({ text: 'sucess', severity: 'success' });
                props.onClose();
            })
            .catch((err) => {
                openSnackbar({ text: err, severity: 'error' });
                props.onClose();
            });
    };

    return (
        <TwoActionsModal
            lowerButtonOnClick={props.onClose}
            upperButtonOnClick={() => onSubmit()}
            lowerButtonText={t('admin-articles.back')}
            upperButtonText={t('admin-articles.add-article-modal.isValid')}
            isOpen
            onClose={props.onClose}
        >
            <Typography variant="h4">{t('admin-articles.add-article-modal.title-is-valid')}</Typography>
            <Typography variant="body1" color="textSecondary" className={classes.description}>
                {t('admin-articles.add-article-modal.body-text-is-valid')}
            </Typography>
        </TwoActionsModal>
    );
};

export const openConfirmCreateArticleModal = (props: ArticleInputWithValidation) => {
    return openDialog<ArticleInputWithValidation>(ConfirmCreateArticleModal, props);
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
