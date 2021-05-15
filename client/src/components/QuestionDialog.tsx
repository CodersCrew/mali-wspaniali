import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    makeStyles,
    Theme,
    createStyles,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';
import { ButtonDefault } from './Button';

type QuestionDialogProps = {
    title: string;
    description: string;
    primaryButtonLabel: string;
};

export const openQuestionDialog = (props: QuestionDialogProps) => {
    return openDialog<QuestionDialogProps>(QuestionDialog, props);
};

const QuestionDialog = ({
    title,
    description,
    onClose,
    makeDecision,
    primaryButtonLabel,
}: QuestionDialogProps & ActionDialog) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const onAccepted = () => {
        makeDecision({ accepted: true });
    };

    const onDeclined = () => {
        makeDecision({ accepted: false });
    };

    return (
        <Dialog classes={{ paper: classes.dialogRoot }} open onClose={onClose}>
            <DialogTitle>
                <Typography variant="h4">{title}</Typography>
            </DialogTitle>
            <DialogContent classes={{ root: classes.description }}>
                <Typography variant="body1">{description}</Typography>
            </DialogContent>
            <DialogActions>
                <ButtonDefault onClick={onDeclined} variant="text" innerText={t('question-dialog.cancel')} />
                <ButtonDefault onClick={onAccepted} variant="text" innerText={primaryButtonLabel} />
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogRoot: {
            maxWidth: '461px',
        },
        description: {
            color: theme.palette.text.secondary,
        },
    }),
);
