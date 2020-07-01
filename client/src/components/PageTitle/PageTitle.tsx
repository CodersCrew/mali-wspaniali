import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

type PageTitleProps = {
    text: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageTitle: {
            margin: 0,

            [theme.breakpoints.down('sm')]: {
                fontSize: 21,
                lineHeight: '26px',
            },
        },
    }),
);

export const PageTitle = ({ text }: PageTitleProps) => {
    const classes = useStyles();

    return (
        <Typography variant="h1" className={classes.pageTitle}>
            {text}
        </Typography>
    );
};
