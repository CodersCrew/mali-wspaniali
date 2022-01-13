import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const PageContainer: React.FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.container}>{children}</div>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flex: 1,
            margin: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(3, 2),
            },
        },
    }),
);
