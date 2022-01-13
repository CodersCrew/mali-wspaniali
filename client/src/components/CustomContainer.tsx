import React from 'react';
import { createStyles, Divider, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
    header?: React.ReactNode;
    container: React.ReactNode;
    subheader?: React.ReactNode;
    subsubheader?: React.ReactNode;
    disableShadow?: boolean;
}

export function CustomContainer({ header, subheader, subsubheader, disableShadow, container }: Props) {
    const classes = useStyles();

    return (
        <Paper classes={{ root: clsx({ [classes.disabledShadow]: disableShadow }) }}>
            {header && (
                <>
                    <div className={classes.titleContainer}>{header}</div>
                    <Divider />
                </>
            )}
            {subheader && (
                <>
                    <div className={classes.titleContainer}>{subheader}</div>
                    <Divider />
                </>
            )}
            {subsubheader && (
                <>
                    <div className={classes.titleContainer}>{subsubheader}</div>
                    <Divider />
                </>
            )}
            <div>{container}</div>
        </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        disabledShadow: {
            boxShadow: 'unset',
        },
        titleContainer: {
            padding: theme.spacing(1.5, 2),
        },
    }),
);
