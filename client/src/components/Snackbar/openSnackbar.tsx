import { createStyles, makeStyles, Snackbar, SnackbarOrigin, Theme, Typography } from '@material-ui/core';
import { Alert, AlertProps, AlertTitle } from '@material-ui/lab';
import clsx from 'clsx';

import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';
import { useBreakpoints } from '../../queries/useBreakpoints';

interface Props {
    text: string;
    headerText?: string;
    variant?: AlertProps['variant'];
    severity?: AlertProps['severity'];
    anchor?: SnackbarOrigin;
}

export function openSnackbar({ text, headerText, variant, severity, anchor }: Props): Promise<DialogResult> {
    return openDialog(function OpenSnackbar({ onClose }: ActionDialog) {
        const classes = useStyles();
        const device = useBreakpoints();

        return (
            <Snackbar
                open
                autoHideDuration={6000}
                anchorOrigin={anchor || { vertical: 'top', horizontal: 'center' }}
                onClose={onClose}
                classes={{
                    root: clsx({
                        [classes.container]: device !== 'MOBILE',
                        [classes.containerMobile]: device === 'MOBILE',
                    }),
                }}
            >
                <Alert
                    className={classes.alert}
                    onClose={onClose}
                    severity={severity || 'success'}
                    variant={variant || 'filled'}
                >
                    {device === 'DESKTOP' && headerText && (
                        <AlertTitle>
                            <Typography variant="subtitle1">{headerText}</Typography>
                        </AlertTitle>
                    )}
                    <Typography variant="body2">{text}</Typography>
                </Alert>
            </Snackbar>
        );
    }, {});
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            zIndex: 10000,
            width: '70%'          
        },
        containerMobile: {
            zIndex: 10000,
            marginTop: theme.spacing(8),
        },
        alert: {
            width: '100%',
        },
    }),
);
