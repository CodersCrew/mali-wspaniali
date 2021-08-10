import { Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';
import { ButtonDefault } from './Button';

type QuestionDialogProps = {
    title: string;
    description?: string;
    primaryButtonLabel: string;
    color?: 'primary' | 'secondary' | 'inherit' | 'default' | undefined;
};

export const openQuestionDialog = (props: QuestionDialogProps) => {
    return openDialog<QuestionDialogProps>(QuestionDialog, props);
};

const QuestionDialog = (props: QuestionDialogProps & ActionDialog) => {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="xs" open onClose={props.onClose}>
            <DialogTitle>
                <Typography variant="h4">{props.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="textSecondary">
                    {props.description}
                </Typography>
            </DialogContent>
            <DialogActions>
                <ButtonDefault onClick={onDeclined} variant="text" innerText={t('question-dialog.cancel')} />
                <ButtonDefault
                    color={props.color ? props.color : 'secondary'}
                    variant="text"
                    onClick={onAccepted}
                    innerText={props.primaryButtonLabel}
                />
            </DialogActions>
        </Dialog>
    );

    function onAccepted() {
        props.makeDecision({ accepted: true });
    }

    function onDeclined() {
        props.makeDecision({ accepted: false });
    }
};
