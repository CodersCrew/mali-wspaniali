import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const PageContainer: FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.container}>{children}</div>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(3, 2),
            },
        },
    }),
);
