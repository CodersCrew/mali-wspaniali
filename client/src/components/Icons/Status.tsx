import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export function Status({ success }: { success?: boolean }) {
    const classes = useStyles();

    return (
        <span>
            {success ? (
                <CheckCircleIcon classes={{ root: classes.successStatus }} />
            ) : (
                <CancelIcon classes={{ root: classes.notSuccessStatus }} />
            )}
        </span>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        successStatus: {
            color: theme.palette.success.dark,
            width: 13,
            height: 13,
        },
        notSuccessStatus: {
            color: theme.palette.error.dark,
            width: 13,
            height: 13,
        },
    }),
);
