import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core';

interface Props {
    label: string | number;
}

export function SecondaryLabel({ label }: Props) {
    const classes = useStyles();

    return <span className={classes.label}>{label}</span>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            background: theme.palette.secondary.main,
            color: '#fff',
            padding: `2px ${theme.spacing(1)}px 2px ${theme.spacing(1)}px`,
            borderRadius: 10,
        },
    }),
);
