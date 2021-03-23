import { createStyles, makeStyles, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';

import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';

interface Props {
    text: string;
    subtext?: string;
    variant?: AlertProps['variant'];
    severity?: AlertProps['severity'];
}

export function openSnackbar({ text, subtext, variant, severity }: Props): Promise<DialogResult> {
    return openDialog(function OpenSnackbar({ onClose }: ActionDialog) {
        const classes = useStyles();

        return (
            <div>
                <Snackbar
                    open
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={onClose}
                    classes={{ root: classes.container }}
                >
                    {subtext ?
                    <Alert onClose={onClose} severity={severity || 'success'} variant={variant || 'filled'}>
                        <Typography variant="h6">{text}</Typography>
                        <Typography variant="subtitle1">{subtext}</Typography>
                    </Alert>
                    :
                    <Alert onClose={onClose} severity={severity || 'success'} variant={variant || 'filled'}>
                        {text}
                    </Alert>
                    }
                    
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
