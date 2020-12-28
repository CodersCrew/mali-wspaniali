import React, { ReactNode } from 'react';
import { createStyles, Divider, makeStyles, Paper, Theme } from '@material-ui/core';

interface Props {
    header: ReactNode;
    container: ReactNode;
}

export function CustomContainer({ header, container }: Props) {
    const classes = useStyles();

    return (
        <Paper classes={{ root: classes.container }}>
            <div className={classes.titleContainer}>{header}</div>
            <Divider />
            <div>{container}</div>
        </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
        },
        titleContainer: {
            padding: theme.spacing(2),
        },
    }),
);
