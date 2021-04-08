import { createStyles, makeStyles, Snackbar, SnackbarOrigin, Theme } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import clsx from 'clsx';

import { useBreakpoints } from '../../queries/useBreakpoints';
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
        const device = useBreakpoints();

        return (
            <div>
                <Snackbar
                    open
                    autoHideDuration={6000}
                    anchorOrigin={anchor || { vertical: 'top', horizontal: 'center' }}
                    onClose={onClose}
                    classes={{
                        root: clsx({
                            [classes.container]: true,
                            [classes.customized]: device === 'MOBILE',
                        }),
                    }}
                >
                    <Alert onClose={onClose} severity={severity || 'success'} variant={variant || 'filled'}>
                        {text}
                    </Alert>
                </Snackbar>
            </div>
        );
    }, {});
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            zIndex: 10000,
            width: theme.spacing(121),
        },
        customized: {
            width: theme.spacing(41),
        },
    }),
);
