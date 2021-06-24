import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

import ArticleBox from '../../components/ArticleBox/ArticleBox';
import { openConfirmCreateArticleModal } from './AdminCreateArticleModal';
import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';
import { mandatoryObject } from './utils';
import { ArticleInput } from '../../graphql/types';

type ArticleState = {
    isPreview: boolean;
    article: ArticleInput;
    isValid?: boolean;
};

const AdminCreateArticlePagePreview = () => {
    const { state } = useLocation<ArticleState>();
    const history = useHistory();
    const className = useStyles();

    const obligatoryArticleFieldTest = mandatoryObject(state.article);

    const [open, setOpen] = useState<boolean>(false);

    const articleWithValidation = { ...state?.article, isValid: isValid(obligatoryArticleFieldTest) };

    function isValid(item: any) {
        let currentValue: Array<boolean> = [];
        Object?.keys(item)?.forEach((key) => {
            if (typeof item[key] === 'object') {
                isValid(item[key]);
            }
            if (item[key] === '') currentValue = [...currentValue, false];
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
            article: state?.article,
            isPreview: state?.isPreview,
        });
    };

    return (
        <>
            <TwoActionsModal
                lowerButtonOnClick={handleClose}
                upperButtonOnClick={onSubmit}
                lowerButtonText="Anuluj"
                upperButtonText="Uzupełnij dane"
                isOpen={open}
                onClose={handleClose}
            >
                <Typography variant="h4" color="primary" className={className.title}>
                    Nie wszystkie pola obowiązkowe zostały wypełnione
                </Typography>

                <Typography variant="body1" color="textSecondary">
                    <Typography>Wróć do “dodawania artykułu” i wypełnij wszystkie pola obowiązkowe,</Typography>
                    <Typography variant="body1" color="textSecondary" className={className.title}>
                        aby móc opublikować artykuł
                    </Typography>
                </Typography>
            </TwoActionsModal>

            <ArticleBox
                article={state?.article}
                nextButtonTitle="OPUBLIKUJ"
                previousButtonTitle="ANULUJ"
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
