import { createStyles, makeStyles, Snackbar, SnackbarOrigin } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';

import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';

interface Props {
    text: string;
    variant?: AlertProps['variant'];
    severity?: AlertProps['severity'];
    anchor?: SnackbarOrigin;
}

export function openSnackbar({ text, variant, severity, anchor }: Props): Promise<DialogResult> {
    return openDialog(function OpenSnackbar({ onClose }: ActionDialog) {
        const classes = useStyles();

        return (
            <div>
                <Snackbar
                    open
                    autoHideDuration={6000}
                    anchorOrigin={anchor || { vertical: 'top', horizontal: 'center' }}
                    onClose={onClose}
                    classes={{ root: classes.container }}
                >
                    <Alert onClose={onClose} severity={severity || 'success'} variant={variant || 'filled'}>
                        {text}
                    </Alert>
                </Snackbar>
            </div>
        );
    }, {});
}

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            zIndex: 10000,
        },
    }),
);
