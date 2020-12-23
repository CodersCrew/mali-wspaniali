import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';


import { ActionDialog, DialogResult, openDialog } from '../../utils/openDialog';

interface Props {
    text: string;
    btnText: string;
    variant?: AlertProps['variant'];
    severity?: AlertProps['severity'];
}

export function openBtnSnackbar({ text, btnText, variant, severity }: Props): Promise<DialogResult> {
    return openDialog(function({ onClose }: ActionDialog) {
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
                    <Alert  severity={severity || 'success'} variant={variant || 'filled'} action={
                        <Button color="inherit" size="small" onClick={onClose}>
                            {btnText}
                        </Button>}>
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
