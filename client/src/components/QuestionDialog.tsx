import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core/';
import { openDialog, ActionDialog } from '../utils/openDialog';
import { Button } from '../components/Button';

type QuestionDialogProps = {
    question: string;
};

export const openQuestionDialog = (props: QuestionDialogProps) => {
    return openDialog<QuestionDialogProps>(QuestionDialog, props);
};

const QuestionDialog = ({ question, onClose, makeDecision }: QuestionDialogProps & ActionDialog) => {
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
                <Button onClick={onAccepted} color="primary" autoFocus innerText="question-dialog.yes" />
                <Button onClick={onDeclined} color="primary" autoFocus innerText="question-dialog.no" />
            </DialogActions>
        </Dialog>
    );
};
