import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme, Fab } from '@material-ui/core';

interface Props {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
}

export function SecondaryFab({ icon, text, onClick }: Props) {
    const classes = useStyles();

    return (
        <Fab variant="extended" color="secondary" aria-label={text} className={classes.fab} onClick={onClick}>
            {icon}
            &nbsp;
            {text}
        </Fab>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
        },
    }),
);
