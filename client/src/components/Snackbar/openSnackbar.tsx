import { createStyles, makeStyles, Snackbar, SnackbarOrigin, Theme } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import clsx from 'clsx';

import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';
import { useBreakpoints } from '../../queries/useBreakpoints';

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
                            [classes.laptop]: true,
                            [classes.tablet]: device === 'TABLET',
                            [classes.mobile]: device === 'MOBILE',
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
        laptop: {
            zIndex: 10000,
            width: theme.spacing(121),
        },
        tablet: {
            width: '702px',
        },
        mobile: {
            width: theme.spacing(41),
        },
    }),
);
