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
        <Dialog classes={{ paper: classes.dialogRoot }} open onClose={onClose}>
            <DialogTitle classes={{ root: classes.dialogTitle }}>{title}</DialogTitle>
            <DialogContent classes={{ root: classes.description }}>{description}</DialogContent>
            <DialogActions>
                <ButtonDefault
                    classes={{ root: classes.buttonRoot }}
                    onClick={onAccepted}
                    variant="text"
                    innerText={t('question-dialog.cancel')}
                />
                <ButtonDefault
                    classes={{ root: classes.buttonRoot }}
                    onClick={onDeclined}
                    variant="text"
                    innerText={t('question-dialog.delete')}
                />
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogRoot: {
            maxWidth: '461px',
        },
        dialogTitle: {
            '&> h2': {
                fontSize: theme.typography.h4.fontSize,
                lineHeight: theme.typography.h4.lineHeight,
                letterSpacing: theme.typography.h4.letterSpacing,
            },
        },
        description: {
            color: theme.palette.text.secondary,
            fontSize: theme.typography.body1.fontSize,
            lineHeight: theme.typography.body1.lineHeight,
            letterSpacing: theme.typography.body1.letterSpacing,
        },
        buttonRoot: {
            '&:hover': {
                color: theme.palette.secondary.main,
            },
        },
    }),
);
