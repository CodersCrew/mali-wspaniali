import { createStyles, makeStyles, Snackbar, SnackbarOrigin, Theme, Typography } from '@material-ui/core';
import { Alert, AlertProps, AlertTitle } from '@material-ui/lab';
import clsx from 'clsx';

import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';
import { useIsDevice } from '../../queries/useBreakpoints';

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
        const device = useIsDevice();

        return (
            <Snackbar
                open
                autoHideDuration={6000}
                anchorOrigin={anchor || { vertical: 'top', horizontal: 'center' }}
                onClose={onClose}
                classes={{
                    root: clsx({
                        [classes.laptop]: true,
                        [classes.tablet]: device.isTablet,
                        [classes.mobile]: device.isMobile,
                    }),
                }}
            >
                <Alert
                    className={classes.alert}
                    onClose={onClose}
                    severity={severity || 'success'}
                    variant={variant || 'filled'}
                >
                    {device.isDesktop && headerText && (
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
        laptop: {
            zIndex: 10000,
            width: '70%',
        },
        tablet: {
            width: '702px',
        },
        mobile: {
            width: '95%',
        },
        alert: {
            width: '100%',
        },
    }),
);
