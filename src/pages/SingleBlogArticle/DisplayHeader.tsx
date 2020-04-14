import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography } from '@material-ui/core';
import { mainColor } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';

export const DisplayHeader = ({ title }: { title: string }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.headerLongTitle} item xs={10}>
            <Typography className={classes.headerLongTitleText}>{title.toUpperCase()}</Typography>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerLongTitle: {
            paddingTop: '3vw',
            paddingBottom: '5vw',
        },
        headerLongTitleText: {
            fontSize: '34px',
            color: mainColor,
            fontWeight: 'bold',
            letterSpacing: letterSpace,
            lineHeight: lineHeight,
        },
    }),
);
