import { createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface Props {
    value: number;
}

export function ProgressBar({ value }: Props) {
    const classes = useStyles();

    return (
        <LinearProgress
            variant="determinate"
            value={value}
            classes={{
                root: classes.progressBar,
                bar: classes.progressBarDark,
                colorPrimary: classes.progressBarLight,
            }}
        />
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progressBar: {
            height: 6,
        },
        progressBarDark: {
            background: theme.palette.success.dark,
        },
        progressBarLight: {
            background: theme.palette.success.light,
        },
    }),
);
