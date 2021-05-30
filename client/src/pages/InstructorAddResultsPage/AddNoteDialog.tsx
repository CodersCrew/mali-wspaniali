import { useState } from 'react';
import {
    createStyles,
    makeStyles,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
    Theme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { openDialog, ActionDialog } from '../../utils/openDialog';
import { useIsDevice } from '../../queries/useBreakpoints';
import { ButtonDefault, ButtonPrimary } from '../../components/Button';

type AddNoteDialogProps = {
    title: string;
    note: string;
};

export function openAddNoteDialog(props: AddNoteDialogProps) {
    return openDialog<AddNoteDialogProps, { note: string }>(AddNoteDialog, props);
}

function AddNoteDialog({
    title,
    note: initialNote,
    makeDecision,
    onClose,
}: AddNoteDialogProps & ActionDialog<{ note: string }>) {
    const { t } = useTranslation();
    const classes = useStyles();
    const device = useIsDevice();
    const [note, setNote] = useState(initialNote);
    const LENGTH_LIMIT = 500;

    const onAccepted = () => {
        makeDecision({ accepted: true, note });
    };

    const onDeclined = () => {
        onClose();
    };

    return (
        <Dialog
            classes={{
                container: clsx({ [classes.container]: device.isSmallMobile }),
            }}
            open
            onClose={onClose}
            maxWidth="sm"
            fullScreen={device.isSmallMobile}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary">
                            {t('add-results-page.add-note-modal.description')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            placeholder={t('add-results-page.add-note-modal.placeholder')}
                            multiline
                            variant="outlined"
                            fullWidth
                            rows={7}
                            value={note}
                            onChange={({ target: { value } }) => value.length <= LENGTH_LIMIT && setNote(value)}
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Box mt={1}>
                                    <Typography variant="caption" color="textSecondary">
                                        {t('add-results-page.add-note-modal.text-limit', {
                                            characters: `${note.length}/${LENGTH_LIMIT}`,
                                        })}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <ButtonDefault
                    onClick={onDeclined}
                    variant="text"
                    innerText={t('add-results-page.add-note-modal.cancel')}
                />
                <ButtonPrimary
                    onClick={onAccepted}
                    disabled={isSaveDisabled()}
                    variant="text"
                    innerText={t('add-results-page.add-note-modal.save')}
                />
            </DialogActions>
        </Dialog>
    );

    function isSaveDisabled() {
        return note.length < 3 || note === initialNote;
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    }),
);
