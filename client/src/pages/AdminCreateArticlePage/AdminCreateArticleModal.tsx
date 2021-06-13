import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { createArticle } from '../../graphql/articleRepository';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { ArticleInput } from '../../graphql/types';

interface ModalProps {
    articles: ArticleInput;
}

export const ConfirmCreateArticleModal = (articles: ModalProps & ActionDialog<{ create: Partial<ArticleInput> }>) => {
    const classes = useStyles();

    const onSubmit = () => {
        createArticle(articles)
            .then(() => {
                openSnackbar({ text: 'sucess', severity: 'success' });
                articles.onClose();
            })
            .catch((err) => {
                openSnackbar({ text: 'error', severity: 'error' });
                articles.onClose();
            });
    };

    return (
        <TwoActionsModal
            lowerButtonOnClick={articles.onClose}
            upperButtonOnClick={() => onSubmit()}
            lowerButtonText="Anuluj"
            upperButtonText="Opublikuj"
            isOpen
            onClose={articles.onClose}
        >
            <div>
                <Typography variant="h4" color="primary">
                    Publikacja artykułu
                </Typography>
                <Typography variant="body1" color="textSecondary" className={classes.description}>
                    Czy na pewno chcesz opublikować dany artykuł?
                </Typography>
            </div>
        </TwoActionsModal>
    );
};

export const openConfirmCreateArticleModal = (props: ModalProps) => {
    return openDialog<ModalProps, { create: Partial<any> }>(ConfirmCreateArticleModal, props);
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            marginTop: theme.spacing(2),
        },
    }),
);
