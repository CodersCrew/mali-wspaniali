import React from 'react';
import { createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
    value: number;
    disabled?: boolean;
}

export function ProgressBar({ disabled, value }: Props) {
    const classes = useStyles();

    return (
        <LinearProgress
            variant="determinate"
            value={disabled ? 0 : value}
            classes={{
                root: classes.progressBar,
                bar: classes.progressBarDark,
                colorPrimary: clsx({ [classes.progressBarLight]: true, [classes.progressBarDisabled]: disabled }),
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
        progressBarDisabled: {
            background: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
    }),
);
