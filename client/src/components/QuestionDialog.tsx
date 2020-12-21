import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';
import { ButtonDefault } from './Button';

type QuestionDialogProps = {
    title: string;
    description: string;
};

export const openQuestionDialog = (props: QuestionDialogProps) => {
    return openDialog<QuestionDialogProps>(QuestionDialog, props);
};

const QuestionDialog = ({ title, description, onClose, makeDecision }: QuestionDialogProps & ActionDialog) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const onAccepted = () => {
        makeDecision({ accepted: true });
    };

    const onDeclined = () => {
        makeDecision({ accepted: false });
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent classes={{ root: classes.description }}>{description}</DialogContent>
            <DialogActions>
                <ButtonDefault onClick={onAccepted} variant="text" innerText={t('question-dialog.yes')} />
                <ButtonDefault onClick={onDeclined} variant="text" innerText={t('question-dialog.no')} />
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            color: theme.palette.text.secondary,
        },
    }),
);
