import { Typography, makeStyles, createStyles, Theme, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';
// import { openSnackbar } from '../../components/Snackbar/openSnackbar';
// import { createArticle } from '../../graphql/articleRepository';
import { ActionDialog } from '../../utils/openDialog';
import { ArticleInput } from '../../graphql/types';

interface ArticleInputWithValidation extends ArticleInput {
    isValid: boolean;
    test: () => void;
}

interface ModalProps {
    articles?: ArticleInputWithValidation;
}

export const ConfirmCreateArticleModal = (
    articles: ArticleInputWithValidation & ActionDialog<{ create: Partial<any> }>,
) => {
    const classes = useStyles();
    const history = useHistory();

    const onSubmit = () => {
        articles?.test();
        // createArticle(articles)
        //     .then(() => {
        //         openSnackbar({ text: 'sucess', severity: 'success' });
        //         articles.onClose();
        //     })
        //     .catch((err) => {
        //         // openSnackbar({ text: err, severity: 'error' });
        //         // articles.onClose();
        //         history.push('/admin/articles/categories/all');
        //     });
        // history.push('/admin/articles/create');
        // history.push('/admin/articles/create', { article: articles });
        // history.push('/admin/articles/categories/all');
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
            <Typography variant="h4" color="primary">
                {articles.isValid ? 'Publikacja artykułu' : 'Nie wszystkie pola obowiązkowe zostały wypełnione'}
            </Typography>
            <Button
                onClick={() => {
                    history.push('/admin/articles/categories/all');
                }}
            >
                TEST
            </Button>
            <Typography variant="body1" color="textSecondary" className={classes.description}>
                {articles.isValid
                    ? 'Czy na pewno chcesz opublikować dany artykuł?'
                    : 'Wróć do “dodawania artykułu” i wypełnij wszystkie pola obowiązkowe, aby móc opublikować artykuł.'}
            </Typography>
        </TwoActionsModal>
    );
};

export const openConfirmCreateArticleModal = (props: ModalProps) => {
    console.log('PROPS', props);
    // return openDialog<ModalProps, { create: Partial<any> }>(ConfirmCreateArticleModal, props);
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            marginTop: theme.spacing(2),
        },
    }),
);
