import React, { ReactNode } from 'react';
import { createStyles, Divider, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
    header: ReactNode;
    container: ReactNode;
    subheader?: ReactNode;
    disableShadow?: boolean;
}

export function CustomContainer({ header, subheader, disableShadow, container }: Props) {
    const classes = useStyles();

    return (
        <Paper classes={{ root: clsx({ [classes.disabledShadow]: disableShadow }) }}>
            <div className={classes.titleContainer}>{header}</div>
            <Divider />
            {subheader && (
                <>
                    <div className={classes.titleContainer}>{subheader}</div>
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
            padding: theme.spacing(2),
        },
    }),
);
