import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';
import { ButtonPrimary } from './Button';

type QuestionDialogProps = {
    question: string;
};

export const openQuestionDialog = (props: QuestionDialogProps) => {
    return openDialog<QuestionDialogProps>(QuestionDialog, props);
};

const QuestionDialog = ({ question, onClose, makeDecision }: QuestionDialogProps & ActionDialog) => {
    const { t } = useTranslation();

    const onAccepted = () => {
        makeDecision({ accepted: true });
    };

    const onDeclined = () => {
        makeDecision({ accepted: false });
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogContent>{question}</DialogContent>
            <DialogActions>
                <ButtonPrimary
                    onClick={onAccepted}
                    variant="contained"
                    autoFocus
                    innerText={t('question-dialog.yes')}
                />
                <ButtonPrimary onClick={onDeclined} variant="text" autoFocus innerText={t('question-dialog.no')} />
            </DialogActions>
        </Dialog>
    );
};
