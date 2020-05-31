import React from 'react';
import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import { mainColor, textColor } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';

export const ArticleHeader = ({ title }: { title: string }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.headerLongTitle} item xs={10}>
            <Typography className={classes.headerLongTitleText}>{title}</Typography>
        </Grid>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        headerLongTitle: {
            paddingTop: '3vw',
            paddingBottom: '5vw',
            '@media (max-width:767px)': {
                margin: '20px 40px 50px 15px',
            },
        },
        headerLongTitleText: {
            fontSize: '34px',
            color: mainColor,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: letterSpace,
            lineHeight,

            '@media (max-width:767px)': {
                fontSize: '21px',
                color: textColor,
                textTransform: 'initial',
            },
        },
    }),
);
